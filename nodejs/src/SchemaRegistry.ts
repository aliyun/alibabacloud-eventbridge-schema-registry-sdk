import { Type } from 'avsc';

import {
    EventbridgeSchemaRegistryArgumentError,
    EventbridgeSchemaRegistryValidationError
} from './errors';
import { COMPATIBILITY, DEFAULT_SEPERATOR } from './constants'
import { encode, MAGIC_BYTE } from './common/wireEncoder';
import decode from './common/wireDecoder';
import API from './api/index.pop';
import { SchemaType, Schema, AvroSchema, SchemaResponse, RawAvroSchema, EventbridgeSchema, EventbridgeSubject } from './@types';
import { ClientOptions } from './@types-ebschema';
import { helperTypeFromSchemaType, schemaTypeFromString, schemaFromEventbridgeSchema } from './schemaTypeResolver';
import Cache from './cache';
interface DecodeOptions {
    [SchemaType.AVRO]?: any
}
interface RegisterResult {
    id: string
}
interface Opts {
    compatibility?: COMPATIBILITY
    separator?: string
    subject: string
}

const DEFAULT_OPTS = {
    compatibility: COMPATIBILITY.BACKWARD,
    separator: DEFAULT_SEPERATOR,
}
export default class SchemaRegistry {
    private api: API;
    private groupId: string;
    public cache: Cache;
    private cacheMissRequests: { [key: number]: any } = {}
    constructor({ accessKeyId, accessKeySecret, groupId }, options?: ClientOptions) {
        this.groupId = groupId;
        this.api = new API({ accessKeySecret, accessKeyId });
        this.cache = new Cache();
    }

    private async checkAndCreateSchemaGroup(groupId: string, schemaType: SchemaType): Promise<string> {
        try {
            await this.api.getSchemaGroup(groupId);
        } catch (e) {
            await this.api.createSchemaGroup({
                groupId: this.groupId,
                schemaFormat: schemaType
            });
        }
        return groupId;
    }

    private async getSchemaOriginRequest(id: string): Promise<SchemaResponse> {
        if (this.cacheMissRequests[id]) {
            return this.cacheMissRequests[id];
        }
        let result;
        result = await this.api.getSchemaVersionByUUID(id);
        this.cacheMissRequests[id] = result;
        return result;
    }

    private async _getSchema(id: string): Promise<{ type: SchemaType; schema: Schema | AvroSchema }> {
        const cacheEntry = this.cache.getSchema(id)

        if (cacheEntry) {
            return cacheEntry
        }

        const foundSchema = await this.getSchemaOriginRequest(id);
        const schemaType = schemaTypeFromString(foundSchema.Format)
        const help = helperTypeFromSchemaType(schemaType);
        const ebSchema = help.toEventbridgeSchema(foundSchema);
        const schemaInstance = schemaFromEventbridgeSchema(ebSchema);
        return this.cache.setSchema(id, schemaType, schemaInstance);
    }

    public async encode(uuid: string, payload: any): Promise<any> {
        if (!uuid) {
            throw new EventbridgeSchemaRegistryArgumentError(
                `Invalid uuid: ${JSON.stringify(uuid)}`,
            )
        }
        const { schema } = await this._getSchema(uuid)
        try {
            const serializedPayload = schema.toBuffer(payload);
            return encode(uuid, serializedPayload);
        } catch (error) {
            if (error instanceof EventbridgeSchemaRegistryValidationError) throw error
            const paths = this.collectInvalidPaths(schema, payload);
            throw new EventbridgeSchemaRegistryValidationError(error, paths);
        }
    }
    private isEventbridgeSchema(
        schema: RawAvroSchema | AvroSchema | EventbridgeSchema,
    ): schema is EventbridgeSchema {
        return (schema as EventbridgeSchema).schema != null
    }

    private getEventbridgeSchema(
        schema: RawAvroSchema | AvroSchema | EventbridgeSchema,
    ): EventbridgeSchema {
        let eventbridgeSchema: EventbridgeSchema
        // convert data from old api (for backwards compatibility)
        if (!this.isEventbridgeSchema(schema)) {
            // schema is instanceof RawAvroSchema or AvroSchema
            eventbridgeSchema = {
                type: SchemaType.AVRO,
                schema: JSON.stringify(schema),
            }
        } else {
            eventbridgeSchema = schema as EventbridgeSchema
        }
        return eventbridgeSchema;
    }

    private collectInvalidPaths(schema: Schema, jsonPayload: object) {
        const paths: string[][] = []
        schema.isValid(jsonPayload, {
            errorHook: path => paths.push(path),
        })

        return paths
    }

    public async decode(buffer: Buffer, options?: DecodeOptions) {
        if (!Buffer.isBuffer(buffer)) {
            throw new EventbridgeSchemaRegistryArgumentError('Invalid buffer');
        }
        let { magicByte, uuid, payload } = decode(buffer);
        if (Buffer.compare(MAGIC_BYTE, magicByte) !== 0) {
            throw new EventbridgeSchemaRegistryArgumentError(`Message encoded with magic byte ${JSON.stringify(magicByte)}, expected ${JSON.stringify(
                MAGIC_BYTE,
            )}`)
        }

        const { type, schema: writerSchema } = await this._getSchema(uuid);
        let rawReaderSchema
        switch (type) {
            case SchemaType.AVRO:
                rawReaderSchema = options?.[SchemaType.AVRO]?.readerSchema as RawAvroSchema | AvroSchema
        }
        if (rawReaderSchema) {
            const readerSchema = schemaFromEventbridgeSchema(
                { type: SchemaType.AVRO, schema: rawReaderSchema },
            ) as AvroSchema
            if (readerSchema.equals(writerSchema as Type)) {
                /* Even when schemas are considered equal by `avsc`,
                 * they still aren't interchangeable:
                 * provided `readerSchema` may have different `opts` (e.g. logicalTypes / unionWrap flags)
                 * see https://github.com/mtth/avsc/issues/362 */
                return readerSchema.fromBuffer(payload)
            } else {
                // decode using a resolver from writer type into reader type
                return readerSchema.fromBuffer(payload, readerSchema.createResolver(writerSchema as Type))
            }
        }

        return writerSchema.fromBuffer(payload)
    }
    public async register(
        schema: RawAvroSchema | EventbridgeSchema,
        userOpts?: Opts,
    ): Promise<RegisterResult> {
        const { separator } = { ...DEFAULT_OPTS, ...userOpts }
        const eventbridgeSchema: EventbridgeSchema = this.getEventbridgeSchema(schema);
        const originalSchema = eventbridgeSchema.schema as string;
        const helper = helperTypeFromSchemaType(eventbridgeSchema.type);
        const schemaInstance = schemaFromEventbridgeSchema(eventbridgeSchema) as AvroSchema;
        helper.validate(schemaInstance);
        let isFirstTimeRegistration = false;
        let subject: EventbridgeSubject
        if (userOpts?.subject) {
            subject = {
                name: userOpts.subject,
            }
        } else {
            subject = helper.getSubject(eventbridgeSchema, schemaInstance, separator)
        }
        const schemaId = subject.name;
        const schemaType = schema.type as SchemaType;
        const groupId = await this.checkAndCreateSchemaGroup(this.groupId, schemaType);
        let response;
        try {
            response = await this.api.getSchema({
                groupId,
                schemaId
            });
        } catch (e) {
            isFirstTimeRegistration = true;
        }

        if (isFirstTimeRegistration) {
            response = await this.api.createSchema({ groupId, schemaId, content: originalSchema });
        } else {
            try {
                response = await this.api.createSchemaVersion({ groupId, schemaId, content: originalSchema });
            } catch (e) {
            }
        }
        return {
            id: response.UUID
        }
    }

    public async getSchema(registryId) {
        return await (await this._getSchema(registryId)).schema
    }

    public async getRegistryId() {

    }

    public async getRegistryIdBySchema(subject: string,
        schema: AvroSchema | RawAvroSchema | EventbridgeSchema) {
        const groupId = this.groupId;
        const schemaId = subject;
        const eventbridgeSchema: EventbridgeSchema = this.getEventbridgeSchema(schema);
        const originalSchema = eventbridgeSchema.schema as string;
        const helper = helperTypeFromSchemaType(eventbridgeSchema.type);
        const schemaInstance = schemaFromEventbridgeSchema(eventbridgeSchema) as AvroSchema;
        helper.validate(schemaInstance);
        let response;
        let isFirstTimeRegistration = false;
        try {
            response = await this.api.getSchema({
                groupId,
                schemaId
            });
        } catch (e) {
            isFirstTimeRegistration = true;
        }

        if (isFirstTimeRegistration) {
            response = await this.api.createSchema({ groupId, schemaId, content: originalSchema });
        } else {
            try {
                response = await this.api.createSchemaVersion({ groupId, schemaId, content: originalSchema });
                console.log(response, 'response');
            } catch (e) {
            }
        }
        return {
            id: response.UUID
        }
    }
    /**
     * 根据schemaId获取 uuid
     * @param subject  schemaId
     * @returns 
     */
    public async getLatestSchemaId(subject: string): Promise<string> {
        const groupId = this.groupId;
        const response = await this.api.getSchema({
            groupId,
            schemaId: subject
        });
        return response.UUID;
    }


}
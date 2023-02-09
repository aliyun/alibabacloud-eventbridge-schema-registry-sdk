"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const confluent_schema_registry_1 = require("@kafkajs/confluent-schema-registry");
const errors_1 = require("./errors");
const constants_1 = require("./constants");
const wireEncoder_1 = require("./common/wireEncoder");
const wireDecoder_1 = __importDefault(require("./common/wireDecoder"));
const index_pop_1 = __importDefault(require("./api/index.pop"));
const _types_1 = require("./@types");
// import { ClientOptions } from './@types-ebschema';
const schemaTypeResolver_1 = require("./schemaTypeResolver");
const cache_1 = __importDefault(require("./cache"));
const DEFAULT_OPTS = {
    compatibility: constants_1.COMPATIBILITY.BACKWARD,
    separator: constants_1.DEFAULT_SEPERATOR,
};
class SchemaRegistry {
    constructor(params, options) {
        this.cacheMissRequests = {};
        const { host, groupId, accessKeyId, accessKeySecret, endpoint } = params;
        this.groupId = groupId;
        this.api = new index_pop_1.default({ accessKeySecret, accessKeyId, endpoint });
        this.cache = new cache_1.default();
        if (host) {
            this.confluentSRInstance = new confluent_schema_registry_1.SchemaRegistry({ host }, options);
        }
    }
    async checkAndCreateSchemaGroup(groupId, schemaType) {
        try {
            await this.api.getSchemaGroup(groupId);
        }
        catch (e) {
            await this.api.createSchemaGroup({
                groupId: this.groupId,
                schemaFormat: schemaType
            });
        }
        return groupId;
    }
    async getSchemaOriginRequest(id) {
        if (this.cacheMissRequests[id]) {
            return this.cacheMissRequests[id];
        }
        let result;
        result = await this.api.getSchemaVersionByUUID(id);
        this.cacheMissRequests[id] = result;
        return result;
    }
    async _getSchema(id) {
        const cacheEntry = this.cache.getSchema(id);
        if (cacheEntry) {
            return cacheEntry;
        }
        const foundSchema = await this.getSchemaOriginRequest(id);
        const schemaType = (0, schemaTypeResolver_1.schemaTypeFromString)(foundSchema.Format);
        const help = (0, schemaTypeResolver_1.helperTypeFromSchemaType)(schemaType);
        const ebSchema = help.toEventbridgeSchema(foundSchema);
        const schemaInstance = (0, schemaTypeResolver_1.schemaFromEventbridgeSchema)(ebSchema);
        return this.cache.setSchema(id, schemaType, schemaInstance);
    }
    async encode(uuid, payload) {
        if (!uuid) {
            throw new errors_1.EventbridgeSchemaRegistryArgumentError(`Invalid uuid: ${JSON.stringify(uuid)}`);
        }
        const { schema } = await this._getSchema(uuid);
        try {
            const serializedPayload = schema.toBuffer(payload);
            return (0, wireEncoder_1.encode)(uuid, serializedPayload);
        }
        catch (error) {
            if (error instanceof errors_1.EventbridgeSchemaRegistryValidationError)
                throw error;
            const paths = this.collectInvalidPaths(schema, payload);
            throw new errors_1.EventbridgeSchemaRegistryValidationError(error, paths);
        }
    }
    isEventbridgeSchema(schema) {
        return schema.schema != null;
    }
    getEventbridgeSchema(schema) {
        let eventbridgeSchema;
        // convert data from old api (for backwards compatibility)
        if (!this.isEventbridgeSchema(schema)) {
            // schema is instanceof RawAvroSchema or AvroSchema
            eventbridgeSchema = {
                type: _types_1.SchemaType.AVRO,
                schema: JSON.stringify(schema),
            };
        }
        else {
            eventbridgeSchema = schema;
        }
        return eventbridgeSchema;
    }
    collectInvalidPaths(schema, jsonPayload) {
        const paths = [];
        schema.isValid(jsonPayload, {
            errorHook: path => paths.push(path),
        });
        return paths;
    }
    async decode(buffer, options) {
        var _a;
        if (!Buffer.isBuffer(buffer)) {
            throw new errors_1.EventbridgeSchemaRegistryArgumentError('Invalid buffer');
        }
        let { magicByte, uuid, payload } = (0, wireDecoder_1.default)(buffer);
        if (Buffer.compare(wireEncoder_1.CONFLUENT_MAGIC_BYTE, magicByte) === 0 && this.confluentSRInstance) {
            return this.confluentSRInstance.decode(buffer, options);
        }
        else if (Buffer.compare(wireEncoder_1.ALICLOUD_MAGIC_BYTE, magicByte) !== 0) {
            throw new errors_1.EventbridgeSchemaRegistryArgumentError(`Message encoded with magic byte ${JSON.stringify(magicByte)}, expected ${JSON.stringify(wireEncoder_1.ALICLOUD_MAGIC_BYTE)}`);
        }
        const { type, schema: writerSchema } = await this._getSchema(uuid);
        let rawReaderSchema;
        switch (type) {
            case _types_1.SchemaType.AVRO:
                rawReaderSchema = (_a = options === null || options === void 0 ? void 0 : options[_types_1.SchemaType.AVRO]) === null || _a === void 0 ? void 0 : _a.readerSchema;
        }
        if (rawReaderSchema) {
            const readerSchema = (0, schemaTypeResolver_1.schemaFromEventbridgeSchema)({ type: _types_1.SchemaType.AVRO, schema: rawReaderSchema });
            if (readerSchema.equals(writerSchema)) {
                /* Even when schemas are considered equal by `avsc`,
                 * they still aren't interchangeable:
                 * provided `readerSchema` may have different `opts` (e.g. logicalTypes / unionWrap flags)
                 * see https://github.com/mtth/avsc/issues/362 */
                return readerSchema.fromBuffer(payload);
            }
            else {
                // decode using a resolver from writer type into reader type
                return readerSchema.fromBuffer(payload, readerSchema.createResolver(writerSchema));
            }
        }
        return writerSchema.fromBuffer(payload);
    }
    async register(schema, userOpts) {
        const { separator } = { ...DEFAULT_OPTS, ...userOpts };
        const eventbridgeSchema = this.getEventbridgeSchema(schema);
        const originalSchema = eventbridgeSchema.schema;
        const helper = (0, schemaTypeResolver_1.helperTypeFromSchemaType)(eventbridgeSchema.type);
        const schemaInstance = (0, schemaTypeResolver_1.schemaFromEventbridgeSchema)(eventbridgeSchema);
        helper.validate(schemaInstance);
        let isFirstTimeRegistration = false;
        let subject;
        if (userOpts === null || userOpts === void 0 ? void 0 : userOpts.subject) {
            subject = {
                name: userOpts.subject,
            };
        }
        else {
            subject = helper.getSubject(eventbridgeSchema, schemaInstance, separator);
        }
        const schemaId = subject.name;
        const schemaType = schema.type;
        const groupId = await this.checkAndCreateSchemaGroup(this.groupId, schemaType);
        let response;
        try {
            response = await this.api.getSchema({
                groupId,
                schemaId
            });
        }
        catch (e) {
            isFirstTimeRegistration = true;
        }
        if (isFirstTimeRegistration) {
            response = await this.api.createSchema({ groupId, schemaId, content: originalSchema });
        }
        else {
            try {
                response = await this.api.createSchemaVersion({ groupId, schemaId, content: originalSchema });
            }
            catch (e) {
            }
        }
        return {
            id: response.UUID
        };
    }
    async getSchema(registryId) {
        return await (await this._getSchema(registryId)).schema;
    }
    async getRegistryId() {
    }
    async getRegistryIdBySchema(subject, schema) {
        const groupId = this.groupId;
        const schemaId = subject;
        const eventbridgeSchema = this.getEventbridgeSchema(schema);
        const originalSchema = eventbridgeSchema.schema;
        const helper = (0, schemaTypeResolver_1.helperTypeFromSchemaType)(eventbridgeSchema.type);
        const schemaInstance = (0, schemaTypeResolver_1.schemaFromEventbridgeSchema)(eventbridgeSchema);
        helper.validate(schemaInstance);
        let response;
        let isFirstTimeRegistration = false;
        try {
            response = await this.api.getSchema({
                groupId,
                schemaId
            });
        }
        catch (e) {
            isFirstTimeRegistration = true;
        }
        if (isFirstTimeRegistration) {
            response = await this.api.createSchema({ groupId, schemaId, content: originalSchema });
        }
        else {
            try {
                response = await this.api.createSchemaVersion({ groupId, schemaId, content: originalSchema });
                console.log(response, 'response');
            }
            catch (e) {
            }
        }
        return {
            id: response.UUID
        };
    }
    /**
     * 根据schemaId获取 uuid
     * @param subject  schemaId
     * @returns
     */
    async getLatestSchemaId(subject) {
        const groupId = this.groupId;
        const response = await this.api.getSchema({
            groupId,
            schemaId: subject
        });
        return response.UUID;
    }
}
exports.default = SchemaRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hUmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU2NoZW1hUmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxrRkFBK0Y7QUFFL0YscUNBR2tCO0FBQ2xCLDJDQUE4RDtBQUM5RCxzREFBeUY7QUFDekYsdUVBQTBDO0FBQzFDLGdFQUFrQztBQUNsQyxxQ0FBMko7QUFDM0oscURBQXFEO0FBQ3JELDZEQUFtSDtBQUNuSCxvREFBNEI7QUFhNUIsTUFBTSxZQUFZLEdBQUc7SUFDakIsYUFBYSxFQUFFLHlCQUFhLENBQUMsUUFBUTtJQUNyQyxTQUFTLEVBQUUsNkJBQWlCO0NBQy9CLENBQUE7QUFDRCxNQUFxQixjQUFjO0lBTS9CLFlBQVksTUFBaUMsRUFBRSxPQUFhO1FBRHBELHNCQUFpQixHQUEyQixFQUFFLENBQUE7UUFFbEQsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLG1CQUFHLENBQUMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksMENBQXVCLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM3RTtJQUNMLENBQUM7SUFFTyxLQUFLLENBQUMseUJBQXlCLENBQUMsT0FBZSxFQUFFLFVBQXNCO1FBQzNFLElBQUk7WUFDQSxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzFDO1FBQUMsT0FB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
/// <reference types="node" />
import { COMPATIBILITY } from './constants';
import { SchemaType, Schema, AvroSchema, RawAvroSchema, EventbridgeSchema } from './@types';
import { ClientOptions } from './@types-ebschema';
import Cache from './cache';
interface DecodeOptions {
    [SchemaType.AVRO]?: any;
}
interface RegisterResult {
    id: string;
}
interface Opts {
    compatibility?: COMPATIBILITY;
    separator?: string;
    subject: string;
}
export default class SchemaRegistry {
    private api;
    private groupId;
    cache: Cache;
    private cacheMissRequests;
    constructor({ accessKeyId, accessKeySecret, groupId }: {
        accessKeyId: any;
        accessKeySecret: any;
        groupId: any;
    }, options?: ClientOptions);
    private getSchemaOriginRequest;
    private _getSchema;
    encode(uuid: string, payload: any): Promise<any>;
    private isEventbridgeSchema;
    private getEventbridgeSchema;
    private collectInvalidPaths;
    decode(buffer: Buffer, options?: DecodeOptions): Promise<any>;
    register(schema: RawAvroSchema | EventbridgeSchema, userOpts?: Opts): Promise<RegisterResult>;
    getSchema(registryId: any): Promise<Schema | AvroSchema>;
    getRegistryId(): Promise<void>;
    getRegistryIdBySchema(subject: string, schema: AvroSchema | RawAvroSchema | EventbridgeSchema): Promise<{
        id: any;
    }>;
    /**
     * 根据schemaId获取 uuid
     * @param subject  schemaId
     * @returns
     */
    getLatestSchemaId(subject: string): Promise<string>;
}
export {};

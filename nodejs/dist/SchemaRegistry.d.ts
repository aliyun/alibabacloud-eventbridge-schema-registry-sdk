/// <reference types="node" />
import { COMPATIBILITY } from './constants';
import { SchemaType, SchemaRegistryInputParams, Schema, AvroSchema, RawAvroSchema, EventbridgeSchema } from './@types';
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
    private confluentSRInstance;
    private api;
    private groupId;
    cache: Cache;
    private cacheMissRequests;
    constructor(params: SchemaRegistryInputParams, options?: any);
    private checkAndCreateSchemaGroup;
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

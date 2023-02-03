/// <reference types="node" />
import { Resolver, ForSchemaOptions, Type } from 'avsc';
import { SchemaData } from './@types-ebschema';
export declare enum SchemaType {
    AVRO = "AVRO"
}
export interface SchemaHelper {
    validate(schema: Schema): void;
    toEventbridgeSchema(data: SchemaResponse): EventbridgeSchema;
    getSubject(eventbridgeSchema: EventbridgeSchema, schema: Schema, separator: string): EventbridgeSubject;
    updateOptionsFromSchemaReferences(referencedSchemas: EventbridgeSchema[], options?: ProtocolOptions): ProtocolOptions;
}
export type AvroOptions = Partial<ForSchemaOptions> & {
    referencedSchemas?: AvroEventbridgeSchema[];
};
export type ProtoOptions = {
    messageName?: string;
    referencedSchemas?: [];
};
export interface LegacyOptions {
    forSchemaOptions?: AvroOptions;
}
export interface ProtocolOptions {
    [SchemaType.AVRO]?: AvroOptions;
}
export type SchemaRegistryAPIClientOptions = ProtocolOptions | LegacyOptions;
export interface Schema {
    toBuffer(payload: object): Buffer;
    fromBuffer(buffer: Buffer, resolver?: Resolver, noCheck?: boolean): any;
    isValid(payload: object, opts?: {
        errorHook: (path: Array<string>, value: any, type?: any) => void;
    }): boolean;
}
export interface RawAvroSchema {
    name: string;
    namespace?: string;
    type: 'record';
    fields: any[];
}
export interface AvroSchema extends Schema, RawAvroSchema, Pick<Type, 'equals' | 'createResolver'> {
}
export interface AvroEventbridgeSchema {
    type: SchemaType.AVRO;
    schema: string | RawAvroSchema;
    references?: SchemaReference[];
}
export type SchemaReference = {
    name: string;
    subject: string;
    version: number;
};
export interface EventbridgeSubject {
    name: string;
}
export interface SchemaResponse extends SchemaData {
    References: SchemaReference[];
}
export interface SchemaRegistryInputParams {
    accessKeyId: string;
    accessKeySecret: string;
    groupId: string;
    host?: string;
}
export type EventbridgeSchema = AvroEventbridgeSchema;
declare global {
    namespace jest {
        interface Matchers<R, T = {}> {
            toMatchConfluentEncodedPayload(args: {
                registryId: number;
                payload: Buffer;
            }): R;
        }
    }
}

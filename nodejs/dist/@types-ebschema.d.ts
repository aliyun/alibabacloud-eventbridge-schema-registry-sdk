export interface ClientConfig {
    accessKeyId: string;
    accessKeySecret: string;
    endpoint?: string;
    groupId?: string;
    apiVersion?: string;
}
export interface ClientOptions {
    groupId?: string;
    schemaId?: string;
    uuid?: string;
}
export declare const enum SchemaType {
    AVRO = "AVRO"
}
export interface SchemaData {
    UpdatedTimestamp: number;
    Description: string;
    Format: SchemaType;
    CreatedTimestamp: number;
    LatestVersion: number;
    Content: string;
    SchemaId: string;
    CompatibleType: string;
    UUID: string;
    GroupId: string;
}
export declare const enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT"
}
export interface ResponseData {
    RequestId: string;
    Data: any;
    Code: string;
    Success: boolean;
}
export interface GetSchemaRequestPayload {
    groupId: string;
    schemaId: string;
}
export interface ListSchemasResponse {
    Total: number;
    Schemas: ListSchemasData[];
}
export interface ListSchemasData {
    GroupId: string;
    SchemaId: string;
    Description?: string;
    LastestVersion?: number;
    Content?: string;
    Format: string;
    CompatibleType: string;
    UpdatedTimestamp: string;
    CreatedTimestamp: string;
}
export interface GetSchemaGroupRequestConfig {
    groupId: string;
}
export interface GetSchemaGroupResponseData {
    groupARN: string;
    groupId: string;
    description: string;
    createdTimestamp: string;
    updatedTimestamp: string;
}
export interface UpdateSchemaRequestConfig {
    groupId: string;
    schemaId: string;
    description?: string;
    compatibleType?: string;
}
export interface CreateSchemaVersionRequestConfig {
    groupId: string;
    schemaId: string;
    content: string;
    references?: string;
}
export interface CreateSchemaVersionResponseData {
    schemaVersionARN: string;
    createdTimestamp: string;
    version: number;
    uuid: string;
}

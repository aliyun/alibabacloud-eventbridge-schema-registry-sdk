export interface ClientConfig {
    accessKeyId: string,
    accessKeySecret: string,
    endpoint?: string,
    groupId?: string,
    apiVersion?: string
}
export interface ClientOptions {
    groupId?: string,
    schemaId?: string,
    uuid?: string
}
export const enum SchemaType {
    AVRO = 'AVRO'
}

export interface SchemaData {
    UpdatedTimestamp: number,
    Description: string,
    Format: SchemaType,
    CreatedTimestamp: number,
    LatestVersion: number,
    Content: string,
    SchemaId: string,
    CompatibleType: string,
    UUID: string,
    GroupId: string
}

export const enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT= 'PUT'
}
export interface ResponseData {
    RequestId: string,
    Data: any,
    Code: string,
    Success: boolean
}
export interface GetSchemaRequestPayload {
    groupId: string,
    schemaId: string
}
export interface ListSchemasResponse {
    Total: number,
    Schemas: ListSchemasData[]
}
export interface ListSchemasData {
    GroupId: string, //[a-zA-Z0-9\-]{2,} Group标识 group-12301
    SchemaId: string, //[a-zA-Z0-9\-]{2,} Schema标识 schema-events
    Description?: string, // Schema描述 测试Schema
    LastestVersion?: number, // Schema最新版本 1
    Content?: string, // Schema最新版本的内容。如果没有版本创建则为空
    Format: string, // Schema格式 JSON_SCHEMA_DRAFT_4 | OPEN_API_3_0 | AVRO
    CompatibleType: string, //Schema版本之间的兼容类型 NONE - 无兼容类型
    UpdatedTimestamp: string, //更新时间
    CreatedTimestamp: string // 创建时间
}
export interface GetSchemaGroupRequestConfig {
    groupId: string //[a-zA-Z0-9\-]{2,} GroupId group-12301
}
export interface GetSchemaGroupResponseData {
    groupARN: string, // Group 资源 ARN
    groupId: string, // Group Id
    description: string, // Group 描述
    createdTimestamp: string, // 创建时间
    updatedTimestamp: string // 修改时间
}



export interface UpdateSchemaRequestConfig {
    groupId: string,
    schemaId: string,
    description?: string,
    compatibleType?: string
}

export interface CreateSchemaVersionRequestConfig {
    groupId: string,
    schemaId: string,
    content: string,
    references?: string
}


export interface CreateSchemaVersionResponseData {
    schemaVersionARN: string,
    createdTimestamp: string,
    version: number,
    uuid: string
}
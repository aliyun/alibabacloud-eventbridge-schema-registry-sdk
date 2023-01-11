import { ClientConfig, GetSchemaRequestPayload, ListSchemasResponse, UpdateSchemaRequestConfig, CreateSchemaVersionRequestConfig, CreateSchemaVersionResponseData, CreateSchemaGroupRequestPayload } from '../@types-ebschema';
export default class Api {
    private client;
    constructor(config: ClientConfig);
    private createClient;
    private invokeApi;
    private getResponseData;
    createSchemaGroup(payload: CreateSchemaGroupRequestPayload): Promise<any>;
    getSchemaGroup(groupId: string): Promise<any>;
    updateSchemaGroup(): Promise<void>;
    listSchemaGroups(): Promise<any>;
    deleteSchemaGroup(): Promise<void>;
    createSchema(payload: any): Promise<any>;
    getSchema(payload: GetSchemaRequestPayload): Promise<any>;
    updateSchema(payload: UpdateSchemaRequestConfig): Promise<any>;
    listSchemas(groupId: string): Promise<ListSchemasResponse>;
    deleteSchema(): Promise<void>;
    getSchemaVersionByUUID(uuid: string): Promise<any>;
    createSchemaVersion(payload: CreateSchemaVersionRequestConfig): Promise<CreateSchemaVersionResponseData>;
    deleteSchemaVersion(): Promise<void>;
    getSchemaVersion(): Promise<void>;
    listSchemaVersions(): Promise<void>;
    getACSEventsSchemaGroup(): Promise<void>;
    listACSEventsSchemas(): Promise<void>;
    listACSEventsSchemaVersions(): Promise<void>;
    getACSEventsSchema(): Promise<void>;
}

import { ClientConfig } from '../@types-ebschema';
export default class Api {
    private client;
    constructor(config: ClientConfig);
    private createClient;
    createSchemaGroup(): Promise<void>;
    getSchemaGroup(): Promise<void>;
    updateSchemaGroup(): Promise<void>;
    listSchemaGroups(params?: {}): Promise<any>;
    deleteSchemaGroup(): Promise<void>;
    createSchema(): Promise<void>;
    getSchema(): Promise<void>;
    updateSchema(): Promise<void>;
    listSchemas(): Promise<void>;
    deleteSchema(): Promise<void>;
    createSchemaVersion(): Promise<void>;
    deleteSchemaVersion(): Promise<void>;
    getSchemaVersion(): Promise<void>;
    listSchemaVersions(): Promise<void>;
    getACSEventsSchemaGroup(): Promise<void>;
    listACSEventsSchemas(): Promise<void>;
    listACSEventsSchemaVersions(): Promise<void>;
    getACSEventsSchema(): Promise<void>;
}

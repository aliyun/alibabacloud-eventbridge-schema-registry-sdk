import Client, { Config } from '../client';
import { ClientConfig } from '../@types-ebschema';
export default class Api {
    private client;
    constructor(config: ClientConfig) {
        this.client = this.createClient(config)
    }


    private createClient(data: ClientConfig) {
        if (!this.client) {
            const { accessKeyId, accessKeySecret, endpoint } = data;

            let config = new Config({});
            config.accessKeyId = accessKeyId;
            config.accessKeySecret = accessKeySecret;
            config.endpoint = endpoint;
            this.client = new Client(config);
        }
        return this.client;
    }



    public async createSchemaGroup() {

    }

    public async getSchemaGroup() {

    }

    public async updateSchemaGroup() {

    }

    public async listSchemaGroups(params = {}) {
        return await this.client('ListSchemaGroups', params);
    }

    public async deleteSchemaGroup() {

    }

    public async createSchema() {

    }


    public async getSchema() {
    }

    public async updateSchema() {
    }

    public async listSchemas() {

    }
    public async deleteSchema() {
    }

    public async createSchemaVersion() {
    }
    public async deleteSchemaVersion() {
    }
    public async getSchemaVersion() {
    }
    public async listSchemaVersions() {
    }
    public async getACSEventsSchemaGroup() {
    }

    public async listACSEventsSchemas() {
    }
    public async listACSEventsSchemaVersions() {
    }
    public async getACSEventsSchema() {
    }


}
import Core from '@alicloud/pop-core';
import { ClientConfig, ResponseData, GetSchemaRequestPayload, RequestMethod, ListSchemasResponse, UpdateSchemaRequestConfig, CreateSchemaVersionRequestConfig, CreateSchemaVersionResponseData } from '../@types-ebschema';
import { EventbridgeApiResponseError } from '../errors';
const DEFAULT_LIMIT_SIZE = 100;
export default class Api {
    private client;
    constructor(config: ClientConfig) {
        this.client = this.createClient(config)
    }


    private createClient(data: ClientConfig) {
        if (!this.client) {
            const { accessKeyId, accessKeySecret } = data;
            this.client = new Core({
                accessKeyId,
                accessKeySecret,
                endpoint: 'https://eventbridge-console-share.cn-hangzhou.aliyuncs.com/',
                apiVersion: '2020-05-01'
            });
        }
        return this.client;
    }

    private async invokeApi(action, method, params) {
        try {
            const requestOption = {
                method: method,
                timeout: 20000
            };
            return await this.client.request(action, params, requestOption);
        } catch (e) {
            throw new EventbridgeApiResponseError(e.message);
        }

    }

    private getResponseData(response: ResponseData) {
        if (!response) {
            throw new EventbridgeApiResponseError(`system error`);
        }
        if (response.Success) {
            return response.Data;
        } else {
            throw new EventbridgeApiResponseError(`unknow error, the requestId is ${response.RequestId}`)
        }

    }



    public async createSchemaGroup() {

    }

    public async getSchemaGroup() {

    }

    public async updateSchemaGroup() {

    }

    public async listSchemaGroups() {
        const response = await this.invokeApi('ListSchemaGroups', RequestMethod.GET, { limit: DEFAULT_LIMIT_SIZE });
        const _data = this.getResponseData(response);
        return _data;
    }

    public async deleteSchemaGroup() {

    }

    public async createSchema(payload) {
        const response: ResponseData = await this.invokeApi('CreateSchema', RequestMethod.POST, payload);
        const _data = this.getResponseData(response);
        return _data;
    }

    public async getSchema(payload: GetSchemaRequestPayload) {
        const response = await this.invokeApi('GetSchema', RequestMethod.POST, payload);
        const _data = this.getResponseData(response);
        return _data;
    }

    public async updateSchema(payload: UpdateSchemaRequestConfig) {
        const response: ResponseData = await this.invokeApi('UpdateSchema', RequestMethod.PUT, payload);
        const _data = this.getResponseData(response);
        return _data;
    }

    public async listSchemas(groupId: string): Promise<ListSchemasResponse> {
        const response: ResponseData = await this.invokeApi('ListSchemas', RequestMethod.GET, { groupId, limit: DEFAULT_LIMIT_SIZE });
        const _data = this.getResponseData(response);
        return _data;
    }
    public async deleteSchema() {
    }
    public async getSchemaVersionByUUID(uuid: string) {
        const response = await this.invokeApi('GetSchemaVersionByUUID', RequestMethod.POST, { UUID: uuid });
        const _data = this.getResponseData(response);
        return _data;
    }
    public async createSchemaVersion(payload: CreateSchemaVersionRequestConfig): Promise<CreateSchemaVersionResponseData> {
        const response: ResponseData = await this.invokeApi('CreateSchemaVersion', RequestMethod.POST, payload);
        const _data = this.getResponseData(response);
        return _data;
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
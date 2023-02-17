"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pop_core_1 = __importDefault(require("@alicloud/pop-core"));
const errors_1 = require("../errors");
const DEFAULT_LIMIT_SIZE = 100;
class Api {
    constructor(config) {
        this.client = this.createClient(config);
    }
    createClient(data) {
        if (!this.client) {
            const { accessKeyId, accessKeySecret, endpoint = 'https://eventbridge-console.ap-southeast-3.aliyuncs.com/', apiVersion = '2020-04-01' } = data;
            this.client = new pop_core_1.default({
                accessKeyId,
                accessKeySecret,
                endpoint,
                apiVersion
            });
        }
        return this.client;
    }
    async invokeApi(action, method, params) {
        try {
            const requestOption = {
                method: method,
                timeout: 20000
            };
            return await this.client.request(action, params, requestOption);
        }
        catch (e) {
            throw new errors_1.EventbridgeApiResponseError(e.message);
        }
    }
    getResponseData(response) {
        if (!response) {
            throw new errors_1.EventbridgeApiResponseError(`system error`);
        }
        if (response.Success) {
            return response.Data;
        }
        else {
            throw new errors_1.EventbridgeApiResponseError(`unknow error, the requestId is ${response.RequestId}`);
        }
    }
    async createSchemaGroup(payload) {
        const response = await this.invokeApi('CreateSchemaGroup', "GET" /* RequestMethod.GET */, payload);
        const _data = this.getResponseData(response);
        return _data;
    }
    async getSchemaGroup(groupId) {
        const response = await this.invokeApi('getSchemaGroup', "GET" /* RequestMethod.GET */, { groupId });
        const _data = this.getResponseData(response);
        return _data;
    }
    async updateSchemaGroup() {
    }
    async listSchemaGroups() {
        const response = await this.invokeApi('ListSchemaGroups', "GET" /* RequestMethod.GET */, { limit: DEFAULT_LIMIT_SIZE });
        const _data = this.getResponseData(response);
        return _data;
    }
    async deleteSchemaGroup() {
    }
    async createSchema(payload) {
        const response = await this.invokeApi('CreateSchema', "POST" /* RequestMethod.POST */, payload);
        const _data = this.getResponseData(response);
        return _data;
    }
    async getSchema(payload) {
        const response = await this.invokeApi('GetSchema', "POST" /* RequestMethod.POST */, payload);
        const _data = this.getResponseData(response);
        return _data;
    }
    async updateSchema(payload) {
        const response = await this.invokeApi('UpdateSchema', "PUT" /* RequestMethod.PUT */, payload);
        const _data = this.getResponseData(response);
        return _data;
    }
    async listSchemas(groupId) {
        const response = await this.invokeApi('ListSchemas', "GET" /* RequestMethod.GET */, { groupId, limit: DEFAULT_LIMIT_SIZE });
        const _data = this.getResponseData(response);
        return _data;
    }
    async deleteSchema() {
    }
    async getSchemaVersionByUUID(uuid) {
        const response = await this.invokeApi('GetSchemaVersionByUUID', "POST" /* RequestMethod.POST */, { UUID: uuid });
        const _data = this.getResponseData(response);
        return _data;
    }
    async createSchemaVersion(payload) {
        const response = await this.invokeApi('CreateSchemaVersion', "POST" /* RequestMethod.POST */, payload);
        const _data = this.getResponseData(response);
        return _data;
    }
    async deleteSchemaVersion() {
    }
    async getSchemaVersion() {
    }
    async listSchemaVersions() {
    }
    async getACSEventsSchemaGroup() {
    }
    async listACSEventsSchemas() {
    }
    async listACSEventsSchemaVersions() {
    }
    async getACSEventsSchema() {
    }
}
exports.default = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgucG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS9pbmRleC5wb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBc0M7QUFFdEMsc0NBQXdEO0FBQ3hELE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO0FBQy9CLE1BQXFCLEdBQUc7SUFFcEIsWUFBWSxNQUFvQjtRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUdPLFlBQVksQ0FBQyxJQUFrQjtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLE1BQU0sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFFBQVEsR0FBRywwREFBMEQsRUFBRSxVQUFVLEdBQUcsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ2hKLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQkFBSSxDQUFDO2dCQUNuQixXQUFXO2dCQUNYLGVBQWU7Z0JBQ2YsUUFBUTtnQkFDUixVQUFVO2FBQ2IsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVPLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQzFDLElBQUk7WUFDQSxNQUFNLGFBQWEsR0FBRztnQkFDbEIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7YUFDakIsQ0FBQztZQUNGLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ25FO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixNQUFNLElBQUksb0NBQTJCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BEO0lBRUwsQ0FBQztJQUVPLGVBQWUs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
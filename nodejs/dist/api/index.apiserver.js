"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importStar(require("../client"));
class Api {
    constructor(config) {
        this.client = this.createClient(config);
    }
    createClient(data) {
        if (!this.client) {
            const { accessKeyId, accessKeySecret, endpoint } = data;
            let config = new client_1.Config({});
            config.accessKeyId = accessKeyId;
            config.accessKeySecret = accessKeySecret;
            config.endpoint = endpoint;
            this.client = new client_1.default(config);
        }
        return this.client;
    }
    async createSchemaGroup() {
    }
    async getSchemaGroup() {
    }
    async updateSchemaGroup() {
    }
    async listSchemaGroups(params = {}) {
        return await this.client('ListSchemaGroups', params);
    }
    async deleteSchemaGroup() {
    }
    async createSchema() {
    }
    async getSchema() {
    }
    async updateSchema() {
    }
    async listSchemas() {
    }
    async deleteSchema() {
    }
    async createSchemaVersion() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYXBpc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS9pbmRleC5hcGlzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUEyQztBQUUzQyxNQUFxQixHQUFHO0lBRXBCLFlBQVksTUFBb0I7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFHTyxZQUFZLENBQUMsSUFBa0I7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFFeEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDakMsTUFBTSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7WUFDekMsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUlNLEtBQUssQ0FBQyxpQkFBaUI7SUFFOUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjO0lBRTNCLENBQUM7SUFFTSxLQUFLLENBQUMsaUJBQWlCO0lBRTlCLENBQUM7SUFFTSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLEVBQUU7UUFDckMsT0FBTyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLEtBQUssQ0FBQyxpQkFBaUI7SUFFOUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZO0lBRXpCLENBQUM7SUFHTSxLQUFLLENBQUMsU0FBUztJQUN0QixDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVk7SUFDekIsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXO0lBRXhCLENBQUM7SUFDTSxLQUFLLENBQUMsWUFBWTtJQUN6QixDQUFDO0lBRU0sS0FBSyxDQUFDLG1CQUFtQjtJQUNoQyxDQUFDO0lBQ00sS0FBSyxDQUFDLG1CQUFtQjtJQUNoQyxDQUFDO0lBQ00sS0FBSyxDQUFDLGdCQUFnQjtJQUM3QixDQUFDO0lBQ00sS0FBSyxDQUFDLGtCQUFrQjtJQUMvQixDQUFDO0lBQ00sS0FBSyxDQUFDLHVCQUF1QjtJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLG9CQUFvQjtJQUNqQyxDQUFDO0lBQ00sS0FBSyxDQUFDLDJCQUEyQjtJQUN4QyxDQUFDO0lBQ00sS0FBSyxDQUFDLGtCQUFrQjtJQUMvQixDQUFDO0NBR0o7QUE5RUQsc0JBOEVDIn0=
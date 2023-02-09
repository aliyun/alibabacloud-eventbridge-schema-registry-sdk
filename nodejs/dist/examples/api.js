"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_pop_1 = __importDefault(require("../api/index.pop"));
const index_1 = require("../index");
const accessKeySecret = '';
const accessKeyId = '';
const api = new index_pop_1.default({ accessKeySecret, accessKeyId });
(async () => {
    await api.createSchemaGroup({
        groupId: 'eventbridge',
        schemaFormat: index_1.SchemaType.AVRO
    });
    // const result = await api.getSchemaGroup('eventbridge');
    // console.log(result,'result');
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V4YW1wbGVzL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlFQUFtQztBQUNuQyxvQ0FBc0M7QUFDdEMsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN2QixNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFHLENBQUMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUN0RCxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ1IsTUFBTSxHQUFHLENBQUMsaUJBQWlCLENBQUM7UUFDeEIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsWUFBWSxFQUFFLGtCQUFVLENBQUMsSUFBSTtLQUNoQyxDQUFDLENBQUM7SUFFSCwwREFBMEQ7SUFDMUQsZ0NBQWdDO0FBQ3BDLENBQUMsQ0FBQyxFQUFFLENBQUEifQ==
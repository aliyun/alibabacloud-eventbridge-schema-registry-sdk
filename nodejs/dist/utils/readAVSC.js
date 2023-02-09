"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAVSCAsync = exports.readAVSC = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const errors_1 = require("../errors");
const readFileAsync = (0, util_1.promisify)(fs_1.default.readFile);
const ENCODING = 'utf-8';
function isValidSchema(rawSchema) {
    return ('name' in rawSchema &&
        'type' in rawSchema &&
        rawSchema.type === 'record' &&
        'fields' in rawSchema);
}
function validatedSchema(path, rawSchema) {
    if (!isValidSchema(rawSchema)) {
        throw new errors_1.EventbridgeSchemaRegistryInvalidSchemaError(`${path} is not recognized as a valid AVSC file (expecting valid top-level name, type and fields attributes)`);
    }
    return rawSchema;
}
function readAVSC(path) {
    const rawSchema = JSON.parse(fs_1.default.readFileSync(path, ENCODING));
    return validatedSchema(path, rawSchema);
}
exports.readAVSC = readAVSC;
async function readAVSCAsync(path) {
    const rawSchema = JSON.parse(await readFileAsync(path, ENCODING));
    return validatedSchema(path, rawSchema);
}
exports.readAVSCAsync = readAVSCAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEFWU0MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcmVhZEFWU0MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW1CO0FBQ25CLCtCQUFnQztBQUdoQyxzQ0FBdUU7QUFFdkUsTUFBTSxhQUFhLEdBQUcsSUFBQSxnQkFBUyxFQUFDLFlBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM1QyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUE7QUFFeEIsU0FBUyxhQUFhLENBQUMsU0FBYztJQUNuQyxPQUFPLENBQ0wsTUFBTSxJQUFJLFNBQVM7UUFDbkIsTUFBTSxJQUFJLFNBQVM7UUFDbkIsU0FBUyxDQUFDLElBQUksS0FBSyxRQUFRO1FBQzNCLFFBQVEsSUFBSSxTQUFTLENBQ3RCLENBQUE7QUFDSCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsSUFBWSxFQUFFLFNBQWM7SUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM3QixNQUFNLElBQUksb0RBQTJDLENBQ25ELEdBQUcsSUFBSSxzR0FBc0csQ0FDOUcsQ0FBQTtLQUNGO0lBQ0QsT0FBTyxTQUFTLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxJQUFZO0lBQ25DLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUM3RCxPQUFPLGVBQWUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDekMsQ0FBQztBQUhELDRCQUdDO0FBRU0sS0FBSyxVQUFVLGFBQWEsQ0FBQyxJQUFZO0lBQzlDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDakUsT0FBTyxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQ3pDLENBQUM7QUFIRCxzQ0FHQyJ9
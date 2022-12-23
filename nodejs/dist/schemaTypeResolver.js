"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaFromEventbridgeSchema = exports.helperTypeFromSchemaType = exports.schemaTypeFromString = void 0;
var _types_1 = require("./@types");
var errors_1 = require("./errors");
var AvroHelper_1 = __importDefault(require("./AvroHelper"));
var helperTypeFromSchemaTypeMap = {};
var schemaTypeFromString = function (schemaTypeString) {
    switch (schemaTypeString) {
        case 'AVRO':
        case undefined:
            return _types_1.SchemaType.AVRO;
    }
};
exports.schemaTypeFromString = schemaTypeFromString;
var helperTypeFromSchemaType = function (schemaType) {
    if (schemaType === void 0) { schemaType = _types_1.SchemaType.AVRO; }
    var schemaTypeStr = schemaType.toString();
    if (!helperTypeFromSchemaTypeMap[schemaTypeStr]) {
        var helper = void 0;
        switch (schemaType) {
            case _types_1.SchemaType.AVRO: {
                helper = new AvroHelper_1.default();
                break;
            }
            default:
                throw new errors_1.EventbridgeSchemaRegistryArgumentError('invalid schemaType');
        }
        helperTypeFromSchemaTypeMap[schemaTypeStr] = helper;
    }
    return helperTypeFromSchemaTypeMap[schemaTypeStr];
};
exports.helperTypeFromSchemaType = helperTypeFromSchemaType;
var schemaFromEventbridgeSchema = function (eventbridgeSchema) {
    try {
        var schema = void 0;
        switch (eventbridgeSchema.type) {
            case _types_1.SchemaType.AVRO: {
                schema = (0, exports.helperTypeFromSchemaType)(eventbridgeSchema.type).getAvroSchema(eventbridgeSchema);
                break;
            }
            default:
                throw new errors_1.EventbridgeSchemaRegistryArgumentError('invalid schemaType');
        }
        return schema;
    }
    catch (err) {
        throw new errors_1.EventbridgeSchemaRegistryArgumentError(err.message);
    }
};
exports.schemaFromEventbridgeSchema = schemaFromEventbridgeSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hVHlwZVJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjaGVtYVR5cGVSZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxtQ0FNaUI7QUFFakIsbUNBQWtFO0FBQ2xFLDREQUFzQztBQUN0QyxJQUFNLDJCQUEyQixHQUFpQyxFQUFFLENBQUE7QUFDN0QsSUFBTSxvQkFBb0IsR0FBRyxVQUFDLGdCQUF3QjtJQUN6RCxRQUFRLGdCQUFnQixFQUFFO1FBQ3RCLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxTQUFTO1lBQ1YsT0FBTyxtQkFBVSxDQUFDLElBQUksQ0FBQTtLQUM3QjtBQUNMLENBQUMsQ0FBQTtBQU5ZLFFBQUEsb0JBQW9CLHdCQU1oQztBQUVNLElBQU0sd0JBQXdCLEdBQUcsVUFDcEMsVUFBd0M7SUFBeEMsMkJBQUEsRUFBQSxhQUF5QixtQkFBVSxDQUFDLElBQUk7SUFFeEMsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBRTNDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUM3QyxJQUFJLE1BQU0sU0FBQSxDQUFBO1FBQ1YsUUFBUSxVQUFVLEVBQUU7WUFDaEIsS0FBSyxtQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixNQUFNLEdBQUcsSUFBSSxvQkFBVSxFQUFFLENBQUE7Z0JBQ3pCLE1BQUs7YUFDUjtZQUNEO2dCQUNJLE1BQU0sSUFBSSwrQ0FBc0MsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1NBQzdFO1FBQ0QsMkJBQTJCLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFBO0tBQ3REO0lBQ0QsT0FBTywyQkFBMkIsQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNyRCxDQUFDLENBQUE7QUFsQlksUUFBQSx3QkFBd0IsNEJBa0JwQztBQUVNLElBQU0sMkJBQTJCLEdBQUcsVUFDdkMsaUJBQW9DO0lBRXBDLElBQUk7UUFDQSxJQUFJLE1BQU0sU0FBUSxDQUFBO1FBQ2xCLFFBQVEsaUJBQWlCLENBQUMsSUFBSSxFQUFFO1lBQzVCLEtBQUssbUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbEIsTUFBTSxHQUFJLElBQUEsZ0NBQXdCLEVBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFnQixDQUFDLGFBQWEsQ0FDbkYsaUJBQWlCLENBQ3BCLENBQUE7Z0JBQ0QsTUFBSzthQUNSO1lBRUQ7Z0JBQ0ksTUFBTSxJQUFJLCtDQUFzQyxDQUFDLG9CQUFvQixDQUFDLENBQUE7U0FDN0U7UUFFRCxPQUFPLE1BQU0sQ0FBQTtLQUNoQjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsTUFBTSxJQUFJLCtDQUFzQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUNoRTtBQUNMLENBQUMsQ0FBQTtBQXRCWSxRQUFBLDJCQUEyQiwrQkFzQnZDIn0=
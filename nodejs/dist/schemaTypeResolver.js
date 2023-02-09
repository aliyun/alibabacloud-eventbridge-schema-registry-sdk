"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaFromEventbridgeSchema = exports.helperTypeFromSchemaType = exports.schemaTypeFromString = void 0;
const _types_1 = require("./@types");
const errors_1 = require("./errors");
const AvroHelper_1 = __importDefault(require("./AvroHelper"));
const helperTypeFromSchemaTypeMap = {};
const schemaTypeFromString = (schemaTypeString) => {
    switch (schemaTypeString) {
        case 'AVRO':
        case undefined:
            return _types_1.SchemaType.AVRO;
    }
};
exports.schemaTypeFromString = schemaTypeFromString;
const helperTypeFromSchemaType = (schemaType = _types_1.SchemaType.AVRO) => {
    const schemaTypeStr = schemaType.toString();
    if (!helperTypeFromSchemaTypeMap[schemaTypeStr]) {
        let helper;
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
const schemaFromEventbridgeSchema = (eventbridgeSchema) => {
    try {
        let schema;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hVHlwZVJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjaGVtYVR5cGVSZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxxQ0FNaUI7QUFFakIscUNBQWtFO0FBQ2xFLDhEQUFzQztBQUN0QyxNQUFNLDJCQUEyQixHQUFpQyxFQUFFLENBQUE7QUFDN0QsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLGdCQUF3QixFQUFFLEVBQUU7SUFDN0QsUUFBUSxnQkFBZ0IsRUFBRTtRQUN0QixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssU0FBUztZQUNWLE9BQU8sbUJBQVUsQ0FBQyxJQUFJLENBQUE7S0FDN0I7QUFDTCxDQUFDLENBQUE7QUFOWSxRQUFBLG9CQUFvQix3QkFNaEM7QUFFTSxNQUFNLHdCQUF3QixHQUFHLENBQ3BDLGFBQXlCLG1CQUFVLENBQUMsSUFBSSxFQUM1QixFQUFFO0lBQ2QsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBRTNDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUM3QyxJQUFJLE1BQU0sQ0FBQTtRQUNWLFFBQVEsVUFBVSxFQUFFO1lBQ2hCLEtBQUssbUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxHQUFHLElBQUksb0JBQVUsRUFBRSxDQUFBO2dCQUN6QixNQUFLO2FBQ1I7WUFDRDtnQkFDSSxNQUFNLElBQUksK0NBQXNDLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtTQUM3RTtRQUNELDJCQUEyQixDQUFDLGFBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtLQUN0RDtJQUNELE9BQU8sMkJBQTJCLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDckQsQ0FBQyxDQUFBO0FBbEJZLFFBQUEsd0JBQXdCLDRCQWtCcEM7QUFFTSxNQUFNLDJCQUEyQixHQUFHLENBQ3ZDLGlCQUFvQyxFQUNqQixFQUFFO0lBQ3JCLElBQUk7UUFDQSxJQUFJLE1BQWMsQ0FBQTtRQUNsQixRQUFRLGlCQUFpQixDQUFDLElBQUksRUFBRTtZQUM1QixLQUFLLG1CQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWxCLE1BQU0sR0FBSSxJQUFBLGdDQUF3QixFQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBZ0IsQ0FBQyxhQUFhLENBQ25GLGlCQUFpQixDQUNwQixDQUFBO2dCQUNELE1BQUs7YUFDUjtZQUVEO2dCQUNJLE1BQU0sSUFBSSwrQ0FBc0MsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1NBQzdFO1FBRUQsT0FBTyxNQUFNLENBQUE7S0FDaEI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE1BQU0sSUFBSSwrQ0FBc0MsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDaEU7QUFDTCxDQUFDLENBQUE7QUF0QlksUUFBQSwyQkFBMkIsK0JBc0J2QyJ9
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const avsc_1 = __importDefault(require("avsc"));
const _types_1 = require("./@types");
class AvroHelper {
    getRawAvroSchema(schema) {
        return (typeof schema.schema === 'string'
            ? JSON.parse(schema.schema)
            : schema.schema);
    }
    getAvroSchema(schema, opts) {
        const rawSchema = this.isRawAvroSchema(schema)
            ? schema
            : this.getRawAvroSchema(schema);
        // @ts-ignore TODO: Fix typings for Schema...
        const addReferencedSchemas = (userHook) => (schema, opts) => {
            var _a;
            const avroOpts = opts;
            (_a = avroOpts === null || avroOpts === void 0 ? void 0 : avroOpts.referencedSchemas) === null || _a === void 0 ? void 0 : _a.forEach(subSchema => {
                const rawSubSchema = this.getRawAvroSchema(subSchema);
                avroOpts.typeHook = userHook;
                avsc_1.default.Type.forSchema(rawSubSchema, avroOpts);
            });
            if (userHook) {
                return userHook(schema, opts);
            }
        };
        const avroSchema = avsc_1.default.Type.forSchema(rawSchema, {
            ...opts,
            typeHook: addReferencedSchemas(opts === null || opts === void 0 ? void 0 : opts.typeHook),
        });
        return avroSchema;
    }
    validate(avroSchema) {
        if (!avroSchema.name) {
            throw new errors_1.EventbridgeSchemaRegistryArgumentError(`Invalid name: ${avroSchema.name}`);
        }
    }
    getSubject(schema, 
    // @ts-ignore
    avroSchema, separator) {
        const rawSchema = this.getRawAvroSchema(schema);
        if (!rawSchema.namespace) {
            throw new errors_1.EventbridgeSchemaRegistryArgumentError(`Invalid namespace: ${rawSchema.namespace}`);
        }
        const subject = {
            name: [rawSchema.namespace, rawSchema.name].join(separator),
        };
        return subject;
    }
    isRawAvroSchema(schema) {
        const asRawAvroSchema = schema;
        return asRawAvroSchema.name != null && asRawAvroSchema.type != null;
    }
    toEventbridgeSchema(data) {
        return { type: _types_1.SchemaType.AVRO, schema: data.Content.replace(/\&quot\;/g, '\"'), references: data.References };
    }
    updateOptionsFromSchemaReferences(referencedSchemas, options = {}) {
        return { ...options, [_types_1.SchemaType.AVRO]: { ...options[_types_1.SchemaType.AVRO], referencedSchemas } };
    }
}
exports.default = AvroHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZyb0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BdnJvSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBVUEscUNBQWlFO0FBQ2pFLGdEQUEyRDtBQUMzRCxxQ0FBcUQ7QUFHckQsTUFBcUIsVUFBVTtJQUNyQixnQkFBZ0IsQ0FBQyxNQUF5QjtRQUNoRCxPQUFPLENBQUMsT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFFBQVE7WUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUMzQixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBa0IsQ0FBQTtJQUNyQyxDQUFDO0lBRU0sYUFBYSxDQUFDLE1BQXlDLEVBQUUsSUFBa0I7UUFDaEYsTUFBTSxTQUFTLEdBQWtCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1lBQzNELENBQUMsQ0FBQyxNQUFNO1lBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNqQyw2Q0FBNkM7UUFDN0MsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLFFBQW1CLEVBQVksRUFBRSxDQUFDLENBQzlELE1BQW1CLEVBQ25CLElBQXNCLEVBQ3RCLEVBQUU7O1lBQ0YsTUFBTSxRQUFRLEdBQUcsSUFBbUIsQ0FBQTtZQUNwQyxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxpQkFBaUIsMENBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMvQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3JELFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO2dCQUM1QixjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFDN0MsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLFFBQVEsRUFBRTtnQkFDWixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7YUFDOUI7UUFDSCxDQUFDLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDaEQsR0FBRyxJQUFJO1lBQ1AsUUFBUSxFQUFFLG9CQUFvQixDQUFDLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLENBQUM7U0FDL0MsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxVQUFVLENBQUE7SUFDbkIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxVQUFzQjtRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtZQUNwQixNQUFNLElBQUksK0NBQXNDLENBQUMsaUJBQWlCLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1NBQ3JGO0lBQ0gsQ0FBQztJQUNNLFVBQVUsQ0FDZixNQUE2QjtJQUM3QixhQUFhO0lBQ2IsVUFBc0IsRUFDdEIsU0FBaUI7UUFFakIsTUFBTSxTQUFTLEdBQWtCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUU5RCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUN4QixNQUFNLElBQUksK0NBQXNDLENBQUMsc0JBQXNCLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO1NBQzlGO1FBRUQsTUFBTSxPQUFPLEdBQXVCO1lBQ2xDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDNUQsQ0FBQTtRQUNELE9BQU8sT0FBTyxDQUFBO0lBQ2hCLENBQUM7SUFFTyxlQUFlLENBQUMsTUFBeUM7UUFDL0QsTUFBTSxlQUFlLEdBQUcsTUFBdUIsQ0FBQTtRQUMvQyxPQUFPLGVBQWUsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLGVBQWUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFBO0lBQ3JFLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxJQUFvQjtRQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLG1CQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNoSCxDQUFDO0lBRUQsaUNBQWlDLENBQy9CLGlCQUEwQyxFQUMxQyxVQUEyQixFQUFFO1FBRTdCLE9BQU8sRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLG1CQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxtQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLGlCQUFpQixFQUFFLEVBQUUsQ0FBQTtJQUM5RixDQUFDO0NBQ0Y7QUF2RUQsNkJBdUVDIn0=
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var avsc_1 = __importDefault(require("avsc"));
var _types_1 = require("./@types");
var AvroHelper = /** @class */ (function () {
    function AvroHelper() {
    }
    AvroHelper.prototype.getRawAvroSchema = function (schema) {
        return (typeof schema.schema === 'string'
            ? JSON.parse(schema.schema)
            : schema.schema);
    };
    AvroHelper.prototype.getAvroSchema = function (schema, opts) {
        var _this = this;
        var rawSchema = this.isRawAvroSchema(schema)
            ? schema
            : this.getRawAvroSchema(schema);
        // @ts-ignore TODO: Fix typings for Schema...
        var addReferencedSchemas = function (userHook) { return function (schema, opts) {
            var _a;
            var avroOpts = opts;
            (_a = avroOpts === null || avroOpts === void 0 ? void 0 : avroOpts.referencedSchemas) === null || _a === void 0 ? void 0 : _a.forEach(function (subSchema) {
                var rawSubSchema = _this.getRawAvroSchema(subSchema);
                avroOpts.typeHook = userHook;
                avsc_1.default.Type.forSchema(rawSubSchema, avroOpts);
            });
            if (userHook) {
                return userHook(schema, opts);
            }
        }; };
        var avroSchema = avsc_1.default.Type.forSchema(rawSchema, __assign(__assign({}, opts), { typeHook: addReferencedSchemas(opts === null || opts === void 0 ? void 0 : opts.typeHook) }));
        return avroSchema;
    };
    AvroHelper.prototype.validate = function (avroSchema) {
        if (!avroSchema.name) {
            throw new errors_1.EventbridgeSchemaRegistryArgumentError("Invalid name: ".concat(avroSchema.name));
        }
    };
    AvroHelper.prototype.getSubject = function (schema, 
    // @ts-ignore
    avroSchema, separator) {
        var rawSchema = this.getRawAvroSchema(schema);
        if (!rawSchema.namespace) {
            throw new errors_1.EventbridgeSchemaRegistryArgumentError("Invalid namespace: ".concat(rawSchema.namespace));
        }
        var subject = {
            name: [rawSchema.namespace, rawSchema.name].join(separator),
        };
        return subject;
    };
    AvroHelper.prototype.isRawAvroSchema = function (schema) {
        var asRawAvroSchema = schema;
        return asRawAvroSchema.name != null && asRawAvroSchema.type != null;
    };
    AvroHelper.prototype.toEventbridgeSchema = function (data) {
        return { type: _types_1.SchemaType.AVRO, schema: data.Content.replace(/\&quot\;/g, '\"'), references: data.References };
    };
    AvroHelper.prototype.updateOptionsFromSchemaReferences = function (referencedSchemas, options) {
        var _a;
        if (options === void 0) { options = {}; }
        return __assign(__assign({}, options), (_a = {}, _a[_types_1.SchemaType.AVRO] = __assign(__assign({}, options[_types_1.SchemaType.AVRO]), { referencedSchemas: referencedSchemas }), _a));
    };
    return AvroHelper;
}());
exports.default = AvroHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZyb0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BdnJvSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVQSxtQ0FBaUU7QUFDakUsOENBQTJEO0FBQzNELG1DQUFxRDtBQUdyRDtJQUFBO0lBdUVBLENBQUM7SUF0RVMscUNBQWdCLEdBQXhCLFVBQXlCLE1BQXlCO1FBQ2hELE9BQU8sQ0FBQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssUUFBUTtZQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFrQixDQUFBO0lBQ3JDLENBQUM7SUFFTSxrQ0FBYSxHQUFwQixVQUFxQixNQUF5QyxFQUFFLElBQWtCO1FBQWxGLGlCQXdCQztRQXZCQyxJQUFNLFNBQVMsR0FBa0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7WUFDM0QsQ0FBQyxDQUFDLE1BQU07WUFDUixDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2pDLDZDQUE2QztRQUM3QyxJQUFNLG9CQUFvQixHQUFHLFVBQUMsUUFBbUIsSUFBZSxPQUFBLFVBQzlELE1BQW1CLEVBQ25CLElBQXNCOztZQUV0QixJQUFNLFFBQVEsR0FBRyxJQUFtQixDQUFBO1lBQ3BDLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGlCQUFpQiwwQ0FBRSxPQUFPLENBQUMsVUFBQSxTQUFTO2dCQUM1QyxJQUFNLFlBQVksR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3JELFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO2dCQUM1QixjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFDN0MsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLFFBQVEsRUFBRTtnQkFDWixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7YUFDOUI7UUFDSCxDQUFDLEVBYitELENBYS9ELENBQUE7UUFDRCxJQUFNLFVBQVUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLHdCQUMzQyxJQUFJLEtBQ1AsUUFBUSxFQUFFLG9CQUFvQixDQUFDLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLENBQUMsSUFDOUMsQ0FBQTtRQUNGLE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7SUFFTSw2QkFBUSxHQUFmLFVBQWdCLFVBQXNCO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSwrQ0FBc0MsQ0FBQyx3QkFBaUIsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUE7U0FDckY7SUFDSCxDQUFDO0lBQ00sK0JBQVUsR0FBakIsVUFDRSxNQUE2QjtJQUM3QixhQUFhO0lBQ2IsVUFBc0IsRUFDdEIsU0FBaUI7UUFFakIsSUFBTSxTQUFTLEdBQWtCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUU5RCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUN4QixNQUFNLElBQUksK0NBQXNDLENBQUMsNkJBQXNCLFNBQVMsQ0FBQyxTQUFTLENBQUUsQ0FBQyxDQUFBO1NBQzlGO1FBRUQsSUFBTSxPQUFPLEdBQXVCO1lBQ2xDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDNUQsQ0FBQTtRQUNELE9BQU8sT0FBTyxDQUFBO0lBQ2hCLENBQUM7SUFFTyxvQ0FBZSxHQUF2QixVQUF3QixNQUF5QztRQUMvRCxJQUFNLGVBQWUsR0FBRyxNQUF1QixDQUFBO1FBQy9DLE9BQU8sZUFBZSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksZUFBZSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUE7SUFDckUsQ0FBQztJQUVNLHdDQUFtQixHQUExQixVQUEyQixJQUFvQjtRQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLG1CQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNoSCxDQUFDO0lBRUQsc0RBQWlDLEdBQWpDLFVBQ0UsaUJBQTBDLEVBQzFDLE9BQTZCOztRQUE3Qix3QkFBQSxFQUFBLFlBQTZCO1FBRTdCLDZCQUFZLE9BQU8sZ0JBQUcsbUJBQVUsQ0FBQyxJQUFJLDBCQUFRLE9BQU8sQ0FBQyxtQkFBVSxDQUFDLElBQUksQ0FBQyxLQUFFLGlCQUFpQixtQkFBQSxVQUFJO0lBQzlGLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUF2RUQsSUF1RUMifQ==
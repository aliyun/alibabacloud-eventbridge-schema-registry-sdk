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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var confluent_schema_registry_1 = require("@kafkajs/confluent-schema-registry");
var errors_1 = require("./errors");
var constants_1 = require("./constants");
var wireEncoder_1 = require("./common/wireEncoder");
var wireDecoder_1 = __importDefault(require("./common/wireDecoder"));
var index_pop_1 = __importDefault(require("./api/index.pop"));
var _types_1 = require("./@types");
// import { ClientOptions } from './@types-ebschema';
var schemaTypeResolver_1 = require("./schemaTypeResolver");
var cache_1 = __importDefault(require("./cache"));
var DEFAULT_OPTS = {
    compatibility: constants_1.COMPATIBILITY.BACKWARD,
    separator: constants_1.DEFAULT_SEPERATOR,
};
var SchemaRegistry = /** @class */ (function () {
    function SchemaRegistry(params, options) {
        this.cacheMissRequests = {};
        var host = params.host, groupId = params.groupId, accessKeyId = params.accessKeyId, accessKeySecret = params.accessKeySecret;
        this.groupId = groupId;
        this.api = new index_pop_1.default({ accessKeySecret: accessKeySecret, accessKeyId: accessKeyId });
        this.cache = new cache_1.default();
        if (host) {
            this.confluentSRInstance = new confluent_schema_registry_1.SchemaRegistry({ host: host }, options);
        }
    }
    SchemaRegistry.prototype.checkAndCreateSchemaGroup = function (groupId, schemaType) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.api.getSchemaGroup(groupId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this.api.createSchemaGroup({
                                groupId: this.groupId,
                                schemaFormat: schemaType
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, groupId];
                }
            });
        });
    };
    SchemaRegistry.prototype.getSchemaOriginRequest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.cacheMissRequests[id]) {
                            return [2 /*return*/, this.cacheMissRequests[id]];
                        }
                        return [4 /*yield*/, this.api.getSchemaVersionByUUID(id)];
                    case 1:
                        result = _a.sent();
                        this.cacheMissRequests[id] = result;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SchemaRegistry.prototype._getSchema = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheEntry, foundSchema, schemaType, help, ebSchema, schemaInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheEntry = this.cache.getSchema(id);
                        if (cacheEntry) {
                            return [2 /*return*/, cacheEntry];
                        }
                        return [4 /*yield*/, this.getSchemaOriginRequest(id)];
                    case 1:
                        foundSchema = _a.sent();
                        schemaType = (0, schemaTypeResolver_1.schemaTypeFromString)(foundSchema.Format);
                        help = (0, schemaTypeResolver_1.helperTypeFromSchemaType)(schemaType);
                        ebSchema = help.toEventbridgeSchema(foundSchema);
                        schemaInstance = (0, schemaTypeResolver_1.schemaFromEventbridgeSchema)(ebSchema);
                        return [2 /*return*/, this.cache.setSchema(id, schemaType, schemaInstance)];
                }
            });
        });
    };
    SchemaRegistry.prototype.encode = function (uuid, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, serializedPayload, paths;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!uuid) {
                            throw new errors_1.EventbridgeSchemaRegistryArgumentError("Invalid uuid: ".concat(JSON.stringify(uuid)));
                        }
                        return [4 /*yield*/, this._getSchema(uuid)];
                    case 1:
                        schema = (_a.sent()).schema;
                        try {
                            serializedPayload = schema.toBuffer(payload);
                            return [2 /*return*/, (0, wireEncoder_1.encode)(uuid, serializedPayload)];
                        }
                        catch (error) {
                            if (error instanceof errors_1.EventbridgeSchemaRegistryValidationError)
                                throw error;
                            paths = this.collectInvalidPaths(schema, payload);
                            throw new errors_1.EventbridgeSchemaRegistryValidationError(error, paths);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SchemaRegistry.prototype.isEventbridgeSchema = function (schema) {
        return schema.schema != null;
    };
    SchemaRegistry.prototype.getEventbridgeSchema = function (schema) {
        var eventbridgeSchema;
        // convert data from old api (for backwards compatibility)
        if (!this.isEventbridgeSchema(schema)) {
            // schema is instanceof RawAvroSchema or AvroSchema
            eventbridgeSchema = {
                type: _types_1.SchemaType.AVRO,
                schema: JSON.stringify(schema),
            };
        }
        else {
            eventbridgeSchema = schema;
        }
        return eventbridgeSchema;
    };
    SchemaRegistry.prototype.collectInvalidPaths = function (schema, jsonPayload) {
        var paths = [];
        schema.isValid(jsonPayload, {
            errorHook: function (path) { return paths.push(path); },
        });
        return paths;
    };
    SchemaRegistry.prototype.decode = function (buffer, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, magicByte, uuid, payload, _c, type, writerSchema, rawReaderSchema, readerSchema;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!Buffer.isBuffer(buffer)) {
                            throw new errors_1.EventbridgeSchemaRegistryArgumentError('Invalid buffer');
                        }
                        _b = (0, wireDecoder_1.default)(buffer), magicByte = _b.magicByte, uuid = _b.uuid, payload = _b.payload;
                        if (Buffer.compare(wireEncoder_1.CONFLUENT_MAGIC_BYTE, magicByte) === 0 && this.confluentSRInstance) {
                            return [2 /*return*/, this.confluentSRInstance.decode(buffer, options)];
                        }
                        else if (Buffer.compare(wireEncoder_1.ALICLOUD_MAGIC_BYTE, magicByte) !== 0) {
                            throw new errors_1.EventbridgeSchemaRegistryArgumentError("Message encoded with magic byte ".concat(JSON.stringify(magicByte), ", expected ").concat(JSON.stringify(wireEncoder_1.ALICLOUD_MAGIC_BYTE)));
                        }
                        return [4 /*yield*/, this._getSchema(uuid)];
                    case 1:
                        _c = _d.sent(), type = _c.type, writerSchema = _c.schema;
                        switch (type) {
                            case _types_1.SchemaType.AVRO:
                                rawReaderSchema = (_a = options === null || options === void 0 ? void 0 : options[_types_1.SchemaType.AVRO]) === null || _a === void 0 ? void 0 : _a.readerSchema;
                        }
                        if (rawReaderSchema) {
                            readerSchema = (0, schemaTypeResolver_1.schemaFromEventbridgeSchema)({ type: _types_1.SchemaType.AVRO, schema: rawReaderSchema });
                            if (readerSchema.equals(writerSchema)) {
                                /* Even when schemas are considered equal by `avsc`,
                                 * they still aren't interchangeable:
                                 * provided `readerSchema` may have different `opts` (e.g. logicalTypes / unionWrap flags)
                                 * see https://github.com/mtth/avsc/issues/362 */
                                return [2 /*return*/, readerSchema.fromBuffer(payload)];
                            }
                            else {
                                // decode using a resolver from writer type into reader type
                                return [2 /*return*/, readerSchema.fromBuffer(payload, readerSchema.createResolver(writerSchema))];
                            }
                        }
                        return [2 /*return*/, writerSchema.fromBuffer(payload)];
                }
            });
        });
    };
    SchemaRegistry.prototype.register = function (schema, userOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var separator, eventbridgeSchema, originalSchema, helper, schemaInstance, isFirstTimeRegistration, subject, schemaId, schemaType, groupId, response, e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        separator = __assign(__assign({}, DEFAULT_OPTS), userOpts).separator;
                        eventbridgeSchema = this.getEventbridgeSchema(schema);
                        originalSchema = eventbridgeSchema.schema;
                        helper = (0, schemaTypeResolver_1.helperTypeFromSchemaType)(eventbridgeSchema.type);
                        schemaInstance = (0, schemaTypeResolver_1.schemaFromEventbridgeSchema)(eventbridgeSchema);
                        helper.validate(schemaInstance);
                        isFirstTimeRegistration = false;
                        if (userOpts === null || userOpts === void 0 ? void 0 : userOpts.subject) {
                            subject = {
                                name: userOpts.subject,
                            };
                        }
                        else {
                            subject = helper.getSubject(eventbridgeSchema, schemaInstance, separator);
                        }
                        schemaId = subject.name;
                        schemaType = schema.type;
                        return [4 /*yield*/, this.checkAndCreateSchemaGroup(this.groupId, schemaType)];
                    case 1:
                        groupId = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.api.getSchema({
                                groupId: groupId,
                                schemaId: schemaId
                            })];
                    case 3:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        isFirstTimeRegistration = true;
                        return [3 /*break*/, 5];
                    case 5:
                        if (!isFirstTimeRegistration) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.api.createSchema({ groupId: groupId, schemaId: schemaId, content: originalSchema })];
                    case 6:
                        response = _a.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this.api.createSchemaVersion({ groupId: groupId, schemaId: schemaId, content: originalSchema })];
                    case 8:
                        response = _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        e_3 = _a.sent();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, {
                            id: response.UUID
                        }];
                }
            });
        });
    };
    SchemaRegistry.prototype.getSchema = function (registryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getSchema(registryId)];
                    case 1: return [4 /*yield*/, (_a.sent()).schema];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SchemaRegistry.prototype.getRegistryId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    SchemaRegistry.prototype.getRegistryIdBySchema = function (subject, schema) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, schemaId, eventbridgeSchema, originalSchema, helper, schemaInstance, response, isFirstTimeRegistration, e_4, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupId = this.groupId;
                        schemaId = subject;
                        eventbridgeSchema = this.getEventbridgeSchema(schema);
                        originalSchema = eventbridgeSchema.schema;
                        helper = (0, schemaTypeResolver_1.helperTypeFromSchemaType)(eventbridgeSchema.type);
                        schemaInstance = (0, schemaTypeResolver_1.schemaFromEventbridgeSchema)(eventbridgeSchema);
                        helper.validate(schemaInstance);
                        isFirstTimeRegistration = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.api.getSchema({
                                groupId: groupId,
                                schemaId: schemaId
                            })];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        isFirstTimeRegistration = true;
                        return [3 /*break*/, 4];
                    case 4:
                        if (!isFirstTimeRegistration) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.api.createSchema({ groupId: groupId, schemaId: schemaId, content: originalSchema })];
                    case 5:
                        response = _a.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.api.createSchemaVersion({ groupId: groupId, schemaId: schemaId, content: originalSchema })];
                    case 7:
                        response = _a.sent();
                        console.log(response, 'response');
                        return [3 /*break*/, 9];
                    case 8:
                        e_5 = _a.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, {
                            id: response.UUID
                        }];
                }
            });
        });
    };
    /**
     * 根据schemaId获取 uuid
     * @param subject  schemaId
     * @returns
     */
    SchemaRegistry.prototype.getLatestSchemaId = function (subject) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupId = this.groupId;
                        return [4 /*yield*/, this.api.getSchema({
                                groupId: groupId,
                                schemaId: subject
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.UUID];
                }
            });
        });
    };
    return SchemaRegistry;
}());
exports.default = SchemaRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hUmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU2NoZW1hUmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGdGQUErRjtBQUUvRixtQ0FHa0I7QUFDbEIseUNBQThEO0FBQzlELG9EQUF5RjtBQUN6RixxRUFBMEM7QUFDMUMsOERBQWtDO0FBQ2xDLG1DQUEySjtBQUMzSixxREFBcUQ7QUFDckQsMkRBQW1IO0FBQ25ILGtEQUE0QjtBQWE1QixJQUFNLFlBQVksR0FBRztJQUNqQixhQUFhLEVBQUUseUJBQWEsQ0FBQyxRQUFRO0lBQ3JDLFNBQVMsRUFBRSw2QkFBaUI7Q0FDL0IsQ0FBQTtBQUNEO0lBTUksd0JBQVksTUFBaUMsRUFBRSxPQUFhO1FBRHBELHNCQUFpQixHQUEyQixFQUFFLENBQUE7UUFFMUMsSUFBQSxJQUFJLEdBQTRDLE1BQU0sS0FBbEQsRUFBRSxPQUFPLEdBQW1DLE1BQU0sUUFBekMsRUFBRSxXQUFXLEdBQXNCLE1BQU0sWUFBNUIsRUFBRSxlQUFlLEdBQUssTUFBTSxnQkFBWCxDQUFZO1FBQy9ELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxtQkFBRyxDQUFDLEVBQUUsZUFBZSxpQkFBQSxFQUFFLFdBQVcsYUFBQSxFQUFFLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSwwQ0FBdUIsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDN0U7SUFDTCxDQUFDO0lBRWEsa0RBQXlCLEdBQXZDLFVBQXdDLE9BQWUsRUFBRSxVQUFzQjs7Ozs7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
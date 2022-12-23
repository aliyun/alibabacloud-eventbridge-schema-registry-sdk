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
var errors_1 = require("./errors");
var constants_1 = require("./constants");
var wireEncoder_1 = require("./common/wireEncoder");
var wireDecoder_1 = __importDefault(require("./common/wireDecoder"));
var index_pop_1 = __importDefault(require("./api/index.pop"));
var _types_1 = require("./@types");
var schemaTypeResolver_1 = require("./schemaTypeResolver");
var cache_1 = __importDefault(require("./cache"));
var DEFAULT_OPTS = {
    compatibility: constants_1.COMPATIBILITY.BACKWARD,
    separator: constants_1.DEFAULT_SEPERATOR,
};
var SchemaRegistry = /** @class */ (function () {
    function SchemaRegistry(_a, options) {
        var accessKeyId = _a.accessKeyId, accessKeySecret = _a.accessKeySecret, groupId = _a.groupId;
        this.cacheMissRequests = {};
        this.groupId = groupId;
        this.api = new index_pop_1.default({ accessKeySecret: accessKeySecret, accessKeyId: accessKeyId });
        this.cache = new cache_1.default();
    }
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
                        if (Buffer.compare(wireEncoder_1.MAGIC_BYTE, magicByte) !== 0) {
                            throw new errors_1.EventbridgeSchemaRegistryArgumentError("Message encoded with magic byte ".concat(JSON.stringify(magicByte), ", expected ").concat(JSON.stringify(wireEncoder_1.MAGIC_BYTE)));
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
            var separator, eventbridgeSchema, originalSchema, helper, schemaInstance, isFirstTimeRegistration, subject, schemaId, groupId, response, e_1, e_2;
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
                        groupId = this.groupId;
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
                        e_1 = _a.sent();
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
                        e_2 = _a.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, {
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
            var groupId, schemaId, eventbridgeSchema, originalSchema, helper, schemaInstance, response, isFirstTimeRegistration, e_3, e_4;
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
                        e_3 = _a.sent();
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
                        e_4 = _a.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hUmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU2NoZW1hUmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG1DQUdrQjtBQUNsQix5Q0FBOEQ7QUFDOUQsb0RBQTBEO0FBQzFELHFFQUEwQztBQUMxQyw4REFBa0M7QUFDbEMsbUNBQWdJO0FBRWhJLDJEQUFtSDtBQUNuSCxrREFBNEI7QUFhNUIsSUFBTSxZQUFZLEdBQUc7SUFDakIsYUFBYSxFQUFFLHlCQUFhLENBQUMsUUFBUTtJQUNyQyxTQUFTLEVBQUUsNkJBQWlCO0NBQy9CLENBQUE7QUFDRDtJQUtJLHdCQUFZLEVBQXlDLEVBQUUsT0FBdUI7WUFBaEUsV0FBVyxpQkFBQSxFQUFFLGVBQWUscUJBQUEsRUFBRSxPQUFPLGFBQUE7UUFEM0Msc0JBQWlCLEdBQTJCLEVBQUUsQ0FBQTtRQUVsRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksbUJBQUcsQ0FBQyxFQUFFLGVBQWUsaUJBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFHYSwrQ0FBc0IsR0FBcEMsVUFBcUMsRUFBVTs7Ozs7O3dCQUUzQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBRTs0QkFDNUIsc0JBQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFDO3lCQUNyQzt3QkFFUSxxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxFQUFBOzt3QkFBbEQsTUFBTSxHQUFHLFNBQXlDLENBQUM7d0JBQ25ELElBQUksQ0FBQyxp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
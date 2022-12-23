"use strict";
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
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var errors_1 = require("../errors");
var DEFAULT_LIMIT_SIZE = 100;
var Api = /** @class */ (function () {
    function Api(config) {
        this.client = this.createClient(config);
    }
    Api.prototype.createClient = function (data) {
        if (!this.client) {
            var accessKeyId = data.accessKeyId, accessKeySecret = data.accessKeySecret;
            this.client = new pop_core_1.default({
                accessKeyId: accessKeyId,
                accessKeySecret: accessKeySecret,
                endpoint: 'https://eventbridge-console-share.cn-hangzhou.aliyuncs.com/',
                apiVersion: '2020-05-01'
            });
        }
        return this.client;
    };
    Api.prototype.invokeApi = function (action, method, params) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOption, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requestOption = {
                            method: method,
                            timeout: 20000
                        };
                        return [4 /*yield*/, this.client.request(action, params, requestOption)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        throw new errors_1.EventbridgeApiResponseError(e_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.getResponseData = function (response) {
        if (!response) {
            throw new errors_1.EventbridgeApiResponseError("system error");
        }
        if (response.Success) {
            return response.Data;
        }
        else {
            throw new errors_1.EventbridgeApiResponseError("unknow error, the requestId is ".concat(response.RequestId));
        }
    };
    Api.prototype.createSchemaGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.getSchemaGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.updateSchemaGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.listSchemaGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('ListSchemaGroups', "GET" /* RequestMethod.GET */, { limit: DEFAULT_LIMIT_SIZE })];
                    case 1:
                        response = _a.sent();
                        _data = this.getResponseData(response);
                        return [2 /*return*/, _data];
                }
            });
        });
    };
    Api.prototype.deleteSchemaGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.createSchema = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('CreateSchema', "POST" /* RequestMethod.POST */, payload)];
                    case 1:
                        response = _a.sent();
                        _data = this.getResponseData(response);
                        return [2 /*return*/, _data];
                }
            });
        });
    };
    Api.prototype.getSchema = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('GetSchema', "POST" /* RequestMethod.POST */, payload)];
                    case 1:
                        response = _a.sent();
                        _data = this.getResponseData(response);
                        return [2 /*return*/, _data];
                }
            });
        });
    };
    Api.prototype.updateSchema = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('UpdateSchema', "PUT" /* RequestMethod.PUT */, payload)];
                    case 1:
                        response = _a.sent();
                        _data = this.getResponseData(response);
                        return [2 /*return*/, _data];
                }
            });
        });
    };
    Api.prototype.listSchemas = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('ListSchemas', "GET" /* RequestMethod.GET */, { groupId: groupId, limit: DEFAULT_LIMIT_SIZE })];
                    case 1:
                        response = _a.sent();
                        _data = this.getResponseData(response);
                        return [2 /*return*/, _data];
                }
            });
        });
    };
    Api.prototype.deleteSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.getSchemaVersionByUUID = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('GetSchemaVersionByUUID', "POST" /* RequestMethod.POST */, { UUID: uuid })];
                    case 1:
                        response = _a.sent();
                        _data = this.getResponseData(response);
                        return [2 /*return*/, _data];
                }
            });
        });
    };
    Api.prototype.createSchemaVersion = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('CreateSchemaVersion', "POST" /* RequestMethod.POST */, payload)];
                    case 1:
                        response = _a.sent();
                        _data = this.getResponseData(response);
                        return [2 /*return*/, _data];
                }
            });
        });
    };
    Api.prototype.deleteSchemaVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.getSchemaVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.listSchemaVersions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.getACSEventsSchemaGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.listACSEventsSchemas = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.listACSEventsSchemaVersions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Api.prototype.getACSEventsSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return Api;
}());
exports.default = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgucG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS9pbmRleC5wb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBc0M7QUFFdEMsb0NBQXdEO0FBQ3hELElBQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO0FBQy9CO0lBRUksYUFBWSxNQUFvQjtRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUdPLDBCQUFZLEdBQXBCLFVBQXFCLElBQWtCO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ04sSUFBQSxXQUFXLEdBQXNCLElBQUksWUFBMUIsRUFBRSxlQUFlLEdBQUssSUFBSSxnQkFBVCxDQUFVO1lBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQkFBSSxDQUFDO2dCQUNuQixXQUFXLGFBQUE7Z0JBQ1gsZUFBZSxpQkFBQTtnQkFDZixRQUFRLEVBQUUsNkRBQTZEO2dCQUN2RSxVQUFVLEVBQUUsWUFBWTthQUMzQixDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRWEsdUJBQVMsR0FBdkIsVUFBd0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNOzs7Ozs7O3dCQUVoQyxhQUFhLEdBQUc7NEJBQ2xCLE1BQU0sRUFBRSxNQUFNOzRCQUNkLE9BQU8sRUFBRSxLQUFLO3lCQUNqQixDQUFDO3dCQUNLLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLEVBQUE7NEJBQS9ELHNCQUFPLFNBQXdELEVBQUM7Ozt3QkFFaEUsTUFBTSxJQUFJLG9DQUEyQixDQUFDLEdBQUMsQ0FBQyxPQUFPLENBQUMsQ0FB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
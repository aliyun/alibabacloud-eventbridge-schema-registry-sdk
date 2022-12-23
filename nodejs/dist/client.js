"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Config = void 0;
var tea_util_1 = __importDefault(require("@alicloud/tea-util"));
var eventbridge_util_1 = __importDefault(require("@alicloud/eventbridge-util"));
var credentials_1 = __importStar(require("@alicloud/credentials")), $Credential = credentials_1;
var $tea = __importStar(require("@alicloud/tea-typescript"));
/**
 * Model for initing client
 */
var Config = /** @class */ (function (_super) {
    __extends(Config, _super);
    function Config(map) {
        return _super.call(this, map) || this;
    }
    Config.names = function () {
        return {
            accessKeyId: 'accessKeyId',
            accessKeySecret: 'accessKeySecret',
            securityToken: 'securityToken',
            protocol: 'protocol',
            regionId: 'regionId',
            readTimeout: 'readTimeout',
            connectTimeout: 'connectTimeout',
            httpProxy: 'httpProxy',
            httpsProxy: 'httpsProxy',
            credential: 'credential',
            endpoint: 'endpoint',
            noProxy: 'noProxy',
            maxIdleConns: 'maxIdleConns',
            localAddr: 'localAddr',
            socks5Proxy: 'socks5Proxy',
            socks5NetWork: 'socks5NetWork',
        };
    };
    Config.types = function () {
        return {
            accessKeyId: 'string',
            accessKeySecret: 'string',
            securityToken: 'string',
            protocol: 'string',
            regionId: 'string',
            readTimeout: 'number',
            connectTimeout: 'number',
            httpProxy: 'string',
            httpsProxy: 'string',
            credential: credentials_1.default,
            endpoint: 'string',
            noProxy: 'string',
            maxIdleConns: 'number',
            localAddr: 'string',
            socks5Proxy: 'string',
            socks5NetWork: 'string',
        };
    };
    return Config;
}($tea.Model));
exports.Config = Config;
var Client = /** @class */ (function () {
    /**
     * Init client with Config
     * @param config config contains the necessary information to create a client
     */
    function Client(config) {
        if (tea_util_1.default.isUnset($tea.toMap(config))) {
            throw $tea.newError({
                code: "ParameterMissing",
                message: "'config' can not be unset",
            });
        }
        tea_util_1.default.validateModel(config);
        if (!tea_util_1.default.empty(config.accessKeyId) && !tea_util_1.default.empty(config.accessKeySecret)) {
            var credentialType = "access_key";
            if (!tea_util_1.default.empty(config.securityToken)) {
                credentialType = "sts";
            }
            var credentialConfig = new $Credential.Config({
                accessKeyId: config.accessKeyId,
                type: credentialType,
                accessKeySecret: config.accessKeySecret,
                securityToken: config.securityToken,
            });
            this._credential = new credentials_1.default(credentialConfig);
        }
        else if (!tea_util_1.default.isUnset(config.credential)) {
            this._credential = config.credential;
        }
        else {
            throw $tea.newError({
                code: "ParameterMissing",
                message: "'accessKeyId' and 'accessKeySecret' or 'credential' can not be unset",
            });
        }
        if (tea_util_1.default.empty(config.endpoint)) {
            throw $tea.newError({
                code: "ParameterMissing",
                message: "'endpoint' can not be unset",
            });
        }
        if (eventbridge_util_1.default.startWith(config.endpoint, "http") || eventbridge_util_1.default.startWith(config.endpoint, "https")) {
            throw $tea.newError({
                code: "ParameterError",
                message: "'endpoint' shouldn't start with 'http' or 'https'",
            });
        }
        this._regionId = config.regionId;
        this._protocol = config.protocol;
        this._endpoint = config.endpoint;
        this._readTimeout = config.readTimeout;
        this._connectTimeout = config.connectTimeout;
        this._httpProxy = config.httpProxy;
        this._httpsProxy = config.httpsProxy;
        this._maxIdleConns = config.maxIdleConns;
        this._localAddr = config.localAddr;
        this._socks5Proxy = config.socks5Proxy;
        this._socks5NetWork = config.socks5NetWork;
    }
    /**
     * Encapsulate the request and invoke the network
     * @param action the api name
     * @param protocol http or https
     * @param method e.g. GET
     * @param pathname pathname of every api
     * @param query which contains request params
     * @param body content of request
     * @param runtime which controls some details of call api, such as retry times
     * @return the response
     */
    Client.prototype.doRequest = function (action, protocol, method, pathname, query, body, runtime) {
        return __awaiter(this, void 0, void 0, function () {
            var _runtime, _lastRequest, _now, _retryTimes, _backoffTime, request_, accessKeyId, accessKeySecret, securityToken, stringToSign, response_, result, tmp, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _runtime = {
                            timeouted: "retry",
                            readTimeout: tea_util_1.default.defaultNumber(runtime.readTimeout, this._readTimeout),
                            connectTimeout: tea_util_1.default.defaultNumber(runtime.connectTimeout, this._connectTimeout),
                            httpProxy: tea_util_1.default.defaultString(runtime.httpProxy, this._httpProxy),
                            httpsProxy: tea_util_1.default.defaultString(runtime.httpsProxy, this._httpsProxy),
                            noProxy: tea_util_1.default.defaultString(runtime.noProxy, this._noProxy),
                            maxIdleConns: tea_util_1.default.defaultNumber(runtime.maxIdleConns, this._maxIdleConns),
                            retry: {
                                retryable: runtime.autoretry,
                                maxAttempts: tea_util_1.default.defaultNumber(runtime.maxAttempts, 3),
                            },
                            backoff: {
                                policy: tea_util_1.default.defaultString(runtime.backoffPolicy, "no"),
                                period: tea_util_1.default.defaultNumber(runtime.backoffPeriod, 1),
                            },
                            ignoreSSL: runtime.ignoreSSL,
                            localAddr: tea_util_1.default.defaultString(runtime.localAddr, this._localAddr),
                            socks5Proxy: tea_util_1.default.defaultString(runtime.socks5Proxy, this._socks5Proxy),
                            socks5NetWork: tea_util_1.default.defaultString(runtime.socks5NetWork, this._socks5NetWork),
                        };
                        _lastRequest = null;
                        _now = Date.now();
                        _retryTimes = 0;
                        _a.label = 1;
                    case 1:
                        if (!$tea.allowRetry(_runtime['retry'], _retryTimes, _now)) return [3 /*break*/, 12];
                        if (!(_retryTimes > 0)) return [3 /*break*/, 3];
                        _backoffTime = $tea.getBackoffTime(_runtime['backoff'], _retryTimes);
                        if (!(_backoffTime > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, $tea.sleep(_backoffTime)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _retryTimes = _retryTimes + 1;
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 10, , 11]);
                        request_ = new $tea.Request();
                        request_.protocol = tea_util_1.default.defaultString(this._protocol, protocol);
                        request_.method = method;
                        request_.pathname = pathname;
                        request_.headers = {
                            date: tea_util_1.default.getDateUTCString(),
                            host: this._endpoint,
                            accept: "application/json",
                            'x-acs-signature-nonce': tea_util_1.default.getNonce(),
                            'x-acs-signature-method': "HMAC-SHA1",
                            'x-acs-signature-version': "1.0",
                            'x-eventbridge-version': "2015-06-06",
                            'user-agent': tea_util_1.default.getUserAgent(" aliyun-eventbridge-sdk/1.2.0"),
                        };
                        if (!tea_util_1.default.isUnset(this._regionId)) {
                            request_.headers["x-eventbridge-regionId"] = this._regionId;
                        }
                        if (!tea_util_1.default.isUnset(body)) {
                            request_.body = new $tea.BytesReadable(tea_util_1.default.toJSONString(body));
                            request_.headers["content-type"] = "application/json; charset=utf-8";
                        }
                        if (!tea_util_1.default.isUnset(query)) {
                            request_.query = query;
                        }
                        return [4 /*yield*/, this._credential.getAccessKeyId()];
                    case 5:
                        accessKeyId = _a.sent();
                        return [4 /*yield*/, this._credential.getAccessKeySecret()];
                    case 6:
                        accessKeySecret = _a.sent();
                        return [4 /*yield*/, this._credential.getSecurityToken()];
                    case 7:
                        securityToken = _a.sent();
                        if (!tea_util_1.default.empty(securityToken)) {
                            request_.headers["x-acs-accesskey-id"] = accessKeyId;
                            request_.headers["x-acs-security-token"] = securityToken;
                        }
                        stringToSign = eventbridge_util_1.default.getStringToSign(request_);
                        request_.headers["authorization"] = "acs:".concat(accessKeyId, ":").concat(eventbridge_util_1.default.getSignature(stringToSign, accessKeySecret));
                        _lastRequest = request_;
                        return [4 /*yield*/, $tea.doAction(request_, _runtime)];
                    case 8:
                        response_ = _a.sent();
                        return [4 /*yield*/, tea_util_1.default.readAsJSON(response_.body)];
                    case 9:
                        result = _a.sent();
                        tmp = tea_util_1.default.assertAsMap(result);
                        if (tea_util_1.default.is4xx(response_.statusCode) || tea_util_1.default.is5xx(response_.statusCode)) {
                            throw $tea.newError({
                                code: tmp["code"],
                                message: "[EventBridgeError-".concat(tmp["requestId"], "] ").concat(tmp["message"]),
                                data: tmp,
                            });
                        }
                        return [2 /*return*/, tmp];
                    case 10:
                        ex_1 = _a.sent();
                        if ($tea.isRetryable(ex_1)) {
                            return [3 /*break*/, 1];
                        }
                        throw ex_1;
                    case 11: return [3 /*break*/, 1];
                    case 12: throw $tea.newUnretryableError(_lastRequest);
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUFrRDtBQUNsRCxnRkFBeUQ7QUFDekQsZ0dBQWlFO0FBQ2pFLDZEQUFpRDtBQUNqRDs7R0FFRztBQUNGO0lBQTRCLDBCQUFVO0lBMkRuQyxnQkFBWSxHQUE0QjtlQUN0QyxrQkFBTSxHQUFHLENBQUM7SUFDWixDQUFDO0lBNUNNLFlBQUssR0FBWjtRQUNFLE9BQU87WUFDTCxXQUFXLEVBQUUsYUFBYTtZQUMxQixlQUFlLEVBQUUsaUJBQWlCO1lBQ2xDLGFBQWEsRUFBRSxlQUFlO1lBQzlCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxhQUFhO1lBQzFCLGNBQWMsRUFBRSxnQkFBZ0I7WUFDaEMsU0FBUyxFQUFFLFdBQVc7WUFDdEIsVUFBVSxFQUFFLFlBQVk7WUFDeEIsVUFBVSxFQUFFLFlBQVk7WUFDeEIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsWUFBWSxFQUFFLGNBQWM7WUFDNUIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsYUFBYSxFQUFFLGVBQWU7U0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFTSxZQUFLLEdBQVo7UUFDRSxPQUFPO1lBQ0wsV0FBVyxFQUFFLFFBQVE7WUFDckIsZUFBZSxFQUFFLFFBQVE7WUFDekIsYUFBYSxFQUFFLFFBQVE7WUFDdkIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLFFBQVE7WUFDckIsY0FBYyxFQUFFLFFBQVE7WUFDeEIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsVUFB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
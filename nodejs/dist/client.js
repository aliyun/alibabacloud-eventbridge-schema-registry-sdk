"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const tea_util_1 = __importDefault(require("@alicloud/tea-util"));
const eventbridge_util_1 = __importDefault(require("@alicloud/eventbridge-util"));
const credentials_1 = __importStar(require("@alicloud/credentials")), $Credential = credentials_1;
const $tea = __importStar(require("@alicloud/tea-typescript"));
/**
 * Model for initing client
 */
class Config extends $tea.Model {
    static names() {
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
    }
    static types() {
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
    }
    constructor(map) {
        super(map);
    }
}
exports.Config = Config;
class Client {
    /**
     * Init client with Config
     * @param config config contains the necessary information to create a client
     */
    constructor(config) {
        if (tea_util_1.default.isUnset($tea.toMap(config))) {
            throw $tea.newError({
                code: "ParameterMissing",
                message: "'config' can not be unset",
            });
        }
        tea_util_1.default.validateModel(config);
        if (!tea_util_1.default.empty(config.accessKeyId) && !tea_util_1.default.empty(config.accessKeySecret)) {
            let credentialType = "access_key";
            if (!tea_util_1.default.empty(config.securityToken)) {
                credentialType = "sts";
            }
            let credentialConfig = new $Credential.Config({
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
    async doRequest(action, protocol, method, pathname, query, body, runtime) {
        let _runtime = {
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
        let _lastRequest = null;
        let _now = Date.now();
        let _retryTimes = 0;
        while ($tea.allowRetry(_runtime['retry'], _retryTimes, _now)) {
            if (_retryTimes > 0) {
                let _backoffTime = $tea.getBackoffTime(_runtime['backoff'], _retryTimes);
                if (_backoffTime > 0) {
                    await $tea.sleep(_backoffTime);
                }
            }
            _retryTimes = _retryTimes + 1;
            try {
                let request_ = new $tea.Request();
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
                let accessKeyId = await this._credential.getAccessKeyId();
                let accessKeySecret = await this._credential.getAccessKeySecret();
                let securityToken = await this._credential.getSecurityToken();
                if (!tea_util_1.default.empty(securityToken)) {
                    request_.headers["x-acs-accesskey-id"] = accessKeyId;
                    request_.headers["x-acs-security-token"] = securityToken;
                }
                let stringToSign = eventbridge_util_1.default.getStringToSign(request_);
                request_.headers["authorization"] = `acs:${accessKeyId}:${eventbridge_util_1.default.getSignature(stringToSign, accessKeySecret)}`;
                _lastRequest = request_;
                let response_ = await $tea.doAction(request_, _runtime);
                let result = await tea_util_1.default.readAsJSON(response_.body);
                let tmp = tea_util_1.default.assertAsMap(result);
                if (tea_util_1.default.is4xx(response_.statusCode) || tea_util_1.default.is5xx(response_.statusCode)) {
                    throw $tea.newError({
                        code: tmp["code"],
                        message: `[EventBridgeError-${tmp["requestId"]}] ${tmp["message"]}`,
                        data: tmp,
                    });
                }
                return tmp;
            }
            catch (ex) {
                if ($tea.isRetryable(ex)) {
                    continue;
                }
                throw ex;
            }
        }
        throw $tea.newUnretryableError(_lastRequest);
    }
}
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtFQUFrRDtBQUNsRCxrRkFBeUQ7QUFDekQsa0dBQWlFO0FBQ2pFLCtEQUFpRDtBQUNqRDs7R0FFRztBQUNGLE1BQWEsTUFBTyxTQUFRLElBQUksQ0FBQyxLQUFLO0lBaUJuQyxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU87WUFDTCxXQUFXLEVBQUUsYUFBYTtZQUMxQixlQUFlLEVBQUUsaUJBQWlCO1lBQ2xDLGFBQWEsRUFBRSxlQUFlO1lBQzlCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxhQUFhO1lBQzFCLGNBQWMsRUFBRSxnQkFBZ0I7WUFDaEMsU0FBUyxFQUFFLFdBQVc7WUFDdEIsVUFBVSxFQUFFLFlBQVk7WUFDeEIsVUFBVSxFQUFFLFlBQVk7WUFDeEIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsWUFBWSxFQUFFLGNBQWM7WUFDNUIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsYUFBYSxFQUFFLGVBQWU7U0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU87WUFDTCxXQUFXLEVBQUUsUUFBUTtZQUNyQixlQUFlLEVBQUUsUUFBUTtZQUN6QixhQUFhLEVBQUUsUUFBUTtZQUN2QixRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsUUFBUTtZQUNyQixjQUFjLEVBQUUsUUFBUTtZQUN4QixTQUFTLEVBQUUsUUFBUTtZQUNuQixVQUFVLEVBQUUsUUFBUTtZQUNwQixVQUFVLEVBQUUscUJBQVU7WUFDdEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsT0FBTyxFQUFFLFFB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
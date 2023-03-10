import Util, * as $Util from '@alicloud/tea-util';
import EventBridgeUtil from '@alicloud/eventbridge-util';
import Credential, * as $Credential from '@alicloud/credentials';
import * as $tea from '@alicloud/tea-typescript';
/**
 * Model for initing client
 */
 export class Config extends $tea.Model {
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
    protocol?: string;
    regionId?: string;
    readTimeout?: number;
    connectTimeout?: number;
    httpProxy?: string;
    httpsProxy?: string;
    credential?: Credential;
    endpoint?: string;
    noProxy?: string;
    maxIdleConns?: number;
    localAddr?: string;
    socks5Proxy?: string;
    socks5NetWork?: string;
    static names(): { [key: string]: string } {
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
  
    static types(): { [key: string]: any } {
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
        credential: Credential,
        endpoint: 'string',
        noProxy: 'string',
        maxIdleConns: 'number',
        localAddr: 'string',
        socks5Proxy: 'string',
        socks5NetWork: 'string',
      };
    }
  
    constructor(map?: { [key: string]: any }) {
      super(map);
    }
  }
export default class Client {
    _protocol: string;
    _readTimeout: number;
    _connectTimeout: number;
    _httpProxy: string;
    _httpsProxy: string;
    _noProxy: string;
    _maxIdleConns: number;
    _endpoint: string;
    _regionId: string;
    _credential: Credential;
    _localAddr: string;
    _socks5Proxy: string;
    _socks5NetWork: string;

    /**
     * Init client with Config
     * @param config config contains the necessary information to create a client
     */
    constructor(config: Config) {
        if (Util.isUnset($tea.toMap(config))) {
            throw $tea.newError({
                code: "ParameterMissing",
                message: "'config' can not be unset",
            });
        }

        Util.validateModel(config);
        if (!Util.empty(config.accessKeyId) && !Util.empty(config.accessKeySecret)) {
            let credentialType = "access_key";
            if (!Util.empty(config.securityToken)) {
                credentialType = "sts";
            }

            let credentialConfig = new $Credential.Config({
                accessKeyId: config.accessKeyId,
                type: credentialType,
                accessKeySecret: config.accessKeySecret,
                securityToken: config.securityToken,
            });
            this._credential = new Credential(credentialConfig);
        } else if (!Util.isUnset(config.credential)) {
            this._credential = config.credential;
        } else {
            throw $tea.newError({
                code: "ParameterMissing",
                message: "'accessKeyId' and 'accessKeySecret' or 'credential' can not be unset",
            });
        }

        if (Util.empty(config.endpoint)) {
            throw $tea.newError({
                code: "ParameterMissing",
                message: "'endpoint' can not be unset",
            });
        }

        if (EventBridgeUtil.startWith(config.endpoint, "http") || EventBridgeUtil.startWith(config.endpoint, "https")) {
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
    async doRequest(action: string, protocol: string, method: string, pathname: string, query: { [key: string]: string }, body: any, runtime: $Util.RuntimeOptions): Promise<{ [key: string]: any }> {
        let _runtime: { [key: string]: any } = {
            timeouted: "retry",
            readTimeout: Util.defaultNumber(runtime.readTimeout, this._readTimeout),
            connectTimeout: Util.defaultNumber(runtime.connectTimeout, this._connectTimeout),
            httpProxy: Util.defaultString(runtime.httpProxy, this._httpProxy),
            httpsProxy: Util.defaultString(runtime.httpsProxy, this._httpsProxy),
            noProxy: Util.defaultString(runtime.noProxy, this._noProxy),
            maxIdleConns: Util.defaultNumber(runtime.maxIdleConns, this._maxIdleConns),
            retry: {
                retryable: runtime.autoretry,
                maxAttempts: Util.defaultNumber(runtime.maxAttempts, 3),
            },
            backoff: {
                policy: Util.defaultString(runtime.backoffPolicy, "no"),
                period: Util.defaultNumber(runtime.backoffPeriod, 1),
            },
            ignoreSSL: runtime.ignoreSSL,
            localAddr: Util.defaultString(runtime.localAddr, this._localAddr),
            socks5Proxy: Util.defaultString(runtime.socks5Proxy, this._socks5Proxy),
            socks5NetWork: Util.defaultString(runtime.socks5NetWork, this._socks5NetWork),
        }

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

                request_.protocol = Util.defaultString(this._protocol, protocol);
                request_.method = method;
                request_.pathname = pathname;
                request_.headers = {
                    date: Util.getDateUTCString(),
                    host: this._endpoint,
                    accept: "application/json",
                    'x-acs-signature-nonce': Util.getNonce(),
                    'x-acs-signature-method': "HMAC-SHA1",
                    'x-acs-signature-version': "1.0",
                    'x-eventbridge-version': "2015-06-06",
                    'user-agent': Util.getUserAgent(" aliyun-eventbridge-sdk/1.2.0"),
                };
                if (!Util.isUnset(this._regionId)) {
                    request_.headers["x-eventbridge-regionId"] = this._regionId;
                }

                if (!Util.isUnset(body)) {
                    request_.body = new $tea.BytesReadable(Util.toJSONString(body));
                    request_.headers["content-type"] = "application/json; charset=utf-8";
                }


                if (!Util.isUnset(query)) {
                    request_.query = query;
                }

                let accessKeyId = await this._credential.getAccessKeyId();
                let accessKeySecret = await this._credential.getAccessKeySecret();
                let securityToken = await this._credential.getSecurityToken();
                if (!Util.empty(securityToken)) {
                    request_.headers["x-acs-accesskey-id"] = accessKeyId;
                    request_.headers["x-acs-security-token"] = securityToken;
                }

                let stringToSign = EventBridgeUtil.getStringToSign(request_);
                request_.headers["authorization"] = `acs:${accessKeyId}:${EventBridgeUtil.getSignature(stringToSign, accessKeySecret)}`;
                _lastRequest = request_;
                let response_ = await $tea.doAction(request_, _runtime);

                let result = await Util.readAsJSON(response_.body);
                let tmp = Util.assertAsMap(result);
                if (Util.is4xx(response_.statusCode) || Util.is5xx(response_.statusCode)) {
                    throw $tea.newError({
                        code: tmp["code"],
                        message: `[EventBridgeError-${tmp["requestId"]}] ${tmp["message"]}`,
                        data: tmp,
                    });
                }

                return tmp;
            } catch (ex) {
                if ($tea.isRetryable(ex)) {
                    continue;
                }
                throw ex;
            }
        }

        throw $tea.newUnretryableError(_lastRequest);
    }



}

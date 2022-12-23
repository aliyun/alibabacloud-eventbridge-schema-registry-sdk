import * as $Util from '@alicloud/tea-util';
import Credential from '@alicloud/credentials';
import * as $tea from '@alicloud/tea-typescript';
/**
 * Model for initing client
 */
export declare class Config extends $tea.Model {
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
    static names(): {
        [key: string]: string;
    };
    static types(): {
        [key: string]: any;
    };
    constructor(map?: {
        [key: string]: any;
    });
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
    constructor(config: Config);
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
    doRequest(action: string, protocol: string, method: string, pathname: string, query: {
        [key: string]: string;
    }, body: any, runtime: $Util.RuntimeOptions): Promise<{
        [key: string]: any;
    }>;
}

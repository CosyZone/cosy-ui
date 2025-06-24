import { IncomingMessage, ServerResponse, OutgoingHttpHeaders } from 'http'
import { Socket } from 'net'
import { TLSSocket } from 'tls'
import { parse as parseUrl } from 'url'
import { parse as parseQuery } from 'querystring'
import { FileUpload, HttpMethod } from './types'

/**
 * HTTP 请求类
 * 
 * 封装了 Node.js 的 IncomingMessage，提供更友好的 API
 */
export class Request {
    public body: any
    public params: Record<string, string> = {}
    public query: Record<string, string> = {}
    public cookies: Record<string, string> = {}
    public files?: FileUpload[]
    public res?: ServerResponse

    constructor(
        public readonly req: IncomingMessage,
        public readonly socket: Socket
    ) {
        // 解析查询参数
        const url = parseUrl(req.url || '')
        if (url.query) {
            this.query = parseQuery(url.query) as Record<string, string>
        }
    }

    /**
     * 获取请求方法
     */
    get method(): HttpMethod {
        return (this.req.method || 'GET') as HttpMethod
    }

    /**
     * 获取请求路径
     */
    get path(): string {
        return parseUrl(this.req.url || '').pathname || '/'
    }

    /**
     * 获取请求头
     * @param name 请求头名称
     */
    get(name: string): string | undefined {
        return this.req.headers[name.toLowerCase()] as string
    }

    /**
     * 获取所有请求头
     */
    headers(): OutgoingHttpHeaders {
        return this.req.headers
    }

    /**
     * 判断是否包含指定请求头
     * @param name 请求头名称
     */
    has(name: string): boolean {
        return name.toLowerCase() in this.req.headers
    }

    /**
     * 获取请求协议
     */
    get protocol(): string {
        // X-Forwarded-Proto header
        const proto = this.get('X-Forwarded-Proto')
        if (proto) {
            return proto.split(/\s*,\s*/)[0]
        }

        return (this.socket instanceof TLSSocket) ? 'https' : 'http'
    }

    /**
     * 判断是否是 HTTPS 请求
     */
    get secure(): boolean {
        return this.protocol === 'https'
    }

    /**
     * 获取客户端 IP
     */
    get ip(): string {
        return this.ips[0] || this.socket.remoteAddress || ''
    }

    /**
     * 获取客户端 IP 列表
     */
    get ips(): string[] {
        const proxy = this.get('X-Forwarded-For')
        if (proxy) {
            return proxy.split(/\s*,\s*/)
        }
        return [this.socket.remoteAddress || '']
    }

    /**
     * 获取主机名
     */
    get hostname(): string {
        let host = this.get('X-Forwarded-Host') || this.get('Host')
        if (!host) {
            return ''
        }
        return host.split(/\s*,\s*/)[0]
    }

    /**
     * 获取子域名列表
     */
    get subdomains(): string[] {
        const hostname = this.hostname
        if (!hostname) {
            return []
        }
        return hostname.split('.').reverse().slice(2)
    }

    /**
     * 判断请求是否新鲜（未修改）
     */
    get fresh(): boolean {
        const method = this.method
        const status = this.res?.statusCode || 200

        // GET or HEAD for weak freshness validation only
        if ('GET' !== method && 'HEAD' !== method) {
            return false
        }

        // 2xx or 304 as per rfc2616 14.26
        if ((status >= 200 && status < 300) || 304 === status) {
            const resHeaders = this.res?.getHeaders() || {}
            return fresh(this.headers(), resHeaders)
        }

        return false
    }

    /**
     * 判断请求是否陈旧（已修改）
     */
    get stale(): boolean {
        return !this.fresh
    }

    /**
     * 判断是否是 XHR 请求
     */
    get xhr(): boolean {
        const val = this.get('X-Requested-With') || ''
        return val.toLowerCase() === 'xmlhttprequest'
    }
}

/**
 * 检查请求是否新鲜（未修改）
 * @param reqHeaders 请求头
 * @param resHeaders 响应头
 */
function fresh(reqHeaders: OutgoingHttpHeaders, resHeaders: OutgoingHttpHeaders): boolean {
    // fields
    const modifiedSince = reqHeaders['if-modified-since']
    const noneMatch = reqHeaders['if-none-match']

    // unconditional request
    if (!modifiedSince && !noneMatch) {
        return false
    }

    // Always return stale when Cache-Control: no-cache
    // to support end-to-end reload requests
    const cacheControl = reqHeaders['cache-control']
    if (cacheControl && /(?:^|,)\s*?no-cache\s*?(?:,|$)/.test(cacheControl as string)) {
        return false
    }

    // if-none-match
    if (noneMatch && noneMatch !== '*') {
        const etag = resHeaders['etag']

        if (!etag) {
            return false
        }

        let etagStale = true
        const matches = (noneMatch as string).split(/\s*,\s*/)
        for (let i = 0; i < matches.length; i++) {
            const match = matches[i]
            if (match === etag || match === 'W/' + etag || 'W/' + match === etag) {
                etagStale = false
                break
            }
        }

        if (etagStale) {
            return false
        }
    }

    // if-modified-since
    if (modifiedSince) {
        const lastModified = resHeaders['last-modified']
        if (!lastModified) {
            return false
        }

        const modifiedStale = Date.parse(lastModified as string) > Date.parse(modifiedSince as string)
        if (modifiedStale) {
            return false
        }
    }

    return true
} 

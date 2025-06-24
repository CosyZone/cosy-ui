import { IncomingMessage, ServerResponse, OutgoingHttpHeaders } from 'http'
import { Socket } from 'net'
import { TLSSocket } from 'tls'
import { parse as parseUrl } from 'url'
import { parse as parseQuery } from 'querystring'
import { IRequest, FileUpload } from '@coffic/cosy-interfaces'

/**
 * HTTP 请求类
 * 
 * 封装了 Node.js 的 IncomingMessage，提供更友好的 API
 */
export class Request implements IRequest {
    public body: any
    public params: Record<string, string> = {}
    public query: Record<string, string> = {}
    public cookies: Record<string, string> = {}
    public files: Record<string, FileUpload[]> = {}
    public res?: ServerResponse
    public method: string
    public url: string
    public path: string
    public headers: Record<string, string>
    public userAgent: string
    public isForm: boolean
    public queryString: string

    constructor(
        public readonly req: IncomingMessage,
        public readonly socket: Socket
    ) {
        // 解析查询参数
        const url = parseUrl(req.url || '')
        this.url = req.url || ''
        this.path = url.pathname || '/'
        this.method = req.method || 'GET'
        this.headers = req.headers as Record<string, string>
        this.userAgent = this.headers['user-agent'] || ''
        this.isForm = this.headers['content-type']?.includes('multipart/form-data') || false
        this.queryString = url.query || ''

        if (url.query) {
            this.query = parseQuery(url.query) as Record<string, string>
        }
    }

    /**
     * 获取请求数据
     */
    get(key: string): any {
        return this.body?.[key] || this.query[key] || this.params[key]
    }

    /**
     * 获取输入数据，支持默认值
     */
    input(key: string, defaultValue?: any): any {
        const value = this.get(key)
        return value === undefined ? defaultValue : value
    }

    /**
     * 检查是否存在某个输入
     */
    has(key: string): boolean {
        return this.get(key) !== undefined
    }

    /**
     * 获取请求头
     */
    header(name: string, defaultValue?: string): string {
        const value = this.headers[name.toLowerCase()]
        return value || defaultValue || ''
    }

    /**
     * 获取上传的文件
     */
    file(name: string): FileUpload | FileUpload[] | undefined {
        return this.files[name]
    }

    /**
     * 是否是 AJAX 请求
     */
    isAjax(): boolean {
        return this.header('X-Requested-With') === 'XMLHttpRequest'
    }

    /**
     * 是否是 JSON 请求
     */
    isJson(): boolean {
        return this.header('content-type')?.includes('application/json') || false
    }

    /**
     * 获取完整的请求 URL
     */
    fullUrl(): string {
        const protocol = this.protocol
        const host = this.hostname
        return `${protocol}://${host}${this.url}`
    }

    /**
     * 获取请求协议
     */
    get protocol(): string {
        // X-Forwarded-Proto header
        const proto = this.header('X-Forwarded-Proto')
        if (proto) {
            return proto.split(/\s*,\s*/)[0]
        }

        return (this.socket instanceof TLSSocket) ? 'https' : 'http'
    }

    /**
     * 获取客户端 IP
     */
    get ip(): string {
        return this.ips[0] || this.socket.remoteAddress || ''
    }

    /**
     * 获取所有客户端 IP
     */
    get ips(): string[] {
        const forwarded = this.header('X-Forwarded-For')
        return forwarded ? forwarded.split(/\s*,\s*/) : []
    }

    /**
     * 获取主机名
     */
    get hostname(): string {
        let host = this.header('X-Forwarded-Host') || this.header('Host')
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
            return fresh(this.headers, resHeaders)
        }

        return false
    }

    /**
     * 判断请求是否陈旧（已修改）
     */
    get stale(): boolean {
        return !this.fresh
    }
}

/**
 * 检查响应是否新鲜
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

    // Always return stale when must-revalidate is present
    if (reqHeaders['cache-control'] && reqHeaders['cache-control'].toString().includes('must-revalidate')) {
        return false
    }

    // if-none-match
    if (noneMatch && noneMatch !== '*') {
        const etag = resHeaders['etag']

        if (!etag) {
            return false
        }

        return noneMatch.split(/\s*,\s*/).includes(etag.toString())
    }

    // if-modified-since
    if (modifiedSince) {
        const lastModified = resHeaders['last-modified']
        if (!lastModified) {
            return false
        }

        return new Date(modifiedSince.toString()) >= new Date(lastModified.toString())
    }

    return false
} 

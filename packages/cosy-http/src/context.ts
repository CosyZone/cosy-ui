import { IncomingMessage, ServerResponse } from 'http'
import { Socket } from 'net'
import { Request } from './request'
import { Response } from './response'
import { IHttpContext } from './types'

/**
 * HTTP 上下文类
 * 
 * 封装了请求和响应对象，提供统一的上下文环境
 */
export class Context implements IHttpContext {
    public req: IncomingMessage
    public res: ServerResponse
    public socket: Socket
    public request: Request
    public response: Response
    public body: any
    public params: Record<string, string> = {}
    public query: Record<string, string> = {}
    public cookies: Record<string, string> = {}
    public files?: any[]
    [key: string]: any

    constructor(req: IncomingMessage, res: ServerResponse) {
        this.req = req
        this.res = res
        this.socket = req.socket as Socket
        this.request = new Request(req, this.socket)
        this.response = new Response(res)

        // 链接 request 和 response
        this.request.res = res

        // 代理 request 的属性
        this.query = this.request.query
        this.params = this.request.params
        this.cookies = this.request.cookies
        this.files = this.request.files
    }

    /**
     * 获取请求协议
     */
    get protocol(): string {
        return this.request.protocol
    }

    /**
     * 判断是否是 HTTPS 请求
     */
    get secure(): boolean {
        return this.request.secure
    }

    /**
     * 获取客户端 IP
     */
    get ip(): string {
        return this.request.ip
    }

    /**
     * 获取客户端 IP 列表
     */
    get ips(): string[] {
        return this.request.ips
    }

    /**
     * 获取子域名列表
     */
    get subdomains(): string[] {
        return this.request.subdomains
    }

    /**
     * 获取请求路径
     */
    get path(): string {
        return this.request.path
    }

    /**
     * 获取主机名
     */
    get hostname(): string {
        return this.request.hostname
    }

    /**
     * 判断请求是否新鲜（未修改）
     */
    get fresh(): boolean {
        return this.request.fresh
    }

    /**
     * 判断请求是否陈旧（已修改）
     */
    get stale(): boolean {
        return this.request.stale
    }

    /**
     * 判断是否是 XHR 请求
     */
    get xhr(): boolean {
        return this.request.xhr
    }
} 

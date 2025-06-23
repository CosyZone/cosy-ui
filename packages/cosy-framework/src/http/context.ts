import { HttpContextInterface, RequestInterface, ResponseInterface } from '../types'
import { Request } from './request'
import { Response } from './response'

export class HttpContext implements HttpContextInterface {
    public readonly request: RequestInterface
    public readonly response: ResponseInterface

    constructor(request: RequestInterface, response?: ResponseInterface) {
        this.request = request
        this.response = response || new Response()
    }

    /**
     * 从原生 HTTP 请求创建上下文
     */
    static fromIncomingMessage(req: any, res?: any): HttpContext {
        const request = new Request({
            method: req.method || 'GET',
            url: req.url || '/',
            headers: req.headers || {},
            body: req.body || {},
            query: req.query || {},
            ip: req.ip || req.connection?.remoteAddress || '',
            userAgent: req.headers?.['user-agent'] || ''
        })

        const response = new Response()

        return new HttpContext(request, response)
    }

    /**
     * 从对象创建上下文（用于测试）
     */
    static create(options: {
        method?: string
        url?: string
        headers?: Record<string, string>
        body?: any
        query?: Record<string, any>
        params?: Record<string, any>
    } = {}): HttpContext {
        const request = new Request({
            method: options.method || 'GET',
            url: options.url || '/',
            headers: options.headers || {},
            body: options.body || {},
            query: options.query || {},
            params: options.params || {}
        })

        const response = new Response()

        return new HttpContext(request, response)
    }
} 

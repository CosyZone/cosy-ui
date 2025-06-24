import { ServerResponse } from 'http'
import { CookieOptions } from './types'
import { HttpStatus } from '@coffic/cosy-interfaces'


/**
 * HTTP 响应类
 * 
 * 封装了 Node.js 的 ServerResponse，提供更友好的 API
 */
export class Response {
    private _body: any
    private _status: number = 200
    private _headers: Map<string, string | string[]> = new Map()

    constructor(private res: ServerResponse) { }

    /**
     * 设置响应状态码
     * @param code 状态码
     */
    status(code: number): this {
        this._status = code
        return this
    }

    /**
     * 设置响应头
     * @param name 响应头名称
     * @param value 响应头值
     */
    header(name: string, value: string | string[]): this {
        this._headers.set(name.toLowerCase(), value)
        return this
    }

    /**
     * 获取响应头
     * @param name 响应头名称
     */
    getHeader(name: string): string | string[] | undefined {
        return this._headers.get(name.toLowerCase())
    }

    /**
     * 删除响应头
     * @param name 响应头名称
     */
    removeHeader(name: string): this {
        this._headers.delete(name.toLowerCase())
        return this
    }

    /**
     * 设置 Content-Type
     * @param type Content-Type 值
     */
    type(type: string): this {
        return this.header('Content-Type', type)
    }

    /**
     * 设置响应体
     * @param body 响应体
     */
    send(body: any): this {
        this._body = body

        // 如果没有设置 Content-Type，根据 body 类型自动设置
        if (!this.getHeader('content-type')) {
            if (typeof body === 'string') {
                this.type('text/plain')
            } else if (Buffer.isBuffer(body)) {
                this.type('application/octet-stream')
            } else if (typeof body === 'object') {
                this.type('application/json')
            }
        }

        return this
    }

    /**
     * 发送 JSON 响应
     * @param body JSON 数据
     */
    json(body: any): this {
        return this.type('application/json').send(JSON.stringify(body))
    }

    /**
     * 发送文本响应
     * @param text 文本内容
     */
    text(text: string): this {
        return this.type('text/plain').send(text)
    }

    /**
     * 发送 HTML 响应
     * @param html HTML 内容
     */
    html(html: string): this {
        return this.type('text/html').send(html)
    }

    /**
     * 重定向
     * @param url 目标 URL
     * @param status 状态码
     */
    redirect(url: string, status: number = HttpStatus.FOUND): this {
        this.header('Location', url)
        return this.status(status)
    }

    /**
     * 设置 Cookie
     * @param name Cookie 名称
     * @param value Cookie 值
     * @param options Cookie 选项
     */
    cookie(name: string, value: string, options: CookieOptions = {}): this {
        const opts = { ...options }
        let cookie = `${name}=${value}`

        if (opts.maxAge) {
            cookie += `; Max-Age=${opts.maxAge}`
        }

        if (opts.domain) {
            cookie += `; Domain=${opts.domain}`
        }

        if (opts.path) {
            cookie += `; Path=${opts.path}`
        }

        if (opts.expires) {
            cookie += `; Expires=${opts.expires.toUTCString()}`
        }

        if (opts.httpOnly) {
            cookie += '; HttpOnly'
        }

        if (opts.secure) {
            cookie += '; Secure'
        }

        if (opts.sameSite) {
            if (typeof opts.sameSite === 'string') {
                cookie += `; SameSite=${opts.sameSite}`
            } else {
                cookie += '; SameSite=Strict'
            }
        }

        return this.header('Set-Cookie', cookie)
    }

    /**
     * 清除 Cookie
     * @param name Cookie 名称
     * @param options Cookie 选项
     */
    clearCookie(name: string, options: CookieOptions = {}): this {
        return this.cookie(name, '', {
            ...options,
            expires: new Date(0)
        })
    }

    /**
     * 发送响应
     */
    end(): void {
        // 设置状态码
        this.res.statusCode = this._status

        // 设置响应头
        for (const [name, value] of this._headers) {
            this.res.setHeader(name, value)
        }

        // 发送响应体
        if (this._body !== undefined) {
            if (typeof this._body === 'object' && !Buffer.isBuffer(this._body)) {
                this.res.end(JSON.stringify(this._body))
            } else {
                this.res.end(this._body)
            }
        } else {
            this.res.end()
        }
    }
} 

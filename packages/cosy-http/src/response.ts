import { ServerResponse } from 'http'
import { HttpStatus, ResponseInterface, CookieOptions } from '@coffic/cosy-interfaces'

/**
 * HTTP 响应类
 * 
 * 封装了 Node.js 的 ServerResponse，提供更友好的 API
 */
export class Response implements ResponseInterface {
    private _body: any
    private _status: number = 200
    private _headers: Map<string, string | string[]> = new Map()
    private _cookies: Array<{ name: string; value: string; options: CookieOptions | undefined }> = []

    constructor(private res: ServerResponse) { }

    /**
     * 设置响应状态码
     */
    status(code: number): ResponseInterface {
        this._status = code
        return this
    }

    /**
     * 发送 JSON 响应
     */
    json(data: any): ResponseInterface {
        this.type('application/json')
        this._body = JSON.stringify(data)
        return this
    }

    /**
     * 发送 HTML 响应
     */
    html(content: string): ResponseInterface {
        this.type('text/html')
        this._body = content
        return this
    }

    /**
     * 重定向到指定 URL
     */
    redirect(url: string, status: number = 302): ResponseInterface {
        this.status(status)
        this.header('Location', url)
        return this
    }

    /**
     * 设置 Cookie
     */
    cookie(name: string, value: string, options?: CookieOptions): ResponseInterface {
        this._cookies.push({ name, value, options })
        return this
    }

    /**
     * 清除 Cookie
     */
    clearCookie(name: string): ResponseInterface {
        return this.cookie(name, '', { expires: new Date(0) })
    }

    /**
     * 设置响应头
     */
    header(name: string, value: string): ResponseInterface {
        this._headers.set(name.toLowerCase(), value)
        return this
    }

    /**
     * 设置响应类型
     */
    type(type: string): ResponseInterface {
        return this.header('Content-Type', type)
    }

    /**
     * 发送响应
     */
    send(content?: any): ResponseInterface {
        if (content !== undefined) {
            this._body = content
        }
        return this
    }

    /**
     * 下载文件
     */
    download(filePath: string, filename?: string): ResponseInterface {
        if (filename) {
            this.attachment(filename)
        }
        // TODO: 实现文件下载
        return this
    }

    /**
     * 设置下载头部
     */
    attachment(filename?: string): ResponseInterface {
        this.header('Content-Disposition', filename
            ? `attachment; filename="${filename}"`
            : 'attachment'
        )
        return this
    }

    /**
     * 获取当前状态码
     */
    getStatus(): number {
        return this._status
    }

    /**
     * 获取所有响应头
     */
    getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {}
        for (const [name, value] of this._headers) {
            headers[name] = Array.isArray(value) ? value.join(', ') : value
        }
        return headers
    }

    /**
     * 获取所有设置的 Cookie
     */
    getCookies(): Array<{ name: string; value: string; options: CookieOptions | undefined }> {
        return this._cookies
    }

    /**
     * 获取响应内容
     */
    getContent(): any {
        return this._body
    }

    /**
     * 检查是否已经发送响应
     */
    hasResponded(): boolean {
        return this.res.headersSent
    }

    /**
     * 获取 Set-Cookie 头部数组
     */
    getSetCookieHeaders(): string[] {
        return this._cookies.map(({ name, value, options }) => {
            let cookie = `${name}=${value}`
            if (options) {
                if (options.expires) {
                    cookie += `; Expires=${options.expires.toUTCString()}`
                }
                if (options.maxAge) {
                    cookie += `; Max-Age=${options.maxAge}`
                }
                if (options.domain) {
                    cookie += `; Domain=${options.domain}`
                }
                if (options.path) {
                    cookie += `; Path=${options.path}`
                }
                if (options.secure) {
                    cookie += '; Secure'
                }
                if (options.httpOnly) {
                    cookie += '; HttpOnly'
                }
                if (options.sameSite) {
                    cookie += `; SameSite=${options.sameSite}`
                }
            }
            return cookie
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

        // 设置 Cookie
        const cookies = this.getSetCookieHeaders()
        if (cookies.length > 0) {
            this.res.setHeader('Set-Cookie', cookies)
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

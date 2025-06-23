import { ResponseInterface, CookieOptions, HttpStatus } from '../types'

export class Response implements ResponseInterface {
    private statusCode: number = HttpStatus.OK
    private responseHeaders: Record<string, string> = {}
    private cookieData: Array<{ name: string; value: string; options: CookieOptions | undefined }> = []
    private content: any = null
    private isResponded: boolean = false

    /**
     * 设置状态码
     */
    status(code: number): ResponseInterface {
        this.statusCode = code
        return this
    }

    /**
     * 发送 JSON 响应
     */
    json(data: any): ResponseInterface {
        this.header('Content-Type', 'application/json')
        this.content = JSON.stringify(data, null, 2)
        this.isResponded = true
        return this
    }

    /**
     * 发送 HTML 响应
     */
    html(content: string): ResponseInterface {
        this.header('Content-Type', 'text/html; charset=utf-8')
        this.content = content
        this.isResponded = true
        return this
    }

    /**
     * 重定向
     */
    redirect(url: string, status: number = HttpStatus.FOUND): ResponseInterface {
        this.status(status)
        this.header('Location', url)
        this.isResponded = true
        return this
    }

    /**
     * 设置 Cookie
     */
    cookie(name: string, value: string, options?: CookieOptions): ResponseInterface {
        this.cookieData.push({ name, value, options })
        return this
    }

    /**
     * 清除 Cookie
     */
    clearCookie(name: string): ResponseInterface {
        return this.cookie(name, '', {
            expires: new Date(0),
            path: '/'
        })
    }

    /**
     * 设置响应头
     */
    header(name: string, value: string): ResponseInterface {
        this.responseHeaders[name] = value
        return this
    }

    /**
     * 发送内容
     */
    send(content?: any): ResponseInterface {
        if (content !== undefined) {
            this.content = content
        }
        this.isResponded = true
        return this
    }

    /**
     * 下载文件
     */
    download(filePath: string, filename?: string): ResponseInterface {
        this.header('Content-Disposition', `attachment; filename="${filename || 'download'}"`)
        this.header('Content-Type', 'application/octet-stream')
        this.content = filePath // 实际实现中这里应该读取文件内容
        this.isResponded = true
        return this
    }

    /**
     * 设置为附件
     */
    attachment(filename?: string): ResponseInterface {
        if (filename) {
            this.header('Content-Disposition', `attachment; filename="${filename}"`)
        } else {
            this.header('Content-Disposition', 'attachment')
        }
        return this
    }

    /**
     * 获取状态码
     */
    getStatus(): number {
        return this.statusCode
    }

    /**
     * 获取响应头
     */
    getHeaders(): Record<string, string> {
        return { ...this.responseHeaders }
    }

    /**
     * 获取 Cookie 数据
     */
    getCookies(): Array<{ name: string; value: string; options: CookieOptions | undefined }> {
        return [...this.cookieData]
    }

    /**
     * 获取响应内容
     */
    getContent(): any {
        return this.content
    }

    /**
     * 检查是否已响应
     */
    hasResponded(): boolean {
        return this.isResponded
    }

    /**
     * 生成 Set-Cookie 头
     */
    private generateSetCookieHeader(name: string, value: string, options?: CookieOptions): string {
        let cookieString = `${name}=${value}`

        if (options) {
            if (options.maxAge) {
                cookieString += `; Max-Age=${options.maxAge}`
            }
            if (options.expires) {
                cookieString += `; Expires=${options.expires.toUTCString()}`
            }
            if (options.httpOnly) {
                cookieString += '; HttpOnly'
            }
            if (options.secure) {
                cookieString += '; Secure'
            }
            if (options.sameSite) {
                cookieString += `; SameSite=${options.sameSite}`
            }
            if (options.domain) {
                cookieString += `; Domain=${options.domain}`
            }
            if (options.path) {
                cookieString += `; Path=${options.path}`
            }
        }

        return cookieString
    }

    /**
     * 获取所有 Set-Cookie 头
     */
    getSetCookieHeaders(): string[] {
        return this.cookieData.map(cookie =>
            this.generateSetCookieHeader(cookie.name, cookie.value, cookie.options)
        )
    }
} 

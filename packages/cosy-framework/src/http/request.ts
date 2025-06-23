import { RequestInterface, FileUpload } from '../types'

export class Request implements RequestInterface {
    public method: string
    public url: string
    public path: string
    public query: Record<string, any> = {}
    public params: Record<string, any> = {}
    public headers: Record<string, string> = {}
    public body: any = {}
    public cookies: Record<string, string> = {}
    public files: Record<string, FileUpload[]> = {}
    public ip: string = ''
    public userAgent: string = ''

    constructor(options: {
        method: string
        url: string
        headers?: Record<string, string>
        body?: any
        query?: Record<string, any>
        params?: Record<string, any>
        cookies?: Record<string, string>
        files?: Record<string, FileUpload[]>
        ip?: string
        userAgent?: string
    }) {
        this.method = options.method.toUpperCase()
        this.url = options.url
        this.headers = options.headers || {}
        this.body = options.body || {}
        this.query = options.query || {}
        this.params = options.params || {}
        this.cookies = options.cookies || {}
        this.files = options.files || {}
        this.ip = options.ip || ''
        this.userAgent = options.userAgent || this.headers['user-agent'] || ''

        // 解析路径（移除查询字符串）
        const urlObj = new URL(this.url, 'http://localhost')
        this.path = urlObj.pathname
    }

    /**
     * 获取请求数据
     */
    get(key: string): any {
        return this.input(key)
    }

    /**
     * 检查是否存在某个键
     */
    has(key: string): boolean {
        return this.input(key) !== undefined
    }

    /**
     * 获取输入数据（从 body 和 query 中）
     */
    input(key?: string, defaultValue?: any): any {
        const allInput = { ...this.query, ...this.body }

        if (key === undefined) {
            return allInput
        }

        return allInput[key] ?? defaultValue
    }

    /**
     * 获取 Cookie
     */
    cookie(name: string, defaultValue?: string): string {
        return this.cookies[name] ?? defaultValue ?? ''
    }

    /**
     * 获取请求头
     */
    header(name: string, defaultValue?: string): string {
        const lowerName = name.toLowerCase()
        for (const [key, value] of Object.entries(this.headers)) {
            if (key.toLowerCase() === lowerName) {
                return value
            }
        }
        return defaultValue ?? ''
    }

    /**
     * 获取上传文件
     */
    file(name: string): FileUpload | FileUpload[] | undefined {
        return this.files[name]
    }

    /**
     * 判断请求是否为 AJAX
     */
    isAjax(): boolean {
        return this.header('x-requested-with') === 'XMLHttpRequest'
    }

    /**
     * 判断是否为 JSON 请求
     */
    isJson(): boolean {
        const contentType = this.header('content-type').toLowerCase()
        return contentType.includes('application/json')
    }

    /**
     * 判断是否为表单请求
     */
    isForm(): boolean {
        const contentType = this.header('content-type').toLowerCase()
        return contentType.includes('application/x-www-form-urlencoded') ||
            contentType.includes('multipart/form-data')
    }

    /**
     * 获取完整 URL
     */
    fullUrl(): string {
        return this.url
    }

    /**
     * 获取查询字符串
     */
    queryString(): string {
        const urlObj = new URL(this.url, 'http://localhost')
        return urlObj.search
    }
} 

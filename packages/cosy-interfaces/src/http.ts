/**
 * 文件上传接口
 */
export interface FileUpload {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    size: number
    destination?: string
    filename: string
    path: string
}

/**
 * Cookie 选项
 */
export interface CookieOptions {
    domain?: string
    expires?: Date
    httpOnly?: boolean
    maxAge?: number
    path?: string
    secure?: boolean
    signed?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
}

/**
 * HTTP 状态码
 */
export enum HttpStatus {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    PAYLOAD_TOO_LARGE = 413,
    UNSUPPORTED_MEDIA_TYPE = 415,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
}

/**
 * 请求接口
 */
export interface RequestInterface {
    method: string
    url: string
    path: string
    query: Record<string, any>
    params: Record<string, any>
    headers: Record<string, string>
    body: any
    cookies: Record<string, string>
    files: Record<string, FileUpload[]>
    ip: string
    userAgent: string
    isForm: boolean
    queryString: string

    get(key: string): any
    input(key: string, defaultValue?: any): any
    has(key: string): boolean
    header(name: string, defaultValue?: string): string
    file(name: string): FileUpload | FileUpload[] | undefined
    isAjax(): boolean
    isJson(): boolean
    fullUrl(): string
}

/**
 * 响应接口
 */
export interface ResponseInterface {
    status(code: number): ResponseInterface
    json(data: any): ResponseInterface
    html(content: string): ResponseInterface
    redirect(url: string, status?: number): ResponseInterface
    cookie(name: string, value: string, options?: CookieOptions): ResponseInterface
    clearCookie(name: string): ResponseInterface
    header(name: string, value: string): ResponseInterface
    send(content?: any): ResponseInterface
    download(filePath: string, filename?: string): ResponseInterface
    attachment(filename?: string): ResponseInterface
    getStatus(): number
    getHeaders(): Record<string, string>
    getCookies(): Array<{ name: string; value: string; options: CookieOptions | undefined }>
    getContent(): any
    hasResponded(): boolean
    getSetCookieHeaders(): string[]
}

/**
 * HTTP 上下文接口
 */
export interface HttpContextInterface {
    request: RequestInterface
    response: ResponseInterface
} 

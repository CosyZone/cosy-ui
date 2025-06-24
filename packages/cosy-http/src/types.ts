import { IncomingMessage, ServerResponse } from 'http'
import { Socket } from 'net'

/**
 * HTTP 请求方法枚举
 */
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS'
}

/**
 * HTTP 状态码枚举
 */
export enum HttpStatus {
    // 1xx Informational
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,

    // 2xx Success
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,

    // 3xx Redirection
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,

    // 4xx Client Error
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,

    // 5xx Server Error
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
}

/**
 * 文件上传接口
 */
export interface FileUpload {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    size: number
    destination: string
    filename: string
    path: string
}

/**
 * Cookie 选项接口
 */
export interface CookieOptions {
    maxAge?: number
    signed?: boolean
    expires?: Date
    httpOnly?: boolean
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: boolean | 'lax' | 'strict' | 'none'
}

/**
 * HTTP 上下文接口
 */
export interface HttpContextInterface {
    req: IncomingMessage
    res: ServerResponse
    socket: Socket
    protocol: string
    secure: boolean
    ip: string
    ips: string[]
    subdomains: string[]
    path: string
    hostname: string
    fresh: boolean
    stale: boolean
    xhr: boolean
    body: any
    params: Record<string, string>
    query: Record<string, string>
    cookies: Record<string, string>
    files?: FileUpload[]
    [key: string]: any
} 

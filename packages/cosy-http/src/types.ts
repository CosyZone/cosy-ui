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

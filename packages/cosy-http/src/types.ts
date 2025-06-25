import { IncomingMessage, ServerResponse } from 'http'
import { Socket } from 'net'
import { FileUpload } from '@coffic/cosy-interfaces'

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
export interface IHttpContext {
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

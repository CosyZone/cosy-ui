import type {
    MiddlewareHandler as IMiddlewareHandler,
    RequestInterface,
    ResponseInterface,
    MiddlewareContext,
    MiddlewareManager as IMiddlewareManager,
    MiddlewarePipeline as IMiddlewarePipeline,
    ConditionalMiddleware as IConditionalMiddleware,
    MiddlewareOptions,
    RouteHandler
} from '@coffic/cosy-interfaces'

export type {
    RequestInterface,
    ResponseInterface,
    MiddlewareOptions,
    RouteHandler,
    IMiddlewareHandler,
    IMiddlewarePipeline
}

export interface HttpContextInterface extends MiddlewareContext { }

export type NextFunction = () => Promise<void>

// 导出适配后的类型
export type MiddlewareHandler = IMiddlewareHandler

// 适配器类型，用于将新的中间件处理器转换为基础中间件处理器
export type MiddlewareAdapter = (
    handler: MiddlewareHandler
) => IMiddlewareHandler

// 创建中间件适配器
export const createMiddlewareAdapter: MiddlewareAdapter = (handler) => {
    return handler
}

// 创建基础中间件适配器
export const createBaseMiddlewareAdapter = (handler: IMiddlewareHandler): MiddlewareHandler => {
    return handler
}

export interface MiddlewareManager extends IMiddlewareManager { }

export interface MiddlewarePipeline extends IMiddlewarePipeline { }

export interface ConditionalMiddleware extends IConditionalMiddleware { }

// HTTP status codes
export enum HttpStatus {
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
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
}

// 中间件类型守卫
export function isIMiddlewareHandler(middleware: any): middleware is IMiddlewareHandler {
    return typeof middleware === 'function' && middleware.length === 3
}

export function isMiddlewareHandler(middleware: any): middleware is MiddlewareHandler {
    return typeof middleware === 'function' && middleware.length === 3
}

// 中间件存储类型
export type StoredMiddleware = MiddlewareHandler

// 中间件转换函数
export function convertToMiddlewareHandler(middleware: MiddlewareHandler | IMiddlewareHandler): StoredMiddleware {
    return middleware
}

// 中间件数组转换函数
export function convertToMiddlewareHandlers(middlewares: (MiddlewareHandler | IMiddlewareHandler)[]): StoredMiddleware[] {
    return middlewares
}

// 中间件适配器转换函数
export function convertToIMiddlewareHandler(middleware: StoredMiddleware): IMiddlewareHandler {
    return middleware
}

// 中间件数组适配器转换函数
export function convertToIMiddlewareHandlers(middlewares: StoredMiddleware[]): IMiddlewareHandler[] {
    return middlewares
}

// 中间件类型转换
export type AnyMiddleware = MiddlewareHandler | IMiddlewareHandler
export type AnyMiddlewareArray = (MiddlewareHandler | IMiddlewareHandler)[] 

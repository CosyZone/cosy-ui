import type {
    IMiddlewareHandler,
} from '@coffic/cosy-interfaces'

export type NextFunction = () => Promise<void>

// 适配器类型，用于将新的中间件处理器转换为基础中间件处理器
export type MiddlewareAdapter = (
    handler: IMiddlewareHandler
) => IMiddlewareHandler

// 创建中间件适配器
export const createMiddlewareAdapter: MiddlewareAdapter = (handler) => {
    return handler
}

// 创建基础中间件适配器
export const createBaseMiddlewareAdapter = (handler: IMiddlewareHandler): IMiddlewareHandler => {
    return handler
}

// 中间件类型守卫
export function isIMiddlewareHandler(middleware: any): middleware is IMiddlewareHandler {
    return typeof middleware === 'function' && middleware.length === 3
}

export function isMiddlewareHandler(middleware: any): middleware is IMiddlewareHandler {
    return typeof middleware === 'function' && middleware.length === 3
}

// 中间件存储类型
export type StoredMiddleware = IMiddlewareHandler

// 中间件转换函数
export function convertToMiddlewareHandler(middleware: IMiddlewareHandler | IMiddlewareHandler): StoredMiddleware {
    return middleware
}

// 中间件数组转换函数
export function convertToMiddlewareHandlers(middlewares: (IMiddlewareHandler | IMiddlewareHandler)[]): StoredMiddleware[] {
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
export type AnyMiddleware = IMiddlewareHandler | IMiddlewareHandler
export type AnyMiddlewareArray = (IMiddlewareHandler | IMiddlewareHandler)[] 

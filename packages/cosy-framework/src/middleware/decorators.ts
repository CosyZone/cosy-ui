import 'reflect-metadata'
import { MiddlewareHandler } from '../types'
import { auth, cors, rateLimit } from './common'

const MIDDLEWARE_METADATA = Symbol('middleware')

/**
 * 中间件装饰器（类装饰器）
 */
export function UseMiddleware(...middlewares: MiddlewareHandler[]) {
    return function <T extends new (...args: any[]) => any>(target: T) {
        const existingMiddlewares = Reflect.getMetadata(MIDDLEWARE_METADATA, target) || []
        Reflect.defineMetadata(MIDDLEWARE_METADATA, [...existingMiddlewares, ...middlewares], target)
        return target
    }
}

/**
 * 中间件装饰器（方法装饰器）
 */
export function Middleware(...middlewares: MiddlewareHandler[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const existingMiddlewares = Reflect.getMetadata(MIDDLEWARE_METADATA, target, propertyKey) || []
        Reflect.defineMetadata(MIDDLEWARE_METADATA, [...existingMiddlewares, ...middlewares], target, propertyKey)
        return descriptor
    }
}

/**
 * 身份验证装饰器
 */
export function Auth(options: Parameters<typeof auth>[0] = {}) {
    return Middleware(auth(options))
}

/**
 * 限流装饰器
 */
export function RateLimit(max: number, windowMs?: number) {
    const options: Parameters<typeof rateLimit>[0] = { max };
    if (windowMs !== undefined) {
        options.windowMs = windowMs;
    }
    return Middleware(rateLimit(options))
}

/**
 * CORS 装饰器
 */
export function Cors(options: Parameters<typeof cors>[0] = {}) {
    return Middleware(cors(options))
}

/**
 * 获取类中间件
 */
export function getClassMiddleware(target: any): MiddlewareHandler[] {
    return Reflect.getMetadata(MIDDLEWARE_METADATA, target) || []
}

/**
 * 获取方法中间件
 */
export function getMethodMiddleware(target: any, propertyKey: string): MiddlewareHandler[] {
    return Reflect.getMetadata(MIDDLEWARE_METADATA, target, propertyKey) || []
}

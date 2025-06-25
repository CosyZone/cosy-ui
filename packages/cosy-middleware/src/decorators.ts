import 'reflect-metadata'
import { IMiddlewareHandler } from '@coffic/cosy-interfaces'
import { auth, cors, rateLimit } from './common.js'

const MIDDLEWARE_METADATA_KEY = Symbol('middleware')

/**
 * 中间件装饰器（类装饰器）
 */
export function UseMiddleware(...middlewares: IMiddlewareHandler[]) {
    return function <T extends new (...args: any[]) => any>(target: T) {
        const existingMiddlewares = Reflect.getMetadata(MIDDLEWARE_METADATA_KEY, target) || []
        Reflect.defineMetadata(MIDDLEWARE_METADATA_KEY, [...existingMiddlewares, ...middlewares], target)
        return target
    }
}

/**
 * 中间件装饰器（方法装饰器）
 */
export function Middleware(handler: IMiddlewareHandler) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MIDDLEWARE_METADATA_KEY, target, propertyKey) || []
        Reflect.defineMetadata(MIDDLEWARE_METADATA_KEY, [...middlewares, handler], target, propertyKey)
        return descriptor
    }
}

/**
 * 身份验证装饰器
 */
export function Auth() {
    return Middleware(auth)
}

/**
 * 限流装饰器
 */
export function RateLimit() {
    return Middleware(rateLimit)
}

/**
 * CORS 装饰器
 */
export function Cors() {
    return Middleware(cors)
}

/**
 * 获取类中间件
 */
export function getClassMiddleware(target: any): IMiddlewareHandler[] {
    return Reflect.getMetadata(MIDDLEWARE_METADATA_KEY, target) || []
}

/**
 * 获取方法中间件
 */
export function getMethodMiddleware(target: any, propertyKey: string): IMiddlewareHandler[] {
    return Reflect.getMetadata(MIDDLEWARE_METADATA_KEY, target, propertyKey) || []
}

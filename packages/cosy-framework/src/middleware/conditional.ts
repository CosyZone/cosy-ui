import { ConditionalMiddleware, MiddlewareHandler, HttpContextInterface, NextFunction } from '../types'

export class ConditionalMiddlewareWrapper implements ConditionalMiddleware {
    constructor(private middleware: MiddlewareHandler) { }

    /**
     * 当条件为真时执行中间件
     */
    when(condition: (context: HttpContextInterface) => boolean): MiddlewareHandler {
        return async (context: HttpContextInterface, next: NextFunction) => {
            if (condition(context)) {
                return this.middleware(context, next)
            }
            return next()
        }
    }

    /**
     * 当条件为假时执行中间件
     */
    unless(condition: (context: HttpContextInterface) => boolean): MiddlewareHandler {
        return async (context: HttpContextInterface, next: NextFunction) => {
            if (!condition(context)) {
                return this.middleware(context, next)
            }
            return next()
        }
    }
}

/**
 * 创建条件中间件
 */
export function conditional(middleware: MiddlewareHandler): ConditionalMiddleware {
    return new ConditionalMiddlewareWrapper(middleware)
}

/**
 * 路径条件中间件
 */
export function whenPath(pattern: string | RegExp, middleware: MiddlewareHandler): MiddlewareHandler {
    return conditional(middleware).when(context => {
        if (pattern instanceof RegExp) {
            return pattern.test(context.request.path)
        }
        return context.request.path === pattern
    })
}

/**
 * 方法条件中间件
 */
export function whenMethod(methods: string | string[], middleware: MiddlewareHandler): MiddlewareHandler {
    const methodArray = Array.isArray(methods) ? methods : [methods]
    return conditional(middleware).when(context =>
        methodArray.includes(context.request.method)
    )
}

/**
 * 头部条件中间件
 */
export function whenHeader(name: string, middleware: MiddlewareHandler): MiddlewareHandler
export function whenHeader(name: string, value: string, middleware: MiddlewareHandler): MiddlewareHandler
export function whenHeader(name: string, valueOrMiddleware: string | MiddlewareHandler, middleware?: MiddlewareHandler): MiddlewareHandler {

    const actualMiddleware = typeof valueOrMiddleware === 'function' ? valueOrMiddleware : middleware!
    const value = typeof valueOrMiddleware === 'string' ? valueOrMiddleware : undefined

    return conditional(actualMiddleware).when(context => {
        const headerValue = context.request.header(name)
        if (value === undefined) {
            return !!headerValue
        }
        return headerValue === value
    })
}

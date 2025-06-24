import { ConditionalMiddleware, MiddlewareHandler, RequestInterface, ResponseInterface } from './types'

export class ConditionalMiddlewareImpl implements ConditionalMiddleware {
    constructor(private middleware: MiddlewareHandler) { }

    when(condition: (request: RequestInterface, response: ResponseInterface) => boolean): MiddlewareHandler {
        return async (request, response, next) => {
            if (condition(request, response)) {
                return this.middleware(request, response, next)
            }
            return next()
        }
    }

    unless(condition: (request: RequestInterface, response: ResponseInterface) => boolean): MiddlewareHandler {
        return this.when((request, response) => !condition(request, response))
    }
}

export const conditional = (middleware: MiddlewareHandler): ConditionalMiddleware => {
    return new ConditionalMiddlewareImpl(middleware)
}

/**
 * 路径匹配条件
 */
export const path = (pattern: string | RegExp) => {
    return (request: RequestInterface) => {
        if (pattern instanceof RegExp) {
            return pattern.test(request.path)
        }
        return request.path === pattern
    }
}

/**
 * HTTP 方法匹配条件
 */
export const method = (methods: string | string[]) => {
    const methodArray = Array.isArray(methods) ? methods : [methods]
    return (request: RequestInterface) => {
        return methodArray.includes(request.method)
    }
}

/**
 * 请求头匹配条件
 */
export const header = (name: string, value?: string) => {
    return (request: RequestInterface) => {
        const headerValue = request.header(name)
        if (!headerValue) return false
        if (value === undefined) return true
        return headerValue === value
    }
}

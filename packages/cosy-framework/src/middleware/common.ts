import { MiddlewareHandler, HttpContextInterface, NextFunction, HttpStatus } from '../types'

/**
 * CORS 中间件
 */
export function cors(options: {
    origin?: string | string[]
    methods?: string[]
    allowedHeaders?: string[]
    credentials?: boolean
} = {}): MiddlewareHandler {
    return async (context: HttpContextInterface, next: NextFunction) => {
        const { request, response } = context
        const requestOrigin = request.header('origin')

        // 设置 CORS 头
        const origin = Array.isArray(options.origin)
            ? (requestOrigin && options.origin.includes(requestOrigin) ? requestOrigin : (options.origin[0] || '*'))
            : options.origin || '*'

        response.header('Access-Control-Allow-Origin', origin)

        if (options.methods) {
            response.header('Access-Control-Allow-Methods', options.methods.join(', '))
        }

        if (options.allowedHeaders) {
            response.header('Access-Control-Allow-Headers', options.allowedHeaders.join(', '))
        }

        if (options.credentials) {
            response.header('Access-Control-Allow-Credentials', 'true')
        }

        // 处理预检请求
        if (request.method === 'OPTIONS') {
            return response.status(HttpStatus.NO_CONTENT).send()
        }

        return next()
    }
}

/**
 * 日志中间件
 */
export function logger(options: {
    format?: string
    skip?: (context: HttpContextInterface) => boolean
} = {}): MiddlewareHandler {
    return async (context: HttpContextInterface, next: NextFunction) => {
        const { request } = context
        const start = Date.now()

        if (options.skip && options.skip(context)) {
            return next()
        }

        console.log(`${request.method} ${request.path} - ${request.ip} - ${new Date().toISOString()}`)

        try {
            const result = await next()
            const duration = Date.now() - start
            console.log(`${request.method} ${request.path} - ${context.response.getStatus()} - ${duration}ms`)
            return result
        } catch (error) {
            const duration = Date.now() - start
            console.log(`${request.method} ${request.path} - ERROR - ${duration}ms`)
            throw error
        }
    }
}

/**
 * 身份验证中间件
 */
export function auth(options: {
    secret?: string
    header?: string
    validate?: (token: string) => Promise<any>
} = {}): MiddlewareHandler {
    return async (context: HttpContextInterface, next: NextFunction) => {
        const { request, response } = context
        const headerName = options.header || 'authorization'
        const authHeader = request.header(headerName)

        if (!authHeader) {
            return response.status(HttpStatus.UNAUTHORIZED).json({
                error: 'Authorization header required'
            })
        }

        try {
            let token = authHeader
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7)
            }

            if (options.validate) {
                const user = await options.validate(token)
                    // 将用户信息添加到上下文
                    ; (context as any).user = user
            }

            return next()
        } catch (error) {
            return response.status(HttpStatus.UNAUTHORIZED).json({
                error: 'Invalid authentication token'
            })
        }
    }
}

/**
 * 限流中间件
 */
export function rateLimit(options: {
    max?: number
    windowMs?: number
    message?: string
    keyGenerator?: (context: HttpContextInterface) => string
} = {}): MiddlewareHandler {
    const max = options.max || 100
    const windowMs = options.windowMs || 15 * 60 * 1000 // 15 minutes
    const message = options.message || 'Too many requests'
    const keyGenerator = options.keyGenerator || ((ctx) => ctx.request.ip)

    const requests = new Map<string, { count: number; resetTime: number }>()

    return async (context: HttpContextInterface, next: NextFunction) => {
        const key = keyGenerator(context)
        const now = Date.now()
        const record = requests.get(key)

        if (!record || now > record.resetTime) {
            // 新的时间窗口
            requests.set(key, { count: 1, resetTime: now + windowMs })
            return next()
        }

        if (record.count >= max) {
            // 超过限制
            return context.response.status(HttpStatus.TOO_MANY_REQUESTS).json({
                error: message,
                retryAfter: Math.ceil((record.resetTime - now) / 1000)
            })
        }

        // 增加计数
        record.count++
        return next()
    }
}

/**
 * 错误处理中间件
 */
export function errorHandler(options: {
    showStack?: boolean
    logger?: (error: Error, context: HttpContextInterface) => void
} = {}): MiddlewareHandler {
    return async (context: HttpContextInterface, next: NextFunction) => {
        try {
            return await next()
        } catch (error) {
            const err = error as Error

            if (options.logger) {
                options.logger(err, context)
            } else {
                console.error('Error:', err.message)
                if (options.showStack) {
                    console.error('Stack:', err.stack)
                }
            }

            const statusCode = (error as any).statusCode || HttpStatus.INTERNAL_SERVER_ERROR
            const response = {
                error: err.message,
                ...(options.showStack && { stack: err.stack })
            }

            return context.response.status(statusCode).json(response)
        }
    }
}

/**
 * 请求体解析中间件
 */
export function bodyParser(options: {
    limit?: string
    type?: string | string[]
} = {}): MiddlewareHandler {
    return async (context: HttpContextInterface, next: NextFunction) => {
        const { request } = context
        const contentType = request.header('content-type')

        // 这里只是示例，实际实现需要解析请求体
        if (contentType) {
            if (contentType.includes('application/json')) {
                // 解析 JSON 体
                // request.body = parseJsonBody(rawBody)
            } else if (contentType.includes('application/x-www-form-urlencoded')) {
                // 解析表单体
                // request.body = parseFormBody(rawBody)
            }
        }

        return next()
    }
}

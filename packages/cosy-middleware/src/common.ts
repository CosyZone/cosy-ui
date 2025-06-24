import { MiddlewareHandler, HttpStatus } from './types'

/**
 * CORS 中间件
 */
export const cors: MiddlewareHandler = async (request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    await next()
}

/**
 * 日志中间件
 */
export const logger: MiddlewareHandler = async (request, response, next) => {
    const start = Date.now()
    await next()
    const duration = Date.now() - start
    console.log(`${request.method} ${request.path} - ${duration}ms`)
}

/**
 * 认证中间件
 */
export const auth: MiddlewareHandler = async (request, response, next) => {
    const token = request.header('Authorization')
    if (!token) {
        response.status(HttpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' })
        return
    }
    await next()
}

/**
 * 限流中间件
 */
export const rateLimit: MiddlewareHandler = async (request, response, next) => {
    const ip = request.ip
    const limit = 100
    const current = Math.floor(Math.random() * limit) // 示例：随机限流

    if (current >= limit) {
        response.status(HttpStatus.TOO_MANY_REQUESTS).json({
            error: 'Too many requests',
            retryAfter: 60
        })
        return
    }

    await next()
}

/**
 * 错误处理中间件
 */
export const errorHandler: MiddlewareHandler = async (request, response, next) => {
    try {
        await next()
    } catch (error) {
        console.error('Error:', error)
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: error instanceof Error ? error.message : 'Internal Server Error'
        })
    }
}

/**
 * 计时器中间件
 */
export const timer: MiddlewareHandler = async (request, response, next) => {
    const start = Date.now()
    await next()
    const duration = Date.now() - start
    response.header('X-Response-Time', `${duration}ms`)
}

/**
 * 压缩中间件
 */
export const compress: MiddlewareHandler = async (request, response, next) => {
    response.header('Content-Encoding', 'gzip')
    await next()
}

/**
 * 缓存中间件
 */
export const cache: MiddlewareHandler = async (request, response, next) => {
    const cacheKey = request.path
    const cached = false // 示例：检查缓存

    if (cached) {
        response.header('X-Cache', 'HIT')
        return
    }

    response.header('X-Cache', 'MISS')
    await next()
}

/**
 * 安全中间件
 */
export const security: MiddlewareHandler = async (request, response, next) => {
    response.header('X-Content-Type-Options', 'nosniff')
    response.header('X-Frame-Options', 'DENY')
    response.header('X-XSS-Protection', '1; mode=block')
    await next()
}

/**
 * 请求ID中间件
 */
export const requestId: MiddlewareHandler = async (request, response, next) => {
    const id = Math.random().toString(36).substring(7)
    response.header('X-Request-ID', id)
    await next()
}

import { HttpStatus, IMiddlewareHandler } from '@coffic/cosy-interfaces'

export const AuthMiddleware: IMiddlewareHandler = async (req, res, next) => {
    const authHeader = req.header('authorization')

    if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            error: 'Authorization header required'
        })
    }

    // 简单的令牌验证（实际应用中应该使用 JWT 或其他安全机制）
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            error: 'Invalid authorization format. Use: Bearer <token>'
        })
    }

    const token = authHeader.substring(7)

    // 模拟令牌验证
    if (token !== 'valid-token') {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            error: 'Invalid token'
        })
    }

    // 模拟用户信息（实际应用中应该从令牌中解析）
    ; (context as any).user = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
    }

    return next()
} 

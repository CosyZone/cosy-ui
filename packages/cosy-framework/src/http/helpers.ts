import { HttpStatus, HttpMethod } from '../types'

/**
 * 检查是否为成功状态码
 */
export function isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300
}

/**
 * 检查是否为重定向状态码
 */
export function isRedirectStatus(status: number): boolean {
    return status >= 300 && status < 400
}

/**
 * 检查是否为客户端错误状态码
 */
export function isClientErrorStatus(status: number): boolean {
    return status >= 400 && status < 500
}

/**
 * 检查是否为服务器错误状态码
 */
export function isServerErrorStatus(status: number): boolean {
    return status >= 500 && status < 600
}

/**
 * 获取状态码描述
 */
export function getStatusText(status: number): string {
    const statusTexts: Record<number, string> = {
        [HttpStatus.OK]: 'OK',
        [HttpStatus.CREATED]: 'Created',
        [HttpStatus.ACCEPTED]: 'Accepted',
        [HttpStatus.NO_CONTENT]: 'No Content',
        [HttpStatus.MOVED_PERMANENTLY]: 'Moved Permanently',
        [HttpStatus.FOUND]: 'Found',
        [HttpStatus.NOT_MODIFIED]: 'Not Modified',
        [HttpStatus.BAD_REQUEST]: 'Bad Request',
        [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
        [HttpStatus.FORBIDDEN]: 'Forbidden',
        [HttpStatus.NOT_FOUND]: 'Not Found',
        [HttpStatus.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
        [HttpStatus.CONFLICT]: 'Conflict',
        [HttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
        [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
        [HttpStatus.NOT_IMPLEMENTED]: 'Not Implemented',
        [HttpStatus.BAD_GATEWAY]: 'Bad Gateway',
        [HttpStatus.SERVICE_UNAVAILABLE]: 'Service Unavailable'
    }

    return statusTexts[status] || 'Unknown Status'
}

/**
 * 解析内容类型
 */
export function parseContentType(contentType: string): { type: string; charset: string | undefined } {
    if (!contentType) return { type: 'application/octet-stream', charset: undefined }
    const [firstPart = 'application/octet-stream', ...rest] = contentType.split(';')
    const type = firstPart.trim()
    const charsetPart = rest.find(p => p.trim().startsWith('charset='))
    const charset = charsetPart ? charsetPart.split('=')[1]?.trim() : undefined

    return { type, charset }
}

/**
 * 判断是否为安全 HTTP 方法
 */
export function isSafeMethod(method: string): boolean {
    return [HttpMethod.GET, HttpMethod.HEAD, HttpMethod.OPTIONS].includes(method as HttpMethod)
}

/**
 * 判断是否为幂等 HTTP 方法
 */
export function isIdempotentMethod(method: string): boolean {
    return [HttpMethod.GET, HttpMethod.HEAD, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.OPTIONS].includes(method as HttpMethod)
} 

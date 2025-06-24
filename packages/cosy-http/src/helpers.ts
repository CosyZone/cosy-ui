import { IncomingMessage, ServerResponse } from 'http'
import { Context } from './context'

/**
 * 创建 HTTP 上下文
 * @param req HTTP 请求对象
 * @param res HTTP 响应对象
 */
export function createContext(req: IncomingMessage, res: ServerResponse): Context {
    return new Context(req, res)
}

/**
 * 解析 URL 查询字符串
 * @param url URL 字符串
 */
export function parseQuery(url: string): Record<string, string> {
    const queryIndex = url.indexOf('?')
    if (queryIndex === -1) {
        return {}
    }

    const query = url.slice(queryIndex + 1)
    const params: Record<string, string> = {}

    query.split('&').forEach(param => {
        const [key, value] = param.split('=')
        if (key) {
            params[decodeURIComponent(key)] = decodeURIComponent(value || '')
        }
    })

    return params
}

/**
 * 解析 Cookie 字符串
 * @param cookieStr Cookie 字符串
 */
export function parseCookies(cookieStr: string): Record<string, string> {
    const cookies: Record<string, string> = {}

    if (!cookieStr) {
        return cookies
    }

    cookieStr.split(';').forEach(cookie => {
        const [key, value] = cookie.trim().split('=')
        if (key) {
            cookies[decodeURIComponent(key)] = decodeURIComponent(value || '')
        }
    })

    return cookies
}

/**
 * 解析 Accept-Language 头
 * @param acceptLanguage Accept-Language 头值
 */
export function parseAcceptLanguage(acceptLanguage: string): string[] {
    if (!acceptLanguage) {
        return []
    }

    return acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].trim())
}

/**
 * 解析 Content-Type 头
 * @param contentType Content-Type 头值
 */
export function parseContentType(contentType: string): { type: string; charset?: string } {
    if (!contentType) {
        return { type: '' }
    }

    const [type, ...params] = contentType.split(';').map(s => s.trim())
    const charset = params
        .find(p => p.startsWith('charset='))
        ?.split('=')[1]

    return { type, charset }
}

/**
 * 检查请求是否接受指定的内容类型
 * @param req HTTP 请求对象
 * @param type 内容类型
 */
export function accepts(req: IncomingMessage, type: string): boolean {
    const accept = req.headers.accept || ''

    if (!accept) {
        return true
    }

    if (accept === '*/*') {
        return true
    }

    return accept.split(',').some(t => {
        const [acceptType] = t.split(';')
        return acceptType.trim() === type
    })
}

/**
 * 检查请求是否接受 JSON
 * @param req HTTP 请求对象
 */
export function acceptsJson(req: IncomingMessage): boolean {
    return accepts(req, 'application/json')
}

/**
 * 检查请求是否接受 HTML
 * @param req HTTP 请求对象
 */
export function acceptsHtml(req: IncomingMessage): boolean {
    return accepts(req, 'text/html')
}

/**
 * 检查请求是否接受纯文本
 * @param req HTTP 请求对象
 */
export function acceptsText(req: IncomingMessage): boolean {
    return accepts(req, 'text/plain')
}

/**
 * 获取请求的优先语言
 * @param req HTTP 请求对象
 * @param supported 支持的语言列表
 */
export function preferredLanguage(req: IncomingMessage, supported: string[]): string | undefined {
    const acceptLanguage = req.headers['accept-language']
    if (!acceptLanguage) {
        return supported[0]
    }

    const languages = parseAcceptLanguage(acceptLanguage)
    return languages.find(lang => supported.includes(lang))
} 

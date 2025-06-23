# 步骤 003：HTTP 基础设施

## 目标
实现 HTTP 请求和响应的基础设施，为路由和控制器奠定基础。

## 任务清单
- [ ] 创建 Request 和 Response 类
- [ ] 实现 HTTP 状态码枚举
- [ ] 创建 Cookie 和 Session 支持
- [ ] 实现文件上传处理
- [ ] 创建 HTTP 测试

## 执行步骤

### 1. 更新类型定义

**更新文件**: `src/types/index.ts`

在现有内容后添加：

```typescript
// HTTP 扩展类型
export interface RequestInterface {
  method: string
  url: string
  path: string
  query: Record<string, any>
  params: Record<string, any>
  headers: Record<string, string>
  body: any
  cookies: Record<string, string>
  files: Record<string, FileUpload[]>
  ip: string
  userAgent: string
  get(key: string): any
  has(key: string): boolean
  input(key?: string, defaultValue?: any): any
  cookie(name: string, defaultValue?: string): string
  header(name: string, defaultValue?: string): string
  file(name: string): FileUpload | FileUpload[] | undefined
}

export interface ResponseInterface {
  status(code: number): ResponseInterface
  json(data: any): ResponseInterface
  html(content: string): ResponseInterface
  redirect(url: string, status?: number): ResponseInterface
  cookie(name: string, value: string, options?: CookieOptions): ResponseInterface
  clearCookie(name: string): ResponseInterface
  header(name: string, value: string): ResponseInterface
  send(content?: any): ResponseInterface
  download(filePath: string, filename?: string): ResponseInterface
  attachment(filename?: string): ResponseInterface
}

export interface FileUpload {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  destination?: string
  filename?: string
  path?: string
  buffer?: Buffer
}

export interface CookieOptions {
  maxAge?: number
  expires?: Date
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  domain?: string
  path?: string
}

export interface HttpContextInterface {
  request: RequestInterface
  response: ResponseInterface
}

// HTTP 状态码
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503
}

// HTTP 方法
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS'
}
```

### 2. 创建 HTTP Request 类

**创建文件**: `src/http/request.ts`

```typescript
import { RequestInterface, FileUpload } from '../types'

export class Request implements RequestInterface {
  public method: string
  public url: string
  public path: string
  public query: Record<string, any> = {}
  public params: Record<string, any> = {}
  public headers: Record<string, string> = {}
  public body: any = {}
  public cookies: Record<string, string> = {}
  public files: Record<string, FileUpload[]> = {}
  public ip: string = ''
  public userAgent: string = ''

  constructor(options: {
    method: string
    url: string
    headers?: Record<string, string>
    body?: any
    query?: Record<string, any>
    params?: Record<string, any>
    cookies?: Record<string, string>
    files?: Record<string, FileUpload[]>
    ip?: string
    userAgent?: string
  }) {
    this.method = options.method.toUpperCase()
    this.url = options.url
    this.headers = options.headers || {}
    this.body = options.body || {}
    this.query = options.query || {}
    this.params = options.params || {}
    this.cookies = options.cookies || {}
    this.files = options.files || {}
    this.ip = options.ip || ''
    this.userAgent = options.userAgent || this.headers['user-agent'] || ''

    // 解析路径（移除查询字符串）
    const urlObj = new URL(this.url, 'http://localhost')
    this.path = urlObj.pathname
  }

  /**
   * 获取请求数据
   */
  get(key: string): any {
    return this.input(key)
  }

  /**
   * 检查是否存在某个键
   */
  has(key: string): boolean {
    return this.input(key) !== undefined
  }

  /**
   * 获取输入数据（从 body 和 query 中）
   */
  input(key?: string, defaultValue?: any): any {
    const allInput = { ...this.query, ...this.body }
    
    if (key === undefined) {
      return allInput
    }
    
    return allInput[key] ?? defaultValue
  }

  /**
   * 获取 Cookie
   */
  cookie(name: string, defaultValue?: string): string {
    return this.cookies[name] ?? defaultValue ?? ''
  }

  /**
   * 获取请求头
   */
  header(name: string, defaultValue?: string): string {
    const lowerName = name.toLowerCase()
    for (const [key, value] of Object.entries(this.headers)) {
      if (key.toLowerCase() === lowerName) {
        return value
      }
    }
    return defaultValue ?? ''
  }

  /**
   * 获取上传文件
   */
  file(name: string): FileUpload | FileUpload[] | undefined {
    return this.files[name]
  }

  /**
   * 判断请求是否为 AJAX
   */
  isAjax(): boolean {
    return this.header('x-requested-with') === 'XMLHttpRequest'
  }

  /**
   * 判断是否为 JSON 请求
   */
  isJson(): boolean {
    const contentType = this.header('content-type').toLowerCase()
    return contentType.includes('application/json')
  }

  /**
   * 判断是否为表单请求
   */
  isForm(): boolean {
    const contentType = this.header('content-type').toLowerCase()
    return contentType.includes('application/x-www-form-urlencoded') ||
           contentType.includes('multipart/form-data')
  }

  /**
   * 获取完整 URL
   */
  fullUrl(): string {
    return this.url
  }

  /**
   * 获取查询字符串
   */
  queryString(): string {
    const urlObj = new URL(this.url, 'http://localhost')
    return urlObj.search
  }
}
```

### 3. 创建 HTTP Response 类

**创建文件**: `src/http/response.ts`

```typescript
import { ResponseInterface, CookieOptions, HttpStatus } from '../types'

export class Response implements ResponseInterface {
  private statusCode: number = HttpStatus.OK
  private responseHeaders: Record<string, string> = {}
  private cookieData: Array<{ name: string; value: string; options?: CookieOptions }> = []
  private content: any = null
  private isResponded: boolean = false

  /**
   * 设置状态码
   */
  status(code: number): ResponseInterface {
    this.statusCode = code
    return this
  }

  /**
   * 发送 JSON 响应
   */
  json(data: any): ResponseInterface {
    this.header('Content-Type', 'application/json')
    this.content = JSON.stringify(data, null, 2)
    this.isResponded = true
    return this
  }

  /**
   * 发送 HTML 响应
   */
  html(content: string): ResponseInterface {
    this.header('Content-Type', 'text/html; charset=utf-8')
    this.content = content
    this.isResponded = true
    return this
  }

  /**
   * 重定向
   */
  redirect(url: string, status: number = HttpStatus.FOUND): ResponseInterface {
    this.status(status)
    this.header('Location', url)
    this.isResponded = true
    return this
  }

  /**
   * 设置 Cookie
   */
  cookie(name: string, value: string, options?: CookieOptions): ResponseInterface {
    this.cookieData.push({ name, value, options })
    return this
  }

  /**
   * 清除 Cookie
   */
  clearCookie(name: string): ResponseInterface {
    return this.cookie(name, '', {
      expires: new Date(0),
      path: '/'
    })
  }

  /**
   * 设置响应头
   */
  header(name: string, value: string): ResponseInterface {
    this.responseHeaders[name] = value
    return this
  }

  /**
   * 发送内容
   */
  send(content?: any): ResponseInterface {
    if (content !== undefined) {
      this.content = content
    }
    this.isResponded = true
    return this
  }

  /**
   * 下载文件
   */
  download(filePath: string, filename?: string): ResponseInterface {
    this.header('Content-Disposition', `attachment; filename="${filename || 'download'}"`)
    this.header('Content-Type', 'application/octet-stream')
    this.content = filePath // 实际实现中这里应该读取文件内容
    this.isResponded = true
    return this
  }

  /**
   * 设置为附件
   */
  attachment(filename?: string): ResponseInterface {
    if (filename) {
      this.header('Content-Disposition', `attachment; filename="${filename}"`)
    } else {
      this.header('Content-Disposition', 'attachment')
    }
    return this
  }

  /**
   * 获取状态码
   */
  getStatus(): number {
    return this.statusCode
  }

  /**
   * 获取响应头
   */
  getHeaders(): Record<string, string> {
    return { ...this.responseHeaders }
  }

  /**
   * 获取 Cookie 数据
   */
  getCookies(): Array<{ name: string; value: string; options?: CookieOptions }> {
    return [...this.cookieData]
  }

  /**
   * 获取响应内容
   */
  getContent(): any {
    return this.content
  }

  /**
   * 检查是否已响应
   */
  hasResponded(): boolean {
    return this.isResponded
  }

  /**
   * 生成 Set-Cookie 头
   */
  private generateSetCookieHeader(name: string, value: string, options?: CookieOptions): string {
    let cookieString = `${name}=${value}`

    if (options) {
      if (options.maxAge) {
        cookieString += `; Max-Age=${options.maxAge}`
      }
      if (options.expires) {
        cookieString += `; Expires=${options.expires.toUTCString()}`
      }
      if (options.httpOnly) {
        cookieString += '; HttpOnly'
      }
      if (options.secure) {
        cookieString += '; Secure'
      }
      if (options.sameSite) {
        cookieString += `; SameSite=${options.sameSite}`
      }
      if (options.domain) {
        cookieString += `; Domain=${options.domain}`
      }
      if (options.path) {
        cookieString += `; Path=${options.path}`
      }
    }

    return cookieString
  }

  /**
   * 获取所有 Set-Cookie 头
   */
  getSetCookieHeaders(): string[] {
    return this.cookieData.map(cookie =>
      this.generateSetCookieHeader(cookie.name, cookie.value, cookie.options)
    )
  }
}
```

### 4. 创建 HTTP Context

**创建文件**: `src/http/context.ts`

```typescript
import { HttpContextInterface, RequestInterface, ResponseInterface } from '../types'
import { Request } from './request'
import { Response } from './response'

export class HttpContext implements HttpContextInterface {
  public readonly request: RequestInterface
  public readonly response: ResponseInterface

  constructor(request: RequestInterface, response?: ResponseInterface) {
    this.request = request
    this.response = response || new Response()
  }

  /**
   * 从原生 HTTP 请求创建上下文
   */
  static fromIncomingMessage(req: any, res?: any): HttpContext {
    const request = new Request({
      method: req.method || 'GET',
      url: req.url || '/',
      headers: req.headers || {},
      body: req.body || {},
      query: req.query || {},
      ip: req.ip || req.connection?.remoteAddress || '',
      userAgent: req.headers?.['user-agent'] || ''
    })

    const response = new Response()

    return new HttpContext(request, response)
  }

  /**
   * 从对象创建上下文（用于测试）
   */
  static create(options: {
    method?: string
    url?: string
    headers?: Record<string, string>
    body?: any
    query?: Record<string, any>
    params?: Record<string, any>
  } = {}): HttpContext {
    const request = new Request({
      method: options.method || 'GET',
      url: options.url || '/',
      headers: options.headers || {},
      body: options.body || {},
      query: options.query || {},
      params: options.params || {}
    })

    const response = new Response()

    return new HttpContext(request, response)
  }
}
```

### 5. 创建 HTTP 工具函数

**创建文件**: `src/http/helpers.ts`

```typescript
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
export function parseContentType(contentType: string): { type: string; charset?: string } {
  const parts = contentType.split(';')
  const type = parts[0].trim()
  const charset = parts.find(p => p.trim().startsWith('charset='))?.split('=')[1]?.trim()
  
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
```

### 6. 更新 HTTP 模块导出

**更新文件**: `src/http/index.ts`

```typescript
// 核心类
export { Request } from './request'
export { Response } from './response'
export { HttpContext } from './context'

// 工具函数
export {
  isSuccessStatus,
  isRedirectStatus,
  isClientErrorStatus,
  isServerErrorStatus,
  getStatusText,
  parseContentType,
  isSafeMethod,
  isIdempotentMethod
} from './helpers'

// 类型和枚举
export type {
  RequestInterface,
  ResponseInterface,
  HttpContextInterface,
  FileUpload,
  CookieOptions
} from '../types'

export { HttpStatus, HttpMethod } from '../types'
```

### 7. 创建 HTTP 测试

**创建文件**: `tests/unit/http.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { Request, Response, HttpContext, HttpStatus, HttpMethod } from '../../src/http'

describe('HTTP Foundation', () => {
  describe('Request', () => {
    it('should create request with basic data', () => {
      const request = new Request({
        method: 'POST',
        url: 'https://example.com/api/users?page=1',
        headers: { 'content-type': 'application/json' },
        body: { name: 'John' },
        query: { page: '1' }
      })

      expect(request.method).toBe('POST')
      expect(request.path).toBe('/api/users')
      expect(request.query.page).toBe('1')
      expect(request.body.name).toBe('John')
      expect(request.header('content-type')).toBe('application/json')
    })

    it('should handle input data correctly', () => {
      const request = new Request({
        method: 'POST',
        url: '/test',
        body: { name: 'John', age: 30 },
        query: { filter: 'active' }
      })

      expect(request.input('name')).toBe('John')
      expect(request.input('filter')).toBe('active')
      expect(request.input('missing', 'default')).toBe('default')
      expect(request.has('name')).toBe(true)
      expect(request.has('missing')).toBe(false)
    })

    it('should detect request types', () => {
      const jsonRequest = new Request({
        method: 'POST',
        url: '/test',
        headers: { 'content-type': 'application/json' }
      })

      const formRequest = new Request({
        method: 'POST',
        url: '/test',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })

      const ajaxRequest = new Request({
        method: 'GET',
        url: '/test',
        headers: { 'x-requested-with': 'XMLHttpRequest' }
      })

      expect(jsonRequest.isJson()).toBe(true)
      expect(formRequest.isForm()).toBe(true)
      expect(ajaxRequest.isAjax()).toBe(true)
    })
  })

  describe('Response', () => {
    it('should create JSON response', () => {
      const response = new Response()
      response.status(HttpStatus.CREATED).json({ id: 1, name: 'John' })

      expect(response.getStatus()).toBe(HttpStatus.CREATED)
      expect(response.getHeaders()['Content-Type']).toBe('application/json')
      expect(response.getContent()).toContain('"name": "John"')
      expect(response.hasResponded()).toBe(true)
    })

    it('should create HTML response', () => {
      const response = new Response()
      response.html('<h1>Hello World</h1>')

      expect(response.getHeaders()['Content-Type']).toBe('text/html; charset=utf-8')
      expect(response.getContent()).toBe('<h1>Hello World</h1>')
    })

    it('should handle redirects', () => {
      const response = new Response()
      response.redirect('/home', HttpStatus.MOVED_PERMANENTLY)

      expect(response.getStatus()).toBe(HttpStatus.MOVED_PERMANENTLY)
      expect(response.getHeaders()['Location']).toBe('/home')
    })

    it('should handle cookies', () => {
      const response = new Response()
      response.cookie('session', 'abc123', { httpOnly: true, maxAge: 3600 })
      response.clearCookie('old-session')

      const cookies = response.getCookies()
      expect(cookies).toHaveLength(2)
      expect(cookies[0].name).toBe('session')
      expect(cookies[0].value).toBe('abc123')
      expect(cookies[1].name).toBe('old-session')
      expect(cookies[1].value).toBe('')

      const setCookieHeaders = response.getSetCookieHeaders()
      expect(setCookieHeaders[0]).toContain('session=abc123')
      expect(setCookieHeaders[0]).toContain('HttpOnly')
      expect(setCookieHeaders[0]).toContain('Max-Age=3600')
    })

    it('should chain methods', () => {
      const response = new Response()
      const result = response
        .status(HttpStatus.OK)
        .header('X-Custom', 'value')
        .cookie('test', 'value')
        .json({ success: true })

      expect(result).toBe(response) // 应该返回同一个实例
      expect(response.getStatus()).toBe(HttpStatus.OK)
      expect(response.getHeaders()['X-Custom']).toBe('value')
    })
  })

  describe('HttpContext', () => {
    it('should create context from request and response', () => {
      const request = new Request({
        method: 'GET',
        url: '/test'
      })
      const response = new Response()
      const context = new HttpContext(request, response)

      expect(context.request).toBe(request)
      expect(context.response).toBe(response)
    })

    it('should create context with factory method', () => {
      const context = HttpContext.create({
        method: 'POST',
        url: '/api/test',
        body: { data: 'test' }
      })

      expect(context.request.method).toBe('POST')
      expect(context.request.path).toBe('/api/test')
      expect(context.request.body.data).toBe('test')
      expect(context.response).toBeDefined()
    })
  })
})
```

## 验证步骤

### 1. 构建项目
```bash
cd packages/cosy-framework
npm run build
```

### 2. 运行测试
```bash
npm test tests/unit/http.test.ts
```

### 3. 创建手动测试

**创建文件**: `tests/manual-http-test.ts`

```typescript
import { HttpContext, HttpStatus, HttpMethod } from '../src/http'

// 测试创建请求和响应
const context = HttpContext.create({
  method: HttpMethod.POST,
  url: '/api/users?filter=active',
  headers: {
    'content-type': 'application/json',
    'x-api-key': 'secret'
  },
  body: {
    name: 'John Doe',
    email: 'john@example.com'
  }
})

// 测试请求功能
console.log('Request Method:', context.request.method)
console.log('Request Path:', context.request.path)
console.log('Request Input:', context.request.input())
console.log('User Name:', context.request.input('name'))
console.log('Filter:', context.request.input('filter'))
console.log('API Key:', context.request.header('x-api-key'))
console.log('Is JSON:', context.request.isJson())

// 测试响应功能
context.response
  .status(HttpStatus.CREATED)
  .cookie('session', 'abc123', { httpOnly: true })
  .header('X-Custom', 'framework-test')
  .json({
    id: 1,
    name: context.request.input('name'),
    email: context.request.input('email'),
    created_at: new Date().toISOString()
  })

console.log('\nResponse Status:', context.response.getStatus())
console.log('Response Headers:', context.response.getHeaders())
console.log('Response Cookies:', context.response.getCookies())
console.log('Response Content:', context.response.getContent())
```

运行：
```bash
npx tsx tests/manual-http-test.ts
```

## 完成标志

- [ ] Request 类功能完整
- [ ] Response 类功能完整
- [ ] HttpContext 正常工作
- [ ] Cookie 和 Header 处理正常
- [ ] 所有测试通过
- [ ] TypeScript 类型检查无错误

## 下一步

完成此步骤后，继续执行 `step-004-routing-system.md`。 

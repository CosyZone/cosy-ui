# 步骤 005：中间件系统

## 目标
实现灵活的中间件系统，支持全局中间件、路由中间件和条件中间件。

## 任务清单
- [ ] 创建中间件管道
- [ ] 实现中间件执行器
- [ ] 创建常用中间件
- [ ] 添加中间件装饰器
- [ ] 实现中间件条件执行
- [ ] 创建中间件测试

## 执行步骤

### 1. 更新类型定义

**更新文件**: `src/types/index.ts`

在现有内容后添加：

```typescript
// 中间件扩展类型
export interface MiddlewarePipeline {
  pipe(middleware: MiddlewareHandler): MiddlewarePipeline
  through(middlewares: MiddlewareHandler[]): MiddlewarePipeline
  then(finalHandler: RouteHandler): Promise<any>
  execute(context: HttpContextInterface): Promise<any>
}

export interface MiddlewareManager {
  register(name: string, middleware: MiddlewareHandler): void
  resolve(name: string): MiddlewareHandler | undefined
  group(name: string, middlewares: (string | MiddlewareHandler)[]): void
  getGroup(name: string): MiddlewareHandler[]
  global(middleware: MiddlewareHandler): void
  getGlobal(): MiddlewareHandler[]
}

export interface ConditionalMiddleware {
  when(condition: (context: HttpContextInterface) => boolean): MiddlewareHandler
  unless(condition: (context: HttpContextInterface) => boolean): MiddlewareHandler
}

export interface MiddlewareOptions {
  except?: string[]
  only?: string[]
  domain?: string
  methods?: string[]
}

// 中间件上下文
export interface MiddlewareContext extends HttpContextInterface {
  state: Record<string, any>
  skipRemaining(): void
  shouldSkip: boolean
}
```

### 2. 创建中间件管道

**创建文件**: `src/middleware/pipeline.ts`

```typescript
import { 
  MiddlewarePipeline, 
  MiddlewareHandler, 
  RouteHandler, 
  HttpContextInterface,
  NextFunction
} from '../types'

export class Pipeline implements MiddlewarePipeline {
  private middlewares: MiddlewareHandler[] = []

  constructor(middlewares: MiddlewareHandler[] = []) {
    this.middlewares = [...middlewares]
  }

  /**
   * 添加单个中间件到管道
   */
  pipe(middleware: MiddlewareHandler): MiddlewarePipeline {
    return new Pipeline([...this.middlewares, middleware])
  }

  /**
   * 添加多个中间件到管道
   */
  through(middlewares: MiddlewareHandler[]): MiddlewarePipeline {
    return new Pipeline([...this.middlewares, ...middlewares])
  }

  /**
   * 执行管道并返回最终结果
   */
  async then(finalHandler: RouteHandler): Promise<any> {
    if (this.middlewares.length === 0) {
      return finalHandler
    }

    return this.createMiddlewareChain(finalHandler)
  }

  /**
   * 执行整个中间件管道
   */
  async execute(context: HttpContextInterface): Promise<any> {
    if (this.middlewares.length === 0) {
      return
    }

    const chain = this.createExecutionChain(context)
    return chain()
  }

  /**
   * 创建中间件执行链
   */
  private createMiddlewareChain(finalHandler: RouteHandler): MiddlewareHandler {
    return async (context: HttpContextInterface, next: NextFunction) => {
      let index = 0

      const executeNext: NextFunction = async () => {
        if (index >= this.middlewares.length) {
          // 所有中间件都执行完了，执行最终处理器
          return finalHandler(context)
        }

        const middleware = this.middlewares[index++]
        return middleware(context, executeNext)
      }

      return executeNext()
    }
  }

  /**
   * 创建执行链（不需要最终处理器）
   */
  private createExecutionChain(context: HttpContextInterface): () => Promise<any> {
    let index = 0

    const executeNext = async (): Promise<any> => {
      if (index >= this.middlewares.length) {
        return
      }

      const middleware = this.middlewares[index++]
      return middleware(context, executeNext)
    }

    return executeNext
  }

  /**
   * 获取所有中间件
   */
  getMiddlewares(): MiddlewareHandler[] {
    return [...this.middlewares]
  }

  /**
   * 获取中间件数量
   */
  count(): number {
    return this.middlewares.length
  }

  /**
   * 创建静态管道
   */
  static create(middlewares: MiddlewareHandler[] = []): MiddlewarePipeline {
    return new Pipeline(middlewares)
  }
}
```

### 3. 创建中间件管理器

**创建文件**: `src/middleware/manager.ts`

```typescript
import { MiddlewareManager, MiddlewareHandler } from '../types'

export class MiddlewareRegistry implements MiddlewareManager {
  private middlewares = new Map<string, MiddlewareHandler>()
  private groups = new Map<string, MiddlewareHandler[]>()
  private globalMiddlewares: MiddlewareHandler[] = []

  /**
   * 注册命名中间件
   */
  register(name: string, middleware: MiddlewareHandler): void {
    this.middlewares.set(name, middleware)
  }

  /**
   * 解析中间件
   */
  resolve(name: string): MiddlewareHandler | undefined {
    return this.middlewares.get(name)
  }

  /**
   * 创建中间件组
   */
  group(name: string, middlewares: (string | MiddlewareHandler)[]): void {
    const resolvedMiddlewares = middlewares.map(middleware => {
      if (typeof middleware === 'string') {
        const resolved = this.resolve(middleware)
        if (!resolved) {
          throw new Error(`Middleware not found: ${middleware}`)
        }
        return resolved
      }
      return middleware
    })

    this.groups.set(name, resolvedMiddlewares)
  }

  /**
   * 获取中间件组
   */
  getGroup(name: string): MiddlewareHandler[] {
    return this.groups.get(name) || []
  }

  /**
   * 注册全局中间件
   */
  global(middleware: MiddlewareHandler): void {
    this.globalMiddlewares.push(middleware)
  }

  /**
   * 获取所有全局中间件
   */
  getGlobal(): MiddlewareHandler[] {
    return [...this.globalMiddlewares]
  }

  /**
   * 解析中间件列表（支持字符串和函数混合）
   */
  resolveMiddlewares(middlewares: (string | MiddlewareHandler)[]): MiddlewareHandler[] {
    return middlewares.map(middleware => {
      if (typeof middleware === 'string') {
        // 检查是否是组
        const group = this.getGroup(middleware)
        if (group.length > 0) {
          return group
        }

        // 检查是否是单个中间件
        const resolved = this.resolve(middleware)
        if (resolved) {
          return resolved
        }

        throw new Error(`Middleware not found: ${middleware}`)
      }
      return middleware
    }).flat()
  }

  /**
   * 获取所有注册的中间件名称
   */
  getRegisteredNames(): string[] {
    return Array.from(this.middlewares.keys())
  }

  /**
   * 获取所有组名称
   */
  getGroupNames(): string[] {
    return Array.from(this.groups.keys())
  }

  /**
   * 清除所有中间件
   */
  clear(): void {
    this.middlewares.clear()
    this.groups.clear()
    this.globalMiddlewares.length = 0
  }
}
```

### 4. 创建条件中间件

**创建文件**: `src/middleware/conditional.ts`

```typescript
import { ConditionalMiddleware, MiddlewareHandler, HttpContextInterface, NextFunction } from '../types'

export class ConditionalMiddlewareWrapper implements ConditionalMiddleware {
  constructor(private middleware: MiddlewareHandler) {}

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
export function whenHeader(name: string, value?: string, middleware?: MiddlewareHandler): MiddlewareHandler {
  if (!middleware) {
    throw new Error('Middleware is required')
  }
  
  return conditional(middleware).when(context => {
    const headerValue = context.request.header(name)
    if (value === undefined) {
      return !!headerValue
    }
    return headerValue === value
  })
}
```

### 5. 创建常用中间件

**创建文件**: `src/middleware/common.ts`

```typescript
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

    // 设置 CORS 头
    const origin = Array.isArray(options.origin) 
      ? (options.origin.includes(request.header('origin')) ? request.header('origin') : options.origin[0])
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
        ;(context as any).user = user
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
    if (contentType.includes('application/json')) {
      // 解析 JSON 体
      // request.body = parseJsonBody(rawBody)
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      // 解析表单体
      // request.body = parseFormBody(rawBody)
    }

    return next()
  }
}
```

### 6. 创建中间件装饰器

**创建文件**: `src/middleware/decorators.ts`

```typescript
import 'reflect-metadata'
import { MiddlewareHandler } from '../types'

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
export function Auth(options?: any) {
  // 这里应该导入实际的 auth 中间件
  const authMiddleware: MiddlewareHandler = async (context, next) => {
    // 身份验证逻辑
    return next()
  }
  
  return Middleware(authMiddleware)
}

/**
 * 限流装饰器
 */
export function RateLimit(max: number, windowMs?: number) {
  // 这里应该导入实际的 rateLimit 中间件
  const rateLimitMiddleware: MiddlewareHandler = async (context, next) => {
    // 限流逻辑
    return next()
  }
  
  return Middleware(rateLimitMiddleware)
}

/**
 * CORS 装饰器
 */
export function Cors(options?: any) {
  // 这里应该导入实际的 cors 中间件
  const corsMiddleware: MiddlewareHandler = async (context, next) => {
    // CORS 逻辑
    return next()
  }
  
  return Middleware(corsMiddleware)
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
```

### 7. 更新中间件模块导出

**更新文件**: `src/middleware/index.ts`

```typescript
// 核心类
export { Pipeline } from './pipeline'
export { MiddlewareRegistry } from './manager'

// 条件中间件
export { 
  conditional, 
  whenPath, 
  whenMethod, 
  whenHeader,
  ConditionalMiddlewareWrapper 
} from './conditional'

// 常用中间件
export {
  cors,
  logger,
  auth,
  rateLimit,
  errorHandler,
  bodyParser
} from './common'

// 装饰器
export {
  UseMiddleware,
  Middleware,
  Auth,
  RateLimit,
  Cors,
  getClassMiddleware,
  getMethodMiddleware
} from './decorators'

// 类型
export type {
  MiddlewarePipeline,
  MiddlewareManager,
  ConditionalMiddleware,
  MiddlewareOptions,
  MiddlewareContext,
  MiddlewareHandler
} from '../types'
```

### 8. 创建中间件测试

**创建文件**: `tests/unit/middleware.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { 
  Pipeline, 
  MiddlewareRegistry, 
  conditional, 
  cors, 
  logger, 
  auth,
  UseMiddleware,
  Middleware,
  getClassMiddleware,
  getMethodMiddleware
} from '../../src/middleware'
import { HttpContext } from '../../src/http'

describe('Middleware System', () => {
  describe('Pipeline', () => {
    it('should execute middlewares in order', async () => {
      const order: number[] = []
      
      const middleware1 = async (ctx: any, next: any) => {
        order.push(1)
        await next()
        order.push(4)
      }
      
      const middleware2 = async (ctx: any, next: any) => {
        order.push(2)
        await next()
        order.push(3)
      }

      const pipeline = new Pipeline([middleware1, middleware2])
      const context = HttpContext.create()

      await pipeline.execute(context)

      expect(order).toEqual([1, 2, 3, 4])
    })

    it('should support chaining methods', () => {
      const middleware1 = async (ctx: any, next: any) => next()
      const middleware2 = async (ctx: any, next: any) => next()

      const pipeline = Pipeline.create()
        .pipe(middleware1)
        .pipe(middleware2)

      expect(pipeline.count()).toBe(2)
    })

    it('should support through method for multiple middlewares', () => {
      const middleware1 = async (ctx: any, next: any) => next()
      const middleware2 = async (ctx: any, next: any) => next()

      const pipeline = Pipeline.create()
        .through([middleware1, middleware2])

      expect(pipeline.count()).toBe(2)
    })
  })

  describe('MiddlewareRegistry', () => {
    let registry: MiddlewareRegistry

    beforeEach(() => {
      registry = new MiddlewareRegistry()
    })

    it('should register and resolve middleware', () => {
      const middleware = async (ctx: any, next: any) => next()
      registry.register('test', middleware)

      const resolved = registry.resolve('test')
      expect(resolved).toBe(middleware)
    })

    it('should create and resolve middleware groups', () => {
      const middleware1 = async (ctx: any, next: any) => next()
      const middleware2 = async (ctx: any, next: any) => next()

      registry.register('auth', middleware1)
      registry.register('cors', middleware2)
      registry.group('api', ['auth', 'cors'])

      const group = registry.getGroup('api')
      expect(group).toHaveLength(2)
      expect(group[0]).toBe(middleware1)
      expect(group[1]).toBe(middleware2)
    })

    it('should handle global middleware', () => {
      const middleware1 = async (ctx: any, next: any) => next()
      const middleware2 = async (ctx: any, next: any) => next()

      registry.global(middleware1)
      registry.global(middleware2)

      const global = registry.getGlobal()
      expect(global).toHaveLength(2)
      expect(global).toContain(middleware1)
      expect(global).toContain(middleware2)
    })

    it('should resolve mixed middleware arrays', () => {
      const middleware1 = async (ctx: any, next: any) => next()
      const middleware2 = async (ctx: any, next: any) => next()
      const middleware3 = async (ctx: any, next: any) => next()

      registry.register('auth', middleware1)
      registry.group('security', [middleware2])

      const resolved = registry.resolveMiddlewares(['auth', middleware3, 'security'])
      expect(resolved).toHaveLength(3)
      expect(resolved[0]).toBe(middleware1)
      expect(resolved[1]).toBe(middleware3)
      expect(resolved[2]).toBe(middleware2)
    })
  })

  describe('Conditional Middleware', () => {
    it('should execute when condition is true', async () => {
      let executed = false
      const middleware = async (ctx: any, next: any) => {
        executed = true
        return next()
      }

      const conditionalMiddleware = conditional(middleware).when(() => true)
      const context = HttpContext.create()

      await conditionalMiddleware(context, async () => {})

      expect(executed).toBe(true)
    })

    it('should not execute when condition is false', async () => {
      let executed = false
      const middleware = async (ctx: any, next: any) => {
        executed = true
        return next()
      }

      const conditionalMiddleware = conditional(middleware).when(() => false)
      const context = HttpContext.create()

      await conditionalMiddleware(context, async () => {})

      expect(executed).toBe(false)
    })

    it('should execute unless condition is false', async () => {
      let executed = false
      const middleware = async (ctx: any, next: any) => {
        executed = true
        return next()
      }

      const conditionalMiddleware = conditional(middleware).unless(() => false)
      const context = HttpContext.create()

      await conditionalMiddleware(context, async () => {})

      expect(executed).toBe(true)
    })
  })

  describe('Common Middleware', () => {
    it('should add CORS headers', async () => {
      const corsMiddleware = cors({
        origin: 'https://example.com',
        methods: ['GET', 'POST']
      })

      const context = HttpContext.create()
      await corsMiddleware(context, async () => {})

      const headers = context.response.getHeaders()
      expect(headers['Access-Control-Allow-Origin']).toBe('https://example.com')
      expect(headers['Access-Control-Allow-Methods']).toBe('GET, POST')
    })

    it('should log requests', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      const loggerMiddleware = logger()
      const context = HttpContext.create({ method: 'GET', url: '/test' })

      await loggerMiddleware(context, async () => {})

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should handle authentication', async () => {
      const authMiddleware = auth({
        validate: async (token) => ({ id: 1, name: 'Test User' })
      })

      const context = HttpContext.create({
        headers: { authorization: 'Bearer valid-token' }
      })

      let nextCalled = false
      await authMiddleware(context, async () => {
        nextCalled = true
      })

      expect(nextCalled).toBe(true)
      expect((context as any).user).toEqual({ id: 1, name: 'Test User' })
    })
  })

  describe('Middleware Decorators', () => {
    it('should register class middleware', () => {
      const middleware1 = async (ctx: any, next: any) => next()
      const middleware2 = async (ctx: any, next: any) => next()

      @UseMiddleware(middleware1, middleware2)
      class TestController {}

      const middlewares = getClassMiddleware(TestController)
      expect(middlewares).toHaveLength(2)
      expect(middlewares).toContain(middleware1)
      expect(middlewares).toContain(middleware2)
    })

    it('should register method middleware', () => {
      const middleware = async (ctx: any, next: any) => next()

      class TestController {
        @Middleware(middleware)
        testMethod() {}
      }

      const middlewares = getMethodMiddleware(TestController.prototype, 'testMethod')
      expect(middlewares).toHaveLength(1)
      expect(middlewares[0]).toBe(middleware)
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
npm test tests/unit/middleware.test.ts
```

### 3. 创建手动测试

**创建文件**: `tests/manual-middleware-test.ts`

```typescript
import { 
  Pipeline, 
  MiddlewareRegistry, 
  conditional, 
  cors, 
  logger, 
  auth,
  whenPath,
  whenMethod,
  UseMiddleware,
  Middleware
} from '../src/middleware'
import { HttpContext, HttpMethod } from '../src/http'

console.log('=== 中间件系统测试 ===')

// 1. 基础管道测试
console.log('\n1. 基础管道测试')
const pipeline = Pipeline.create()

const middleware1 = async (ctx: any, next: any) => {
  console.log('中间件 1 开始')
  await next()
  console.log('中间件 1 结束')
}

const middleware2 = async (ctx: any, next: any) => {
  console.log('中间件 2 开始')
  await next()
  console.log('中间件 2 结束')
}

const finalHandler = async (ctx: any) => {
  console.log('最终处理器执行')
  return 'Hello World'
}

const context = HttpContext.create({ method: 'GET', url: '/test' })

pipeline.pipe(middleware1).pipe(middleware2).then(finalHandler)
  .then(handler => handler(context))
  .then(result => console.log('结果:', result))

// 2. 中间件注册表测试
console.log('\n2. 中间件注册表测试')
const registry = new MiddlewareRegistry()

registry.register('log', logger())
registry.register('cors', cors({ origin: '*' }))
registry.group('api', ['log', 'cors'])

console.log('注册的中间件:', registry.getRegisteredNames())
console.log('中间件组:', registry.getGroupNames())

const apiGroup = registry.getGroup('api')
console.log('API 组中间件数量:', apiGroup.length)

// 3. 条件中间件测试
console.log('\n3. 条件中间件测试')

const testMiddleware = async (ctx: any, next: any) => {
  console.log('条件中间件执行')
  return next()
}

// 测试路径条件
const pathMiddleware = whenPath('/admin', testMiddleware)
const adminContext = HttpContext.create({ url: '/admin' })
const userContext = HttpContext.create({ url: '/user' })

console.log('访问 /admin:')
await pathMiddleware(adminContext, async () => console.log('next 被调用'))

console.log('访问 /user:')
await pathMiddleware(userContext, async () => console.log('next 被调用'))

// 测试方法条件
const methodMiddleware = whenMethod(['POST', 'PUT'], testMiddleware)
const postContext = HttpContext.create({ method: 'POST' })
const getContext = HttpContext.create({ method: 'GET' })

console.log('POST 请求:')
await methodMiddleware(postContext, async () => console.log('next 被调用'))

console.log('GET 请求:')
await methodMiddleware(getContext, async () => console.log('next 被调用'))

// 4. 常用中间件测试
console.log('\n4. 常用中间件测试')

// CORS 中间件
const corsMiddleware = cors({
  origin: 'https://example.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

const corsContext = HttpContext.create({
  method: 'OPTIONS',
  headers: { origin: 'https://example.com' }
})

await corsMiddleware(corsContext, async () => {})
console.log('CORS 响应头:', corsContext.response.getHeaders())

// 认证中间件
const authMiddleware = auth({
  validate: async (token) => {
    if (token === 'valid-token') {
      return { id: 1, name: 'John Doe' }
    }
    throw new Error('Invalid token')
  }
})

const authContext = HttpContext.create({
  headers: { authorization: 'Bearer valid-token' }
})

try {
  await authMiddleware(authContext, async () => {
    console.log('认证成功，用户:', (authContext as any).user)
  })
} catch (error) {
  console.log('认证失败:', (error as Error).message)
}

// 5. 装饰器测试
console.log('\n5. 装饰器测试')

const decoratorMiddleware = async (ctx: any, next: any) => {
  console.log('装饰器中间件执行')
  return next()
}

@UseMiddleware(decoratorMiddleware)
class TestController {
  @Middleware(decoratorMiddleware)
  testMethod() {
    console.log('控制器方法执行')
  }
}

// 这里只是演示装饰器的注册，实际使用需要框架支持
console.log('装饰器测试完成（需要框架集成）')

console.log('\n=== 中间件系统测试完成 ===')
```

运行：
```bash
npx tsx tests/manual-middleware-test.ts
```

## 完成标志

- [ ] 中间件管道正常工作
- [ ] 中间件注册表功能完整
- [ ] 条件中间件正常执行
- [ ] 常用中间件功能正确
- [ ] 装饰器正常注册
- [ ] 所有测试通过
- [ ] TypeScript 类型检查无错误

## 下一步

完成此步骤后，继续执行 `step-006-configuration-system.md`。 

# 步骤 007：应用程序核心

## 目标
整合所有组件，创建完整的应用程序核心，实现应用生命周期管理。

## 任务清单
- [ ] 创建应用程序类
- [ ] 实现生命周期管理
- [ ] 整合所有模块
- [ ] 添加应用装饰器
- [ ] 创建应用测试

## 执行步骤

### 1. 更新类型定义

**更新文件**: `src/types/index.ts`

在现有内容后添加：

```typescript
// 应用程序相关类型
export interface ApplicationInterface {
  // 生命周期
  boot(): Promise<void>
  start(port?: number): Promise<void>
  stop(): Promise<void>
  
  // 配置
  configure(callback: (app: ApplicationInterface) => void): ApplicationInterface
  config(key: string, value?: any): any
  
  // 服务管理
  register(provider: ServiceProvider): ApplicationInterface
  resolve<T>(token: string | symbol): T
  singleton<T>(token: string | symbol, implementation: Constructor<T>): ApplicationInterface
  bind<T>(token: string | symbol, implementation: Constructor<T>): ApplicationInterface
  
  // 路由
  get(path: string, handler: RouteHandler): RouteInterface
  post(path: string, handler: RouteHandler): RouteInterface
  put(path: string, handler: RouteHandler): RouteInterface
  patch(path: string, handler: RouteHandler): RouteInterface
  delete(path: string, handler: RouteHandler): RouteInterface
  group(prefix: string | RouteGroupOptions, callback: (router: RouterInterface) => void): void
  
  // 中间件
  use(middleware: MiddlewareHandler): ApplicationInterface
  useGlobal(middleware: MiddlewareHandler): ApplicationInterface
  
  // 请求处理
  handle(request: RequestInterface): Promise<ResponseInterface>
  handleHttp(req: any, res: any): Promise<void>
  
  // 状态
  isRunning(): boolean
  getPort(): number | undefined
}

export interface ApplicationConfig {
  name?: string
  debug?: boolean
  port?: number
  host?: string
  timezone?: string
  locale?: string
  providers?: Constructor<ServiceProvider>[]
  middleware?: MiddlewareHandler[]
}

export interface ApplicationLifecycleHooks {
  beforeBoot?: () => Awaitable<void>
  afterBoot?: () => Awaitable<void>
  beforeStart?: () => Awaitable<void>
  afterStart?: () => Awaitable<void>
  beforeStop?: () => Awaitable<void>
  afterStop?: () => Awaitable<void>
}

export interface BootstrapOptions {
  config?: ApplicationConfig
  configPath?: string
  providers?: Constructor<ServiceProvider>[]
  hooks?: ApplicationLifecycleHooks
}
```

### 2. 创建应用程序类

**更新文件**: `src/core/index.ts`

```typescript
import { 
  ApplicationInterface, 
  ApplicationConfig, 
  ApplicationLifecycleHooks,
  ServiceProvider,
  Constructor,
  RouteHandler,
  RouteInterface,
  RouterInterface,
  RouteGroupOptions,
  MiddlewareHandler,
  RequestInterface,
  ResponseInterface,
  HttpContextInterface
} from '../types'

import { ServiceContainer, container as defaultContainer } from '../container'
import { Router } from '../routing'
import { Pipeline, MiddlewareRegistry } from '../middleware'
import { Configuration, Environment, EnvironmentSource, ObjectSource } from '../config'
import { HttpContext, Request, Response, HttpStatus } from '../http'

export class Application implements ApplicationInterface {
  private container: ServiceContainer
  private router: Router
  private config: Configuration
  private middlewareRegistry: MiddlewareRegistry
  private globalMiddlewares: MiddlewareHandler[] = []
  private running = false
  private port?: number
  private server?: any
  private hooks: ApplicationLifecycleHooks = {}
  
  constructor(config?: ApplicationConfig) {
    this.container = new ServiceContainer()
    this.router = new Router()
    this.config = new Configuration()
    this.middlewareRegistry = new MiddlewareRegistry()
    
    // 注册核心服务
    this.registerCoreServices()
    
    // 应用默认配置
    if (config) {
      this.applyConfig(config)
    }
  }

  /**
   * 启动应用程序
   */
  async boot(): Promise<void> {
    if (this.hooks.beforeBoot) {
      await this.hooks.beforeBoot()
    }

    // 加载配置
    await this.loadConfiguration()
    
    // 注册服务提供者
    await this.registerProviders()
    
    // 启动服务提供者
    await this.bootProviders()

    if (this.hooks.afterBoot) {
      await this.hooks.afterBoot()
    }
  }

  /**
   * 启动 HTTP 服务器
   */
  async start(port?: number): Promise<void> {
    if (this.running) {
      throw new Error('Application is already running')
    }

    if (this.hooks.beforeStart) {
      await this.hooks.beforeStart()
    }

    this.port = port || this.config.get('app.port', 3000)
    
    // 这里应该创建实际的 HTTP 服务器
    // 为了简化，我们只设置状态
    this.running = true
    
    console.log(`🚀 Application started on port ${this.port}`)
    console.log(`🌍 Environment: ${Environment.getCurrent()}`)
    console.log(`🎯 Debug mode: ${Environment.isDebug() ? 'enabled' : 'disabled'}`)

    if (this.hooks.afterStart) {
      await this.hooks.afterStart()
    }
  }

  /**
   * 停止应用程序
   */
  async stop(): Promise<void> {
    if (!this.running) {
      return
    }

    if (this.hooks.beforeStop) {
      await this.hooks.beforeStop()
    }

    this.running = false
    
    if (this.server) {
      // 关闭服务器
      this.server.close()
    }

    console.log('Application stopped')

    if (this.hooks.afterStop) {
      await this.hooks.afterStop()
    }
  }

  /**
   * 配置应用程序
   */
  configure(callback: (app: ApplicationInterface) => void): ApplicationInterface {
    callback(this)
    return this
  }

  /**
   * 设置生命周期钩子
   */
  setHooks(hooks: ApplicationLifecycleHooks): this {
    this.hooks = { ...this.hooks, ...hooks }
    return this
  }

  /**
   * 获取/设置配置
   */
  config(key: string, value?: any): any {
    if (value !== undefined) {
      this.config.set(key, value)
      return this
    }
    return this.config.get(key)
  }

  // === 服务容器方法 ===

  register(provider: ServiceProvider): ApplicationInterface {
    provider.register(this.container)
    return this
  }

  resolve<T>(token: string | symbol): T {
    return this.container.resolve<T>(token)
  }

  singleton<T>(token: string | symbol, implementation: Constructor<T>): ApplicationInterface {
    this.container.singleton(token, implementation)
    return this
  }

  bind<T>(token: string | symbol, implementation: Constructor<T>): ApplicationInterface {
    this.container.bind(token, implementation)
    return this
  }

  // === 路由方法 ===

  get(path: string, handler: RouteHandler): RouteInterface {
    return this.router.get(path, handler)
  }

  post(path: string, handler: RouteHandler): RouteInterface {
    return this.router.post(path, handler)
  }

  put(path: string, handler: RouteHandler): RouteInterface {
    return this.router.put(path, handler)
  }

  patch(path: string, handler: RouteHandler): RouteInterface {
    return this.router.patch(path, handler)
  }

  delete(path: string, handler: RouteHandler): RouteInterface {
    return this.router.delete(path, handler)
  }

  group(prefix: string | RouteGroupOptions, callback: (router: RouterInterface) => void): void {
    this.router.group(prefix, callback)
  }

  // === 中间件方法 ===

  use(middleware: MiddlewareHandler): ApplicationInterface {
    this.globalMiddlewares.push(middleware)
    return this
  }

  useGlobal(middleware: MiddlewareHandler): ApplicationInterface {
    this.middlewareRegistry.global(middleware)
    return this
  }

  /**
   * 注册命名中间件
   */
  middleware(name: string, middleware: MiddlewareHandler): ApplicationInterface {
    this.middlewareRegistry.register(name, middleware)
    return this
  }

  // === 请求处理 ===

  /**
   * 处理 HTTP 请求
   */
  async handle(request: RequestInterface): Promise<ResponseInterface> {
    const response = new Response()
    const context = new HttpContext(request, response)

    try {
      // 匹配路由
      const match = this.router.resolve(request.method, request.path)
      
      if (!match) {
        return response.status(HttpStatus.NOT_FOUND).json({
          error: 'Route not found',
          path: request.path,
          method: request.method
        })
      }

      // 设置路由参数
      request.params = match.params

      // 构建中间件管道
      const middlewares = [
        ...this.middlewareRegistry.getGlobal(),
        ...this.globalMiddlewares,
        ...(match.route.middleware || [])
      ]

      const pipeline = new Pipeline(middlewares)

      // 执行中间件和路由处理器
      const finalHandler = async (ctx: HttpContextInterface) => {
        return match.route.handler(ctx)
      }

      const result = await pipeline.then(finalHandler)(context, async () => {})

      // 如果处理器返回了结果但响应没有设置，自动设置 JSON 响应
      if (result !== undefined && !response.hasResponded()) {
        if (typeof result === 'string') {
          response.html(result)
        } else {
          response.json(result)
        }
      }

      return response

    } catch (error) {
      const err = error as Error
      console.error('Request handling error:', err)

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: Environment.isDebug() ? err.message : 'Internal Server Error',
        ...(Environment.isDebug() && { stack: err.stack })
      })
    }
  }

  /**
   * 处理原生 HTTP 请求（Node.js 集成）
   */
  async handleHttp(req: any, res: any): Promise<void> {
    const request = new Request({
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      ip: req.ip || req.connection?.remoteAddress
    })

    const response = await this.handle(request)

    // 设置响应头
    const headers = response.getHeaders()
    for (const [name, value] of Object.entries(headers)) {
      res.setHeader(name, value)
    }

    // 设置 Cookies
    const cookies = response.getSetCookieHeaders()
    if (cookies.length > 0) {
      res.setHeader('Set-Cookie', cookies)
    }

    // 设置状态码和发送响应
    res.statusCode = response.getStatus()
    res.end(response.getContent())
  }

  // === 状态方法 ===

  isRunning(): boolean {
    return this.running
  }

  getPort(): number | undefined {
    return this.port
  }

  getContainer(): ServiceContainer {
    return this.container
  }

  getRouter(): Router {
    return this.router
  }

  getConfig(): Configuration {
    return this.config
  }

  // === 私有方法 ===

  private registerCoreServices(): void {
    this.container.instance('app', this)
    this.container.instance('container', this.container)
    this.container.instance('router', this.router)
    this.container.instance('config', this.config)
    this.container.instance('middleware', this.middlewareRegistry)
  }

  private applyConfig(config: ApplicationConfig): void {
    this.config.merge({
      app: {
        name: config.name || 'Cosy Application',
        debug: config.debug ?? Environment.isDebug(),
        port: config.port || 3000,
        host: config.host || '0.0.0.0',
        timezone: config.timezone || 'UTC',
        locale: config.locale || 'en'
      }
    })

    // 应用全局中间件
    if (config.middleware) {
      config.middleware.forEach(middleware => this.use(middleware))
    }
  }

  private async loadConfiguration(): Promise<void> {
    // 加载环境变量
    const envSource = new EnvironmentSource()
    await this.config.load(envSource)
  }

  private async registerProviders(): Promise<void> {
    const providers = this.config.get('app.providers', [])
    
    for (const ProviderClass of providers) {
      const provider = new ProviderClass()
      this.register(provider)
    }
  }

  private async bootProviders(): Promise<void> {
    // 这里可以调用所有服务提供者的 boot 方法
    // 暂时留空，等后续实现
  }

  /**
   * 创建应用程序实例
   */
  static create(config?: ApplicationConfig): Application {
    return new Application(config)
  }

  /**
   * 快速启动应用程序
   */
  static async run(config?: ApplicationConfig, port?: number): Promise<Application> {
    const app = new Application(config)
    await app.boot()
    await app.start(port)
    return app
  }
}

// 导出默认应用实例
export const app = new Application()
```

### 3. 创建应用启动器

**创建文件**: `src/core/bootstrap.ts`

```typescript
import { Application } from './index'
import { BootstrapOptions, ApplicationConfig } from '../types'
import { Environment, JsonFileSource, ObjectSource } from '../config'
import { existsSync } from 'fs'

export class Bootstrap {
  private app: Application
  private options: BootstrapOptions

  constructor(options: BootstrapOptions = {}) {
    this.options = options
    this.app = new Application(options.config)
  }

  /**
   * 启动应用程序
   */
  async start(): Promise<Application> {
    // 设置生命周期钩子
    if (this.options.hooks) {
      this.app.setHooks(this.options.hooks)
    }

    // 加载配置文件
    await this.loadConfigFiles()

    // 注册服务提供者
    this.registerProviders()

    // 启动应用
    await this.app.boot()
    
    const port = this.app.config('app.port')
    await this.app.start(port)

    return this.app
  }

  /**
   * 加载配置文件
   */
  private async loadConfigFiles(): Promise<void> {
    const configPath = this.options.configPath || './config'
    
    // 尝试加载通用配置
    const appConfigPath = `${configPath}/app.json`
    if (existsSync(appConfigPath)) {
      const configSource = new JsonFileSource(appConfigPath)
      await this.app.getConfig().load(configSource)
    }

    // 尝试加载环境特定配置
    const envConfigPath = `${configPath}/${Environment.getCurrent()}.json`
    if (existsSync(envConfigPath)) {
      const envConfigSource = new JsonFileSource(envConfigPath)
      await this.app.getConfig().load(envConfigSource)
    }
  }

  /**
   * 注册服务提供者
   */
  private registerProviders(): void {
    if (this.options.providers) {
      for (const ProviderClass of this.options.providers) {
        const provider = new ProviderClass()
        this.app.register(provider)
      }
    }
  }

  /**
   * 创建启动器
   */
  static create(options: BootstrapOptions = {}): Bootstrap {
    return new Bootstrap(options)
  }

  /**
   * 快速启动
   */
  static async run(options: BootstrapOptions = {}): Promise<Application> {
    const bootstrap = new Bootstrap(options)
    return bootstrap.start()
  }
}
```

### 4. 创建应用装饰器

**创建文件**: `src/core/decorators.ts`

```typescript
import 'reflect-metadata'
import { ApplicationInterface, Constructor } from '../types'

// 元数据键
const APP_METADATA = Symbol('app')
const CONTROLLER_METADATA = Symbol('controller')

/**
 * 应用程序装饰器
 */
export function App(config?: any) {
  return function <T extends Constructor>(target: T) {
    Reflect.defineMetadata(APP_METADATA, config || {}, target)
    return target
  }
}

/**
 * 自动注册控制器装饰器
 */
export function AutoRegister() {
  return function <T extends Constructor>(target: T) {
    Reflect.defineMetadata(CONTROLLER_METADATA, true, target)
    return target
  }
}

/**
 * 获取应用程序元数据
 */
export function getAppMetadata(target: any): any {
  return Reflect.getMetadata(APP_METADATA, target)
}

/**
 * 检查是否需要自动注册
 */
export function shouldAutoRegister(target: any): boolean {
  return Reflect.getMetadata(CONTROLLER_METADATA, target) === true
}

/**
 * 启动装饰器（方法装饰器）
 */
export function OnStart() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('lifecycle:start', true, target, propertyKey)
    return descriptor
  }
}

/**
 * 停止装饰器（方法装饰器）
 */
export function OnStop() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('lifecycle:stop', true, target, propertyKey)
    return descriptor
  }
}

/**
 * 应用程序工厂
 */
export function createApp(AppClass: Constructor<any>): ApplicationInterface {
  const config = getAppMetadata(AppClass)
  const app = new AppClass()
  
  // 这里可以根据装饰器配置应用程序
  // 实际实现需要更复杂的逻辑
  
  return app
}
```

### 5. 创建应用工具类

**创建文件**: `src/core/helpers.ts`

```typescript
import { Application } from './index'
import { ApplicationConfig } from '../types'

/**
 * 创建简单的 Web 应用
 */
export function createWebApp(config?: ApplicationConfig): Application {
  const app = Application.create(config)
  
  // 添加常用中间件
  // app.use(cors())
  // app.use(logger())
  // app.use(bodyParser())
  
  return app
}

/**
 * 创建 API 应用
 */
export function createApiApp(config?: ApplicationConfig): Application {
  const app = Application.create({
    ...config,
    name: config?.name || 'API Application'
  })
  
  // API 特定的中间件和配置
  // app.use(cors({ origin: '*' }))
  // app.use(apiMiddleware())
  
  return app
}

/**
 * 优雅关闭处理
 */
export function gracefulShutdown(app: Application): void {
  const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2']
  
  signals.forEach(signal => {
    process.on(signal, async () => {
      console.log(`Received ${signal}, shutting down gracefully...`)
      
      try {
        await app.stop()
        process.exit(0)
      } catch (error) {
        console.error('Error during shutdown:', error)
        process.exit(1)
      }
    })
  })
}

/**
 * 错误处理设置
 */
export function setupErrorHandling(app: Application): void {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
    // 这里可以添加更复杂的错误处理逻辑
  })

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
    // 优雅关闭
    app.stop().finally(() => {
      process.exit(1)
    })
  })
}
```

### 6. 更新核心模块导出

**完全更新文件**: `src/core/index.ts`

保持之前的 Application 类内容，在文件末尾添加：

```typescript
// 导出其他核心组件
export { Bootstrap } from './bootstrap'
export { 
  App, 
  AutoRegister, 
  OnStart, 
  OnStop,
  createApp,
  getAppMetadata,
  shouldAutoRegister
} from './decorators'

export {
  createWebApp,
  createApiApp,
  gracefulShutdown,
  setupErrorHandling
} from './helpers'

// 导出类型
export type {
  ApplicationInterface,
  ApplicationConfig,
  ApplicationLifecycleHooks,
  BootstrapOptions
} from '../types'
```

### 7. 创建应用程序测试

**创建文件**: `tests/unit/application.test.ts`

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Application, Bootstrap } from '../../src/core'
import { HttpContext, HttpMethod, HttpStatus } from '../../src/http'
import { Injectable } from '../../src/container'

describe('Application Core', () => {
  let app: Application

  beforeEach(() => {
    app = new Application()
  })

  afterEach(async () => {
    if (app.isRunning()) {
      await app.stop()
    }
  })

  describe('Application Lifecycle', () => {
    it('should boot application', async () => {
      await app.boot()
      expect(app.isRunning()).toBe(false) // Not started yet
    })

    it('should start and stop application', async () => {
      await app.boot()
      await app.start(3001)
      
      expect(app.isRunning()).toBe(true)
      expect(app.getPort()).toBe(3001)

      await app.stop()
      expect(app.isRunning()).toBe(false)
    })

    it('should not start if already running', async () => {
      await app.boot()
      await app.start(3002)

      await expect(app.start(3003)).rejects.toThrow('Application is already running')
      
      await app.stop()
    })
  })

  describe('Configuration', () => {
    it('should set and get configuration', () => {
      app.config('app.name', 'Test App')
      app.config('database.host', 'localhost')

      expect(app.config('app.name')).toBe('Test App')
      expect(app.config('database.host')).toBe('localhost')
    })

    it('should configure with callback', () => {
      app.configure((app) => {
        app.config('test.value', 'configured')
      })

      expect(app.config('test.value')).toBe('configured')
    })
  })

  describe('Service Container Integration', () => {
    it('should bind and resolve services', () => {
      @Injectable
      class TestService {
        getValue() {
          return 'test-value'
        }
      }

      app.bind('test-service', TestService)
      const service = app.resolve<TestService>('test-service')

      expect(service).toBeInstanceOf(TestService)
      expect(service.getValue()).toBe('test-value')
    })

    it('should register singleton services', () => {
      class SingletonService {
        private static count = 0
        public readonly id: number

        constructor() {
          this.id = ++SingletonService.count
        }
      }

      app.singleton('singleton', SingletonService)

      const instance1 = app.resolve<SingletonService>('singleton')
      const instance2 = app.resolve<SingletonService>('singleton')

      expect(instance1).toBe(instance2)
      expect(instance1.id).toBe(1)
    })
  })

  describe('Routing Integration', () => {
    it('should register and handle routes', async () => {
      app.get('/test', () => 'Hello World')
      app.post('/users', () => ({ id: 1, name: 'John' }))

      const getRequest = HttpContext.create({ method: 'GET', url: '/test' }).request
      const postRequest = HttpContext.create({ method: 'POST', url: '/users' }).request

      const getResponse = await app.handle(getRequest)
      const postResponse = await app.handle(postRequest)

      expect(getResponse.getStatus()).toBe(HttpStatus.OK)
      expect(getResponse.getContent()).toBe('Hello World')

      expect(postResponse.getStatus()).toBe(HttpStatus.OK)
      expect(JSON.parse(postResponse.getContent())).toEqual({ id: 1, name: 'John' })
    })

    it('should handle route parameters', async () => {
      app.get('/users/{id}', (context) => {
        return { userId: context.request.params.id }
      })

      const request = HttpContext.create({ method: 'GET', url: '/users/123' }).request
      const response = await app.handle(request)

      expect(response.getStatus()).toBe(HttpStatus.OK)
      expect(JSON.parse(response.getContent())).toEqual({ userId: '123' })
    })

    it('should return 404 for unknown routes', async () => {
      const request = HttpContext.create({ method: 'GET', url: '/unknown' }).request
      const response = await app.handle(request)

      expect(response.getStatus()).toBe(HttpStatus.NOT_FOUND)
      expect(JSON.parse(response.getContent())).toMatchObject({
        error: 'Route not found',
        path: '/unknown',
        method: 'GET'
      })
    })

    it('should support route groups', async () => {
      app.group('/api', (router) => {
        router.get('/status', () => ({ status: 'ok' }))
        router.get('/health', () => ({ health: 'good' }))
      })

      const statusRequest = HttpContext.create({ method: 'GET', url: '/api/status' }).request
      const healthRequest = HttpContext.create({ method: 'GET', url: '/api/health' }).request

      const statusResponse = await app.handle(statusRequest)
      const healthResponse = await app.handle(healthRequest)

      expect(statusResponse.getStatus()).toBe(HttpStatus.OK)
      expect(healthResponse.getStatus()).toBe(HttpStatus.OK)
    })
  })

  describe('Middleware Integration', () => {
    it('should execute global middleware', async () => {
      const order: number[] = []

      app.use(async (context, next) => {
        order.push(1)
        await next()
        order.push(4)
      })

      app.use(async (context, next) => {
        order.push(2)
        await next()
        order.push(3)
      })

      app.get('/test', () => {
        order.push(5)
        return 'success'
      })

      const request = HttpContext.create({ method: 'GET', url: '/test' }).request
      await app.handle(request)

      expect(order).toEqual([1, 2, 5, 3, 4])
    })

    it('should handle middleware errors', async () => {
      app.use(async () => {
        throw new Error('Middleware error')
      })

      app.get('/test', () => 'success')

      const request = HttpContext.create({ method: 'GET', url: '/test' }).request
      const response = await app.handle(request)

      expect(response.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
      expect(JSON.parse(response.getContent())).toMatchObject({
        error: 'Middleware error'
      })
    })
  })

  describe('Application Factory', () => {
    it('should create application with static method', () => {
      const staticApp = Application.create({
        name: 'Static App',
        port: 4000
      })

      expect(staticApp.config('app.name')).toBe('Static App')
      expect(staticApp.config('app.port')).toBe(4000)
    })
  })

  describe('Bootstrap', () => {
    it('should bootstrap application', async () => {
      const bootstrap = Bootstrap.create({
        config: {
          name: 'Bootstrap App',
          port: 5000
        }
      })

      const bootstrappedApp = await bootstrap.start()
      
      expect(bootstrappedApp.isRunning()).toBe(true)
      expect(bootstrappedApp.config('app.name')).toBe('Bootstrap App')
      
      await bootstrappedApp.stop()
    })
  })
})
```

### 8. 创建手动测试

**创建文件**: `tests/manual-application-test.ts`

```typescript
import { 
  Application, 
  Bootstrap,
  createWebApp,
  gracefulShutdown,
  App,
  Controller,
  Get,
  Post
} from '../src/core'
import { Injectable, Inject } from '../src/container'
import { cors, logger } from '../src/middleware'
import { Environment } from '../src/config'

console.log('=== 应用程序核心测试 ===')

// 1. 基础应用创建和配置
console.log('\n1. 基础应用创建')

const app = Application.create({
  name: 'Cosy Framework Test App',
  debug: true,
  port: 3000
})

console.log('应用名称:', app.config('app.name'))
console.log('调试模式:', app.config('app.debug'))
console.log('端口:', app.config('app.port'))

// 2. 服务注册测试
console.log('\n2. 服务注册测试')

@Injectable
class DatabaseService {
  connect() {
    return 'Database connected'
  }
}

@Injectable
class UserService {
  constructor(@Inject('DatabaseService') private db: DatabaseService) {}

  getUsers() {
    return [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ]
  }

  getDatabaseStatus() {
    return this.db.connect()
  }
}

app.bind('DatabaseService', DatabaseService)
app.bind('UserService', UserService)

const userService = app.resolve<UserService>('UserService')
console.log('用户服务测试:', userService.getDatabaseStatus())
console.log('用户列表:', userService.getUsers())

// 3. 中间件测试
console.log('\n3. 中间件测试')

app.use(logger())
app.use(cors({ origin: '*' }))

app.use(async (context, next) => {
  console.log(`请求: ${context.request.method} ${context.request.path}`)
  const start = Date.now()
  await next()
  const duration = Date.now() - start
  console.log(`响应时间: ${duration}ms`)
})

// 4. 路由测试
console.log('\n4. 路由注册')

app.get('/', () => {
  return {
    message: 'Welcome to Cosy Framework!',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  }
})

app.get('/users', (context) => {
  const userService = app.resolve<UserService>('UserService')
  return {
    users: userService.getUsers(),
    total: 2
  }
})

app.get('/users/{id}', (context) => {
  const id = parseInt(context.request.params.id)
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]
  
  const user = users.find(u => u.id === id)
  if (!user) {
    context.response.status(404)
    return { error: 'User not found' }
  }
  
  return { user }
})

app.post('/users', (context) => {
  const { name, email } = context.request.body
  return {
    id: 3,
    name,
    email,
    created_at: new Date().toISOString()
  }
})

// API 路由组
app.group('/api/v1', (router) => {
  router.get('/status', () => ({
    status: 'ok',
    timestamp: Date.now(),
    environment: Environment.getCurrent()
  }))

  router.get('/health', () => ({
    health: 'good',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  }))
})

console.log('注册的路由数量:', app.getRouter().getRoutes().length)

// 5. 控制器装饰器测试（演示）
console.log('\n5. 控制器装饰器演示')

@Controller('/api/posts')
class PostController {
  @Get('/')
  index() {
    return {
      posts: [
        { id: 1, title: 'First Post' },
        { id: 2, title: 'Second Post' }
      ]
    }
  }

  @Get('/{id}')
  show() {
    return { post: { id: 1, title: 'Post Detail' } }
  }

  @Post('/')
  create() {
    return { message: 'Post created', id: 3 }
  }
}

console.log('控制器装饰器已定义（需要手动注册到路由）')

// 6. 应用启动测试
console.log('\n6. 应用启动测试')

async function testApplication() {
  try {
    console.log('正在启动应用...')
    await app.boot()
    await app.start(3000)

    console.log('✓ 应用启动成功')
    console.log('应用状态:', app.isRunning() ? '运行中' : '已停止')
    console.log('监听端口:', app.getPort())

    // 模拟请求处理测试
    console.log('\n7. 请求处理测试')
    
    const { HttpContext } = await import('../src/http')
    
    const testRequests = [
      { method: 'GET', url: '/' },
      { method: 'GET', url: '/users' },
      { method: 'GET', url: '/users/1' },
      { method: 'GET', url: '/api/v1/status' },
      { method: 'GET', url: '/nonexistent' }
    ]

    for (const req of testRequests) {
      const context = HttpContext.create(req)
      const response = await app.handle(context.request)
      
      console.log(`${req.method} ${req.url} → ${response.getStatus()}`)
      if (response.getContent()) {
        const content = response.getContent()
        if (content.length < 200) {
          console.log(`  响应: ${content}`)
        } else {
          console.log(`  响应: ${content.substring(0, 100)}...`)
        }
      }
    }

    // 停止应用
    console.log('\n正在停止应用...')
    await app.stop()
    console.log('✓ 应用已停止')

  } catch (error) {
    console.error('应用测试失败:', error)
  }
}

// 8. Bootstrap 测试
console.log('\n8. Bootstrap 测试')

async function testBootstrap() {
  try {
    console.log('使用 Bootstrap 启动应用...')
    
    const bootstrap = Bootstrap.create({
      config: {
        name: 'Bootstrap Test App',
        port: 3001,
        debug: true
      },
      hooks: {
        beforeStart: () => console.log('🔄 准备启动...'),
        afterStart: () => console.log('✅ 启动完成!'),
        beforeStop: () => console.log('🔄 准备停止...'),
        afterStop: () => console.log('✅ 停止完成!')
      }
    })

    const bootstrappedApp = await bootstrap.start()
    console.log('Bootstrap 应用运行状态:', bootstrappedApp.isRunning())
    
    // 稍等一下然后停止
    setTimeout(async () => {
      await bootstrappedApp.stop()
    }, 1000)

  } catch (error) {
    console.error('Bootstrap 测试失败:', error)
  }
}

// 运行测试
testApplication().then(() => {
  return testBootstrap()
}).then(() => {
  console.log('\n=== 应用程序核心测试完成 ===')
}).catch(error => {
  console.error('测试过程中出现错误:', error)
})
```

运行：
```bash
npx tsx tests/manual-application-test.ts
```

## 验证步骤

### 1. 构建项目
```bash
cd packages/cosy-framework
npm run build
```

### 2. 运行测试
```bash
npm test tests/unit/application.test.ts
```

### 3. 运行手动测试
```bash
npx tsx tests/manual-application-test.ts
```

## 完成标志

- [ ] 应用程序类功能完整
- [ ] 生命周期管理正常
- [ ] 所有模块集成正确
- [ ] 请求处理流程正常
- [ ] Bootstrap 功能正常
- [ ] 所有测试通过
- [ ] TypeScript 类型检查无错误

## 下一步

完成此步骤后，继续执行 `step-008-basic-example.md`。 

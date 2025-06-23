# 步骤 004：路由系统

## 目标
实现灵活的路由系统，支持路由参数、路由组、中间件等功能。

## 任务清单
- [ ] 创建路由类和路由器
- [ ] 实现路由匹配算法
- [ ] 支持路由参数和约束
- [ ] 实现路由组功能
- [ ] 添加路由装饰器
- [ ] 创建路由测试

## 执行步骤

### 1. 更新类型定义

**更新文件**: `src/types/index.ts`

在现有内容后添加：

```typescript
// 路由相关类型
export interface RouteInterface {
  method: string | string[]
  path: string
  handler: RouteHandler
  name?: string
  middleware?: MiddlewareHandler[]
  constraints?: Record<string, RegExp | string>
  domain?: string
}

export interface RouterInterface {
  get(path: string, handler: RouteHandler): RouteInterface
  post(path: string, handler: RouteHandler): RouteInterface
  put(path: string, handler: RouteHandler): RouteInterface
  patch(path: string, handler: RouteHandler): RouteInterface
  delete(path: string, handler: RouteHandler): RouteInterface
  options(path: string, handler: RouteHandler): RouteInterface
  head(path: string, handler: RouteHandler): RouteInterface
  any(path: string, handler: RouteHandler): RouteInterface
  match(methods: string[], path: string, handler: RouteHandler): RouteInterface
  group(prefix: string, callback: (router: RouterInterface) => void): void
  group(options: RouteGroupOptions, callback: (router: RouterInterface) => void): void
  middleware(middleware: MiddlewareHandler | MiddlewareHandler[]): RouterInterface
  name(name: string): RouterInterface
  where(constraints: Record<string, RegExp | string>): RouterInterface
  domain(domain: string): RouterInterface
  resolve(method: string, path: string): RouteMatch | null
  getRoutes(): RouteInterface[]
}

export interface RouteMatch {
  route: RouteInterface
  params: Record<string, string>
}

export interface RouteGroupOptions {
  prefix?: string
  middleware?: MiddlewareHandler | MiddlewareHandler[]
  name?: string
  domain?: string
  namespace?: string
}

export interface RouteCompiler {
  compile(path: string): CompiledRoute
  match(compiledRoute: CompiledRoute, path: string): RouteMatchResult | null
}

export interface CompiledRoute {
  pattern: RegExp
  paramNames: string[]
  path: string
}

export interface RouteMatchResult {
  params: Record<string, string>
}

// 中间件类型
export type MiddlewareHandler = (context: HttpContextInterface, next: NextFunction) => Awaitable<any>
```

### 2. 创建路由编译器

**创建文件**: `src/routing/compiler.ts`

```typescript
import { RouteCompiler, CompiledRoute, RouteMatchResult } from '../types'

export class DefaultRouteCompiler implements RouteCompiler {
  /**
   * 编译路由路径为正则表达式
   */
  compile(path: string): CompiledRoute {
    const paramNames: string[] = []
    
    // 处理路由参数 {id}, {id?}, {id:pattern}
    let pattern = path
      // 可选参数: {id?}
      .replace(/\{([^}?:]+)\?\}/g, (match, paramName) => {
        paramNames.push(paramName)
        return '(?:/([^/]+))?'
      })
      // 带约束的参数: {id:[0-9]+}
      .replace(/\{([^}:]+):([^}]+)\}/g, (match, paramName, constraint) => {
        paramNames.push(paramName)
        return `([${constraint}]+)`
      })
      // 普通参数: {id}
      .replace(/\{([^}]+)\}/g, (match, paramName) => {
        paramNames.push(paramName)
        return '([^/]+)'
      })
      // 转义其他特殊字符
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      // 处理通配符
      .replace(/\\\*/g, '.*')

    // 确保完全匹配
    pattern = `^${pattern}$`

    return {
      pattern: new RegExp(pattern),
      paramNames,
      path
    }
  }

  /**
   * 匹配路径并提取参数
   */
  match(compiledRoute: CompiledRoute, path: string): RouteMatchResult | null {
    const matches = path.match(compiledRoute.pattern)
    
    if (!matches) {
      return null
    }

    const params: Record<string, string> = {}
    
    // 提取参数值
    for (let i = 0; i < compiledRoute.paramNames.length; i++) {
      const paramName = compiledRoute.paramNames[i]
      const paramValue = matches[i + 1] // 第一个匹配是完整匹配
      
      if (paramValue !== undefined) {
        params[paramName] = decodeURIComponent(paramValue)
      }
    }

    return { params }
  }
}
```

### 3. 创建路由类

**创建文件**: `src/routing/route.ts`

```typescript
import { RouteInterface, RouteHandler, MiddlewareHandler } from '../types'

export class Route implements RouteInterface {
  public method: string | string[]
  public path: string
  public handler: RouteHandler
  public name?: string
  public middleware: MiddlewareHandler[] = []
  public constraints: Record<string, RegExp | string> = {}
  public domain?: string

  constructor(
    method: string | string[],
    path: string,
    handler: RouteHandler
  ) {
    this.method = Array.isArray(method) ? method : [method]
    this.path = this.normalizePath(path)
    this.handler = handler
  }

  /**
   * 设置路由名称
   */
  setName(name: string): this {
    this.name = name
    return this
  }

  /**
   * 添加中间件
   */
  addMiddleware(middleware: MiddlewareHandler | MiddlewareHandler[]): this {
    const middlewares = Array.isArray(middleware) ? middleware : [middleware]
    this.middleware.push(...middlewares)
    return this
  }

  /**
   * 设置参数约束
   */
  setConstraints(constraints: Record<string, RegExp | string>): this {
    this.constraints = { ...this.constraints, ...constraints }
    return this
  }

  /**
   * 设置域名
   */
  setDomain(domain: string): this {
    this.domain = domain
    return this
  }

  /**
   * 检查是否匹配指定方法
   */
  matchesMethod(method: string): boolean {
    return (this.method as string[]).includes(method.toUpperCase())
  }

  /**
   * 标准化路径
   */
  private normalizePath(path: string): string {
    // 确保以 / 开头
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    
    // 移除尾部的 /（除非是根路径）
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1)
    }
    
    return path
  }

  /**
   * 获取路由信息
   */
  toObject(): object {
    return {
      method: this.method,
      path: this.path,
      name: this.name,
      middleware: this.middleware.length,
      constraints: this.constraints,
      domain: this.domain
    }
  }
}
```

### 4. 创建路由器

**创建文件**: `src/routing/router.ts`

```typescript
import { 
  RouterInterface, 
  RouteInterface, 
  RouteHandler, 
  RouteMatch, 
  RouteGroupOptions,
  MiddlewareHandler,
  HttpMethod
} from '../types'
import { Route } from './route'
import { DefaultRouteCompiler } from './compiler'

export class Router implements RouterInterface {
  private routes: RouteInterface[] = []
  private compiler = new DefaultRouteCompiler()
  private groupStack: RouteGroupOptions[] = []

  /**
   * GET 路由
   */
  get(path: string, handler: RouteHandler): RouteInterface {
    return this.addRoute(HttpMethod.GET, path, handler)
  }

  /**
   * POST 路由
   */
  post(path: string, handler: RouteHandler): RouteInterface {
    return this.addRoute(HttpMethod.POST, path, handler)
  }

  /**
   * PUT 路由
   */
  put(path: string, handler: RouteHandler): RouteInterface {
    return this.addRoute(HttpMethod.PUT, path, handler)
  }

  /**
   * PATCH 路由
   */
  patch(path: string, handler: RouteHandler): RouteInterface {
    return this.addRoute(HttpMethod.PATCH, path, handler)
  }

  /**
   * DELETE 路由
   */
  delete(path: string, handler: RouteHandler): RouteInterface {
    return this.addRoute(HttpMethod.DELETE, path, handler)
  }

  /**
   * OPTIONS 路由
   */
  options(path: string, handler: RouteHandler): RouteInterface {
    return this.addRoute(HttpMethod.OPTIONS, path, handler)
  }

  /**
   * HEAD 路由
   */
  head(path: string, handler: RouteHandler): RouteInterface {
    return this.addRoute(HttpMethod.HEAD, path, handler)
  }

  /**
   * 匹配任意方法的路由
   */
  any(path: string, handler: RouteHandler): RouteInterface {
    return this.addRoute(Object.values(HttpMethod), path, handler)
  }

  /**
   * 匹配指定方法的路由
   */
  match(methods: string[], path: string, handler: RouteHandler): RouteInterface {
    return this.addRoute(methods, path, handler)
  }

  /**
   * 路由组
   */
  group(
    optionsOrPrefix: string | RouteGroupOptions,
    callback: (router: RouterInterface) => void
  ): void {
    const options: RouteGroupOptions = typeof optionsOrPrefix === 'string'
      ? { prefix: optionsOrPrefix }
      : optionsOrPrefix

    this.groupStack.push(options)
    callback(this)
    this.groupStack.pop()
  }

  /**
   * 添加中间件（用于链式调用）
   */
  middleware(middleware: MiddlewareHandler | MiddlewareHandler[]): RouterInterface {
    // 这个方法返回一个新的路由器实例，用于链式调用
    const newRouter = new Router()
    newRouter.routes = [...this.routes]
    newRouter.compiler = this.compiler
    newRouter.groupStack = [...this.groupStack, { middleware }]
    return newRouter
  }

  /**
   * 设置路由名称前缀（用于链式调用）
   */
  name(namePrefix: string): RouterInterface {
    const newRouter = new Router()
    newRouter.routes = [...this.routes]
    newRouter.compiler = this.compiler
    newRouter.groupStack = [...this.groupStack, { name: namePrefix }]
    return newRouter
  }

  /**
   * 设置参数约束（用于链式调用）
   */
  where(constraints: Record<string, RegExp | string>): RouterInterface {
    const newRouter = new Router()
    newRouter.routes = [...this.routes]
    newRouter.compiler = this.compiler
    newRouter.groupStack = [...this.groupStack]
    
    // 将约束应用到最后一个路由
    if (this.routes.length > 0) {
      const lastRoute = this.routes[this.routes.length - 1] as Route
      lastRoute.setConstraints(constraints)
    }
    
    return newRouter
  }

  /**
   * 设置域名约束（用于链式调用）
   */
  domain(domain: string): RouterInterface {
    const newRouter = new Router()
    newRouter.routes = [...this.routes]
    newRouter.compiler = this.compiler
    newRouter.groupStack = [...this.groupStack, { domain }]
    return newRouter
  }

  /**
   * 解析路由
   */
  resolve(method: string, path: string): RouteMatch | null {
    for (const route of this.routes) {
      if (!route.matchesMethod(method)) {
        continue
      }

      const compiledRoute = this.compiler.compile(route.path)
      const matchResult = this.compiler.match(compiledRoute, path)

      if (matchResult) {
        return {
          route,
          params: matchResult.params
        }
      }
    }

    return null
  }

  /**
   * 获取所有路由
   */
  getRoutes(): RouteInterface[] {
    return [...this.routes]
  }

  /**
   * 添加路由
   */
  private addRoute(method: string | string[], path: string, handler: RouteHandler): RouteInterface {
    // 应用路由组的配置
    const groupOptions = this.mergeGroupOptions()
    
    // 处理路径前缀
    if (groupOptions.prefix) {
      path = this.joinPaths(groupOptions.prefix, path)
    }

    const route = new Route(method, path, handler)

    // 应用路由组的中间件
    if (groupOptions.middleware) {
      route.addMiddleware(groupOptions.middleware)
    }

    // 应用路由组的域名
    if (groupOptions.domain) {
      route.setDomain(groupOptions.domain)
    }

    // 应用路由组的名称前缀
    if (groupOptions.name && route.name) {
      route.setName(groupOptions.name + route.name)
    }

    this.routes.push(route)
    return route
  }

  /**
   * 合并路由组配置
   */
  private mergeGroupOptions(): RouteGroupOptions {
    const merged: RouteGroupOptions = {}

    for (const group of this.groupStack) {
      if (group.prefix) {
        merged.prefix = this.joinPaths(merged.prefix || '', group.prefix)
      }
      
      if (group.middleware) {
        const middlewares = Array.isArray(group.middleware) ? group.middleware : [group.middleware]
        merged.middleware = [...(merged.middleware as MiddlewareHandler[] || []), ...middlewares]
      }
      
      if (group.domain) {
        merged.domain = group.domain
      }
      
      if (group.name) {
        merged.name = (merged.name || '') + group.name
      }
    }

    return merged
  }

  /**
   * 连接路径
   */
  private joinPaths(prefix: string, path: string): string {
    prefix = prefix.replace(/\/$/, '') // 移除尾部斜杠
    path = path.replace(/^\//, '') // 移除开头斜杠
    return `${prefix}/${path}`.replace(/\/+/g, '/') // 合并多个斜杠
  }
}
```

### 5. 创建路由装饰器

**创建文件**: `src/routing/decorators.ts`

```typescript
import 'reflect-metadata'
import { HttpMethod } from '../types'

// 元数据键
const ROUTES_METADATA = Symbol('routes')

export interface RouteMetadata {
  method: string | string[]
  path: string
  methodName: string
}

/**
 * 控制器装饰器
 */
export function Controller(prefix?: string) {
  return function <T extends new (...args: any[]) => any>(target: T) {
    Reflect.defineMetadata('controller:prefix', prefix || '', target)
    return target
  }
}

/**
 * GET 路由装饰器
 */
export function Get(path: string = '') {
  return createRouteDecorator(HttpMethod.GET, path)
}

/**
 * POST 路由装饰器
 */
export function Post(path: string = '') {
  return createRouteDecorator(HttpMethod.POST, path)
}

/**
 * PUT 路由装饰器
 */
export function Put(path: string = '') {
  return createRouteDecorator(HttpMethod.PUT, path)
}

/**
 * PATCH 路由装饰器
 */
export function Patch(path: string = '') {
  return createRouteDecorator(HttpMethod.PATCH, path)
}

/**
 * DELETE 路由装饰器
 */
export function Delete(path: string = '') {
  return createRouteDecorator(HttpMethod.DELETE, path)
}

/**
 * OPTIONS 路由装饰器
 */
export function Options(path: string = '') {
  return createRouteDecorator(HttpMethod.OPTIONS, path)
}

/**
 * HEAD 路由装饰器
 */
export function Head(path: string = '') {
  return createRouteDecorator(HttpMethod.HEAD, path)
}

/**
 * 匹配多个方法的路由装饰器
 */
export function Route(methods: string[], path: string = '') {
  return createRouteDecorator(methods, path)
}

/**
 * 创建路由装饰器的工厂函数
 */
function createRouteDecorator(method: string | string[], path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const routes: RouteMetadata[] = Reflect.getMetadata(ROUTES_METADATA, target.constructor) || []
    
    routes.push({
      method,
      path,
      methodName: propertyKey
    })
    
    Reflect.defineMetadata(ROUTES_METADATA, routes, target.constructor)
    return descriptor
  }
}

/**
 * 获取控制器的路由元数据
 */
export function getControllerRoutes(target: any): RouteMetadata[] {
  return Reflect.getMetadata(ROUTES_METADATA, target) || []
}

/**
 * 获取控制器前缀
 */
export function getControllerPrefix(target: any): string {
  return Reflect.getMetadata('controller:prefix', target) || ''
}
```

### 6. 更新路由模块导出

**更新文件**: `src/routing/index.ts`

```typescript
// 核心类
export { Router } from './router'
export { Route } from './route'
export { DefaultRouteCompiler } from './compiler'

// 装饰器
export {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Options,
  Head,
  Route as RouteDecorator,
  getControllerRoutes,
  getControllerPrefix,
  type RouteMetadata
} from './decorators'

// 类型
export type {
  RouteInterface,
  RouterInterface,
  RouteMatch,
  RouteGroupOptions,
  RouteCompiler,
  CompiledRoute,
  RouteMatchResult,
  MiddlewareHandler
} from '../types'
```

### 7. 创建路由测试

**创建文件**: `tests/unit/routing.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { Router, Route, Controller, Get, Post, getControllerRoutes } from '../../src/routing'
import { HttpMethod } from '../../src/http'

describe('Routing System', () => {
  let router: Router

  beforeEach(() => {
    router = new Router()
  })

  describe('Basic Routing', () => {
    it('should register and resolve GET route', () => {
      const handler = () => 'Hello World'
      router.get('/hello', handler)

      const match = router.resolve(HttpMethod.GET, '/hello')
      
      expect(match).toBeTruthy()
      expect(match?.route.method).toEqual([HttpMethod.GET])
      expect(match?.route.path).toBe('/hello')
      expect(match?.route.handler).toBe(handler)
    })

    it('should register and resolve POST route', () => {
      const handler = () => 'Created'
      router.post('/users', handler)

      const match = router.resolve(HttpMethod.POST, '/users')
      
      expect(match).toBeTruthy()
      expect(match?.route.method).toEqual([HttpMethod.POST])
      expect(match?.route.path).toBe('/users')
    })

    it('should not match wrong method', () => {
      router.get('/test', () => 'test')
      
      const match = router.resolve(HttpMethod.POST, '/test')
      expect(match).toBeNull()
    })

    it('should not match wrong path', () => {
      router.get('/test', () => 'test')
      
      const match = router.resolve(HttpMethod.GET, '/wrong')
      expect(match).toBeNull()
    })
  })

  describe('Route Parameters', () => {
    it('should extract single parameter', () => {
      router.get('/users/{id}', () => 'User')

      const match = router.resolve(HttpMethod.GET, '/users/123')
      
      expect(match).toBeTruthy()
      expect(match?.params.id).toBe('123')
    })

    it('should extract multiple parameters', () => {
      router.get('/users/{userId}/posts/{postId}', () => 'Post')

      const match = router.resolve(HttpMethod.GET, '/users/123/posts/456')
      
      expect(match).toBeTruthy()
      expect(match?.params.userId).toBe('123')
      expect(match?.params.postId).toBe('456')
    })

    it('should handle optional parameters', () => {
      router.get('/posts/{id?}', () => 'Posts')

      const matchWithParam = router.resolve(HttpMethod.GET, '/posts/123')
      const matchWithoutParam = router.resolve(HttpMethod.GET, '/posts')
      
      expect(matchWithParam).toBeTruthy()
      expect(matchWithParam?.params.id).toBe('123')
      
      expect(matchWithoutParam).toBeTruthy()
      expect(matchWithoutParam?.params.id).toBeUndefined()
    })

    it('should handle parameter constraints', () => {
      router.get('/users/{id:[0-9]+}', () => 'User')

      const validMatch = router.resolve(HttpMethod.GET, '/users/123')
      const invalidMatch = router.resolve(HttpMethod.GET, '/users/abc')
      
      expect(validMatch).toBeTruthy()
      expect(invalidMatch).toBeNull()
    })
  })

  describe('Route Groups', () => {
    it('should apply prefix to grouped routes', () => {
      router.group('/api', (r) => {
        r.get('/users', () => 'Users')
        r.post('/users', () => 'Create User')
      })

      const getMatch = router.resolve(HttpMethod.GET, '/api/users')
      const postMatch = router.resolve(HttpMethod.POST, '/api/users')
      
      expect(getMatch).toBeTruthy()
      expect(postMatch).toBeTruthy()
    })

    it('should apply nested group prefixes', () => {
      router.group('/api', (r) => {
        r.group('/v1', (r2) => {
          r2.get('/users', () => 'Users V1')
        })
      })

      const match = router.resolve(HttpMethod.GET, '/api/v1/users')
      expect(match).toBeTruthy()
    })

    it('should apply group middleware', () => {
      const authMiddleware = () => 'auth'
      
      router.group({ prefix: '/admin', middleware: authMiddleware }, (r) => {
        r.get('/dashboard', () => 'Dashboard')
      })

      const routes = router.getRoutes()
      const adminRoute = routes.find(route => route.path === '/admin/dashboard')
      
      expect(adminRoute).toBeTruthy()
      expect(adminRoute?.middleware).toContain(authMiddleware)
    })
  })

  describe('Route Methods', () => {
    it('should support all HTTP methods', () => {
      router.get('/test', () => 'GET')
      router.post('/test', () => 'POST')
      router.put('/test', () => 'PUT')
      router.patch('/test', () => 'PATCH')
      router.delete('/test', () => 'DELETE')
      router.options('/test', () => 'OPTIONS')
      router.head('/test', () => 'HEAD')

      expect(router.resolve(HttpMethod.GET, '/test')).toBeTruthy()
      expect(router.resolve(HttpMethod.POST, '/test')).toBeTruthy()
      expect(router.resolve(HttpMethod.PUT, '/test')).toBeTruthy()
      expect(router.resolve(HttpMethod.PATCH, '/test')).toBeTruthy()
      expect(router.resolve(HttpMethod.DELETE, '/test')).toBeTruthy()
      expect(router.resolve(HttpMethod.OPTIONS, '/test')).toBeTruthy()
      expect(router.resolve(HttpMethod.HEAD, '/test')).toBeTruthy()
    })

    it('should support any method', () => {
      router.any('/test', () => 'Any')

      expect(router.resolve(HttpMethod.GET, '/test')).toBeTruthy()
      expect(router.resolve(HttpMethod.POST, '/test')).toBeTruthy()
      expect(router.resolve(HttpMethod.PUT, '/test')).toBeTruthy()
    })

    it('should support match with specific methods', () => {
      router.match([HttpMethod.GET, HttpMethod.POST], '/test', () => 'Match')

      expect(router.resolve(HttpMethod.GET, '/test')).toBeTruthy()
      expect(router.resolve(HttpMethod.POST, '/test')).toBeTruthy()
      expect(router.resolve(HttpMethod.PUT, '/test')).toBeNull()
    })
  })

  describe('Route Decorators', () => {
    it('should register routes from controller decorators', () => {
      @Controller('/api/users')
      class UserController {
        @Get('/')
        index() {
          return 'All users'
        }

        @Get('/{id}')
        show() {
          return 'Single user'
        }

        @Post('/')
        create() {
          return 'Create user'
        }
      }

      const routes = getControllerRoutes(UserController)
      
      expect(routes).toHaveLength(3)
      expect(routes[0].method).toBe(HttpMethod.GET)
      expect(routes[0].path).toBe('/')
      expect(routes[0].methodName).toBe('index')
      expect(routes[1].path).toBe('/{id}')
      expect(routes[2].method).toBe(HttpMethod.POST)
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
npm test tests/unit/routing.test.ts
```

### 3. 创建手动测试

**创建文件**: `tests/manual-routing-test.ts`

```typescript
import { Router, Controller, Get, Post, getControllerRoutes, getControllerPrefix } from '../src/routing'
import { HttpMethod } from '../src/http'

// 创建路由器
const router = new Router()

// 基础路由
router.get('/', () => 'Home Page')
router.get('/about', () => 'About Page')

// 带参数的路由
router.get('/users/{id}', (id: string) => `User: ${id}`)
router.get('/posts/{slug}', (slug: string) => `Post: ${slug}`)

// 可选参数
router.get('/posts/{category?}', (category?: string) => {
  return category ? `Posts in ${category}` : 'All Posts'
})

// 约束参数
router.get('/users/{id:[0-9]+}', (id: string) => `User ID: ${id}`)

// 路由组
router.group('/api', (api) => {
  api.get('/status', () => ({ status: 'ok' }))
  
  api.group('/v1', (v1) => {
    v1.get('/users', () => 'API V1 Users')
    v1.post('/users', () => 'Create User V1')
  })
})

// 带中间件的路由组
const authMiddleware = () => console.log('Auth middleware')
router.group({ prefix: '/admin', middleware: authMiddleware }, (admin) => {
  admin.get('/dashboard', () => 'Admin Dashboard')
  admin.get('/users', () => 'Admin Users')
})

// 测试路由解析
console.log('=== 路由解析测试 ===')

const testRoutes = [
  { method: HttpMethod.GET, path: '/' },
  { method: HttpMethod.GET, path: '/about' },
  { method: HttpMethod.GET, path: '/users/123' },
  { method: HttpMethod.GET, path: '/users/abc' },
  { method: HttpMethod.GET, path: '/posts/typescript' },
  { method: HttpMethod.GET, path: '/posts' },
  { method: HttpMethod.GET, path: '/posts/tech' },
  { method: HttpMethod.GET, path: '/api/status' },
  { method: HttpMethod.GET, path: '/api/v1/users' },
  { method: HttpMethod.POST, path: '/api/v1/users' },
  { method: HttpMethod.GET, path: '/admin/dashboard' },
  { method: HttpMethod.GET, path: '/nonexistent' }
]

testRoutes.forEach(({ method, path }) => {
  const match = router.resolve(method, path)
  if (match) {
    console.log(`✓ ${method} ${path} → 匹配路由: ${match.route.path}`)
    if (Object.keys(match.params).length > 0) {
      console.log(`  参数: ${JSON.stringify(match.params)}`)
    }
  } else {
    console.log(`✗ ${method} ${path} → 未找到匹配路由`)
  }
})

// 测试装饰器
console.log('\n=== 装饰器测试 ===')

@Controller('/api/posts')
class PostController {
  @Get('/')
  index() {
    return 'All posts'
  }

  @Get('/{id}')
  show() {
    return 'Single post'
  }

  @Post('/')
  create() {
    return 'Create post'
  }
}

const controllerRoutes = getControllerRoutes(PostController)
const controllerPrefix = getControllerPrefix(PostController)

console.log(`控制器前缀: ${controllerPrefix}`)
console.log('控制器路由:')
controllerRoutes.forEach(route => {
  console.log(`  ${route.method} ${route.path} → ${route.methodName}()`)
})

// 显示所有注册的路由
console.log('\n=== 所有注册的路由 ===')
const allRoutes = router.getRoutes()
allRoutes.forEach(route => {
  console.log(`${route.method} ${route.path}`)
  if (route.middleware && route.middleware.length > 0) {
    console.log(`  中间件: ${route.middleware.length} 个`)
  }
})
```

运行：
```bash
npx tsx tests/manual-routing-test.ts
```

## 完成标志

- [ ] 路由器基本功能正常
- [ ] 路由参数提取正确
- [ ] 路由组功能正常
- [ ] 路由装饰器工作正常
- [ ] 所有测试通过
- [ ] TypeScript 类型检查无错误

## 下一步

完成此步骤后，继续执行 `step-005-middleware-system.md`。 

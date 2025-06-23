# 步骤 002：实现服务容器

## 目标
实现依赖注入容器，这是整个框架的核心基础。

## 任务清单
- [ ] 创建容器接口和类型
- [ ] 实现基础服务容器
- [ ] 添加装饰器支持
- [ ] 创建容器测试
- [ ] 验证功能正常

## 执行步骤

### 1. 更新类型定义

**更新文件**: `src/types/index.ts`

在现有内容后添加：

```typescript
// 服务容器扩展类型
export interface Container {
  bind<T>(token: string | symbol, implementation: Constructor<T>, singleton?: boolean): void
  singleton<T>(token: string | symbol, implementation: Constructor<T>): void
  resolve<T>(token: string | symbol): T
  make<T>(implementation: Constructor<T>): T
  has(token: string | symbol): boolean
  instance<T>(token: string | symbol, instance: T): void
}

export interface ServiceProvider {
  register(container: Container): void
  boot?(container: Container): void
}

// 装饰器元数据
export const INJECTABLE_TOKEN = Symbol('injectable')
export const INJECT_TOKEN = Symbol('inject')
export const DEPENDENCIES_TOKEN = Symbol('dependencies')
```

### 2. 创建容器实现

**更新文件**: `src/container/index.ts`

```typescript
import { Container, ServiceBinding, Constructor } from '../types'

export class ServiceContainer implements Container {
  private bindings = new Map<string | symbol, ServiceBinding>()
  private instances = new Map<string | symbol, any>()

  /**
   * 绑定服务到容器
   */
  bind<T>(token: string | symbol, implementation: Constructor<T>, singleton = false): void {
    this.bindings.set(token, {
      token,
      implementation,
      singleton
    })
  }

  /**
   * 绑定单例服务
   */
  singleton<T>(token: string | symbol, implementation: Constructor<T>): void {
    this.bind(token, implementation, true)
  }

  /**
   * 解析服务
   */
  resolve<T>(token: string | symbol): T {
    // 检查是否有现有实例（单例模式）
    if (this.instances.has(token)) {
      return this.instances.get(token)
    }

    // 获取绑定信息
    const binding = this.bindings.get(token)
    if (!binding) {
      throw new Error(`Service not found: ${String(token)}`)
    }

    // 创建实例
    const instance = this.make(binding.implementation)

    // 如果是单例，缓存实例
    if (binding.singleton) {
      this.instances.set(token, instance)
    }

    return instance
  }

  /**
   * 创建类实例并自动注入依赖
   */
  make<T>(implementation: Constructor<T>): T {
    // 获取构造函数依赖
    const dependencies = this.getDependencies(implementation)
    
    // 解析依赖
    const resolvedDependencies = dependencies.map(dep => {
      if (typeof dep === 'string' || typeof dep === 'symbol') {
        return this.resolve(dep)
      }
      return this.make(dep)
    })

    // 创建实例
    return new implementation(...resolvedDependencies)
  }

  /**
   * 检查服务是否存在
   */
  has(token: string | symbol): boolean {
    return this.bindings.has(token) || this.instances.has(token)
  }

  /**
   * 直接设置实例
   */
  instance<T>(token: string | symbol, instance: T): void {
    this.instances.set(token, instance)
  }

  /**
   * 获取构造函数的依赖列表
   */
  private getDependencies(target: Constructor): (string | symbol | Constructor)[] {
    // 从装饰器元数据获取依赖
    const dependencies = Reflect.getMetadata('design:paramtypes', target) || []
    const injectTokens = Reflect.getMetadata(INJECT_TOKEN, target) || {}
    
    return dependencies.map((dep: any, index: number) => {
      // 如果有显式注入令牌，使用令牌
      if (injectTokens[index]) {
        return injectTokens[index]
      }
      
      // 否则使用类型作为令牌
      return dep
    })
  }
}

// 默认容器实例
export const container = new ServiceContainer()

// 导出类型和常量
export { Container, ServiceBinding, Constructor } from '../types'
export { INJECTABLE_TOKEN, INJECT_TOKEN, DEPENDENCIES_TOKEN } from '../types'
```

### 3. 创建装饰器

**创建文件**: `src/container/decorators.ts`

```typescript
import 'reflect-metadata'
import { INJECTABLE_TOKEN, INJECT_TOKEN, Constructor } from '../types'

/**
 * 标记类为可注入
 */
export function Injectable<T extends Constructor>(target: T): T {
  Reflect.defineMetadata(INJECTABLE_TOKEN, true, target)
  return target
}

/**
 * 注入依赖装饰器
 */
export function Inject(token: string | symbol) {
  return function (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {
    const existingTokens = Reflect.getMetadata(INJECT_TOKEN, target) || {}
    existingTokens[parameterIndex] = token
    Reflect.defineMetadata(INJECT_TOKEN, existingTokens, target)
  }
}

/**
 * 自动注入装饰器（用于属性注入）
 */
export function AutoInject(token?: string | symbol) {
  return function (target: any, propertyKey: string | symbol) {
    const injectToken = token || propertyKey
    
    Object.defineProperty(target, propertyKey, {
      get() {
        const container = require('./index').container
        return container.resolve(injectToken)
      },
      enumerable: true,
      configurable: true
    })
  }
}
```

### 4. 更新容器模块导出

**更新文件**: `src/container/index.ts`

在文件末尾添加：

```typescript
// 导出装饰器
export { Injectable, Inject, AutoInject } from './decorators'
```

### 5. 创建服务提供者基类

**创建文件**: `src/container/service-provider.ts`

```typescript
import { ServiceProvider, Container } from '../types'

export abstract class BaseServiceProvider implements ServiceProvider {
  /**
   * 注册服务到容器
   */
  abstract register(container: Container): void

  /**
   * 启动服务（可选）
   */
  boot?(container: Container): void
}
```

### 6. 更新容器模块完整导出

**完全更新文件**: `src/container/index.ts`

```typescript
import 'reflect-metadata'
import { Container, ServiceBinding, Constructor, INJECTABLE_TOKEN, INJECT_TOKEN, DEPENDENCIES_TOKEN } from '../types'

export class ServiceContainer implements Container {
  private bindings = new Map<string | symbol, ServiceBinding>()
  private instances = new Map<string | symbol, any>()

  /**
   * 绑定服务到容器
   */
  bind<T>(token: string | symbol, implementation: Constructor<T>, singleton = false): void {
    this.bindings.set(token, {
      token,
      implementation,
      singleton
    })
  }

  /**
   * 绑定单例服务
   */
  singleton<T>(token: string | symbol, implementation: Constructor<T>): void {
    this.bind(token, implementation, true)
  }

  /**
   * 解析服务
   */
  resolve<T>(token: string | symbol): T {
    // 检查是否有现有实例（单例模式）
    if (this.instances.has(token)) {
      return this.instances.get(token)
    }

    // 获取绑定信息
    const binding = this.bindings.get(token)
    if (!binding) {
      throw new Error(`Service not found: ${String(token)}`)
    }

    // 创建实例
    const instance = this.make(binding.implementation)

    // 如果是单例，缓存实例
    if (binding.singleton) {
      this.instances.set(token, instance)
    }

    return instance
  }

  /**
   * 创建类实例并自动注入依赖
   */
  make<T>(implementation: Constructor<T>): T {
    // 获取构造函数依赖
    const dependencies = this.getDependencies(implementation)
    
    // 解析依赖
    const resolvedDependencies = dependencies.map(dep => {
      if (typeof dep === 'string' || typeof dep === 'symbol') {
        return this.resolve(dep)
      }
      return this.make(dep)
    })

    // 创建实例
    return new implementation(...resolvedDependencies)
  }

  /**
   * 检查服务是否存在
   */
  has(token: string | symbol): boolean {
    return this.bindings.has(token) || this.instances.has(token)
  }

  /**
   * 直接设置实例
   */
  instance<T>(token: string | symbol, instance: T): void {
    this.instances.set(token, instance)
  }

  /**
   * 获取构造函数的依赖列表
   */
  private getDependencies(target: Constructor): (string | symbol | Constructor)[] {
    // 从装饰器元数据获取依赖
    const dependencies = Reflect.getMetadata('design:paramtypes', target) || []
    const injectTokens = Reflect.getMetadata(INJECT_TOKEN, target) || {}
    
    return dependencies.map((dep: any, index: number) => {
      // 如果有显式注入令牌，使用令牌
      if (injectTokens[index]) {
        return injectTokens[index]
      }
      
      // 否则使用类型作为令牌
      return dep
    })
  }
}

// 默认容器实例
export const container = new ServiceContainer()

// 导出装饰器
export { Injectable, Inject, AutoInject } from './decorators'

// 导出服务提供者
export { BaseServiceProvider } from './service-provider'

// 导出类型和常量
export type { Container, ServiceBinding, Constructor, ServiceProvider } from '../types'
export { INJECTABLE_TOKEN, INJECT_TOKEN, DEPENDENCIES_TOKEN } from '../types'
```

### 7. 创建容器测试

**创建文件**: `tests/unit/container.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { ServiceContainer, Injectable, Inject } from '../../src/container'

describe('Service Container', () => {
  let container: ServiceContainer

  beforeEach(() => {
    container = new ServiceContainer()
  })

  describe('Basic Binding and Resolution', () => {
    it('should bind and resolve a service', () => {
      class TestService {
        getValue() {
          return 'test-value'
        }
      }

      container.bind('test-service', TestService)
      const service = container.resolve<TestService>('test-service')
      
      expect(service).toBeInstanceOf(TestService)
      expect(service.getValue()).toBe('test-value')
    })

    it('should resolve singleton services', () => {
      class SingletonService {
        private static instanceCount = 0
        public readonly id: number

        constructor() {
          this.id = ++SingletonService.instanceCount
        }
      }

      container.singleton('singleton-service', SingletonService)
      
      const instance1 = container.resolve<SingletonService>('singleton-service')
      const instance2 = container.resolve<SingletonService>('singleton-service')
      
      expect(instance1).toBe(instance2)
      expect(instance1.id).toBe(1)
    })

    it('should resolve transient services', () => {
      class TransientService {
        private static instanceCount = 0
        public readonly id: number

        constructor() {
          this.id = ++TransientService.instanceCount
        }
      }

      container.bind('transient-service', TransientService, false)
      
      const instance1 = container.resolve<TransientService>('transient-service')
      const instance2 = container.resolve<TransientService>('transient-service')
      
      expect(instance1).not.toBe(instance2)
      expect(instance1.id).toBe(1)
      expect(instance2.id).toBe(2)
    })
  })

  describe('Dependency Injection', () => {
    it('should inject dependencies automatically', () => {
      @Injectable
      class DatabaseService {
        connect() {
          return 'connected'
        }
      }

      @Injectable
      class UserService {
        constructor(private db: DatabaseService) {}

        getUsers() {
          return this.db.connect() + ' - users'
        }
      }

      container.bind('DatabaseService', DatabaseService)
      container.bind('UserService', UserService)

      const userService = container.resolve<UserService>('UserService')
      expect(userService.getUsers()).toBe('connected - users')
    })

    it('should inject with explicit tokens', () => {
      interface Logger {
        log(message: string): string
      }

      @Injectable
      class FileLogger implements Logger {
        log(message: string) {
          return `[FILE] ${message}`
        }
      }

      @Injectable
      class UserController {
        constructor(@Inject('Logger') private logger: Logger) {}

        createUser() {
          return this.logger.log('User created')
        }
      }

      container.bind('Logger', FileLogger)
      container.bind('UserController', UserController)

      const controller = container.resolve<UserController>('UserController')
      expect(controller.createUser()).toBe('[FILE] User created')
    })
  })

  describe('Container Methods', () => {
    it('should check if service exists', () => {
      class TestService {}
      
      expect(container.has('test')).toBe(false)
      
      container.bind('test', TestService)
      expect(container.has('test')).toBe(true)
    })

    it('should set instances directly', () => {
      const instance = { value: 'direct-instance' }
      
      container.instance('direct', instance)
      const resolved = container.resolve('direct')
      
      expect(resolved).toBe(instance)
    })

    it('should throw error for unbound services', () => {
      expect(() => {
        container.resolve('non-existent')
      }).toThrow('Service not found: non-existent')
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
npm test tests/unit/container.test.ts
```

### 3. 检查类型
确保 TypeScript 编译无错误。

### 4. 测试手动使用
创建一个简单的测试脚本验证功能：

**创建文件**: `tests/manual-container-test.ts`

```typescript
import { container, Injectable, Inject } from '../src/container'

@Injectable
class Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`)
    return message
  }
}

@Injectable
class UserService {
  constructor(@Inject('Logger') private logger: Logger) {}

  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`)
    return { id: 1, name }
  }
}

// 注册服务
container.bind('Logger', Logger)
container.bind('UserService', UserService)

// 使用服务
const userService = container.resolve<UserService>('UserService')
const user = userService.createUser('John Doe')

console.log('Created user:', user)
```

运行：
```bash
npx tsx tests/manual-container-test.ts
```

## 📚 附件资料

- **[服务容器详解](./02.1-service-container详解.md)** - 深入理解依赖注入和服务容器的工作原理

## 完成标志

- [x] 容器类实现完成
- [x] 装饰器工作正常
- [x] 依赖注入功能正常
- [x] 单例模式正常工作
- [x] 所有测试通过
- [x] TypeScript 类型检查无错误
- [x] 附件文档创建完成

## 下一步

完成此步骤后，继续执行 `step-003-http-foundation.md`。 

# 服务容器接口设计

## 1. 理解服务容器

### 1.1 基本概念

服务容器是依赖注入的核心组件，负责管理服务的注册和解析。在 `src/container/types.ts` 中定义基本类型：

```typescript
/**
 * 服务标识符类型
 */
export type ServiceIdentifier = string | symbol | Constructor<any>;

/**
 * 构造函数类型
 */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 * 工厂函数类型
 */
export type Factory<T = any> = (container: IContainer) => T;
```

### 1.2 服务作用域

在 `src/container/constants.ts` 中定义作用域类型：

```typescript
/**
 * 服务作用域枚举
 */
export enum ServiceScope {
  /**
   * 单例作用域
   * 整个应用生命周期只创建一个实例
   */
  SINGLETON = 'singleton',

  /**
   * 瞬态作用域
   * 每次解析都创建新实例
   */
  TRANSIENT = 'transient',

  /**
   * 作用域单例
   * 在特定作用域内共享同一个实例
   */
  SCOPED = 'scoped'
}
```

## 2. 设计核心接口

### 2.1 容器接口

在 `src/container/interfaces.ts` 中定义容器接口：

```typescript
/**
 * 服务容器接口
 */
export interface IContainer {
  /**
   * 注册服务
   * @param id 服务标识符
   * @param provider 服务提供者
   */
  register(id: ServiceIdentifier, provider: IServiceProvider): void;

  /**
   * 解析服务
   * @param id 服务标识符
   */
  resolve<T>(id: ServiceIdentifier): T;

  /**
   * 创建作用域容器
   */
  createScope(): IContainer;

  /**
   * 检查服务是否已注册
   * @param id 服务标识符
   */
  has(id: ServiceIdentifier): boolean;
}
```

### 2.2 服务提供者接口

```typescript
/**
 * 服务提供者配置
 */
export interface IServiceProvider<T = any> {
  /**
   * 使用类作为提供者
   */
  useClass?: Constructor<T>;

  /**
   * 使用工厂函数作为提供者
   */
  useFactory?: Factory<T>;

  /**
   * 使用值作为提供者
   */
  useValue?: T;

  /**
   * 服务作用域
   */
  scope?: ServiceScope;
}

/**
 * 服务提供者接口
 */
export interface IServiceProviderClass {
  /**
   * 注册服务
   * @param container 服务容器
   */
  register(container: IContainer): void;

  /**
   * 启动服务
   */
  boot?(): Promise<void>;
}
```

## 3. 实现装饰器类型

### 3.1 Injectable 装饰器

在 `src/container/decorators.ts` 中定义装饰器类型：

```typescript
/**
 * Injectable 装饰器选项
 */
export interface IInjectableOptions {
  /**
   * 服务作用域
   */
  scope?: ServiceScope;

  /**
   * 服务标识符
   */
  id?: ServiceIdentifier;
}

/**
 * Injectable 装饰器类型
 */
export type InjectableDecorator = (options?: IInjectableOptions) => ClassDecorator;
```

### 3.2 Inject 装饰器

```typescript
/**
 * Inject 装饰器选项
 */
export interface IInjectOptions {
  /**
   * 服务标识符
   */
  id?: ServiceIdentifier;
}

/**
 * Inject 装饰器类型
 */
export type InjectDecorator = (options?: IInjectOptions) => ParameterDecorator;
```

## 4. 设计辅助类型

### 4.1 服务描述类型

```typescript
/**
 * 服务依赖项
 */
export interface IServiceDependency {
  /**
   * 参数索引
   */
  index: number;

  /**
   * 服务标识符
   */
  id: ServiceIdentifier;
}

/**
 * 服务描述
 */
export interface IServiceDescription {
  /**
   * 服务标识符
   */
  id: ServiceIdentifier;

  /**
   * 服务提供者
   */
  provider: IServiceProvider;

  /**
   * 服务作用域
   */
  scope: ServiceScope;

  /**
   * 依赖项列表
   */
  dependencies: IServiceDependency[];
}
```

## 5. 导出模块

在 `src/container/index.ts` 中导出所有类型：

```typescript
export * from './interfaces';
export * from './types';
export * from './constants';
export * from './decorators';
```

**动手实践 9**：
1. 创建模块导出文件
2. 确保所有类型都被导出
3. 验证模块的完整性

## 下一步

完成本节后，你应该已经：
1. 在 cosy-framework-design 项目中创建了完整的服务容器接口设计
2. 理解了服务容器的核心概念和实现方式
3. 掌握了依赖注入的设计原则

继续阅读 [07-http-interface.md](./07-http-interface.md) 来学习 HTTP 接口的设计。 

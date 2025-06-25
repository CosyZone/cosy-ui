---
title: 依赖注入系统设计
---

# 依赖注入系统设计

## 1. 理解依赖注入

### 1.1 基本概念

依赖注入（DI）是一种设计模式，它通过控制反转（IoC）来实现组件之间的解耦。

在 `src/container/types.ts` 中定义基本类型：

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
  TRANSIENT = 'transient'
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

### 4.1 服务依赖类型

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
```

## 5. 导出模块

在 `src/container/index.ts` 中导出所有类型：

```typescript
export * from './interfaces';
export * from './types';
export * from './constants';
export * from './decorators';
```

## 下一步

完成本节后，你应该已经：
1. 在 cosy-framework-design 项目中创建了基础的依赖注入接口设计
2. 理解了依赖注入的核心概念和实现方式
3. 掌握了服务容器的基本设计原则

继续阅读 [03-middleware-design.md](./03-middleware-design.md) 来学习中间件系统的设计。 

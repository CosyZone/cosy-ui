---
title: 中间件接口设计
---

# 中间件接口设计

## 1. 理解中间件系统

### 1.1 基本概念

中间件系统基于洋葱模型，负责请求的预处理和后处理。在 `src/middleware/types.ts` 中定义基本类型：

```typescript
/**
 * 中间件处理函数类型
 */
export type MiddlewareHandler = (context: IHttpContext, next: NextFunction) => Promise<void>;

/**
 * 下一个中间件函数类型
 */
export type NextFunction = () => Promise<void>;
```

### 1.2 中间件类型

在 `src/middleware/constants.ts` 中定义中间件类型：

```typescript
/**
 * 中间件类型枚举
 */
export enum MiddlewareType {
  /**
   * 全局中间件
   */
  GLOBAL = 'global',

  /**
   * 路由中间件
   */
  ROUTE = 'route',

  /**
   * 错误处理中间件
   */
  ERROR = 'error'
}
```

## 2. 设计核心接口

### 2.1 中间件配置接口

```typescript
/**
 * 中间件配置
 */
export interface IMiddlewareConfig {
  /**
   * 中间件实例
   */
  middleware: IMiddleware;

  /**
   * 中间件类型
   */
  type: MiddlewareType;

  /**
   * 执行顺序
   */
  order: number;
}
```

### 2.2 中间件接口

在 `src/middleware/interfaces.ts` 中定义中间件接口：

```typescript
/**
 * 中间件接口
 */
export interface IMiddleware {
  /**
   * 获取中间件配置
   */
  getConfig(): IMiddlewareConfig;

  /**
   * 执行中间件
   */
  execute(context: IHttpContext, next: NextFunction): Promise<void>;
}

/**
 * 错误处理中间件接口
 */
export interface IErrorMiddleware {
  /**
   * 处理错误
   * @param error 错误对象
   * @param context 上下文对象
   * @param next 下一个中间件
   */
  handle(error: Error, context: IHttpContext, next: NextFunction): Promise<void>;
}

/**
 * 中间件管理器接口
 */
export interface IMiddlewareManager {
  /**
   * 注册中间件
   */
  register(middleware: IMiddleware): void;

  /**
   * 注册全局中间件
   */
  useGlobal(middleware: IMiddleware): void;

  /**
   * 创建中间件链
   */
  createChain(middlewares: IMiddleware[]): MiddlewareHandler;
}

/**
 * 中间件工厂接口
 */
export interface IMiddlewareFactory {
  /**
   * 创建中间件
   */
  create(config: IMiddlewareConfig): IMiddleware;

  /**
   * 创建中间件链
   */
  createChain(middlewares: IMiddleware[]): MiddlewareHandler;
}
```

### 2.3 中间件上下文接口

```typescript
/**
 * 中间件上下文接口
 */
export interface IMiddlewareContext extends IHttpContext {
  /**
   * 中间件特定状态
   */
  middlewareState: Map<string, any>;

  /**
   * 获取中间件状态
   */
  getMiddlewareState<T>(key: string): T | undefined;

  /**
   * 设置中间件状态
   */
  setMiddlewareState<T>(key: string, value: T): void;
}

/**
 * 中间件错误处理器
 */
export interface IMiddlewareErrorHandler {
  /**
   * 处理中间件错误
   */
  handleError(error: Error, context: IMiddlewareContext): Promise<void>;
}
```

### 2.4 中间件组配置接口

```typescript
/**
 * 中间件组配置
 */
export interface IMiddlewareGroupConfig {
  /**
   * 路径前缀
   */
  prefix?: string;

  /**
   * 中间件列表
   */
  middlewares: IMiddleware[];
}
```

## 3. 导出模块

在 `src/middleware/index.ts` 中导出所有类型：

```typescript
export * from './interfaces';
export * from './types';
export * from './constants';
export * from './decorators';
```

## 下一步

完成本节后，你应该已经：
1. 在 cosy-framework-design 项目中创建了完整的中间件接口设计
2. 理解了中间件系统的核心概念和实现方式
3. 掌握了中间件注册和执行的设计原则

继续阅读 [09-config-interface.md](./09-config-interface.md) 来学习配置系统接口的设计。 

---
title: 路由系统设计
---

# 路由系统设计

## 1. 理解路由系统

### 1.1 基本概念

路由系统负责将HTTP请求映射到对应的处理函数。在 `src/routing/types.ts` 中定义基本类型：

```typescript
/**
 * 路由处理函数类型
 */
export type RouteHandler = (context: IContext) => Promise<void>;

/**
 * HTTP 方法类型
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

/**
 * 路由参数类型
 */
export interface IRouteParams {
  [key: string]: string;
}
```

### 1.2 路由模式

在 `src/routing/constants.ts` 中定义路由模式：

```typescript
/**
 * 路由模式枚举
 */
export enum RoutePattern {
  /**
   * 静态路由
   * 例如: /users
   */
  STATIC = 'static',

  /**
   * 参数路由
   * 例如: /users/:id
   */
  PARAMETERIZED = 'parameterized',

  /**
   * 通配符路由
   * 例如: /files/*
   */
  WILDCARD = 'wildcard'
}
```

**动手实践 1**：
1. 创建路由基本类型
2. 定义路由模式枚举
3. 在 index.ts 中导出

## 2. 设计核心接口

### 2.1 路由接口

在 `src/routing/interfaces.ts` 中定义路由接口：

```typescript
/**
 * 路由配置接口
 */
export interface IRouteConfig {
  /**
   * 路由路径
   */
  path: string;

  /**
   * HTTP 方法
   */
  method: HttpMethod;

  /**
   * 处理函数
   */
  handler: RouteHandler;

  /**
   * 中间件列表
   */
  middlewares?: IMiddleware[];
}

/**
 * 路由接口
 */
export interface IRoute {
  /**
   * 获取路由配置
   */
  getConfig(): IRouteConfig;

  /**
   * 匹配请求路径
   * @param path 请求路径
   * @param method HTTP方法
   */
  matches(path: string, method: HttpMethod): boolean;

  /**
   * 提取路由参数
   * @param path 请求路径
   */
  extractParams(path: string): IRouteParams;
}
```

### 2.2 路由管理器接口

```typescript
/**
 * 路由管理器接口
 */
export interface IRouteManager {
  /**
   * 注册路由
   * @param config 路由配置
   */
  register(config: IRouteConfig): void;

  /**
   * 查找匹配的路由
   * @param path 请求路径
   * @param method HTTP方法
   */
  find(path: string, method: HttpMethod): IRoute | null;

  /**
   * 获取所有路由
   */
  getRoutes(): IRoute[];
}
```

## 3. 实现装饰器类型

### 3.1 Controller 装饰器

在 `src/routing/decorators.ts` 中定义装饰器类型：

```typescript
/**
 * 控制器装饰器选项
 */
export interface IControllerOptions {
  /**
   * 路由前缀
   */
  prefix?: string;

  /**
   * 中间件列表
   */
  middlewares?: IMiddleware[];
}

/**
 * 控制器装饰器类型
 */
export type ControllerDecorator = (options?: IControllerOptions) => ClassDecorator;
```

### 3.2 路由方法装饰器

```typescript
/**
 * 路由方法装饰器选项
 */
export interface IRouteMethodOptions {
  /**
   * 路由路径
   */
  path: string;

  /**
   * 中间件列表
   */
  middlewares?: IMiddleware[];
}

/**
 * 路由方法装饰器类型
 */
export type RouteMethodDecorator = (options: IRouteMethodOptions) => MethodDecorator;

/**
 * HTTP方法装饰器类型
 */
export interface IHttpMethodDecorators {
  Get: RouteMethodDecorator;
  Post: RouteMethodDecorator;
  Put: RouteMethodDecorator;
  Delete: RouteMethodDecorator;
  Patch: RouteMethodDecorator;
}
```

## 4. 设计辅助类型

### 4.1 路由编译器类型

```typescript
/**
 * 路由编译结果
 */
export interface IRouteCompileResult {
  /**
   * 路由模式
   */
  pattern: RoutePattern;

  /**
   * 参数名列表
   */
  paramNames: string[];

  /**
   * 正则表达式
   */
  regex: RegExp;
}

/**
 * 路由编译器接口
 */
export interface IRouteCompiler {
  /**
   * 编译路由路径
   * @param path 路由路径
   */
  compile(path: string): IRouteCompileResult;

  /**
   * 解析路由参数
   * @param path 请求路径
   * @param result 编译结果
   */
  parse(path: string, result: IRouteCompileResult): IRouteParams;
}
```

## 5. 导出模块

在 `src/routing/index.ts` 中导出所有类型：

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
1. 在 cosy-framework-design 项目中创建了完整的路由接口设计
2. 理解了路由系统的核心概念和实现方式
3. 掌握了路由的设计原则和使用方法

继续阅读 [05-lifecycle-design.md](./05-lifecycle-design.md) 来学习生命周期系统的设计。 

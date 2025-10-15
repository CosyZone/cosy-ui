---
title: 路由接口设计
---

# 路由接口设计

## 1. 理解路由系统

### 1.1 基本概念

路由系统负责将 HTTP 请求映射到对应的处理函数。在 `src/routing/types.ts` 中定义基本类型：

```typescript
/**
 * 路由处理函数类型
 */
export type RouteHandler = (context: IHttpContext) => Promise<void>;

/**
 * 路由参数类型
 */
export interface IRouteParams {
  [key: string]: string;
}

/**
 * 路由约束类型
 */
export interface IRouteConstraints {
  [key: string]: RegExp | ((value: string) => boolean);
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

## 2. 设计核心接口

### 2.1 路由配置接口

在 `src/routing/interfaces.ts` 中定义路由配置接口：

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

  /**
   * 路由约束
   */
  constraints?: IRouteConstraints;
}
```

### 2.2 路由接口

```typescript
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

  /**
   * 验证参数约束
   */
  validateParams(params: IRouteParams): boolean;
}
```

### 2.3 路由管理器接口

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
   * 注册路由组
   */
  group(prefix: string, callback: (router: IRouteManager) => void): void;

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

### 2.4 路由编译器接口

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

## 3. 导出模块

在 `src/routing/index.ts` 中导出所有类型：

```typescript
export * from './interfaces';
export * from './types';
export * from './constants';
export * from './decorators';
```

## 下一步

完成本节后，你应该已经：
1. 在 cosy-framework-design 项目中创建了完整的路由接口设计
2. 理解了路由系统的核心概念和实现方式
3. 掌握了路由注册和匹配的设计原则

继续阅读 [08-middleware-interface.md](./08-middleware-interface.md) 来学习中间件接口的设计。 

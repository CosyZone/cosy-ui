# 中间件系统设计

## 1. 理解中间件系统

### 1.1 洋葱模型

中间件系统基于洋葱模型，请求和响应像洋葱层一样被处理：
- 请求从外到内穿过中间件层
- 响应从内到外穿过相同的中间件层

在 `src/middleware/types.ts` 中定义基本类型：

```typescript
/**
 * 中间件上下文类型
 */
export interface IContext {
  /**
   * 请求对象
   */
  request: Request;

  /**
   * 响应对象
   */
  response: Response;

  /**
   * 自定义数据
   */
  state: Record<string, any>;
}

/**
 * 下一个中间件函数
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

### 2.1 中间件接口

在 `src/middleware/interfaces.ts` 中定义中间件接口：

```typescript
/**
 * 中间件接口
 */
export interface IMiddleware {
  /**
   * 处理请求
   * @param context 上下文对象
   * @param next 下一个中间件
   */
  handle(context: IContext, next: NextFunction): Promise<void>;
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
  handle(error: Error, context: IContext, next: NextFunction): Promise<void>;
}
```

### 2.2 中间件管理器接口

```typescript
/**
 * 中间件管理器接口
 */
export interface IMiddlewareManager {
  /**
   * 添加中间件
   * @param middleware 中间件实例
   * @param type 中间件类型
   */
  use(middleware: IMiddleware, type?: MiddlewareType): void;

  /**
   * 执行中间件链
   * @param context 上下文对象
   */
  execute(context: IContext): Promise<void>;
}
```

## 3. 实现装饰器类型

### 3.1 Middleware 装饰器

在 `src/middleware/decorators.ts` 中定义装饰器类型：

```typescript
/**
 * 中间件装饰器选项
 */
export interface IMiddlewareOptions {
  /**
   * 中间件类型
   */
  type?: MiddlewareType;

  /**
   * 中间件顺序
   */
  order?: number;
}

/**
 * 中间件装饰器类型
 */
export type MiddlewareDecorator = (options?: IMiddlewareOptions) => ClassDecorator;
```

## 4. 设计辅助类型

### 4.1 中间件配置类型

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

## 5. 导出模块

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
3. 掌握了中间件的设计原则和使用方法

继续阅读 [04-routing-design.md](./04-routing-design.md) 来学习路由系统的设计。 

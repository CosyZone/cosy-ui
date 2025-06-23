# 中间件接口设计

## 学习目标

完成本节后，你将能够：
1. 理解中间件系统的核心概念和工作原理
2. 设计中间件的基本接口和类型
3. 实现中间件的注册和执行机制
4. 在 cosy-framework-design 中完成中间件模块的接口设计

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

/**
 * 中间件配置类型
 */
export interface IMiddlewareConfig {
  /**
   * 中间件名称
   */
  name: string;

  /**
   * 中间件处理函数
   */
  handler: MiddlewareHandler;

  /**
   * 执行顺序
   */
  order?: number;
}
```

### 1.2 中间件作用域

在 `src/middleware/constants.ts` 中定义作用域类型：

```typescript
/**
 * 中间件作用域枚举
 */
export enum MiddlewareScope {
  /**
   * 全局中间件
   */
  GLOBAL = 'global',

  /**
   * 路由中间件
   */
  ROUTE = 'route',

  /**
   * 控制器中间件
   */
  CONTROLLER = 'controller'
}
```

**动手实践 1**：
1. 创建中间件基本类型
2. 定义作用域枚举
3. 在 index.ts 中导出

## 2. 设计核心接口

### 2.1 中间件接口

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
```

**动手实践 2**：
1. 创建中间件接口
2. 添加管理器接口
3. 编写完整的类型注释

### 2.2 中间件工厂接口

```typescript
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

**动手实践 3**：
1. 创建工厂接口
2. 实现中间件创建
3. 添加链式处理

## 3. 实现装饰器类型

### 3.1 Middleware 装饰器

在 `src/middleware/decorators.ts` 中定义装饰器类型：

```typescript
/**
 * 中间件装饰器选项
 */
export interface IMiddlewareOptions {
  /**
   * 中间件作用域
   */
  scope?: MiddlewareScope;

  /**
   * 执行顺序
   */
  order?: number;
}

/**
 * 中间件装饰器类型
 */
export type MiddlewareDecorator = (options?: IMiddlewareOptions) => ClassDecorator & MethodDecorator;
```

### 3.2 Use 装饰器

```typescript
/**
 * Use 装饰器选项
 */
export interface IUseOptions {
  /**
   * 中间件列表
   */
  middlewares: IMiddleware[];

  /**
   * 执行顺序
   */
  order?: number;
}

/**
 * Use 装饰器类型
 */
export type UseDecorator = (options: IUseOptions) => MethodDecorator;
```

**动手实践 4**：
1. 创建装饰器类型定义
2. 添加配置选项接口
3. 导出所有类型定义

## 4. 设计辅助类型

### 4.1 中间件上下文类型

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

**动手实践 5**：
1. 创建上下文类型定义
2. 实现状态管理
3. 添加错误处理支持

## 5. 集成示例

### 5.1 基本中间件示例

```typescript
@Middleware({
  name: 'auth',
  scope: MiddlewareScope.GLOBAL
})
class AuthMiddleware implements IMiddleware {
  constructor(private authService: AuthService) {}

  async execute(context: IHttpContext, next: NextFunction): Promise<void> {
    const token = context.request.getHeader('Authorization');
    if (!token) {
      context.response.status(401).json({
        error: 'Unauthorized'
      });
      return;
    }

    try {
      const user = await this.authService.verifyToken(token);
      context.state.user = user;
      await next();
    } catch (error) {
      context.response.status(401).json({
        error: 'Invalid token'
      });
    }
  }
}
```

**动手实践 6**：
1. 创建认证中间件
2. 实现令牌验证
3. 添加错误处理

### 5.2 中间件链示例

```typescript
@Controller({
  prefix: '/api',
  middlewares: [new LogMiddleware(), new AuthMiddleware()]
})
class ApiController {
  @Post('/upload', {
    middlewares: [
      new FileUploadMiddleware({
        maxSize: '5mb',
        allowedTypes: ['image/jpeg', 'image/png']
      }),
      new ValidationMiddleware({
        schema: uploadSchema
      })
    ]
  })
  async uploadFile(context: IHttpContext): Promise<void> {
    const file = context.state.file;
    const result = await this.fileService.upload(file);
    context.response.json(result);
  }
}
```

**动手实践 7**：
1. 创建文件上传中间件
2. 实现中间件组合
3. 测试中间件链执行

### 5.3 错误处理中间件示例

```typescript
@Middleware({
  name: 'error-handler',
  scope: MiddlewareScope.GLOBAL,
  order: -1
})
class ErrorHandlerMiddleware implements IMiddleware {
  async execute(context: IHttpContext, next: NextFunction): Promise<void> {
    try {
      await next();
    } catch (error) {
      if (error instanceof ValidationError) {
        context.response.status(400).json({
          error: 'Validation failed',
          details: error.details
        });
        return;
      }

      if (error instanceof AuthError) {
        context.response.status(401).json({
          error: 'Unauthorized',
          message: error.message
        });
        return;
      }

      // 默认错误处理
      context.response.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
      });
    }
  }
}
```

**动手实践 8**：
1. 创建错误处理中间件
2. 实现不同类型的错误处理
3. 测试错误处理流程

## 6. 导出模块

在 `src/middleware/index.ts` 中导出所有类型：

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
1. 在 cosy-framework-design 项目中创建了完整的中间件接口设计
2. 理解了中间件系统的核心概念和实现方式
3. 掌握了中间件注册和执行的设计原则

继续阅读 [10-config-interface.md](./10-config-interface.md) 来学习配置接口的设计。 

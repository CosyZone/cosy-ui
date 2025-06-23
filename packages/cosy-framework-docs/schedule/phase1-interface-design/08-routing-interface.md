# 路由接口设计

## 学习目标

完成本节后，你将能够：
1. 理解路由系统的核心概念和工作原理
2. 设计路由注册和匹配的接口
3. 实现路由参数和约束处理
4. 在 cosy-framework-design 中完成路由模块的接口设计

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

  /**
   * 路由约束
   */
  constraints?: IRouteConstraints;
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
   */
  matches(path: string, method: HttpMethod): boolean;

  /**
   * 提取路由参数
   */
  extractParams(path: string): IRouteParams;

  /**
   * 验证参数约束
   */
  validateParams(params: IRouteParams): boolean;
}
```

**动手实践 2**：
1. 创建路由接口
2. 添加路由配置接口
3. 编写完整的类型注释

### 2.2 路由管理器接口

```typescript
/**
 * 路由管理器接口
 */
export interface IRouteManager {
  /**
   * 注册路由
   */
  register(config: IRouteConfig): void;

  /**
   * 注册路由组
   */
  group(prefix: string, callback: (router: IRouteManager) => void): void;

  /**
   * 查找匹配的路由
   */
  find(path: string, method: HttpMethod): IRoute | null;

  /**
   * 获取所有路由
   */
  getRoutes(): IRoute[];
}
```

**动手实践 3**：
1. 创建管理器接口
2. 实现路由注册方法
3. 添加路由组支持

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

  /**
   * 路由约束
   */
  constraints?: IRouteConstraints;
}

/**
 * 路由方法装饰器类型
 */
export type RouteMethodDecorator = (options: IRouteMethodOptions) => MethodDecorator;

/**
 * HTTP 方法装饰器
 */
export interface IHttpMethodDecorators {
  Get(path: string, options?: Omit<IRouteMethodOptions, 'path'>): MethodDecorator;
  Post(path: string, options?: Omit<IRouteMethodOptions, 'path'>): MethodDecorator;
  Put(path: string, options?: Omit<IRouteMethodOptions, 'path'>): MethodDecorator;
  Delete(path: string, options?: Omit<IRouteMethodOptions, 'path'>): MethodDecorator;
  Patch(path: string, options?: Omit<IRouteMethodOptions, 'path'>): MethodDecorator;
}
```

**动手实践 4**：
1. 创建装饰器类型定义
2. 添加配置选项接口
3. 导出所有类型定义

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
   */
  compile(path: string): IRouteCompileResult;

  /**
   * 解析路由参数
   */
  parse(path: string, result: IRouteCompileResult): IRouteParams;
}
```

**动手实践 5**：
1. 创建编译器类型定义
2. 实现路由编译功能
3. 添加参数解析支持

## 5. 集成示例

### 5.1 基本控制器示例

```typescript
@Controller({ prefix: '/users' })
class UserController {
  constructor(private userService: UserService) {}

  @Get('/', {
    middlewares: [new AuthMiddleware()]
  })
  async getUsers(context: IHttpContext): Promise<void> {
    const users = await this.userService.findAll();
    context.response.json(users);
  }

  @Get('/:id', {
    constraints: {
      id: /^\d+$/
    }
  })
  async getUser(context: IHttpContext): Promise<void> {
    const { id } = context.params;
    const user = await this.userService.findById(id);
    context.response.json(user);
  }

  @Post('/', {
    middlewares: [new ValidationMiddleware()]
  })
  async createUser(context: IHttpContext): Promise<void> {
    const data = context.request.body;
    const user = await this.userService.create(data);
    context.response.status(201).json(user);
  }
}
```

**动手实践 6**：
1. 创建示例控制器
2. 实现路由方法
3. 添加中间件和约束

### 5.2 路由组示例

```typescript
@Controller({ prefix: '/api' })
class ApiController {
  @Group({
    prefix: '/v1',
    middlewares: [new AuthMiddleware()]
  })
  v1Routes(): void {
    this.register(UserController);
    this.register(PostController);
  }

  @Group({
    prefix: '/v2',
    middlewares: [new AuthMiddleware(), new RateLimitMiddleware()]
  })
  v2Routes(): void {
    this.register(UserControllerV2);
    this.register(PostControllerV2);
  }
}
```

**动手实践 7**：
1. 创建路由组示例
2. 实现版本控制
3. 添加组级中间件

### 5.3 路由管理器使用示例

```typescript
// 创建路由管理器
const router = new RouteManager();

// 注册路由
router.register({
  path: '/users',
  method: 'GET',
  handler: async (context) => {
    // 处理逻辑
  }
});

// 注册带参数的路由
router.register({
  path: '/users/:id',
  method: 'GET',
  handler: async (context) => {
    const { id } = context.params;
    // 处理逻辑
  },
  constraints: {
    id: /^\d+$/
  }
});

// 注册路由组
router.group('/api', (api) => {
  api.register({
    path: '/users',
    method: 'GET',
    handler: async (context) => {
      // 处理逻辑
    }
  });
});
```

**动手实践 8**：
1. 创建管理器实例
2. 注册不同类型的路由
3. 测试路由匹配和参数提取

## 6. 导出模块

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
3. 掌握了路由注册和匹配的设计原则

继续阅读 [09-middleware-interface.md](./09-middleware-interface.md) 来学习中间件接口的设计。 

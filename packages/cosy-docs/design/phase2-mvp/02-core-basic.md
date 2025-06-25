# MVP 核心功能实现

在这个步骤中，我们将实现框架的核心功能，包括一个基本的应用程序类和简单的依赖注入容器。我们将专注于最基本的功能，以验证框架的核心设计。

## 核心类型定义

首先，我们需要定义一些基本的类型。创建 `src/core/types.ts`：

```typescript
// 构造函数类型
export type Constructor<T = any> = new (...args: any[]) => T;

// 服务标识符类型
export type ServiceIdentifier = string | symbol;

// 中间件处理函数类型
export type MiddlewareHandler = (ctx: any, next: () => Promise<void>) => Promise<void>;

// 路由处理函数类型
export type RouteHandler = (ctx: any) => Promise<any>;

// 配置回调函数类型
export type ConfigureCallback = (app: Application) => void;
```

## 应用程序类实现

创建 `src/core/application.ts`，实现基本的应用程序类：

```typescript
import { createServer, Server } from 'http';
import { Constructor, ServiceIdentifier, MiddlewareHandler, RouteHandler, ConfigureCallback } from './types';

export class Application {
    private server?: Server;
    private running: boolean = false;
    private port?: number;
    private services: Map<ServiceIdentifier, any> = new Map();
    private middlewares: MiddlewareHandler[] = [];
    private routes: Map<string, RouteHandler> = new Map();

    // 生命周期管理
    async boot(): Promise<void> {
        // 在这个阶段，我们只需要确保基本服务已注册
        if (!this.running) {
            await this.initializeServices();
        }
    }

    async start(port: number = 3000): Promise<void> {
        if (this.running) {
            throw new Error('Application is already running');
        }

        await this.boot();
        
        this.port = port;
        this.server = createServer(this.handleRequest.bind(this));
        
        return new Promise((resolve) => {
            this.server!.listen(port, () => {
                this.running = true;
                console.log(`Server started on port ${port}`);
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        if (!this.running || !this.server) {
            throw new Error('Application is not running');
        }

        return new Promise((resolve, reject) => {
            this.server!.close((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.running = false;
                this.server = undefined;
                resolve();
            });
        });
    }

    isRunning(): boolean {
        return this.running;
    }

    // 配置管理
    configure(callback: ConfigureCallback): this {
        callback(this);
        return this;
    }

    // 简化版的配置存储
    private configStore: Map<string, any> = new Map();
    
    config<T>(key: string, value?: T): T {
        if (value !== undefined) {
            this.configStore.set(key, value);
            return value;
        }
        return this.configStore.get(key);
    }

    // 服务管理 - 简化版的依赖注入
    singleton<T>(token: ServiceIdentifier, implementation: Constructor<T>): this {
        if (!this.services.has(token)) {
            const instance = new implementation();
            this.services.set(token, instance);
        }
        return this;
    }

    resolve<T>(token: ServiceIdentifier): T {
        const service = this.services.get(token);
        if (!service) {
            throw new Error(`Service not found: ${String(token)}`);
        }
        return service;
    }

    // 路由管理 - 简化版
    get(path: string, handler: RouteHandler): this {
        this.routes.set(`GET ${path}`, handler);
        return this;
    }

    post(path: string, handler: RouteHandler): this {
        this.routes.set(`POST ${path}`, handler);
        return this;
    }

    // 中间件管理 - 简化版
    use(middleware: MiddlewareHandler): this {
        this.middlewares.push(middleware);
        return this;
    }

    // 私有方法
    private async initializeServices(): Promise<void> {
        // 在MVP阶段，我们只需要确保Map已经初始化
        this.services = this.services || new Map();
    }

    private async handleRequest(req: any, res: any): Promise<void> {
        const ctx = { req, res, params: {}, body: null };

        try {
            // 执行中间件链
            await this.runMiddleware(ctx);

            // 查找并执行路由处理器
            const route = this.routes.get(`${req.method} ${req.url}`);
            if (route) {
                const result = await route(ctx);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } else {
                res.writeHead(404);
                res.end('Not Found');
            }
        } catch (error) {
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    }

    private async runMiddleware(ctx: any): Promise<void> {
        let index = 0;
        
        const next = async (): Promise<void> => {
            if (index >= this.middlewares.length) {
                return;
            }
            const middleware = this.middlewares[index++];
            await middleware(ctx, next);
        };

        await next();
    }
}
```

## 测试实现

创建 `src/core/application.test.ts` 来验证基本功能：

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Application } from './application';
import http from 'http';

describe('Application', () => {
    let app: Application;

    beforeEach(() => {
        app = new Application();
    });

    afterEach(async () => {
        if (app.isRunning()) {
            await app.stop();
        }
    });

    it('should start and stop the server', async () => {
        const port = 3001;
        await app.start(port);
        expect(app.isRunning()).toBe(true);

        await app.stop();
        expect(app.isRunning()).toBe(false);
    });

    it('should handle basic routing', async () => {
        const port = 3002;
        app.get('/test', async () => ({ message: 'Hello World' }));
        await app.start(port);

        const response = await fetch(`http://localhost:${port}/test`);
        const data = await response.json();
        
        expect(data).toEqual({ message: 'Hello World' });
    });

    it('should handle middleware', async () => {
        const port = 3003;
        let middlewareCalled = false;

        app.use(async (ctx, next) => {
            middlewareCalled = true;
            await next();
        });

        app.get('/test', async () => ({ success: true }));
        await app.start(port);

        await fetch(`http://localhost:${port}/test`);
        expect(middlewareCalled).toBe(true);
    });

    it('should handle dependency injection', () => {
        class TestService {
            getMessage() {
                return 'Hello from Service';
            }
        }

        app.singleton('testService', TestService);
        const service = app.resolve<TestService>('testService');
        
        expect(service).toBeInstanceOf(TestService);
        expect(service.getMessage()).toBe('Hello from Service');
    });
});
```

## 使用示例

下面是一个简单的使用示例：

```typescript
import { Application } from './core/application';

const app = new Application();

// 配置中间件
app.use(async (ctx, next) => {
    console.log(`${ctx.req.method} ${ctx.req.url}`);
    await next();
});

// 注册服务
class UserService {
    getUsers() {
        return [{ id: 1, name: 'John' }];
    }
}
app.singleton('userService', UserService);

// 配置路由
app.get('/users', async (ctx) => {
    const userService = app.resolve<UserService>('userService');
    return userService.getUsers();
});

// 启动应用
app.start(3000).then(() => {
    console.log('Application started');
});
```

## 下一步

在实现了基本的应用程序类后，我们将在 [HTTP基础](./03-http-basic.md) 中完善HTTP服务器的实现，使其能够更好地处理请求和响应。

## 关键点说明

1. **简化的实现**：
   - 移除了复杂的插件系统
   - 简化了路由和中间件的实现
   - 使用简单的Map来存储服务和路由

2. **保留的核心功能**：
   - 基本的生命周期管理
   - 简单的依赖注入
   - 中间件系统
   - 路由处理

3. **验证要点**：
   - 服务器的启动和停止
   - 基本的路由功能
   - 中间件链的执行
   - 依赖注入的工作方式

这个MVP实现为我们提供了一个工作的框架原型，我们可以基于它来验证设计并逐步添加更多功能。

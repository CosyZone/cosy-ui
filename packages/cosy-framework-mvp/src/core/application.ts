import { createServer, Server, IncomingMessage, ServerResponse } from 'http';
import { Constructor, ServiceIdentifier, MiddlewareHandler, ConfigureCallback } from './types';
import { HttpContextImpl } from '../http/context';
import { HttpContext } from '../http/types';
import { Router } from '../routing/router';

export class Application {
    private server?: Server;
    private running: boolean = false;
    private port?: number;
    private services: Map<ServiceIdentifier, any> = new Map();
    private middlewares: MiddlewareHandler[] = [];
    private router: Router = new Router();

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

    // 路由管理 - 使用Router类
    get(path: string, handler: (ctx: HttpContext) => Promise<any>): this {
        this.router.get(path, handler);
        return this;
    }

    post(path: string, handler: (ctx: HttpContext) => Promise<any>): this {
        this.router.post(path, handler);
        return this;
    }

    put(path: string, handler: (ctx: HttpContext) => Promise<any>): this {
        this.router.put(path, handler);
        return this;
    }

    delete(path: string, handler: (ctx: HttpContext) => Promise<any>): this {
        this.router.delete(path, handler);
        return this;
    }

    patch(path: string, handler: (ctx: HttpContext) => Promise<any>): this {
        this.router.patch(path, handler);
        return this;
    }

    // 中间件管理 - 简化版
    use(middleware: MiddlewareHandler): this {
        this.middlewares.push(middleware);
        return this;
    }

    // 获取路由器实例
    getRouter(): Router {
        return this.router;
    }

    // 私有方法
    private async initializeServices(): Promise<void> {
        // 在MVP阶段，我们只需要确保Map已经初始化
        this.services = this.services || new Map();
    }

    private async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const ctx = new HttpContextImpl(req, res);

        try {
            // 执行中间件链
            await this.runMiddleware(ctx);

            // 查找并执行路由处理器
            const match = this.router.match(ctx.request.method, ctx.request.url);
            if (match) {
                // 设置路由参数
                ctx.request.params = match.params;

                // 执行处理器
                const result = await match.handler(ctx);
                if (!ctx.response.sent) {
                    ctx.response.json(result);
                }
            } else {
                ctx.response.status = 404;
                ctx.response.json({ error: 'Not Found' });
            }
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.json({ error: 'Internal Server Error' });
        }
    }

    private async runMiddleware(ctx: HttpContext): Promise<void> {
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

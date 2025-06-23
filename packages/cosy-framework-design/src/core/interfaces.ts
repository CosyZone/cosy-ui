import { Constructor, ServiceIdentifier } from '../container/types';
import { IHttpContext, RequestInterface, ResponseInterface } from '../http';
import { IRoute, IRouteManager } from '../routing/interfaces';
import { MiddlewareHandler } from '../middleware/types';
import { IServiceProvider } from '../container/interfaces';

/**
 * 应用程序接口
 */
export interface ApplicationInterface {
    // 生命周期管理
    boot(): Promise<void>;
    start(port?: number): Promise<void>;
    stop(): Promise<void>;
    isRunning(): boolean;

    // 配置管理
    configure(callback: (app: ApplicationInterface) => void): this;
    config<T>(key: string, value?: T): T;

    // 服务管理
    register(provider: IServiceProvider): this;
    resolve<T>(token: string | symbol): T;
    singleton<T>(token: string | symbol, implementation: Constructor<T>): this;
    bind<T>(token: string | symbol, implementation: Constructor<T>): this;

    // 路由管理
    get(path: string, handler: MiddlewareHandler): IRoute;
    post(path: string, handler: MiddlewareHandler): IRoute;
    put(path: string, handler: MiddlewareHandler): IRoute;
    patch(path: string, handler: MiddlewareHandler): IRoute;
    delete(path: string, handler: MiddlewareHandler): IRoute;
    group(prefix: string | RouteGroupOptions, callback: (router: IRouteManager) => void): void;

    // 中间件管理
    use(middleware: MiddlewareHandler): this;
    useGlobal(middleware: MiddlewareHandler): this;

    // 请求处理
    handle(request: RequestInterface): Promise<ResponseInterface>;
    handleHttp(req: any, res: any): Promise<void>;

    // 状态管理
    getPort(): number | undefined;
    getEnvironment(): string;
    getVersion(): string;
}

/**
 * 应用程序配置接口
 */
export interface ApplicationConfig {
    // 基本配置
    name?: string;
    version?: string;
    debug?: boolean;

    // 服务器配置
    port?: number;
    host?: string;

    // 环境配置
    env?: string;
    timezone?: string;
    locale?: string;

    // 组件配置
    providers?: Constructor<IServiceProvider>[];
    middleware?: MiddlewareHandler[];
    plugins?: ApplicationPlugin[];
}

/**
 * 生命周期钩子接口
 */
export interface ApplicationLifecycleHooks {
    // 启动阶段
    beforeBoot?: () => Awaitable<void>;
    afterBoot?: () => Awaitable<void>;

    // 运行阶段
    beforeStart?: () => Awaitable<void>;
    afterStart?: () => Awaitable<void>;

    // 停止阶段
    beforeStop?: () => Awaitable<void>;
    afterStop?: () => Awaitable<void>;
}

/**
 * 插件接口
 */
export interface ApplicationPlugin {
    // 插件信息
    getName(): string;
    getVersion(): string;

    // 生命周期
    install(app: ApplicationInterface): void | Promise<void>;
    uninstall?(app: ApplicationInterface): void | Promise<void>;

    // 配置
    getDefaults?(): Record<string, any>;
    validate?(config: Record<string, any>): boolean;
}

/**
 * 路由组选项
 */
export interface RouteGroupOptions {
    prefix: string;
    middleware?: MiddlewareHandler[];
}

type Awaitable<T> = T | Promise<T>;

// 占位符接口
export interface ICoreTemp { }

import { IMiddlewareHandler } from '../middleware'
import { IRouteHandler } from '../route-handler'
import { ILogger } from '../logger'

/**
 * HTTP 服务器配置接口
 */
export interface ServerConfig {
    port?: number;
    hostname?: string;
    ssl?: {
        key: string;
        cert: string;
    };
    timeout?: number;
    keepAliveTimeout?: number;
    logger?: ILogger;
}

/**
 * HTTP 服务器接口
 * 
 * 定义了 HTTP 服务器的标准接口，提供了启动、停止服务器以及处理中间件和路由的功能。
 * 
 * @example
 * ```typescript
 * const server = new Server({
 *   port: 3000,
 *   logger: myLogger
 * });
 * 
 * // 添加中间件
 * server.use(logger);
 * server.use(cors);
 * 
 * // 设置路由处理器
 * server.setRouteHandler((req, res) => {
 *   // 处理路由
 * });
 * 
 * // 启动服务器
 * await server.listen(3000);
 * ```
 * 
 * @remarks
 * 服务器实现的最佳实践：
 * 1. 错误处理
 *    - 实现全局错误处理
 *    - 优雅处理未捕获的异常
 *    - 提供错误恢复机制
 * 
 * 2. 中间件管理
 *    - 正确维护中间件执行顺序
 *    - 支持异步中间件
 *    - 提供中间件错误处理
 * 
 * 3. 性能优化
 *    - 实现请求超时机制
 *    - 支持 Keep-Alive
 *    - 提供压缩支持
 * 
 * 4. 安全性
 *    - 实现基本的安全头部
 *    - 提供 TLS/SSL 支持
 *    - 防止常见的安全漏洞
 */
export interface IServer {
    /**
     * 添加中间件
     * @param middleware - 中间件处理函数
     */
    use(middleware: IMiddlewareHandler): void;

    /**
     * 设置路由处理器
     * @param handler - 路由处理函数
     */
    setRouteHandler(handler: IRouteHandler): void;

    /**
     * 启动服务器
     * @param port - 监听端口
     * @param hostname - 监听主机名（可选）
     */
    listen(port?: number, hostname?: string): Promise<void>;

    /**
     * 关闭服务器
     */
    close(): Promise<void>;

    /**
     * 获取服务器实例
     */
    getInstance(): any;

    /**
     * 获取服务器配置
     */
    getConfig(): Required<Pick<ServerConfig, 'port'>> & Omit<ServerConfig, 'port'>;

    /**
     * 获取中间件列表
     */
    getMiddlewares(): IMiddlewareHandler[];

    /**
     * 获取当前连接数
     */
    getConnectionCount(): number;

    /**
     * 检查服务器是否正在运行
     */
    isRunning(): boolean;

    /**
     * 重启服务器
     */
    restart(): Promise<void>;
} 

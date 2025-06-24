import { Container, ServiceProvider } from './types'

/**
 * 服务提供者基类
 * 
 * 服务提供者用于统一管理一组相关服务的注册和生命周期。
 * 它提供了一个标准化的方式来:
 * - 注册多个相关的服务
 * - 管理服务的启动和关闭
 * - 处理服务之间的依赖关系
 * 
 * @example
 * ```typescript
 * class AppServiceProvider extends BaseServiceProvider {
 *   register(container: Container): void {
 *     container.singleton('db', DatabaseService);
 *     container.singleton('users', UserService);
 *   }
 * 
 *   boot(container: Container): void {
 *     const db = container.resolve('db');
 *     db.connect();
 *   }
 * }
 * ```
 */
export abstract class BaseServiceProvider implements ServiceProvider {
    /**
     * 注册服务到容器
     * 
     * 在这个方法中实现服务的注册逻辑。可以注册多个相关的服务，
     * 设置它们的生命周期（单例/瞬态），并处理它们之间的依赖关系。
     * 
     * @param container - 服务容器实例，用于注册服务
     * 
     * @example
     * ```typescript
     * register(container: Container): void {
     *   // 注册单例服务
     *   container.singleton('config', ConfigService);
     *   
     *   // 注册瞬态服务
     *   container.bind('logger', LoggerService);
     * }
     * ```
     */
    abstract register(container: Container): void

    /**
     * 启动服务（可选）
     * 
     * 当容器启动时，此方法会被调用。
     * 可以在这里执行服务的初始化逻辑，例如：
     * - 建立数据库连接
     * - 加载配置文件
     * - 启动后台任务
     * - 初始化外部服务连接
     * 
     * @param container - 服务容器实例，可用于解析其他服务
     * 
     * @example
     * ```typescript
     * boot(container: Container): void {
     *   const db = container.resolve('db');
     *   db.connect();
     *   
     *   const cache = container.resolve('cache');
     *   cache.clear();
     * }
     * ```
     */
    boot?(container: Container): void
} 

import { IMiddlewareHandler } from './middleware-handler.js'

/**
 * 中间件管理器接口
 * 
 * 中间件管理器负责注册、解析和管理中间件。它支持命名中间件、
 * 中间件分组和全局中间件的管理。这使得中间件的复用和组织变得更加灵活。
 * 
 * @example
 * ```typescript
 * // 创建管理器实例
 * const manager = new MiddlewareManager();
 * 
 * // 注册命名中间件
 * manager.register('auth', authMiddleware);
 * manager.register('cors', corsMiddleware);
 * 
 * // 创建中间件组
 * manager.group('api', [
 *   'auth',           // 使用命名中间件
 *   corsMiddleware,   // 直接使用中间件函数
 *   'rateLimit'
 * ]);
 * 
 * // 注册全局中间件
 * manager.global(loggingMiddleware);
 * manager.global(errorHandlerMiddleware);
 * 
 * // 解析和使用中间件
 * const authMiddleware = manager.resolve('auth');
 * const apiMiddlewares = manager.getGroup('api');
 * const globalMiddlewares = manager.getGlobal();
 * ```
 * 
 * @remarks
 * 中间件管理器的实现建议：
 * ```typescript
 * class MiddlewareManager implements IMiddlewareManager {
 *   private middlewares = new Map<string, IMiddlewareHandler>();
 *   private groups = new Map<string, IMiddlewareHandler[]>();
 *   private globals: IMiddlewareHandler[] = [];
 * 
 *   register(name: string, middleware: IMiddlewareHandler): void {
 *     this.middlewares.set(name, middleware);
 *   }
 * 
 *   resolve(name: string): IMiddlewareHandler | undefined {
 *     return this.middlewares.get(name);
 *   }
 * 
 *   group(name: string, middlewares: (string | IMiddlewareHandler)[]): void {
 *     const resolved = middlewares.map(m => 
 *       typeof m === 'string' ? this.resolve(m) : m
 *     ).filter(Boolean);
 *     this.groups.set(name, resolved);
 *   }
 * 
 *   getGroup(name: string): IMiddlewareHandler[] {
 *     return this.groups.get(name) || [];
 *   }
 * 
 *   global(middleware: IMiddlewareHandler): void {
 *     this.globals.push(middleware);
 *   }
 * 
 *   getGlobal(): IMiddlewareHandler[] {
 *     return [...this.globals];
 *   }
 * }
 * ```
 */
export interface IMiddlewareManager {
    /**
     * 注册一个命名中间件
     * @param name - 中间件的唯一名称
     * @param middleware - 中间件处理器
     */
    register(name: string, middleware: IMiddlewareHandler): void

    /**
     * 解析一个命名中间件
     * @param name - 中间件名称
     * @returns 对应的中间件处理器，如果不存在则返回undefined
     */
    resolve(name: string): IMiddlewareHandler | undefined

    /**
     * 创建一个中间件组
     * @param name - 组名
     * @param middlewares - 中间件数组，可以是中间件名称或处理器
     */
    group(name: string, middlewares: (string | IMiddlewareHandler)[]): void

    /**
     * 获取指定组的所有中间件
     * @param name - 组名
     * @returns 中间件处理器数组
     */
    getGroup(name: string): IMiddlewareHandler[]

    /**
     * 添加全局中间件
     * @param middleware - 中间件处理器
     */
    global(middleware: IMiddlewareHandler): void

    /**
     * 获取所有全局中间件
     * @returns 全局中间件处理器数组
     */
    getGlobal(): IMiddlewareHandler[]
} 

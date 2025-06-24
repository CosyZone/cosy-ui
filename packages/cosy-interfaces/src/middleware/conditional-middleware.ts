import { IRequest, ResponseInterface } from '../http'
import { IMiddlewareHandler } from './middleware-handler'

/**
 * 条件中间件接口
 * 
 * 条件中间件允许根据特定条件动态决定是否执行中间件。
 * 它提供了两种条件执行方式：
 * - when: 当条件满足时执行中间件
 * - unless: 当条件不满足时执行中间件
 * 
 * @example
 * ```typescript
 * // 创建条件中间件
 * const adminOnly = conditional(authMiddleware)
 *   .when((req) => req.user?.role === 'admin');
 * 
 * // 创建反向条件中间件
 * const publicOnly = conditional(guestMiddleware)
 *   .unless((req) => req.user != null);
 * 
 * // 复杂条件示例
 * const apiRateLimit = conditional(rateLimitMiddleware)
 *   .when((req) => {
 *     return req.path.startsWith('/api') && 
 *            req.method !== 'GET';
 *   });
 * 
 * // 组合多个条件
 * const complexMiddleware = conditional(someMiddleware)
 *   .when((req, res) => {
 *     const isApi = req.path.startsWith('/api');
 *     const isWrite = ['POST', 'PUT', 'DELETE'].includes(req.method);
 *     const isProd = process.env.NODE_ENV === 'production';
 *     return isApi && isWrite && isProd;
 *   });
 * ```
 * 
 * @remarks
 * 条件中间件的实现建议：
 * ```typescript
 * class ConditionalMiddlewareImpl implements IConditionalMiddleware {
 *   constructor(private middleware: IMiddlewareHandler) {}
 * 
 *   when(condition: (req: RequestInterface, res: ResponseInterface) => boolean): IMiddlewareHandler {
 *     return async (req, res, next) => {
 *       if (condition(req, res)) {
 *         return this.middleware(req, res, next);
 *       }
 *       return next();
 *     };
 *   }
 * 
 *   unless(condition: (req: RequestInterface, res: ResponseInterface) => boolean): IMiddlewareHandler {
 *     return this.when((req, res) => !condition(req, res));
 *   }
 * }
 * 
 * // 创建条件中间件的工厂函数
 * function conditional(middleware: IMiddlewareHandler): IConditionalMiddleware {
 *   return new ConditionalMiddlewareImpl(middleware);
 * }
 * ```
 */
export interface IConditionalMiddleware {
    /**
     * 当条件满足时执行中间件
     * @param condition - 条件函数，返回true时执行中间件
     * @returns 新的中间件处理器
     */
    when(condition: (request: IRequest, response: ResponseInterface) => boolean): IMiddlewareHandler;

    /**
     * 当条件不满足时执行中间件
     * @param condition - 条件函数，返回false时执行中间件
     * @returns 新的中间件处理器
     */
    unless(condition: (request: IRequest, response: ResponseInterface) => boolean): IMiddlewareHandler;
} 

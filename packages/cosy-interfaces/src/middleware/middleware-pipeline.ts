import { IRequest, ResponseInterface } from '../http'
import { IMiddlewareHandler } from './middleware-handler'
import { IRouteHandler } from '../route-handler'

/**
 * 中间件管道接口
 * 
 * 中间件管道负责组织和执行一系列中间件。它实现了责任链模式，
 * 允许中间件按照特定的顺序执行，并支持动态添加中间件。
 * 
 * @example
 * ```typescript
 * // 创建管道实例
 * const pipeline = new Pipeline();
 * 
 * // 使用 pipe 添加单个中间件
 * pipeline.pipe(authMiddleware)
 *        .pipe(loggingMiddleware);
 * 
 * // 使用 through 批量添加中间件
 * pipeline.through([
 *   rateLimitMiddleware,
 *   corsMiddleware,
 *   compressionMiddleware
 * ]);
 * 
 * // 设置最终的路由处理器并执行
 * const result = await pipeline
 *   .then(async (req, res) => {
 *     return res.json({ success: true });
 *   })
 *   .execute(request, response);
 * ```
 * 
 * @remarks
 * 中间件管道的工作原理：
 * 1. 管道维护一个中间件队列
 * 2. 当执行时，创建一个执行链，每个中间件都可以：
 *    - 调用 next() 继续执行链
 *    - 直接返回响应，中断执行链
 *    - 抛出错误，触发错误处理
 * 3. 最后执行路由处理器
 * 
 * 实现提示：
 * ```typescript
 * class Pipeline implements IMiddlewarePipeline {
 *   private middlewares: IMiddlewareHandler[] = [];
 *   
 *   pipe(middleware: IMiddlewareHandler): this {
 *     this.middlewares.push(middleware);
 *     return this;
 *   }
 *   
 *   async execute(req: RequestInterface, res: ResponseInterface): Promise<any> {
 *     let index = 0;
 *     
 *     const next = async (): Promise<void> => {
 *       const middleware = this.middlewares[index++];
 *       if (middleware) {
 *         await middleware(req, res, next);
 *       }
 *     };
 *     
 *     return next();
 *   }
 * }
 * ```
 */
export interface IMiddlewarePipeline {
    /**
     * 添加单个中间件到管道
     * @param middleware - 要添加的中间件
     * @returns 当前管道实例，支持链式调用
     */
    pipe(middleware: IMiddlewareHandler): IMiddlewarePipeline
    through(middlewares: IMiddlewareHandler[]): IMiddlewarePipeline
    then(finalHandler: IRouteHandler): Promise<any>
    execute(request: IRequest, response: ResponseInterface): Promise<any>
    count(): number
    /**
     * 获取所有中间件
     * @returns 中间件处理器数组
     */
    getMiddlewares(): IMiddlewareHandler[]
} 

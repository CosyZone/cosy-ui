import { RequestInterface, ResponseInterface } from '../http'

/**
 * 中间件处理器接口
 * 
 * 这是框架中最基础的中间件处理器接口。每个中间件都必须实现这个接口。
 * 
 * @example
 * ```typescript
 * // 基本用法
 * const simpleMiddleware: IMiddlewareHandler = async (req, res, next) => {
 *   // 在请求处理前的逻辑
 *   console.log('处理请求前');
 * 
 *   // 调用下一个中间件
 *   await next();
 * 
 *   // 在请求处理后的逻辑
 *   console.log('处理请求后');
 * };
 * 
 * // 提前返回响应
 * const earlyResponseMiddleware: IMiddlewareHandler = async (req, res) => {
 *   // 直接返回响应，不调用 next()
 *   return res.json({ message: '提前返回' });
 * };
 * 
 * // 错误处理中间件
 * const errorHandlerMiddleware: IMiddlewareHandler = async (req, res, next) => {
 *   try {
 *     await next();
 *   } catch (error) {
 *     // 处理错误
 *     return res.status(500).json({ error: error.message });
 *   }
 * };
 * ```
 * 
 * @remarks
 * 中间件处理器有以下几种常见用法：
 * 1. 前置处理：在请求到达路由处理器前执行一些逻辑
 * 2. 后置处理：在响应发送前修改响应内容
 * 3. 错误处理：捕获并处理执行过程中的错误
 * 4. 提前响应：在某些条件下直接返回响应，不再继续处理
 * 
 * @param request - HTTP请求对象，包含请求的所有信息
 * @param response - HTTP响应对象，用于发送响应
 * @param next - 调用下一个中间件的函数，返回Promise
 * @returns 如果需要提前结束请求处理，可以返回响应对象；否则应该调用next()
 */
export type IMiddlewareHandler = (
    request: RequestInterface,
    response: ResponseInterface,
    next: () => Promise<void>
) => Promise<void | ResponseInterface> 

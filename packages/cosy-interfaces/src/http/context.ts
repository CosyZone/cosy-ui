import { IRequest } from './request'
import { ResponseInterface } from './response'

/**
 * HTTP 上下文接口
 * 
 * 定义了 HTTP 请求和响应的上下文环境。这个接口将请求和响应对象组合在一起，
 * 提供了一个完整的请求处理上下文。
 * 
 * @example
 * ```typescript
 * // 基本用法
 * app.use((ctx: HttpContextInterface) => {
 *   const { request, response } = ctx;
 *   
 *   // 访问请求数据
 *   const userId = request.params.id;
 *   const token = request.header('Authorization');
 *   
 *   // 设置响应
 *   response.status(200)
 *          .json({ 
 *            message: 'Success',
 *            userId 
 *          });
 * });
 * 
 * // 错误处理
 * app.use((ctx: HttpContextInterface) => {
 *   try {
 *     // 处理请求
 *     const data = await processRequest(ctx.request);
 *     ctx.response.json(data);
 *   } catch (error) {
 *     ctx.response.status(500)
 *               .json({ 
 *                 error: '服务器错误',
 *                 message: error.message 
 *               });
 *   }
 * });
 * 
 * // 认证中间件
 * const auth = (ctx: HttpContextInterface, next: () => Promise<void>) => {
 *   const token = ctx.request.header('Authorization');
 *   if (!token) {
 *     return ctx.response.status(401)
 *                     .json({ error: '未认证' });
 *   }
 *   return next();
 * };
 * ```
 * 
 * @remarks
 * 上下文使用的最佳实践：
 * 1. 请求处理
 *    - 使用解构获取 request 和 response
 *    - 保持请求处理的一致性
 *    - 正确处理异步操作
 * 
 * 2. 错误处理
 *    - 使用 try/catch 捕获错误
 *    - 统一错误响应格式
 *    - 适当记录错误日志
 * 
 * 3. 中间件
 *    - 正确使用 next() 函数
 *    - 避免重复处理响应
 *    - 保持中间件链的清晰
 * 
 * 4. 状态管理
 *    - 谨慎修改上下文状态
 *    - 避免副作用
 *    - 保持数据流的清晰
 */
export interface HttpContextInterface {
    /**
     * 请求对象
     * 包含所有请求相关的信息和方法
     */
    request: IRequest;

    /**
     * 响应对象
     * 包含所有响应相关的方法和状态
     */
    response: ResponseInterface;
} 

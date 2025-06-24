import { IRequest, ResponseInterface } from '../http'

/**
 * 中间件上下文接口
 * 
 * 中间件上下文提供了在中间件执行过程中共享数据和控制执行流程的能力。
 * 它包含了请求、响应对象，以及一个可以存储任意数据的状态对象。
 * 同时提供了控制中间件执行流程的方法。
 * 
 * @example
 * ```typescript
 * // 基本用法
 * const middleware: IMiddlewareHandler = async (req, res, next) => {
 *   const context: IMiddlewareContext = {
 *     request: req,
 *     response: res,
 *     state: {},
 *     shouldSkip: false,
 *     skipRemaining: () => { this.shouldSkip = true; }
 *   };
 * 
 *   // 在状态中存储数据
 *   context.state.startTime = Date.now();
 * 
 *   // 条件性跳过后续中间件
 *   if (someCondition) {
 *     context.skipRemaining();
 *     return res.status(400).json({ error: 'Invalid request' });
 *   }
 * 
 *   await next();
 * 
 *   // 使用之前存储的数据
 *   const duration = Date.now() - context.state.startTime;
 *   console.log(`Request took ${duration}ms`);
 * };
 * 
 * // 高级用法
 * const complexMiddleware: IMiddlewareHandler = async (req, res, next) => {
 *   const context: IMiddlewareContext = {
 *     request: req,
 *     response: res,
 *     state: {
 *       user: null,
 *       permissions: [],
 *       metrics: {
 *         startTime: Date.now(),
 *         operations: []
 *       }
 *     },
 *     shouldSkip: false,
 *     skipRemaining: () => { this.shouldSkip = true; }
 *   };
 * 
 *   try {
 *     // 加载用户信息
 *     context.state.user = await loadUser(req);
 *     context.state.permissions = await loadPermissions(context.state.user);
 * 
 *     // 记录操作
 *     context.state.metrics.operations.push('auth');
 * 
 *     // 检查权限
 *     if (!hasRequiredPermissions(context.state.permissions)) {
 *       context.skipRemaining();
 *       return res.status(403).json({ error: 'Forbidden' });
 *     }
 * 
 *     await next();
 *   } finally {
 *     // 记录指标
 *     const duration = Date.now() - context.state.metrics.startTime;
 *     await logMetrics({
 *       duration,
 *       operations: context.state.metrics.operations,
 *       user: context.state.user?.id
 *     });
 *   }
 * };
 * ```
 * 
 * @remarks
 * 中间件上下文的最佳实践：
 * 1. 状态管理
 *    - 使用 state 存储请求级别的数据
 *    - 避免存储全局状态
 *    - 使用明确的类型定义状态结构
 * 
 * 2. 执行控制
 *    - 使用 skipRemaining 来优雅地终止中间件链
 *    - 检查 shouldSkip 来决定是否继续执行
 * 
 * 3. 错误处理
 *    - 在上下文中存储错误信息
 *    - 使用 try-finally 确保清理工作执行
 * 
 * 4. 性能监控
 *    - 记录时间戳和执行时间
 *    - 跟踪关键操作
 *    - 收集性能指标
 */
export interface IMiddlewareContext {
    /**
     * HTTP请求对象
     */
    request: IRequest;

    /**
     * HTTP响应对象
     */
    response: ResponseInterface;

    /**
     * 用于存储请求级别的状态数据
     * 可以存储任意键值对
     */
    state: Record<string, any>;

    /**
     * 跳过剩余的中间件
     * 调用此方法后，中间件链将在当前中间件后终止
     */
    skipRemaining(): void;

    /**
     * 标识是否应该跳过后续中间件
     * 当此值为true时，中间件链将在当前中间件后终止
     */
    shouldSkip: boolean;
} 

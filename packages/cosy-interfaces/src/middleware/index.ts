/**
 * 中间件模块
 * 
 * 这个模块定义了框架的中间件系统的所有核心接口。中间件系统是一个强大的
 * 请求处理机制，它允许你以模块化的方式组织和扩展应用程序的功能。
 * 
 * 主要组件：
 * 1. 中间件处理器 (IMiddlewareHandler)
 *    - 处理HTTP请求的基本单元
 *    - 支持异步操作
 *    - 可以访问请求和响应对象
 * 
 * 2. 中间件管道 (IMiddlewarePipeline)
 *    - 组织和执行中间件的容器
 *    - 实现责任链模式
 *    - 支持动态添加中间件
 * 
 * 3. 中间件管理器 (IMiddlewareManager)
 *    - 注册和管理命名中间件
 *    - 支持中间件分组
 *    - 管理全局中间件
 * 
 * 4. 条件中间件 (IConditionalMiddleware)
 *    - 根据条件动态执行中间件
 *    - 支持正向和反向条件
 * 
 * 5. 中间件上下文 (IMiddlewareContext)
 *    - 在中间件之间共享状态
 *    - 控制中间件执行流程
 * 
 * 6. 中间件选项 (MiddlewareOptions)
 *    - 配置中间件的行为
 *    - 限制中间件的作用范围
 * 
 * @example
 * ```typescript
 * // 创建一个基本的中间件链
 * const pipeline = new Pipeline()
 *   .pipe(authMiddleware)
 *   .pipe(loggingMiddleware)
 *   .pipe(conditional(adminOnlyMiddleware)
 *     .when(req => req.user?.isAdmin));
 * 
 * // 使用中间件管理器
 * const manager = new MiddlewareManager();
 * manager.register('auth', authMiddleware);
 * manager.register('log', loggingMiddleware);
 * manager.group('admin', ['auth', 'log']);
 * 
 * // 使用中间件上下文
 * const contextMiddleware: IMiddlewareHandler = async (req, res, next) => {
 *   const context: IMiddlewareContext = {
 *     request: req,
 *     response: res,
 *     state: { startTime: Date.now() }
 *   };
 *   
 *   await next();
 *   
 *   console.log(`Request took ${Date.now() - context.state.startTime}ms`);
 * };
 * ```
 * 
 * @module middleware
 */

// 导出中间件处理器
export * from './middleware-handler.js'

// 导出路由处理器
export * from '../route-handler.js'

// 导出中间件管道
export * from './middleware-pipeline.js'

// 导出中间件管理器
export * from './middleware-manager.js'

// 导出条件中间件
export * from './conditional-middleware.js'

// 导出中间件选项
export * from './middleware-options.js'

// 导出中间件上下文
export * from './middleware-context.js'

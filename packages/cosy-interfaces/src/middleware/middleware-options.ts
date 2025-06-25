/**
 * 中间件选项接口
 * 
 * 定义中间件的配置选项，用于控制中间件的行为。
 * 这些选项可以用来限制中间件的作用范围，例如：
 * - 指定排除的路径
 * - 指定仅包含的路径
 * - 限制特定域名
 * - 限制HTTP方法
 * 
 * @example
 * ```typescript
 * // 基本用法
 * const options: MiddlewareOptions = {
 *   except: ['/public', '/assets'],
 *   only: ['/api'],
 *   domain: 'api.example.com',
 *   methods: ['GET', 'POST']
 * };
 * 
 * // 创建带选项的中间件
 * const authMiddleware = createMiddleware({
 *   except: ['/login', '/register'],
 *   methods: ['POST', 'PUT', 'DELETE']
 * });
 * 
 * // 动态配置示例
 * const corsOptions: MiddlewareOptions = {
 *   domain: process.env.ALLOWED_DOMAIN,
 *   methods: ['GET', 'POST', 'OPTIONS']
 * };
 * ```
 * 
 * @remarks
 * 使用中间件选项的最佳实践：
 * 1. 始终提供合理的默认值
 * 2. 验证选项的有效性
 * 3. 支持动态配置
 * 4. 记录选项的使用方式
 * 
 * 实现示例：
 * ```typescript
 * function applyMiddlewareOptions(
 *   handler: IMiddlewareHandler, 
 *   options: MiddlewareOptions
 * ): IMiddlewareHandler {
 *   return async (req, res, next) => {
 *     // 检查域名
 *     if (options.domain && req.hostname !== options.domain) {
 *       return next();
 *     }
 * 
 *     // 检查HTTP方法
 *     if (options.methods && !options.methods.includes(req.method)) {
 *       return next();
 *     }
 * 
 *     // 检查排除路径
 *     if (options.except?.some(path => req.path.startsWith(path))) {
 *       return next();
 *     }
 * 
 *     // 检查包含路径
 *     if (options.only && !options.only.some(path => req.path.startsWith(path))) {
 *       return next();
 *     }
 * 
 *     // 执行中间件
 *     return handler(req, res, next);
 *   };
 * }
 * ```
 */
export interface MiddlewareOptions {
    /**
     * 排除的路径列表
     * 如果请求路径匹配这些路径之一，中间件将被跳过
     */
    except?: string[];

    /**
     * 仅包含的路径列表
     * 中间件只会处理匹配这些路径的请求
     */
    only?: string[];

    /**
     * 限制中间件只在特定域名下生效
     */
    domain?: string;

    /**
     * 限制中间件只处理特定的HTTP方法
     */
    methods?: string[];
} 

/**
 * Cookie 选项接口
 * 
 * 定义了设置 HTTP Cookie 时可用的配置选项。这些选项控制 Cookie 的行为、
 * 安全性和生命周期。
 * 
 * @example
 * ```typescript
 * // 基本用法
 * app.get('/login', (req, res) => {
 *   res.cookie('sessionId', 'abc123', {
 *     httpOnly: true,
 *     secure: true,
 *     maxAge: 24 * 60 * 60 * 1000 // 24小时
 *   });
 * });
 * 
 * // 设置安全的会话 Cookie
 * const secureCookie: CookieOptions = {
 *   httpOnly: true,
 *   secure: true,
 *   sameSite: 'strict',
 *   path: '/',
 *   domain: '.example.com'
 * };
 * 
 * // 设置带过期时间的 Cookie
 * const expiringCookie: CookieOptions = {
 *   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7天后过期
 *   maxAge: 7 * 24 * 60 * 60 * 1000,
 *   path: '/app'
 * };
 * ```
 * 
 * @remarks
 * Cookie 设置的最佳实践：
 * 1. 安全性
 *    - 对敏感数据使用 httpOnly
 *    - 在生产环境启用 secure
 *    - 适当设置 sameSite
 * 
 * 2. 域名设置
 *    - 谨慎使用 domain 选项
 *    - 正确设置 path 范围
 * 
 * 3. 过期时间
 *    - 优先使用 maxAge 而不是 expires
 *    - 设置合理的过期时间
 * 
 * 4. 签名
 *    - 对重要数据使用签名
 *    - 确保服务器有正确的密钥
 */
export interface CookieOptions {
    /**
     * Cookie 的域名
     * 例如：'.example.com' 允许子域名访问
     */
    domain?: string;

    /**
     * Cookie 的过期时间
     * 建议使用 maxAge 代替
     */
    expires?: Date;

    /**
     * 是否只允许 HTTP 访问
     * 设为 true 时，JavaScript 无法访问该 Cookie
     */
    httpOnly?: boolean;

    /**
     * Cookie 的存活时间（毫秒）
     * 相对时间，比 expires 更可靠
     */
    maxAge?: number;

    /**
     * Cookie 的路径
     * 例如：'/' 表示整个域名可访问
     */
    path?: string;

    /**
     * 是否只在 HTTPS 连接中发送
     * 生产环境建议启用
     */
    secure?: boolean;

    /**
     * 是否对 Cookie 值进行签名
     */
    signed?: boolean;

    /**
     * 跨站点 Cookie 策略
     * - 'strict': 最严格，只允许同站点
     * - 'lax': 默认值，允许部分跨站点
     * - 'none': 允许跨站点（需要 secure: true）
     */
    sameSite?: 'strict' | 'lax' | 'none';
} 

/**
 * HTTP 状态码枚举
 * 
 * 定义了标准的 HTTP 状态码。这些状态码用于表示 HTTP 请求的结果。
 * 状态码分为以下几类：
 * - 1xx: 信息响应
 * - 2xx: 成功响应
 * - 3xx: 重定向
 * - 4xx: 客户端错误
 * - 5xx: 服务器错误
 * 
 * @example
 * ```typescript
 * // 基本用法
 * app.get('/users/:id', (req, res) => {
 *   const user = findUser(req.params.id);
 *   if (!user) {
 *     return res.status(HttpStatus.NOT_FOUND)
 *              .json({ error: 'User not found' });
 *   }
 *   return res.status(HttpStatus.OK).json(user);
 * });
 * 
 * // 处理创建请求
 * app.post('/articles', (req, res) => {
 *   const article = createArticle(req.body);
 *   return res.status(HttpStatus.CREATED)
 *            .json(article);
 * });
 * 
 * // 处理认证
 * app.use((req, res, next) => {
 *   if (!req.isAuthenticated()) {
 *     return res.status(HttpStatus.UNAUTHORIZED)
 *              .json({ error: 'Authentication required' });
 *   }
 *   next();
 * });
 * ```
 * 
 * @remarks
 * 状态码使用的最佳实践：
 * 1. 信息响应 (1xx)
 *    - 100 Continue: 请求的初始部分已经收到
 *    - 101 Switching Protocols: 切换协议
 * 
 * 2. 成功响应 (2xx)
 *    - 200 OK: 请求成功
 *    - 201 Created: 创建成功
 *    - 204 No Content: 成功但无返回内容
 * 
 * 3. 重定向 (3xx)
 *    - 301 Moved Permanently: 永久重定向
 *    - 302 Found: 临时重定向
 *    - 304 Not Modified: 内容未修改
 * 
 * 4. 客户端错误 (4xx)
 *    - 400 Bad Request: 请求格式错误
 *    - 401 Unauthorized: 未认证
 *    - 403 Forbidden: 无权限
 *    - 404 Not Found: 资源不存在
 *    - 422 Unprocessable Entity: 请求格式正确但语义错误
 * 
 * 5. 服务器错误 (5xx)
 *    - 500 Internal Server Error: 服务器错误
 *    - 502 Bad Gateway: 网关错误
 *    - 503 Service Unavailable: 服务不可用
 */
export enum HttpStatus {
    // 1xx: 信息响应
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,

    // 2xx: 成功响应
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,

    // 3xx: 重定向
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,

    // 4xx: 客户端错误
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    PAYLOAD_TOO_LARGE = 413,
    UNSUPPORTED_MEDIA_TYPE = 415,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,

    // 5xx: 服务器错误
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
} 

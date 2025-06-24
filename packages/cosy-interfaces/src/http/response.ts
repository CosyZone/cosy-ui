import { CookieOptions } from './cookie-options'

/**
 * 响应接口
 * 
 * 定义了 HTTP 响应的标准接口，提供了设置响应状态、头部、内容等方法。
 * 支持链式调用，使得响应的构建更加流畅和直观。
 * 
 * @example
 * ```typescript
 * // 基本 JSON 响应
 * app.get('/api/users', (req, res: ResponseInterface) => {
 *   return res.status(200)
 *            .json({ users: [...] });
 * });
 * 
 * // HTML 响应
 * app.get('/page', (req, res: ResponseInterface) => {
 *   return res.html('<h1>Welcome</h1>')
 *            .header('Content-Type', 'text/html');
 * });
 * 
 * // 文件下载
 * app.get('/download', (req, res: ResponseInterface) => {
 *   return res.download('/path/to/file.pdf', 'report.pdf');
 * });
 * 
 * // 复杂响应示例
 * app.post('/api/login', (req, res: ResponseInterface) => {
 *   return res.status(200)
 *            .cookie('token', 'abc123', {
 *              httpOnly: true,
 *              secure: true,
 *              maxAge: 24 * 60 * 60 * 1000
 *            })
 *            .header('X-Rate-Limit', '60')
 *            .json({
 *              success: true,
 *              message: '登录成功'
 *            });
 * });
 * ```
 * 
 * @remarks
 * 响应处理的最佳实践：
 * 1. 状态码
 *    - 使用正确的状态码表达响应含义
 *    - 保持状态码使用的一致性
 * 
 * 2. 响应格式
 *    - 保持响应格式的统一
 *    - 适当设置 Content-Type
 *    - 处理错误响应
 * 
 * 3. 安全性
 *    - 设置适当的安全头部
 *    - 正确配置 Cookie
 *    - 避免敏感信息泄露
 * 
 * 4. 性能
 *    - 合理使用压缩
 *    - 设置缓存头部
 *    - 控制响应大小
 */
export interface ResponseInterface {
    /**
     * 设置响应状态码
     * @param code - HTTP 状态码
     */
    status(code: number): ResponseInterface;

    /**
     * 发送 JSON 响应
     * @param data - 要发送的数据
     */
    json(data: any): ResponseInterface;

    /**
     * 发送 HTML 响应
     * @param content - HTML 内容
     */
    html(content: string): ResponseInterface;

    /**
     * 重定向到指定 URL
     * @param url - 目标 URL
     * @param status - 重定向状态码（默认 302）
     */
    redirect(url: string, status?: number): ResponseInterface;

    /**
     * 设置 Cookie
     * @param name - Cookie 名称
     * @param value - Cookie 值
     * @param options - Cookie 选项
     */
    cookie(name: string, value: string, options?: CookieOptions): ResponseInterface;

    /**
     * 清除 Cookie
     * @param name - Cookie 名称
     */
    clearCookie(name: string): ResponseInterface;

    /**
     * 设置响应头
     * @param name - 头部名称
     * @param value - 头部值
     */
    header(name: string, value: string): ResponseInterface;

    /**
     * 发送响应
     * @param content - 响应内容
     */
    send(content?: any): ResponseInterface;

    /**
     * 下载文件
     * @param filePath - 文件路径
     * @param filename - 下载时的文件名
     */
    download(filePath: string, filename?: string): ResponseInterface;

    /**
     * 设置下载头部
     * @param filename - 文件名
     */
    attachment(filename?: string): ResponseInterface;

    /**
     * 获取当前状态码
     */
    getStatus(): number;

    /**
     * 获取所有响应头
     */
    getHeaders(): Record<string, string>;

    /**
     * 获取所有设置的 Cookie
     */
    getCookies(): Array<{
        name: string;
        value: string;
        options: CookieOptions | undefined
    }>;

    /**
     * 获取响应内容
     */
    getContent(): any;

    /**
     * 检查是否已经发送响应
     */
    hasResponded(): boolean;

    /**
     * 获取 Set-Cookie 头部数组
     */
    getSetCookieHeaders(): string[];
} 

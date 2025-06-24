import { FileUpload } from './file-upload'

/**
 * 请求接口
 * 
 * 定义了 HTTP 请求的标准接口，提供了访问请求数据和元数据的方法。
 * 这个接口封装了常用的请求处理功能，使得请求处理更加方便和统一。
 * 
 * @example
 * ```typescript
 * // 基本用法
 * app.post('/api/users', (req: RequestInterface) => {
 *   const name = req.input('name');
 *   const email = req.input('email');
 *   const age = req.input('age', 18); // 带默认值
 * 
 *   console.log(`路径: ${req.path}`);
 *   console.log(`完整URL: ${req.fullUrl()}`);
 *   console.log(`查询参数: ${req.queryString}`);
 * });
 * 
 * // 处理文件上传
 * app.post('/upload', (req: RequestInterface) => {
 *   const file = req.file('document');
 *   if (file) {
 *     console.log(`上传文件: ${file.originalname}`);
 *     console.log(`大小: ${file.size} bytes`);
 *   }
 * });
 * 
 * // 处理 JSON 请求
 * app.post('/api/data', (req: RequestInterface) => {
 *   if (req.isJson()) {
 *     const data = req.body;
 *     // 处理 JSON 数据
 *   }
 * });
 * 
 * // 访问请求头和 Cookie
 * app.get('/api/profile', (req: RequestInterface) => {
 *   const token = req.header('Authorization');
 *   const sessionId = req.cookies['sessionId'];
 *   const userAgent = req.userAgent;
 * });
 * ```
 * 
 * @remarks
 * 请求处理的最佳实践：
 * 1. 输入验证
 *    - 使用 input() 方法获取输入时提供默认值
 *    - 始终验证必要的输入字段
 *    - 检查输入类型和格式
 * 
 * 2. 文件处理
 *    - 验证文件类型和大小
 *    - 使用 isForm() 检查是否是文件上传请求
 *    - 正确处理多文件上传
 * 
 * 3. 安全性
 *    - 验证请求来源
 *    - 检查内容类型
 *    - 处理 CSRF 令牌
 * 
 * 4. 性能
 *    - 合理使用查询参数
 *    - 避免过大的请求体
 *    - 正确处理流数据
 */
export interface RequestInterface {
    /**
     * HTTP 请求方法
     * 例如：'GET', 'POST', 'PUT', 'DELETE'
     */
    method: string;

    /**
     * 请求的完整 URL
     */
    url: string;

    /**
     * 请求路径（不包含查询字符串）
     */
    path: string;

    /**
     * 查询参数对象
     */
    query: Record<string, any>;

    /**
     * 路由参数对象
     */
    params: Record<string, any>;

    /**
     * 请求头对象
     */
    headers: Record<string, string>;

    /**
     * 请求体
     * 可能是任何类型，取决于 Content-Type
     */
    body: any;

    /**
     * Cookie 对象
     */
    cookies: Record<string, string>;

    /**
     * 上传的文件对象
     */
    files: Record<string, FileUpload[]>;

    /**
     * 客户端 IP 地址
     */
    ip: string;

    /**
     * 用户代理字符串
     */
    userAgent: string;

    /**
     * 是否是表单提交
     */
    isForm: boolean;

    /**
     * 原始查询字符串
     */
    queryString: string;

    /**
     * 获取请求数据
     * @param key - 数据键名
     */
    get(key: string): any;

    /**
     * 获取输入数据，支持默认值
     * @param key - 数据键名
     * @param defaultValue - 默认值
     */
    input(key: string, defaultValue?: any): any;

    /**
     * 检查是否存在某个输入
     * @param key - 数据键名
     */
    has(key: string): boolean;

    /**
     * 获取请求头
     * @param name - 头部名称
     * @param defaultValue - 默认值
     */
    header(name: string, defaultValue?: string): string;

    /**
     * 获取上传的文件
     * @param name - 文件字段名
     */
    file(name: string): FileUpload | FileUpload[] | undefined;

    /**
     * 是否是 AJAX 请求
     */
    isAjax(): boolean;

    /**
     * 是否是 JSON 请求
     */
    isJson(): boolean;

    /**
     * 获取完整的请求 URL
     */
    fullUrl(): string;
} 

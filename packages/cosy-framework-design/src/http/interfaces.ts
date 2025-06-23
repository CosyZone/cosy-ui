import { HttpMethod, SameSite } from './constants';
import { ReadStream } from 'fs';
import { MiddlewareHandler as BaseMiddlewareHandler } from '../middleware/types';

/**
 * 请求接口
 */
export interface RequestInterface {
    // 基本属性
    method: HttpMethod;
    url: string;
    path: string;
    query: Record<string, string>;
    params: Record<string, string>;
    headers: Record<string, string>;
    body: any;

    // 请求信息
    protocol(): string;
    host(): string;
    ip(): string;
    secure(): boolean;

    // 请求检查
    is(type: string): boolean;
    accepts(types: string[]): string | false;

    // 数据访问
    get(field: string): string | undefined;
    header(name: string): string | undefined;

    // 扩展数据
    context: IHttpContext;
    raw: any;
}

/**
 * 响应接口
 */
export interface ResponseInterface {
    // 状态控制
    status(code: number): this;
    getStatus(): number;

    // 头部控制
    header(name: string, value: string): this;
    getHeader(name: string): string | undefined;
    removeHeader(name: string): this;

    // 响应数据
    send(data: any): this;
    json(data: any): this;
    html(content: string): this;

    // 响应控制
    redirect(url: string, code?: number): this;
    download(path: string, filename?: string): this;

    // 响应检查
    sent(): boolean;
    finished(): boolean;

    // 扩展数据
    context: IHttpContext;
    raw: any;
}

/**
 * HTTP 上下文接口
 */
export interface IHttpContext {
    // 请求/响应
    request: RequestInterface;
    response: ResponseInterface;

    // 状态数据
    state: Map<string, any>;

    // 工具方法
    get(key: string): any;
    set(key: string, value: any): this;

    // 请求处理
    next(): Promise<void>;
    throw(status: number, message?: string): void;
}

/**
 * 中间件接口
 */
export interface MiddlewareInterface {
    handle(context: IHttpContext, next: BaseMiddlewareHandler): Promise<void>;
}

/**
 * 上传文件接口
 */
export interface UploadedFile {
    // 文件信息
    filename: string;
    mimetype: string;
    size: number;

    // 文件操作
    buffer(): Promise<Buffer>;
    stream(): ReadStream;
    save(path: string): Promise<void>;
}

/**
 * 文件上传接口
 */
export interface FileUploadInterface {
    // 文件访问
    file(field: string): UploadedFile | undefined;
    files(field: string): UploadedFile[];

    // 上传控制
    maxSize(size: number): this;
    allowTypes(types: string[]): this;
}

/**
 * Cookie 选项接口
 */
export interface CookieOptions {
    domain?: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: SameSite;
    maxAge?: number;
    expires?: Date;
    signed?: boolean;
}

/**
 * Cookie 管理接口
 */
export interface CookieInterface {
    // Cookie 读写
    get(name: string): string | undefined;
    set(name: string, value: string, options?: CookieOptions): this;
    remove(name: string): this;

    // Cookie 选项
    signed(): boolean;
    secure(): boolean;
}

/**
 * 会话管理接口
 */
export interface SessionInterface {
    // 会话数据
    id: string;
    data: Record<string, any>;

    // 数据操作
    get<T>(key: string): T | undefined;
    set<T>(key: string, value: T): this;
    remove(key: string): this;

    // 会话控制
    regenerate(): Promise<void>;
    destroy(): Promise<void>;
    touch(): Promise<void>;
}

/**
 * 请求工厂接口
 */
export interface RequestFactory {
    // 创建请求
    create(options: RequestOptions): RequestInterface;
    createFromNode(req: any): RequestInterface; // IncomingMessage
    createFromFetch(req: Request): RequestInterface;
}

/**
 * 请求选项接口
 */
export interface RequestOptions {
    method?: HttpMethod;
    url?: string;
    headers?: Record<string, string>;
    body?: any;
    query?: Record<string, string>;
}

/**
 * 响应工厂接口
 */
export interface ResponseFactory {
    // 创建响应
    create(): ResponseInterface;
    createFromNode(res: any): ResponseInterface; // ServerResponse
    createFromFetch(res: Response): ResponseInterface;
}

/**
 * HTTP 错误类
 */
export class HttpError extends Error {
    constructor(
        public status: number,
        message?: string,
        public details?: any
    ) {
        super(message);
        this.name = 'HttpError';
    }
}

/**
 * 错误处理器接口
 */
export interface ErrorHandlerInterface {
    // 错误处理
    handle(error: Error, context: IHttpContext): Promise<void>;

    // 错误转换
    toHttpError(error: Error): HttpError;

    // 错误响应
    sendError(error: HttpError, context: IHttpContext): Promise<void>;
}

import { IncomingMessage, ServerResponse } from 'http';

// HTTP方法枚举
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS'
}

// HTTP状态码
export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503
}

// 请求接口
export interface HttpRequest {
    // 原始请求对象
    raw: IncomingMessage;

    // 请求方法
    method: string;

    // 请求URL
    url: string;

    // 查询参数
    query: Record<string, string>;

    // 路由参数
    params: Record<string, string>;

    // 请求头
    headers: Record<string, string | string[] | undefined>;

    // 请求体
    body: any;
}

// 响应接口
export interface HttpResponse {
    // 原始响应对象
    raw: ServerResponse;

    // 状态码
    status: number;

    // 响应头
    headers: Record<string, string | number | string[]>;

    // 是否已发送响应
    sent: boolean;

    // 设置响应头
    setHeader(name: string, value: string | number | string[]): void;

    // 发送JSON响应
    json(data: any): void;

    // 发送文本响应
    send(data: string): void;

    // 发送状态码
    sendStatus(status: number): void;
}

// HTTP上下文
export interface HttpContext {
    request: HttpRequest;
    response: HttpResponse;
    state: Map<string, any>;
} 

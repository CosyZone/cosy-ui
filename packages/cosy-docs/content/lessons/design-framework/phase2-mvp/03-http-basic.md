# MVP HTTP基础实现

在这个步骤中，我们将实现基本的HTTP处理功能，包括请求和响应的封装，以及上下文对象的实现。这些实现将为我们提供一个更好的请求处理基础。

## HTTP类型定义

首先，我们需要定义一些基本的HTTP类型。创建 `src/http/types.ts`：

```typescript
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
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

// 请求接口
export interface Request {
    method: HttpMethod;
    url: string;
    headers: Record<string, string>;
    query: Record<string, string>;
    params: Record<string, string>;
    body: any;
    raw: any;
}

// 响应接口
export interface Response {
    status: number;
    headers: Record<string, string>;
    body: any;
    sent: boolean;
    raw: any;

    send(data: any): void;
    json(data: any): void;
    setHeader(name: string, value: string): void;
    getHeader(name: string): string | undefined;
}

// HTTP上下文
export interface HttpContext {
    request: Request;
    response: Response;
    state: Map<string, any>;
}
```

## 请求处理

创建 `src/http/request.ts` 来实现请求对象：

```typescript
import { IncomingMessage } from 'http';
import { parse as parseUrl } from 'url';
import { parse as parseQs } from 'querystring';
import { HttpMethod, Request } from './types';

export class HttpRequest implements Request {
    public method: HttpMethod;
    public url: string;
    public headers: Record<string, string>;
    public query: Record<string, string>;
    public params: Record<string, string>;
    public body: any;
    public raw: IncomingMessage;

    constructor(req: IncomingMessage) {
        this.raw = req;
        this.method = (req.method || 'GET') as HttpMethod;
        this.url = req.url || '/';
        this.headers = this.parseHeaders(req);
        this.query = this.parseQuery(this.url);
        this.params = {};
        this.body = null;
    }

    private parseHeaders(req: IncomingMessage): Record<string, string> {
        const headers: Record<string, string> = {};
        for (const [key, value] of Object.entries(req.headers)) {
            headers[key] = Array.isArray(value) ? value[0] : (value || '');
        }
        return headers;
    }

    private parseQuery(url: string): Record<string, string> {
        const { query } = parseUrl(url);
        return query ? parseQs(query) as Record<string, string> : {};
    }

    // 辅助方法
    getHeader(name: string): string | undefined {
        return this.headers[name.toLowerCase()];
    }

    is(type: string): boolean {
        const contentType = this.getHeader('content-type') || '';
        return contentType.includes(type);
    }
}
```

## 响应处理

创建 `src/http/response.ts` 来实现响应对象：

```typescript
import { ServerResponse } from 'http';
import { HttpStatus, Response } from './types';

export class HttpResponse implements Response {
    public status: number = HttpStatus.OK;
    public headers: Record<string, string> = {};
    public body: any = null;
    public sent: boolean = false;
    public raw: ServerResponse;

    constructor(res: ServerResponse) {
        this.raw = res;
    }

    send(data: any): void {
        if (this.sent) {
            throw new Error('Response already sent');
        }

        this.body = data;
        
        // 设置响应头
        for (const [key, value] of Object.entries(this.headers)) {
            this.raw.setHeader(key, value);
        }

        // 发送响应
        this.raw.statusCode = this.status;
        
        if (data instanceof Buffer) {
            this.raw.end(data);
        } else if (typeof data === 'string') {
            this.raw.end(data);
        } else {
            this.raw.end(JSON.stringify(data));
        }

        this.sent = true;
    }

    json(data: any): void {
        this.setHeader('Content-Type', 'application/json');
        this.send(data);
    }

    setHeader(name: string, value: string): void {
        this.headers[name.toLowerCase()] = value;
    }

    getHeader(name: string): string | undefined {
        return this.headers[name.toLowerCase()];
    }
}
```

## 上下文实现

创建 `src/http/context.ts` 来实现HTTP上下文：

```typescript
import { IncomingMessage, ServerResponse } from 'http';
import { HttpContext } from './types';
import { HttpRequest } from './request';
import { HttpResponse } from './response';

export class HttpContextImpl implements HttpContext {
    public request: HttpRequest;
    public response: HttpResponse;
    public state: Map<string, any>;

    constructor(req: IncomingMessage, res: ServerResponse) {
        this.request = new HttpRequest(req);
        this.response = new HttpResponse(res);
        this.state = new Map();
    }
}
```

## 更新应用程序类

修改 `src/core/application.ts` 中的请求处理逻辑：

```typescript
import { IncomingMessage, ServerResponse } from 'http';
import { HttpContextImpl } from '../http/context';

export class Application {
    // ... 其他代码保持不变 ...

    private async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const ctx = new HttpContextImpl(req, res);

        try {
            // 执行中间件链
            await this.runMiddleware(ctx);

            // 查找并执行路由处理器
            const route = this.routes.get(`${ctx.request.method} ${ctx.request.url}`);
            if (route) {
                const result = await route(ctx);
                if (!ctx.response.sent) {
                    ctx.response.json(result);
                }
            } else {
                ctx.response.status = 404;
                ctx.response.json({ error: 'Not Found' });
            }
        } catch (error) {
            if (!ctx.response.sent) {
                ctx.response.status = 500;
                ctx.response.json({ error: 'Internal Server Error' });
            }
        }
    }
}
```

## 测试实现

创建 `src/http/http.test.ts` 来测试HTTP功能：

```typescript
import { describe, it, expect } from 'vitest';
import { HttpRequest } from './request';
import { HttpResponse } from './response';
import { HttpContextImpl } from './context';
import { createServer } from 'http';

describe('HTTP Implementation', () => {
    it('should handle request parsing', () => {
        const mockReq = {
            method: 'GET',
            url: '/test?foo=bar',
            headers: {
                'content-type': 'application/json'
            }
        };

        const request = new HttpRequest(mockReq as any);
        
        expect(request.method).toBe('GET');
        expect(request.url).toBe('/test?foo=bar');
        expect(request.query).toEqual({ foo: 'bar' });
        expect(request.is('application/json')).toBe(true);
    });

    it('should handle response sending', () => {
        let endCalled = false;
        let sentData = null;

        const mockRes = {
            setHeader: () => {},
            end: (data: any) => {
                endCalled = true;
                sentData = data;
            }
        };

        const response = new HttpResponse(mockRes as any);
        response.json({ hello: 'world' });

        expect(endCalled).toBe(true);
        expect(JSON.parse(sentData)).toEqual({ hello: 'world' });
        expect(response.sent).toBe(true);
    });
});
```

## 使用示例

下面是一个使用新HTTP功能的示例：

```typescript
import { Application } from './core/application';
import { HttpContext } from './http/types';

const app = new Application();

// 添加日志中间件
app.use(async (ctx: HttpContext, next) => {
    const start = Date.now();
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    
    await next();
    
    const ms = Date.now() - start;
    console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

// 添加路由
app.get('/api/users', async (ctx: HttpContext) => {
    return {
        users: [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' }
        ]
    };
});

// 启动应用
app.start(3000).then(() => {
    console.log('Server started on http://localhost:3000');
});
```

## 下一步

在完成了基本的HTTP功能后，我们将在 [路由基础](./04-routing-basic.md) 中实现更强大的路由系统，包括参数提取和路由分组功能。

## 关键点说明

1. **简化的实现**：
   - 专注于基本的请求/响应处理
   - 提供简单但实用的API
   - 保持代码清晰和可维护

2. **核心功能**：
   - 请求解析（方法、URL、查询参数、头部）
   - 响应生成（JSON、原始数据）
   - 上下文管理（请求、响应、状态）

3. **改进点**：
   - 请求体解析
   - 文件上传
   - Cookie 处理
   - 会话管理

这个实现为我们提供了一个坚实的HTTP处理基础，我们可以在此基础上逐步添加更多功能。

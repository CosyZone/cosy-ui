import { IncomingMessage, ServerResponse } from 'http';
import { HttpContext, HttpRequest, HttpResponse } from './types';
import { parse as parseUrl } from 'url';
import { parse as parseQuery } from 'querystring';

class HttpRequestImpl implements HttpRequest {
    raw: IncomingMessage;
    method: string;
    url: string;
    query: Record<string, string>;
    params: Record<string, string>;
    headers: Record<string, string | string[] | undefined>;
    body: any;

    constructor(req: IncomingMessage) {
        this.raw = req;
        this.method = req.method || 'GET';
        this.url = req.url || '/';
        this.headers = req.headers;
        this.params = {};

        // 解析URL和查询参数
        const parsedUrl = parseUrl(this.url);
        this.url = parsedUrl.pathname || '/';
        this.query = parseQuery(parsedUrl.query || '') as Record<string, string>;

        // 初始化body为null，将在中间件中设置
        this.body = null;
    }
}

class HttpResponseImpl implements HttpResponse {
    raw: ServerResponse;
    status: number;
    headers: Record<string, string | number | string[]>;
    sent: boolean;

    constructor(res: ServerResponse) {
        this.raw = res;
        this.status = 200;
        this.headers = {};
        this.sent = false;
    }

    setHeader(name: string, value: string | number | string[]): void {
        this.headers[name] = value;
        this.raw.setHeader(name, value);
    }

    json(data: any): void {
        if (this.sent) {
            throw new Error('Response already sent');
        }

        this.setHeader('Content-Type', 'application/json');
        this.raw.statusCode = this.status;
        this.raw.end(JSON.stringify(data));
        this.sent = true;
    }

    send(data: string): void {
        if (this.sent) {
            throw new Error('Response already sent');
        }

        this.setHeader('Content-Type', 'text/plain');
        this.raw.statusCode = this.status;
        this.raw.end(data);
        this.sent = true;
    }

    sendStatus(status: number): void {
        this.status = status;
        this.send(status.toString());
    }
}

export class HttpContextImpl implements HttpContext {
    request: HttpRequest;
    response: HttpResponse;
    state: Map<string, any>;

    constructor(req: IncomingMessage, res: ServerResponse) {
        this.request = new HttpRequestImpl(req);
        this.response = new HttpResponseImpl(res);
        this.state = new Map();
    }
} 

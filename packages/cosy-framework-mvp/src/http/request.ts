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

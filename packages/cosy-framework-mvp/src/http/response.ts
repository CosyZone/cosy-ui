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

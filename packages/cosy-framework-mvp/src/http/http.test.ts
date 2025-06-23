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
        let sentData: string = '';

        const mockRes = {
            setHeader: () => { },
            end: (data: string) => {
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

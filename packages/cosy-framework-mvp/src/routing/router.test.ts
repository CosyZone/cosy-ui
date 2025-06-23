import { describe, it, expect } from 'vitest';
import { Router, HttpMethod, createRouteDecorators } from './router';
import { HttpContext } from '../http/types';

describe('Router', () => {
    let router: Router;

    beforeEach(() => {
        router = new Router();
    });

    describe('Route Registration', () => {
        it('should register a route', () => {
            const handler = async () => ({ message: 'test' });
            router.register(HttpMethod.GET, '/test', handler);

            const match = router.match('GET', '/test');
            expect(match).toBeTruthy();
            expect(match?.handler).toBe(handler);
        });

        it('should support convenience methods', () => {
            const handler = async () => ({ message: 'test' });
            router.get('/test', handler);

            const match = router.match('GET', '/test');
            expect(match).toBeTruthy();
            expect(match?.handler).toBe(handler);
        });
    });

    describe('Route Parameters', () => {
        it('should match route with parameters', () => {
            const handler = async () => ({ message: 'test' });
            router.get('/users/:id', handler);

            const match = router.match('GET', '/users/123');
            expect(match).toBeTruthy();
            expect(match?.params).toEqual({ id: '123' });
        });

        it('should match route with multiple parameters', () => {
            const handler = async () => ({ message: 'test' });
            router.get('/users/:userId/posts/:postId', handler);

            const match = router.match('GET', '/users/123/posts/456');
            expect(match).toBeTruthy();
            expect(match?.params).toEqual({ userId: '123', postId: '456' });
        });

        it('should not match invalid parameter patterns', () => {
            const handler = async () => ({ message: 'test' });
            router.get('/users/:id', handler);

            const match = router.match('GET', '/users/');
            expect(match).toBeNull();
        });
    });

    describe('HTTP Methods', () => {
        it('should support different HTTP methods', () => {
            const handler = async () => ({ message: 'test' });
            router.get('/test', handler);
            router.post('/test', handler);
            router.put('/test', handler);
            router.delete('/test', handler);
            router.patch('/test', handler);

            expect(router.match('GET', '/test')).toBeTruthy();
            expect(router.match('POST', '/test')).toBeTruthy();
            expect(router.match('PUT', '/test')).toBeTruthy();
            expect(router.match('DELETE', '/test')).toBeTruthy();
            expect(router.match('PATCH', '/test')).toBeTruthy();
        });

        it('should not match wrong HTTP method', () => {
            const handler = async () => ({ message: 'test' });
            router.get('/test', handler);

            expect(router.match('POST', '/test')).toBeNull();
        });
    });

    describe('Controller Support', () => {
        it('should support controller decorators', () => {
            const router = new Router();
            const { controller, get, post } = createRouteDecorators(router);

            @controller('/api')
            class TestController {
                @get('/test')
                async getTest() {
                    return { message: 'get' };
                }

                @post('/test')
                async postTest() {
                    return { message: 'post' };
                }
            }

            // 实例化控制器以触发装饰器
            new TestController();

            expect(router.match('GET', '/api/test')).toBeTruthy();
            expect(router.match('POST', '/api/test')).toBeTruthy();
        });

        it('should support controller methods with parameters', () => {
            const router = new Router();
            const { controller, get } = createRouteDecorators(router);

            @controller('/api')
            class TestController {
                @get('/users/:id')
                async getUser() {
                    return { message: 'get user' };
                }
            }

            // 实例化控制器以触发装饰器
            new TestController();

            const match = router.match('GET', '/api/users/123');
            expect(match).toBeTruthy();
            expect(match?.params).toEqual({ id: '123' });
        });
    });
}); 

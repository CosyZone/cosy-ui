import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Application } from './application';
import http from 'http';

describe('Application', () => {
    let app: Application;

    beforeEach(() => {
        app = new Application();
    });

    afterEach(async () => {
        if (app.isRunning()) {
            await app.stop();
        }
    });

    it('should start and stop the server', async () => {
        const port = 3001;
        await app.start(port);
        expect(app.isRunning()).toBe(true);

        await app.stop();
        expect(app.isRunning()).toBe(false);
    });

    it('should handle basic routing', async () => {
        const port = 3002;
        app.get('/test', async () => ({ message: 'Hello World' }));
        await app.start(port);

        const response = await fetch(`http://localhost:${port}/test`);
        const data = await response.json();

        expect(data).toEqual({ message: 'Hello World' });
    });

    it('should handle middleware', async () => {
        const port = 3003;
        let middlewareCalled = false;

        app.use(async (ctx, next) => {
            middlewareCalled = true;
            await next();
        });

        app.get('/test', async () => ({ success: true }));
        await app.start(port);

        await fetch(`http://localhost:${port}/test`);
        expect(middlewareCalled).toBe(true);
    });

    it('should handle dependency injection', () => {
        class TestService {
            getMessage() {
                return 'Hello from Service';
            }
        }

        app.singleton('testService', TestService);
        const service = app.resolve<TestService>('testService');

        expect(service).toBeInstanceOf(TestService);
        expect(service.getMessage()).toBe('Hello from Service');
    });
}); 

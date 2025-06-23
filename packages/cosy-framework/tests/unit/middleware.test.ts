import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
    Pipeline,
    MiddlewareRegistry,
    conditional,
    cors,
    logger,
    auth,
    UseMiddleware,
    Middleware,
    getClassMiddleware,
    getMethodMiddleware
} from '../../src/middleware'
import { HttpContext } from '../../src/http'

describe('Middleware System', () => {
    describe('Pipeline', () => {
        it('should execute middlewares in order', async () => {
            const order: number[] = []

            const middleware1 = async (ctx: any, next: any) => {
                order.push(1)
                await next()
                order.push(4)
            }

            const middleware2 = async (ctx: any, next: any) => {
                order.push(2)
                await next()
                order.push(3)
            }

            const pipeline = new Pipeline([middleware1, middleware2])
            const context = HttpContext.create()

            await pipeline.execute(context)

            expect(order).toEqual([1, 2, 3, 4])
        })

        it('should support chaining methods', () => {
            const middleware1 = async (ctx: any, next: any) => next()
            const middleware2 = async (ctx: any, next: any) => next()

            const pipeline = Pipeline.create()
                .pipe(middleware1)
                .pipe(middleware2)

            expect(pipeline.count()).toBe(2)
        })

        it('should support through method for multiple middlewares', () => {
            const middleware1 = async (ctx: any, next: any) => next()
            const middleware2 = async (ctx: any, next: any) => next()

            const pipeline = Pipeline.create()
                .through([middleware1, middleware2])

            expect(pipeline.count()).toBe(2)
        })
    })

    describe('MiddlewareRegistry', () => {
        let registry: MiddlewareRegistry

        beforeEach(() => {
            registry = new MiddlewareRegistry()
        })

        it('should register and resolve middleware', () => {
            const middleware = async (ctx: any, next: any) => next()
            registry.register('test', middleware)

            const resolved = registry.resolve('test')
            expect(resolved).toBe(middleware)
        })

        it('should create and resolve middleware groups', () => {
            const middleware1 = async (ctx: any, next: any) => next()
            const middleware2 = async (ctx: any, next: any) => next()

            registry.register('auth', middleware1)
            registry.register('cors', middleware2)
            registry.group('api', ['auth', 'cors'])

            const group = registry.getGroup('api')
            expect(group).toHaveLength(2)
            expect(group[0]).toBe(middleware1)
            expect(group[1]).toBe(middleware2)
        })

        it('should handle global middleware', () => {
            const middleware1 = async (ctx: any, next: any) => next()
            const middleware2 = async (ctx: any, next: any) => next()

            registry.global(middleware1)
            registry.global(middleware2)

            const global = registry.getGlobal()
            expect(global).toHaveLength(2)
            expect(global).toContain(middleware1)
            expect(global).toContain(middleware2)
        })

        it('should resolve mixed middleware arrays', () => {
            const middleware1 = async (ctx: any, next: any) => next()
            const middleware2 = async (ctx: any, next: any) => next()
            const middleware3 = async (ctx: any, next: any) => next()

            registry.register('auth', middleware1)
            registry.group('security', [middleware2])

            const resolved = registry.resolveMiddlewares(['auth', middleware3, 'security'])
            expect(resolved).toHaveLength(3)
            expect(resolved[0]).toBe(middleware1)
            expect(resolved[1]).toBe(middleware3)
            expect(resolved[2]).toBe(middleware2)
        })
    })

    describe('Conditional Middleware', () => {
        it('should execute when condition is true', async () => {
            let executed = false
            const middleware = async (ctx: any, next: any) => {
                executed = true
                return next()
            }

            const conditionalMiddleware = conditional(middleware).when(() => true)
            const context = HttpContext.create()

            await conditionalMiddleware(context, async () => { })

            expect(executed).toBe(true)
        })

        it('should not execute when condition is false', async () => {
            let executed = false
            const middleware = async (ctx: any, next: any) => {
                executed = true
                return next()
            }

            const conditionalMiddleware = conditional(middleware).when(() => false)
            const context = HttpContext.create()

            await conditionalMiddleware(context, async () => { })

            expect(executed).toBe(false)
        })

        it('should execute unless condition is false', async () => {
            let executed = false
            const middleware = async (ctx: any, next: any) => {
                executed = true
                return next()
            }

            const conditionalMiddleware = conditional(middleware).unless(() => false)
            const context = HttpContext.create()

            await conditionalMiddleware(context, async () => { })

            expect(executed).toBe(true)
        })
    })

    describe('Common Middleware', () => {
        it('should add CORS headers', async () => {
            const corsMiddleware = cors({
                origin: 'https://example.com',
                methods: ['GET', 'POST']
            })

            const context = HttpContext.create()
            await corsMiddleware(context, async () => { })

            const headers = context.response.getHeaders()
            expect(headers['Access-Control-Allow-Origin']).toBe('https://example.com')
            expect(headers['Access-Control-Allow-Methods']).toBe('GET, POST')
        })

        it('should log requests', async () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

            const loggerMiddleware = logger()
            const context = HttpContext.create({ method: 'GET', url: '/test' })

            await loggerMiddleware(context, async () => { })

            expect(consoleSpy).toHaveBeenCalled()
            consoleSpy.mockRestore()
        })

        it('should handle authentication', async () => {
            const authMiddleware = auth({
                validate: async (token) => ({ id: 1, name: 'Test User' })
            })

            const context = HttpContext.create({
                headers: { authorization: 'Bearer valid-token' }
            })

            let nextCalled = false
            await authMiddleware(context, async () => {
                nextCalled = true
            })

            expect(nextCalled).toBe(true)
            expect((context as any).user).toEqual({ id: 1, name: 'Test User' })
        })
    })

    describe('Middleware Decorators', () => {
        it('should register class middleware', () => {
            const middleware1 = async (ctx: any, next: any) => next()
            const middleware2 = async (ctx: any, next: any) => next()

            @UseMiddleware(middleware1, middleware2)
            class TestController { }

            const middlewares = getClassMiddleware(TestController)
            expect(middlewares).toHaveLength(2)
            expect(middlewares).toContain(middleware1)
            expect(middlewares).toContain(middleware2)
        })

        it('should register method middleware', () => {
            const middleware = async (ctx: any, next: any) => next()

            class TestController {
                @Middleware(middleware)
                testMethod() { }
            }

            const middlewares = getMethodMiddleware(TestController.prototype, 'testMethod')
            expect(middlewares).toHaveLength(1)
            expect(middlewares[0]).toBe(middleware)
        })
    })
}) 

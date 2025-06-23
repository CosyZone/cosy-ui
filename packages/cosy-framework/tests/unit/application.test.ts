import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Application, Bootstrap } from '../../src/core'
import { HttpContext, HttpMethod, HttpStatus } from '../../src/http'
import { Injectable } from '../../src/container'

describe('Application Core', () => {
    let app: Application

    beforeEach(() => {
        app = new Application()
    })

    afterEach(async () => {
        if (app.isRunning()) {
            await app.stop()
        }
    })

    describe('Application Lifecycle', () => {
        it('should boot application', async () => {
            await app.boot()
            expect(app.isRunning()).toBe(false) // Not started yet
        })

        it('should start and stop application', async () => {
            await app.boot()
            await app.start(3001)

            expect(app.isRunning()).toBe(true)
            expect(app.getPort()).toBe(3001)

            await app.stop()
            expect(app.isRunning()).toBe(false)
        })

        it('should not start if already running', async () => {
            await app.boot()
            await app.start(3002)

            await expect(app.start(3003)).rejects.toThrow('Application is already running')

            await app.stop()
        })
    })

    describe('Configuration', () => {
        it('should set and get configuration', () => {
            app.config('app.name', 'Test App')
            app.config('database.host', 'localhost')

            expect(app.config('app.name')).toBe('Test App')
            expect(app.config('database.host')).toBe('localhost')
        })

        it('should configure with callback', () => {
            app.configure((app) => {
                app.config('test.value', 'configured')
            })

            expect(app.config('test.value')).toBe('configured')
        })
    })

    describe('Service Container Integration', () => {
        it('should bind and resolve services', () => {
            @Injectable
            class TestService {
                getValue() {
                    return 'test-value'
                }
            }

            app.bind('test-service', TestService)
            const service = app.resolve<TestService>('test-service')

            expect(service).toBeInstanceOf(TestService)
            expect(service.getValue()).toBe('test-value')
        })

        it('should register singleton services', () => {
            class SingletonService {
                private static count = 0
                public readonly id: number

                constructor() {
                    this.id = ++SingletonService.count
                }
            }

            app.singleton('singleton', SingletonService)

            const instance1 = app.resolve<SingletonService>('singleton')
            const instance2 = app.resolve<SingletonService>('singleton')

            expect(instance1).toBe(instance2)
            expect(instance1.id).toBe(1)
        })
    })

    describe('Routing Integration', () => {
        it('should register and handle routes', async () => {
            app.get('/test', () => 'Hello World')
            app.post('/users', () => ({ id: 1, name: 'John' }))

            const getRequest = HttpContext.create({ method: 'GET', url: '/test' }).request
            const postRequest = HttpContext.create({ method: 'POST', url: '/users' }).request

            const getResponse = await app.handle(getRequest)
            const postResponse = await app.handle(postRequest)

            expect(getResponse.getStatus()).toBe(HttpStatus.OK)
            expect(getResponse.getContent()).toBe('Hello World')

            expect(postResponse.getStatus()).toBe(HttpStatus.OK)
            expect(JSON.parse(postResponse.getContent())).toEqual({ id: 1, name: 'John' })
        })

        it('should handle route parameters', async () => {
            app.get('/users/{id}', (context) => {
                return { userId: context.request.params.id }
            })

            const request = HttpContext.create({ method: 'GET', url: '/users/123' }).request
            const response = await app.handle(request)

            expect(response.getStatus()).toBe(HttpStatus.OK)
            expect(JSON.parse(response.getContent())).toEqual({ userId: '123' })
        })

        it('should return 404 for unknown routes', async () => {
            const request = HttpContext.create({ method: 'GET', url: '/unknown' }).request
            const response = await app.handle(request)

            expect(response.getStatus()).toBe(HttpStatus.NOT_FOUND)
            expect(JSON.parse(response.getContent())).toMatchObject({
                error: 'Route not found',
                path: '/unknown',
                method: 'GET'
            })
        })

        it('should support route groups', async () => {
            app.group('/api', (router) => {
                router.get('/status', () => ({ status: 'ok' }))
                router.get('/health', () => ({ health: 'good' }))
            })

            const statusRequest = HttpContext.create({ method: 'GET', url: '/api/status' }).request
            const healthRequest = HttpContext.create({ method: 'GET', url: '/api/health' }).request

            const statusResponse = await app.handle(statusRequest)
            const healthResponse = await app.handle(healthRequest)

            expect(statusResponse.getStatus()).toBe(HttpStatus.OK)
            expect(healthResponse.getStatus()).toBe(HttpStatus.OK)
        })
    })

    describe('Middleware Integration', () => {
        it('should execute global middleware', async () => {
            const order: number[] = []

            app.use(async (context, next) => {
                order.push(1)
                await next()
                order.push(4)
            })

            app.use(async (context, next) => {
                order.push(2)
                await next()
                order.push(3)
            })

            app.get('/test', () => {
                order.push(5)
                return 'success'
            })

            const request = HttpContext.create({ method: 'GET', url: '/test' }).request
            await app.handle(request)

            expect(order).toEqual([1, 2, 5, 3, 4])
        })

        it('should handle middleware errors', async () => {
            app.use(async () => {
                throw new Error('Middleware error')
            })

            app.get('/test', () => 'success')

            const request = HttpContext.create({ method: 'GET', url: '/test' }).request
            const response = await app.handle(request)

            expect(response.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
            expect(JSON.parse(response.getContent())).toMatchObject({
                error: 'Middleware error'
            })
        })
    })

    describe('Application Factory', () => {
        it('should create application with static method', () => {
            const staticApp = Application.create({
                name: 'Static App',
                port: 4000
            })

            expect(staticApp.config('app.name')).toBe('Static App')
            expect(staticApp.config('app.port')).toBe(4000)
        })
    })

    describe('Bootstrap', () => {
        it('should bootstrap application', async () => {
            const bootstrap = Bootstrap.create({
                config: {
                    name: 'Bootstrap App',
                    port: 5000
                }
            })

            const bootstrappedApp = await bootstrap.start()

            expect(bootstrappedApp.isRunning()).toBe(true)
            expect(bootstrappedApp.config('app.name')).toBe('Bootstrap App')

            await bootstrappedApp.stop()
        })
    })
}) 

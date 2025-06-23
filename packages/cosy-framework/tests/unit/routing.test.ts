import { describe, it, expect, beforeEach } from 'vitest'
import { Router, Route, Controller, Get, Post, getControllerRoutes } from '../../src/routing'
import { HttpMethod } from '../../src/http'

describe('Routing System', () => {
    let router: Router

    beforeEach(() => {
        router = new Router()
    })

    describe('Basic Routing', () => {
        it('should register and resolve GET route', () => {
            const handler = () => 'Hello World'
            router.get('/hello', handler)

            const match = router.resolve(HttpMethod.GET, '/hello')

            expect(match).toBeTruthy()
            expect(match?.route.method).toEqual([HttpMethod.GET])
            expect(match?.route.path).toBe('/hello')
            expect(match?.route.handler).toBe(handler)
        })

        it('should register and resolve POST route', () => {
            const handler = () => 'Created'
            router.post('/users', handler)

            const match = router.resolve(HttpMethod.POST, '/users')

            expect(match).toBeTruthy()
            expect(match?.route.method).toEqual([HttpMethod.POST])
            expect(match?.route.path).toBe('/users')
        })

        it('should not match wrong method', () => {
            router.get('/test', () => 'test')

            const match = router.resolve(HttpMethod.POST, '/test')
            expect(match).toBeNull()
        })

        it('should not match wrong path', () => {
            router.get('/test', () => 'test')

            const match = router.resolve(HttpMethod.GET, '/wrong')
            expect(match).toBeNull()
        })
    })

    describe('Route Parameters', () => {
        it('should extract single parameter', () => {
            router.get('/users/:id', () => 'User')

            const match = router.resolve(HttpMethod.GET, '/users/123')

            expect(match).toBeTruthy()
            expect(match?.params.id).toBe('123')
        })

        it('should extract multiple parameters', () => {
            router.get('/users/:userId/posts/:postId', () => 'Post')

            const match = router.resolve(HttpMethod.GET, '/users/123/posts/456')

            expect(match).toBeTruthy()
            expect(match?.params.userId).toBe('123')
            expect(match?.params.postId).toBe('456')
        })

        it('should handle optional parameters', () => {
            router.get('/posts/:id?', () => 'Posts')

            const matchWithParam = router.resolve(HttpMethod.GET, '/posts/123')
            const matchWithoutParam = router.resolve(HttpMethod.GET, '/posts')

            expect(matchWithParam).toBeTruthy()
            expect(matchWithParam?.params.id).toBe('123')

            expect(matchWithoutParam).toBeTruthy()
            expect(matchWithoutParam?.params.id).toBeUndefined()
        })

        it('should handle parameter constraints', () => {
            router.get('/users/:id(\\d+)', () => 'User')

            const validMatch = router.resolve(HttpMethod.GET, '/users/123')
            const invalidMatch = router.resolve(HttpMethod.GET, '/users/abc')

            expect(validMatch).toBeTruthy()
            expect(invalidMatch).toBeNull()
        })
    })

    describe('Route Groups', () => {
        it('should apply prefix to grouped routes', () => {
            router.group('/api', (r) => {
                r.get('/users', () => 'Users')
                r.post('/users', () => 'Create User')
            })

            const getMatch = router.resolve(HttpMethod.GET, '/api/users')
            const postMatch = router.resolve(HttpMethod.POST, '/api/users')

            expect(getMatch).toBeTruthy()
            expect(postMatch).toBeTruthy()
        })

        it('should apply nested group prefixes', () => {
            router.group('/api', (r) => {
                r.group('/v1', (r2) => {
                    r2.get('/users', () => 'Users V1')
                })
            })

            const match = router.resolve(HttpMethod.GET, '/api/v1/users')
            expect(match).toBeTruthy()
        })

        it('should apply group middleware', () => {
            const authMiddleware = () => 'auth'

            router.group({ prefix: '/admin', middleware: authMiddleware }, (r) => {
                r.get('/dashboard', () => 'Dashboard')
            })

            const routes = router.getRoutes()
            const adminRoute = routes.find(route => route.path === '/admin/dashboard')

            expect(adminRoute).toBeTruthy()
            if (adminRoute) {
                expect(adminRoute.middleware).toContain(authMiddleware)
            }
        })
    })

    describe('Route Methods', () => {
        it('should support all HTTP methods', () => {
            router.get('/test', () => 'GET')
            router.post('/test', () => 'POST')
            router.put('/test', () => 'PUT')
            router.patch('/test', () => 'PATCH')
            router.delete('/test', () => 'DELETE')
            router.options('/test', () => 'OPTIONS')
            router.head('/test', () => 'HEAD')

            expect(router.resolve(HttpMethod.GET, '/test')).toBeTruthy()
            expect(router.resolve(HttpMethod.POST, '/test')).toBeTruthy()
            expect(router.resolve(HttpMethod.PUT, '/test')).toBeTruthy()
            expect(router.resolve(HttpMethod.PATCH, '/test')).toBeTruthy()
            expect(router.resolve(HttpMethod.DELETE, '/test')).toBeTruthy()
            expect(router.resolve(HttpMethod.OPTIONS, '/test')).toBeTruthy()
            expect(router.resolve(HttpMethod.HEAD, '/test')).toBeTruthy()
        })

        it('should support any method', () => {
            router.any('/test', () => 'Any')

            expect(router.resolve(HttpMethod.GET, '/test')).toBeTruthy()
            expect(router.resolve(HttpMethod.POST, '/test')).toBeTruthy()
            expect(router.resolve(HttpMethod.PUT, '/test')).toBeTruthy()
        })

        it('should support match with specific methods', () => {
            router.match([HttpMethod.GET, HttpMethod.POST], '/test', () => 'Match')

            expect(router.resolve(HttpMethod.GET, '/test')).toBeTruthy()
            expect(router.resolve(HttpMethod.POST, '/test')).toBeTruthy()
            expect(router.resolve(HttpMethod.PUT, '/test')).toBeNull()
        })
    })

    describe('Route Decorators', () => {
        it('should register routes from controller decorators', () => {
            @Controller('/api/users')
            class UserController {
                @Get('/')
                index() {
                    return 'All users'
                }

                @Get('/:id')
                show() {
                    return 'Single user'
                }

                @Post('/')
                create() {
                    return 'Create user'
                }
            }

            const routes = getControllerRoutes(UserController)

            expect(routes).toHaveLength(3)

            if (!routes[0] || !routes[1] || !routes[2]) {
                expect.fail('Test setup failed: routes are not defined as expected.');
            }

            expect(routes[0].method).toBe(HttpMethod.GET)
            expect(routes[0].path).toBe('/')
            expect(routes[0].methodName).toBe('index')
            expect(routes[1].path).toBe('/:id')
            expect(routes[2].method).toBe(HttpMethod.POST)
        })
    })
}) 

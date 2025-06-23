import { describe, it, expect } from 'vitest'
import { Request, Response, HttpContext, HttpStatus, HttpMethod } from '../../src/http'

describe('HTTP Foundation', () => {
    describe('Request', () => {
        it('should create request with basic data', () => {
            const request = new Request({
                method: 'POST',
                url: 'https://example.com/api/users?page=1',
                headers: { 'content-type': 'application/json' },
                body: { name: 'John' },
                query: { page: '1' }
            })

            expect(request.method).toBe('POST')
            expect(request.path).toBe('/api/users')
            expect(request.query.page).toBe('1')
            expect(request.body.name).toBe('John')
            expect(request.header('content-type')).toBe('application/json')
        })

        it('should handle input data correctly', () => {
            const request = new Request({
                method: 'POST',
                url: '/test',
                body: { name: 'John', age: 30 },
                query: { filter: 'active' }
            })

            expect(request.input('name')).toBe('John')
            expect(request.input('filter')).toBe('active')
            expect(request.input('missing', 'default')).toBe('default')
            expect(request.has('name')).toBe(true)
            expect(request.has('missing')).toBe(false)
        })

        it('should detect request types', () => {
            const jsonRequest = new Request({
                method: 'POST',
                url: '/test',
                headers: { 'content-type': 'application/json' }
            })

            const formRequest = new Request({
                method: 'POST',
                url: '/test',
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            })

            const ajaxRequest = new Request({
                method: 'GET',
                url: '/test',
                headers: { 'x-requested-with': 'XMLHttpRequest' }
            })

            expect(jsonRequest.isJson()).toBe(true)
            expect(formRequest.isForm()).toBe(true)
            expect(ajaxRequest.isAjax()).toBe(true)
        })
    })

    describe('Response', () => {
        it('should create JSON response', () => {
            const response = new Response()
            response.status(HttpStatus.CREATED).json({ id: 1, name: 'John' })

            expect(response.getStatus()).toBe(HttpStatus.CREATED)
            expect(response.getHeaders()['Content-Type']).toBe('application/json')
            expect(response.getContent()).toContain('"name": "John"')
            expect(response.hasResponded()).toBe(true)
        })

        it('should create HTML response', () => {
            const response = new Response()
            response.html('<h1>Hello World</h1>')

            expect(response.getHeaders()['Content-Type']).toBe('text/html; charset=utf-8')
            expect(response.getContent()).toBe('<h1>Hello World</h1>')
        })

        it('should handle redirects', () => {
            const response = new Response()
            response.redirect('/home', HttpStatus.MOVED_PERMANENTLY)

            expect(response.getStatus()).toBe(HttpStatus.MOVED_PERMANENTLY)
            expect(response.getHeaders()['Location']).toBe('/home')
        })

        it('should handle cookies', () => {
            const response = new Response()
            response.cookie('session', 'abc123', { httpOnly: true, maxAge: 3600 })
            response.clearCookie('old-session')

            const cookies = response.getCookies()
            expect(cookies).toHaveLength(2)

            const cookie1 = cookies[0]
            expect(cookie1).toBeDefined()
            if (cookie1) {
                expect(cookie1.name).toBe('session')
                expect(cookie1.value).toBe('abc123')
            }

            const cookie2 = cookies[1]
            expect(cookie2).toBeDefined()
            if (cookie2) {
                expect(cookie2.name).toBe('old-session')
                expect(cookie2.value).toBe('')
            }

            const setCookieHeaders = response.getSetCookieHeaders()
            const header1 = setCookieHeaders[0]
            expect(header1).toBeDefined()
            if (header1) {
                expect(header1).toContain('session=abc123')
                expect(header1).toContain('HttpOnly')
                expect(header1).toContain('Max-Age=3600')
            }
        })

        it('should chain methods', () => {
            const response = new Response()
            const result = response
                .status(HttpStatus.OK)
                .header('X-Custom', 'value')
                .cookie('test', 'value')
                .json({ success: true })

            expect(result).toBe(response) // 应该返回同一个实例
            expect(response.getStatus()).toBe(HttpStatus.OK)
            expect(response.getHeaders()['X-Custom']).toBe('value')
        })
    })

    describe('HttpContext', () => {
        it('should create context from request and response', () => {
            const request = new Request({
                method: 'GET',
                url: '/test'
            })
            const response = new Response()
            const context = new HttpContext(request, response)

            expect(context.request).toBe(request)
            expect(context.response).toBe(response)
        })

        it('should create context with factory method', () => {
            const context = HttpContext.create({
                method: 'POST',
                url: '/api/test',
                body: { data: 'test' }
            })

            expect(context.request.method).toBe('POST')
            expect(context.request.path).toBe('/api/test')
            expect(context.request.body.data).toBe('test')
            expect(context.response).toBeDefined()
        })
    })
}) 

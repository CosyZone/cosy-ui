import { HttpContext, HttpStatus, HttpMethod } from '../src/http'

// 测试创建请求和响应
const context = HttpContext.create({
    method: HttpMethod.POST,
    url: '/api/users?filter=active',
    headers: {
        'content-type': 'application/json',
        'x-api-key': 'secret'
    },
    body: {
        name: 'John Doe',
        email: 'john@example.com'
    }
})

// 测试请求功能
console.log('Request Method:', context.request.method)
console.log('Request Path:', context.request.path)
console.log('Request Input:', context.request.input())
console.log('User Name:', context.request.input('name'))
console.log('Filter:', context.request.input('filter'))
console.log('API Key:', context.request.header('x-api-key'))
console.log('Is JSON:', context.request.isJson())

// 测试响应功能
context.response
    .status(HttpStatus.CREATED)
    .cookie('session', 'abc123', { httpOnly: true })
    .header('X-Custom', 'framework-test')
    .json({
        id: 1,
        name: context.request.input('name'),
        email: context.request.input('email'),
        created_at: new Date().toISOString()
    })

console.log('\nResponse Status:', context.response.getStatus())
console.log('Response Headers:', context.response.getHeaders())
console.log('Response Cookies:', context.response.getCookies())
console.log('Response Content:', context.response.getContent()) 

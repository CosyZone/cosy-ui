/**
 * @file app.ts
 * @description 应用程序主配置文件，负责设置和配置整个应用程序的核心功能
 * 
 * 该文件主要职责：
 * 1. 创建和配置应用实例
 * 2. 注册核心服务和中间件
 * 3. 配置全局中间件（CORS、日志、错误处理）
 * 4. 定义API路由和端点
 * 5. 设置错误处理和优雅关闭机制
 */

import {
    ApplicationFactory,
    gracefulShutdown,
    setupErrorHandling,
} from '@coffic/cosy-framework'
import { AuthMiddleware } from './middleware/auth-middleware'
import { UserService } from './services/user-service'
import { PostService } from './services/post-service'
import { cors } from '@coffic/cosy-middleware'

/**
 * 创建应用实例
 * @description 使用环境变量和默认配置初始化应用
 */
console.log("🚀🚀 创建应用实例")
const app = ApplicationFactory.createApiApp({
    name: 'Basic API Example',
    debug: process.env.NODE_ENV !== 'production',
    port: parseInt(process.env.PORT || '3000')
})

/**
 * 服务注册
 * @description 注册应用所需的核心服务
 */
app.container.bind('UserService', UserService)
app.container.bind('PostService', PostService)

/**
 * 中间件配置
 * @description 注册认证中间件和配置全局中间件
 */
app.pipeline.pipe(AuthMiddleware)

/**
 * 健康检查路由
 * @description 提供基本的健康检查端点
 */
app.router.get('/health', (req, res) => {
    console.log('🚀🚀 健康检查路由')
    return res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    }) as any
})

// /**
//  * API路由配置
//  * @description 配置所有API端点，包括用户管理和帖子管理
//  */
// app.group('/api/v1', (api) => {
//     // 用户路由组
//     api.group('/users', (users) => {
//         users.get('/', (context) => {
//             const userService = app.resolve<UserService>('UserService')
//             return userService.getUsers()
//         })

//         users.get('/{id}', (context) => {
//             const userService = app.resolve<UserService>('UserService')
//             const id = parseInt(context.request.params.id)
//             return userService.getUserById(id)
//         })

//         users.post('/', (context) => {
//             const userService = app.resolve<UserService>('UserService')
//             const userData = context.request.body
//             return userService.createUser(userData)
//         })

//         users.put('/{id}', (context) => {
//             const userService = app.resolve<UserService>('UserService')
//             const id = parseInt(context.request.params.id)
//             const userData = context.request.body
//             return userService.updateUser(id, userData)
//         })

//         users.delete('/{id}', (context) => {
//             const userService = app.resolve<UserService>('UserService')
//             const id = parseInt(context.request.params.id)
//             return userService.deleteUser(id)
//         })
//     })

//     // 需要认证的帖子路由组
//     api.group({ prefix: '/posts', middleware: AuthMiddleware }, (posts) => {
//         posts.get('/', (context) => {
//             const postService = app.resolve<PostService>('PostService')
//             return postService.getPosts()
//         })

//         posts.post('/', (context) => {
//             const postService = app.resolve<PostService>('PostService')
//             const postData = context.request.body
//             const userId = (context as any).user?.id
//             return postService.createPost(postData, userId)
//         })
//     })
// })

/**
 * 错误处理和优雅关闭配置
 * @description 设置全局错误处理和应用关闭机制
 */
setupErrorHandling(app)
gracefulShutdown(app)

// 导出应用实例供 server.ts 使用
export { app } 

import {
    Application,
    gracefulShutdown,
    setupErrorHandling,
    cors,
    logger,
    errorHandler,
    type HttpContextInterface
} from '@coffic/cosy-framework'
import { UserController } from './controllers/user-controller'
import { PostController } from './controllers/post-controller'
import { AuthMiddleware } from './middleware/auth-middleware'
import { UserService } from './services/user-service'
import { PostService } from './services/post-service'

// 创建应用实例
export const app = Application.create({
    name: 'Basic API Example',
    debug: process.env.NODE_ENV !== 'production',
    port: parseInt(process.env.PORT || '3000')
})

// 注册服务
app.bind('UserService', UserService)
app.bind('PostService', PostService)

// 注册中间件
app.middleware('auth', AuthMiddleware)

// 全局中间件
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}))

app.use(logger({
    skip: (context: HttpContextInterface) => context.request.path === '/health'
}))

app.use(errorHandler({
    showStack: app.config('app.debug')
}))

// 健康检查路由
app.get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
}))

// API 路由
app.group('/api/v1', (api) => {
    // 用户路由
    api.group('/users', (users) => {
        users.get('/', (context) => {
            const userService = app.resolve<UserService>('UserService')
            return userService.getUsers()
        })

        users.get('/{id}', (context) => {
            const userService = app.resolve<UserService>('UserService')
            const id = parseInt(context.request.params.id)
            return userService.getUserById(id)
        })

        users.post('/', (context) => {
            const userService = app.resolve<UserService>('UserService')
            const userData = context.request.body
            return userService.createUser(userData)
        })

        users.put('/{id}', (context) => {
            const userService = app.resolve<UserService>('UserService')
            const id = parseInt(context.request.params.id)
            const userData = context.request.body
            return userService.updateUser(id, userData)
        })

        users.delete('/{id}', (context) => {
            const userService = app.resolve<UserService>('UserService')
            const id = parseInt(context.request.params.id)
            return userService.deleteUser(id)
        })
    })

    // 需要认证的路由
    api.group({ prefix: '/posts', middleware: AuthMiddleware }, (posts) => {
        posts.get('/', (context) => {
            const postService = app.resolve<PostService>('PostService')
            return postService.getPosts()
        })

        posts.post('/', (context) => {
            const postService = app.resolve<PostService>('PostService')
            const postData = context.request.body
            const userId = (context as any).user?.id
            return postService.createPost(postData, userId)
        })
    })
})

// 错误处理
setupErrorHandling(app)

// 优雅关闭
gracefulShutdown(app)

// 启动应用
if (require.main === module) {
    app.boot().then(() => {
        return app.start()
    }).catch(error => {
        console.error('Failed to start application:', error)
        process.exit(1)
    })
} 

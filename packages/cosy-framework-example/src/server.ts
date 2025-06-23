import { Bootstrap } from '@coffic/cosy-framework'
import { UserService } from './services/user-service'
import { PostService } from './services/post-service'

async function startServer() {
    const bootstrap = Bootstrap.create({
        configPath: './config',
        hooks: {
            beforeStart: () => {
                console.log('🔄 正在启动服务器...')
            },
            afterStart: () => {
                console.log('✅ 服务器启动成功!')
                console.log('📚 API 文档: http://localhost:3000/docs')
                console.log('🏥 健康检查: http://localhost:3000/health')
            }
        }
    })

    try {
        const app = await bootstrap.start()

        // 注册服务
        app.bind('UserService', UserService)
        app.bind('PostService', PostService)

        // 返回应用实例以便测试
        return app
    } catch (error) {
        console.error('❌ 服务器启动失败:', error)
        process.exit(1)
    }
}

// 如果直接运行此文件，启动服务器
if (require.main === module) {
    startServer()
}

export { startServer } 

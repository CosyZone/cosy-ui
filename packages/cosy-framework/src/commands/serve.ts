import { BaseCommand } from '@coffic/cosy-interfaces'
import { ApplicationFactory } from '../factory.js'

export class ServeCommand extends BaseCommand {
    constructor() {
        super('serve', 'Start the development HTTP server')
    }

    async execute(args: string[]): Promise<void> {
        // 检查是否请求帮助
        if (args.includes('--help') || args.includes('-h')) {
            this.showHelp()
            return
        }

        // 检查参数
        if (args[0] && isNaN(parseInt(args[0]))) {
            console.error('❌ 错误: 端口号必须是数字')
            console.error('💡 示例: cosy serve 3000')
            process.exit(1)
        }

        const port = args[0] ? parseInt(args[0]) : 3000

        console.log('🚀 正在启动开发服务器...\n')

        try {
            const app = ApplicationFactory.createWebApp({
                name: 'Cosy Development Server',
                port,
                env: 'development',
                debug: true
            })

            console.log(`📋 服务器配置:`)
            console.log(`   端口: ${port}`)
            console.log(`   环境: ${app.getEnv()}`)
            console.log(`   调试模式: ${app.isDebug() ? '开启' : '关闭'}`)
            console.log('')

            await app.start(port)

            console.log('✅ 服务器启动成功!\n')
            console.log(`🌐 服务器地址:`)
            console.log(`   本地:    http://localhost:${port}`)
            console.log(`   网络:    http://0.0.0.0:${port}`)
            console.log('')
            console.log('⏹️  按 Ctrl+C 停止服务器')

            // 监听退出信号
            process.on('SIGINT', async () => {
                console.log('\n\n🛑 正在停止服务器...')
                await app.stop()
                console.log('✅ 服务器已停止')
                process.exit(0)
            })

            process.on('SIGTERM', async () => {
                console.log('\n\n🛑 正在停止服务器...')
                await app.stop()
                console.log('✅ 服务器已停止')
                process.exit(0)
            })

        } catch (error) {
            console.error('\n❌ 服务器启动失败:')
            if (error instanceof Error) {
                if (error.message.includes('EADDRINUSE')) {
                    console.error(`   端口 ${port} 已被占用`)
                    console.error('💡 提示: 请尝试使用其他端口')
                    console.error(`   示例: cosy serve ${port + 1}`)
                } else {
                    console.error(`   ${error.message}`)
                }
            } else {
                console.error(`   ${String(error)}`)
            }
            console.error('')
            process.exit(1)
        }
    }

    /**
     * 显示命令帮助信息
     */
    private showHelp(): void {
        console.log(`
📖 cosy serve - 启动开发服务器

🔧 使用方法:
   cosy serve [port]

📋 参数:
   port              可选，指定服务器端口号 (默认: 3000)

🔧 选项:
   --help, -h        显示此帮助信息

💡 示例:
   cosy serve        启动服务器在默认端口 3000
   cosy serve 8080   启动服务器在端口 8080

📝 说明:
   此命令会启动一个开发服务器，支持热重载和调试功能。
   服务器会在指定端口上监听 HTTP 请求。

⏹️  停止服务器:
   按 Ctrl+C 或发送 SIGTERM 信号来优雅地停止服务器。
`)
    }
} 

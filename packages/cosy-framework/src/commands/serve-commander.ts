import { Command } from 'commander'
import { ApplicationFactory } from '../factory.js'

/**
 * 配置 serve 命令
 * @param program Commander 程序实例
 */
export function configureServeCommand(program: Command): void {
    program
        .command('serve')
        .description('Start the development HTTP server')
        .argument('[port]', 'port number', '3000')
        .option('-h, --host <host>', 'hostname to bind on', 'localhost')
        .option('--debug', 'enable debug mode')
        .addHelpText('after', `
💡 示例:
   cosy serve           启动服务器在默认端口 3000
   cosy serve 8080      启动服务器在端口 8080
   cosy serve 3000 -h 0.0.0.0   在所有网络接口上启动服务器

📝 说明:
   此命令会启动一个开发服务器，支持热重载和调试功能。
   服务器会在指定端口上监听 HTTP 请求。

⏹️  停止服务器:
   按 Ctrl+C 或发送 SIGTERM 信号来优雅地停止服务器。
`)
        .action(async (port: string, options: {
            host: string
            debug?: boolean
        }) => {
            // 验证端口号
            const portNumber = parseInt(port)
            if (isNaN(portNumber) || portNumber < 1 || portNumber > 65535) {
                console.error('❌ 错误: 端口号必须是 1-65535 之间的数字')
                console.error('💡 示例: cosy serve 3000')
                process.exit(1)
            }

            console.log('🚀 正在启动开发服务器...\n')

            try {
                const app = ApplicationFactory.createWebApp({
                    name: 'Cosy Development Server',
                    port: portNumber,
                    env: 'development',
                    debug: options.debug || true
                })

                console.log(`📋 服务器配置:`)
                console.log(`   端口:         ${portNumber}`)
                console.log(`   主机:         ${options.host}`)
                console.log(`   环境:         ${app.getEnv()}`)
                console.log(`   调试模式:     ${app.isDebug() ? '开启' : '关闭'}`)
                console.log('')

                await app.start(portNumber)

                console.log('✅ 服务器启动成功!\n')
                console.log(`🌐 服务器地址:`)
                console.log(`   本地:        http://${options.host}:${portNumber}`)
                if (options.host !== 'localhost' && options.host !== '127.0.0.1') {
                    console.log(`   本地访问:    http://localhost:${portNumber}`)
                }
                console.log(`   网络访问:    http://0.0.0.0:${portNumber}`)
                console.log('')
                console.log('⏹️  按 Ctrl+C 停止服务器')

                // 监听退出信号
                const cleanup = async () => {
                    console.log('\n\n🛑 正在停止服务器...')
                    await app.stop()
                    console.log('✅ 服务器已停止')
                    process.exit(0)
                }

                process.on('SIGINT', cleanup)
                process.on('SIGTERM', cleanup)

            } catch (error) {
                console.error('\n❌ 服务器启动失败:')
                if (error instanceof Error) {
                    if (error.message.includes('EADDRINUSE')) {
                        console.error(`   端口 ${portNumber} 已被占用`)
                        console.error('💡 提示: 请尝试使用其他端口')
                        console.error(`   示例: cosy serve ${portNumber + 1}`)
                    } else if (error.message.includes('EADDRNOTAVAIL')) {
                        console.error(`   无法绑定到主机 ${options.host}`)
                        console.error('💡 提示: 请检查主机地址是否正确')
                        console.error(`   示例: cosy serve ${portNumber} --host localhost`)
                    } else {
                        console.error(`   ${error.message}`)
                    }
                } else {
                    console.error(`   ${String(error)}`)
                }
                console.error('')
                process.exit(1)
            }
        })
} 

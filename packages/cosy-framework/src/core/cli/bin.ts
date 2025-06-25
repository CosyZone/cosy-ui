#!/usr/bin/env node

import { ApplicationFactory } from '../../factory.js'
import { configureServeCommand } from '../../commands/serve-commander.js'
import { configureEnvCommand } from '../../commands/env-commander.js'
import { configureCustomCommand, configureProjectInfoCommand } from '../../commands/example-custom-command.js'

/**
 * Cosy Framework CLI 入口点 (Commander.js 版本)
 * 
 * 使用 Commander.js 构建的现代化 CLI 界面：
 * - 自动帮助生成
 * - 类型安全的参数解析
 * - 美观的用户界面
 * - 强大的错误处理
 */

async function main() {
    try {
        // 创建 CLI 应用
        const app = ApplicationFactory.createCliApp({
            name: 'cosy',
            description: 'A Laravel-inspired TypeScript framework',
            version: '0.1.0'
        })

        // 添加全局选项
        app.option('--debug', 'enable debug mode')
            .option('--silent', 'suppress all output except errors')

        // 配置核心命令
        configureServeCommand(app.getProgram())
        configureEnvCommand(app.getProgram())

        // 配置示例命令（演示如何添加自定义命令）
        configureCustomCommand(app.getProgram())
        configureProjectInfoCommand(app.getProgram())

        // 解析并执行命令
        await app.parse(process.argv)

    } catch (error) {
        // 全局错误处理
        console.error('\n❌ 发生意外错误:')

        if (error instanceof Error) {
            console.error(`   ${error.message}`)

            // 如果启用了调试模式，显示堆栈信息
            if (process.env.DEBUG === 'true' || process.argv.includes('--debug')) {
                console.error('\n🔍 堆栈信息:')
                console.error(error.stack)
            }
        } else {
            console.error(`   ${String(error)}`)
        }

        console.error('\n💡 如果问题持续存在，请访问: https://github.com/coffic/cosy-ui')
        console.error('   或使用 "cosy --help" 查看可用命令\n')

        process.exit(1)
    }
}

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
    console.error('\n💥 程序发生严重错误:', error.message)
    if (process.env.DEBUG === 'true') {
        console.error(error.stack)
    }
    console.error('请联系开发者获取支持\n')
    process.exit(1)
})

// 处理未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
    console.error('\n⚠️  检测到未处理的 Promise 拒绝:')
    console.error('Promise:', promise)
    console.error('原因:', reason)

    if (process.env.DEBUG === 'true') {
        console.error('\n🔍 详细信息:')
        if (reason instanceof Error) {
            console.error(reason.stack)
        }
    }

    console.error('\n💡 这可能是框架的 bug，请报告此问题\n')
    // 不立即退出，让应用继续运行
})

// 启动应用
main().catch((error) => {
    console.error('CLI 初始化失败:', error)
    process.exit(1)
}) 

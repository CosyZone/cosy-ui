#!/usr/bin/env node

import { ApplicationFactory } from '../../factory.js'
import { ServeCommand } from '../../commands/serve.js'
import { EnvCommand } from '../../commands/env.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * 获取包版本信息
 */
function getVersion(): string {
    try {
        // 从 package.json 读取版本信息
        const packageJsonPath = join(__dirname, '../../../package.json')
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
        return packageJson.version || '0.1.0'
    } catch {
        return '0.1.0'
    }
}

/**
 * 显示欢迎横幅
 */
function showBanner() {
    const version = getVersion()
    console.log(`
╭─────────────────────────────────────────────────────────────╮
│                                                             │
│   🚀 Cosy Framework CLI v${version}                           │
│                                                             │
│   Version: ${version.padEnd(10)}                            │
│   A Laravel-inspired TypeScript framework                   │
│                                                             │
╰─────────────────────────────────────────────────────────────╯
`)
}

/**
 * 显示使用指南
 */
function showUsage() {
    console.log(`
📖 使用指南:
   cosy <command> [options]

🔧 全局选项:
   --help, -h     显示帮助信息
   --version, -v  显示版本信息

💡 示例:
   cosy serve           启动开发服务器 (默认端口: 3000)
   cosy serve 8080      启动开发服务器在指定端口
   cosy env             显示环境和系统信息
   cosy --help          显示此帮助信息
   cosy --version       显示版本信息

📚 了解更多:
   访问文档: https://github.com/coffic/cosy-ui
`)
}

/**
 * 检查是否为版本查询
 */
function checkVersion(args: string[]): boolean {
    return args.includes('--version') || args.includes('-v')
}

/**
 * 检查是否为帮助查询
 */
function checkHelp(args: string[]): boolean {
    // 只有在没有参数或明确使用全局帮助时才显示全局帮助
    return args.length === 0 || (args.includes('--help') || args.includes('-h')) && args.length === 1
}

/**
 * 主函数
 */
async function main() {
    const args = process.argv.slice(2)

    // 处理版本查询
    if (checkVersion(args)) {
        console.log(`Cosy Framework CLI v${getVersion()}`)
        return
    }

    // 处理帮助查询或无参数的情况
    if (checkHelp(args)) {
        showBanner()
        showUsage()
        return
    }

    try {
        // 创建CLI应用程序
        const app = ApplicationFactory.createCliApp({
            name: 'Cosy Framework CLI',
            env: process.env.NODE_ENV || 'development',
            debug: process.env.DEBUG === 'true'
        })

        // 注册内置命令
        app.registerCommand(new ServeCommand())
        app.registerCommand(new EnvCommand())

        // 执行命令
        await app.runCommand(args)
    } catch (error) {
        console.error('\n❌ 执行失败:')
        if (error instanceof Error) {
            console.error(`   ${error.message}`)
        } else {
            console.error(`   ${String(error)}`)
        }
        console.error('\n💡 提示: 使用 "cosy --help" 查看可用命令\n')
        process.exit(1)
    }
}

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
    console.error('\n💥 未捕获的异常:')
    console.error(`   ${error.message}`)
    console.error('\n📋 堆栈信息:')
    console.error(error.stack)
    process.exit(1)
})

// 处理未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
    console.error('\n💥 未处理的 Promise 拒绝:')
    console.error(`   ${reason}`)
    console.error('   在:', promise)
    process.exit(1)
})

main() 

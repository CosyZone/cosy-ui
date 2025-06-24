#!/usr/bin/env node

import { CliApplicationFactory } from './factory'
import { gracefulShutdown } from '../helpers'
import { ServeCommand } from './commands/serve'

async function main() {
    // 创建CLI应用程序
    const app = CliApplicationFactory.createCliApp({
        name: 'Cosy CLI'
    })

    // 注册内置命令
    app.registerCommand(new ServeCommand())

    // 配置优雅关闭
    gracefulShutdown(app)

    // 启动应用程序
    try {
        await app.start()
    } catch (error) {
        console.error('Failed to start application:', error)
        process.exit(1)
    }
}

main() 

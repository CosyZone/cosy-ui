#!/usr/bin/env node

import { ApplicationFactory } from '../../factory.js'
import { ServeCommand } from '../../commands/serve.js'

async function main() {
    // 创建CLI应用程序
    const app = ApplicationFactory.createCliApp()

    // 注册内置命令
    app.registerCommand(new ServeCommand())
}

main() 

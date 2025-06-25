import { Command } from 'commander'
import { spawn } from 'child_process'
import chalk from 'chalk'
import ora from 'ora'

/**
 * 配置数据库相关命令
 * @param program Commander 程序实例
 */
export function configureDbCommand(program: Command): void {
    const dbCommand = program
        .command('db')
        .description('Database management commands')

    // studio 子命令 - 启动 Drizzle Studio
    dbCommand
        .command('studio')
        .description('Start Drizzle Studio for database management')
        .option('-p, --port <number>', 'Port to run Drizzle Studio on', '3333')
        .addHelpText('after', `
💡 示例:
   cosy db studio           在默认端口(3333)启动 Drizzle Studio
   cosy db studio -p 4000   在指定端口启动 Drizzle Studio

📝 说明:
   此命令会启动 Drizzle Studio，这是一个可视化的数据库管理工具，可以:
   • 查看和编辑数据库表
   • 管理数据库结构
   • 执行数据库查询
   • 导入和导出数据
`)
        .action(async (options) => {
            const spinner = ora('正在启动 Drizzle Studio...').start()

            try {
                const port = options.port
                const studio = spawn('drizzle-kit', ['studio', '--port', port], {
                    stdio: 'pipe',
                    shell: true
                })

                studio.stdout.on('data', (data) => {
                    const output = data.toString()
                    if (output.includes('Server is running')) {
                        spinner.succeed(chalk.green('Drizzle Studio 已启动'))
                        console.log(chalk.cyan(`\n🚀 访问地址: http://localhost:${port}\n`))
                    }
                })

                studio.stderr.on('data', (data) => {
                    console.error(chalk.red(`错误: ${data}`))
                })

                studio.on('error', (error) => {
                    spinner.fail(chalk.red('启动失败'))
                    console.error(chalk.red(`错误: ${error.message}`))
                    if (error.message.includes('drizzle-kit')) {
                        console.log(chalk.yellow('\n💡 提示: 请确保已安装 drizzle-kit'))
                        console.log(chalk.gray('   运行: pnpm add -D drizzle-kit\n'))
                    }
                })

                // 处理进程退出
                process.on('SIGINT', () => {
                    studio.kill()
                    console.log(chalk.yellow('\n👋 Drizzle Studio 已停止\n'))
                    process.exit(0)
                })
            } catch (error) {
                spinner.fail(chalk.red('启动失败'))
                console.error(chalk.red(`错误: ${error}`))
            }
        })

    // TODO: 添加更多数据库相关命令
    // - push: 将 schema 变更推送到数据库
    // - generate: 生成迁移文件
    // - drop: 删除数据库/表
    // - seed: 填充测试数据
} 

import { Command } from 'commander'
import { ILogger } from '@coffic/cosy-interfaces'

/**
 * 基于 Commander.js 的 CLI 应用程序类
 * 
 * 提供现代化的命令行界面，具有以下特性：
 * 1. 自动帮助生成
 * 2. 类型安全的参数解析
 * 3. 子命令支持
 * 4. 选项和参数验证
 * 5. 错误处理
 */
export class CommanderApp {
    private program: Command
    private logger: ILogger

    /**
     * 创建 Commander 应用实例
     * @param logger 日志记录器
     * @param config 应用配置
     */
    constructor(logger: ILogger, config: {
        name?: string
        description?: string
        version?: string
    } = {}) {
        this.logger = logger
        this.program = new Command()

        // 设置基本信息
        this.program
            .name(config.name || 'cosy')
            .description(config.description || 'Cosy Framework CLI')
            .version(config.version || '0.1.0')

        // 设置全局错误处理
        this.setupErrorHandling()

        // 设置帮助信息主题
        this.setupHelpTheme()

        this.logger.debug('Commander application initialized', {
            name: config.name,
            version: config.version
        })
    }

    /**
     * 添加命令
     * @param name 命令名称
     * @param description 命令描述
     */
    command(name: string, description?: string): Command {
        const cmd = this.program.command(name)
        if (description) {
            cmd.description(description)
        }

        this.logger.debug('Command added', { name, description })
        return cmd
    }

    /**
     * 添加全局选项
     * @param flags 选项标志
     * @param description 选项描述
     * @param defaultValue 默认值
     */
    option(flags: string, description?: string, defaultValue?: any): this {
        this.program.option(flags, description, defaultValue)
        this.logger.debug('Global option added', { flags, description })
        return this
    }

    /**
     * 设置错误处理
     */
    private setupErrorHandling(): void {
        // 处理未知命令
        this.program.on('command:*', (operands) => {
            this.logger.error('Unknown command', { command: operands[0] })
            console.error(`\n❌ 未知命令: ${operands[0]}`)
            console.error('💡 使用 "cosy --help" 查看可用命令\n')
            process.exit(1)
        })

        // 处理选项错误
        this.program.configureOutput({
            writeErr: (str) => {
                // 自定义错误输出格式
                if (str.includes('error:')) {
                    console.error(`\n❌ ${str.replace('error: ', '')}`)
                    console.error('💡 使用 "cosy --help" 查看正确用法\n')
                } else {
                    process.stderr.write(str)
                }
            }
        })
    }

    /**
     * 设置帮助信息主题
     */
    private setupHelpTheme(): void {
        // 自定义帮助信息格式
        this.program.configureHelp({
            helpWidth: 80,
            sortSubcommands: true,
            subcommandTerm: (cmd) => `${cmd.name().padEnd(20)} ${cmd.description()}`
        })

        // 添加自定义帮助头部
        this.program.addHelpText('before', this.getHelpHeader())

        // 添加自定义帮助尾部
        this.program.addHelpText('after', this.getHelpFooter())
    }

    /**
     * 获取帮助信息头部
     */
    private getHelpHeader(): string {
        const version = this.program.version() || '0.1.0'
        return `
╭─────────────────────────────────────────────────────────────╮
│                                                             │
│   🚀 Cosy Framework CLI v${version.padEnd(10)}                     │
│                                                             │
│   A Laravel-inspired TypeScript framework                  │
│                                                             │
╰─────────────────────────────────────────────────────────────╯
`
    }

    /**
     * 获取帮助信息尾部
     */
    private getHelpFooter(): string {
        return `
💡 示例:
   cosy serve           启动开发服务器 (默认端口: 3000)
   cosy serve 8080      启动开发服务器在指定端口
   cosy env             显示环境和系统信息
   cosy --help          显示此帮助信息
   cosy --version       显示版本信息

📚 了解更多:
   访问文档: https://github.com/coffic/cosy-ui
`
    }

    /**
     * 解析命令行参数并执行
     * @param argv 命令行参数
     */
    async parse(argv?: string[]): Promise<void> {
        try {
            this.logger.debug('Parsing command line arguments', { argv })
            await this.program.parseAsync(argv)
        } catch (error) {
            this.logger.error('Command execution failed', { error })

            if (error instanceof Error) {
                console.error(`\n❌ 执行失败: ${error.message}`)
            } else {
                console.error(`\n❌ 执行失败: ${String(error)}`)
            }

            console.error('💡 使用 "cosy --help" 查看可用命令\n')
            process.exit(1)
        }
    }

    /**
     * 获取 Commander 程序实例（用于高级自定义）
     */
    getProgram(): Command {
        return this.program
    }

    /**
     * 获取日志记录器
     */
    getLogger(): ILogger {
        return this.logger
    }
} 

import { ICommand, ILogger } from '@coffic/cosy-interfaces'
import { Application } from '../base/application.js'

/**
 * 命令行应用程序配置接口
 */
export interface CliApplicationConfig {
    name?: string
    env?: string
    debug?: boolean
}

/**
 * 命令行应用程序类
 * 
 * 核心功能：
 * 1. 命令注册和管理
 * 2. 命令行参数解析
 * 3. 命令执行
 * 4. 帮助信息生成
 */
export class CliApplication extends Application {
    private commands: Map<string, ICommand> = new Map()

    /**
     * 创建命令行应用程序实例
     * @param logger 日志记录器
     * @param config 应用程序配置
     */
    constructor(
        logger: ILogger,
        config: CliApplicationConfig = {}
    ) {
        super(
            logger,
            config.name || 'CLI Application',
            config.env || 'development',
            config.debug || false
        )

        // 记录CLI应用程序初始化日志
        this.logger.info('CLI Application initialized', {
            name: this.getName(),
            env: this.getEnv(),
            debug: this.isDebug()
        })
    }

    /**
     * 注册命令
     * @param command 命令实例
     */
    registerCommand(command: ICommand): void {
        const name = command.getName()
        if (!name) {
            throw new Error('Command name cannot be empty')
        }

        this.commands.set(name, command)
        this.logger.debug('Command registered', {
            name,
            description: command.getDescription()
        })
    }

    /**
     * 获取所有已注册的命令
     */
    getCommands(): Map<string, ICommand> {
        return this.commands
    }

    /**
     * 获取指定名称的命令
     * @param name 命令名称
     */
    getCommand(name: string): ICommand | undefined {
        return this.commands.get(name)
    }

    /**
     * 执行命令
     * @param args 命令行参数
     */
    async runCommand(args: string[] = process.argv.slice(2)): Promise<void> {
        this.logger.debug('Starting command execution', { args })

        if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
            this.showHelp()
            return
        }

        const commandName = args[0]
        if (!commandName) {
            this.logger.error('Command name is required')
            this.showHelp()
            return
        }

        const command = this.getCommand(commandName)
        if (!command) {
            this.logger.error('Command not found', { commandName })
            this.showHelp()
            return
        }

        try {
            this.logger.info('Executing command', {
                commandName,
                args: args.slice(1)
            })
            await command.execute(args.slice(1))
            this.logger.info('Command executed successfully', { commandName })
        } catch (error) {
            this.logger.error('Failed to execute command', {
                commandName,
                error: error instanceof Error ? error.message : String(error)
            })
            throw error
        }
    }

    /**
     * 显示帮助信息
     */
    private showHelp(): void {
        this.logger.debug('Showing help information')

        console.log(`\n${this.getName()} - Available commands:`)
        for (const [name, command] of this.commands) {
            console.log(`  ${name.padEnd(20)} ${command.getDescription()}`)
        }
        console.log('\nUse --help with any command for more information\n')
    }
} 

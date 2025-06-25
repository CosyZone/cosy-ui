import { Application } from '../core/app/application.js'
import { ApplicationConfig } from '../types.js'
import { ApplicationDependencies } from '../core/app/application.js'
import { ICommand } from '@coffic/cosy-interfaces'

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
     */
    constructor(
        appConfig: ApplicationConfig = {},
        dependencies: ApplicationDependencies
    ) {
        super(appConfig, dependencies)
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
        if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
            this.showHelp()
            return
        }

        const commandName = args[0]
        if (!commandName) {
            console.error('Command name is required')
            this.showHelp()
            return
        }

        const command = this.getCommand(commandName)
        if (!command) {
            console.error(`Command "${commandName}" not found`)
            this.showHelp()
            return
        }

        try {
            await command.execute(args.slice(1))
        } catch (error) {
            console.error(`Failed to execute command "${commandName}"`, error)
            throw error
        }
    }

    /**
     * 显示帮助信息
     */
    private showHelp(): void {
        console.log('\nAvailable commands:')
        for (const [name, command] of this.commands) {
            console.log(`  ${name.padEnd(20)} ${command.getDescription()}`)
        }
        console.log('\nUse --help with any command for more information\n')
    }

    /**
     * 启动命令行应用程序
     * 覆盖父类的start方法，移除HTTP服务器相关的逻辑
     */
    override async start(): Promise<void> {
        await this.runCommand()
    }
} 

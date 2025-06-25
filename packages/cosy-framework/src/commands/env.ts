import { BaseCommand } from '@coffic/cosy-interfaces'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { platform, arch, release, cpus, totalmem, freemem } from 'os'

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export class EnvCommand extends BaseCommand {
    constructor() {
        super('env', 'Display environment and system information')
    }

    async execute(args: string[]): Promise<void> {
        // 检查是否请求帮助
        if (args.includes('--help') || args.includes('-h')) {
            this.showHelp()
            return
        }

        console.log('\n📊 环境信息\n')

        // 显示系统信息
        this.showSystemInfo()

        // 显示 Node.js 信息
        this.showNodeInfo()

        // 显示框架信息
        this.showFrameworkInfo()

        // 显示环境变量
        this.showEnvironmentVariables()

        // 显示内存信息
        this.showMemoryInfo()

        console.log('')
    }

    /**
     * 显示系统信息
     */
    private showSystemInfo(): void {
        console.log('🖥️  系统信息:')
        console.log(`   操作系统:     ${platform()} ${arch()}`)
        console.log(`   系统版本:     ${release()}`)
        console.log(`   CPU 核心数:   ${cpus().length}`)
        console.log(`   CPU 型号:     ${cpus()[0]?.model || '未知'}`)
        console.log('')
    }

    /**
     * 显示 Node.js 信息
     */
    private showNodeInfo(): void {
        console.log('🟢 Node.js 信息:')
        console.log(`   Node 版本:    ${process.version}`)
        console.log(`   V8 版本:      ${process.versions.v8}`)
        console.log(`   npm 版本:     ${process.versions.npm || '未知'}`)
        console.log(`   执行路径:     ${process.execPath}`)
        console.log('')
    }

    /**
     * 显示框架信息
     */
    private showFrameworkInfo(): void {
        const frameworkVersion = this.getFrameworkVersion()
        const packageManager = this.detectPackageManager()

        console.log('🚀 Cosy Framework 信息:')
        console.log(`   框架版本:     ${frameworkVersion}`)
        console.log(`   包管理器:     ${packageManager}`)
        console.log(`   工作目录:     ${process.cwd()}`)
        console.log(`   启动时间:     ${new Date().toLocaleString('zh-CN')}`)
        console.log('')
    }

    /**
     * 显示环境变量
     */
    private showEnvironmentVariables(): void {
        const importantEnvs = [
            'NODE_ENV',
            'DEBUG',
            'PORT',
            'HOST',
            'DATABASE_URL',
            'LOG_LEVEL'
        ]

        console.log('🔧 环境变量:')

        let hasEnvVars = false
        for (const envVar of importantEnvs) {
            const value = process.env[envVar]
            if (value !== undefined) {
                console.log(`   ${envVar.padEnd(15)} ${value}`)
                hasEnvVars = true
            }
        }

        if (!hasEnvVars) {
            console.log('   (未设置重要的环境变量)')
        }
        console.log('')
    }

    /**
     * 显示内存信息
     */
    private showMemoryInfo(): void {
        const totalMem = totalmem()
        const freeMem = freemem()
        const usedMem = totalMem - freeMem
        const memUsage = process.memoryUsage()

        console.log('💾 内存信息:')
        console.log(`   系统总内存:   ${this.formatBytes(totalMem)}`)
        console.log(`   系统可用:     ${this.formatBytes(freeMem)}`)
        console.log(`   系统已用:     ${this.formatBytes(usedMem)} (${((usedMem / totalMem) * 100).toFixed(1)}%)`)
        console.log(`   进程内存:     ${this.formatBytes(memUsage.rss)}`)
        console.log(`   堆内存:       ${this.formatBytes(memUsage.heapUsed)} / ${this.formatBytes(memUsage.heapTotal)}`)
        console.log('')
    }

    /**
     * 获取框架版本
     */
    private getFrameworkVersion(): string {
        try {
            const packageJsonPath = join(__dirname, '../../package.json')
            const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
            return packageJson.version || '未知'
        } catch {
            return '未知'
        }
    }

    /**
     * 检测包管理器
     */
    private detectPackageManager(): string {
        // 检查锁文件（优先级更高）
        try {
            const cwd = process.cwd()

            const pnpmLockPath = join(cwd, 'pnpm-lock.yaml')
            const yarnLockPath = join(cwd, 'yarn.lock')
            const npmLockPath = join(cwd, 'package-lock.json')

            if (existsSync(pnpmLockPath)) {
                return 'pnpm'
            }
            if (existsSync(yarnLockPath)) {
                return 'yarn'
            }
            if (existsSync(npmLockPath)) {
                return 'npm'
            }
        } catch (error) {
            // 在生产环境中忽略错误
        }

        // 检查环境变量（作为备选）
        if (process.env.npm_config_user_agent) {
            const userAgent = process.env.npm_config_user_agent
            if (userAgent.includes('pnpm')) return 'pnpm'
            if (userAgent.includes('yarn')) return 'yarn'
            if (userAgent.includes('npm')) return 'npm'
        }

        // 检查进程执行命令
        if (process.env.npm_execpath) {
            if (process.env.npm_execpath.includes('pnpm')) return 'pnpm'
            if (process.env.npm_execpath.includes('yarn')) return 'yarn'
        }

        return '未知'
    }

    /**
     * 格式化字节数
     */
    private formatBytes(bytes: number): string {
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return '0 B'

        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        const formattedSize = (bytes / Math.pow(1024, i)).toFixed(1)

        return `${formattedSize} ${sizes[i]}`
    }

    /**
     * 显示命令帮助信息
     */
    private showHelp(): void {
        console.log(`
📖 cosy env - 显示环境和系统信息

🔧 使用方法:
   cosy env [options]

🔧 选项:
   --help, -h        显示此帮助信息

💡 示例:
   cosy env          显示完整的环境信息

📝 说明:
   此命令会显示当前系统的详细环境信息，包括:
   • 操作系统和硬件信息
   • Node.js 版本和配置
   • Cosy Framework 版本和设置
   • 重要的环境变量
   • 内存使用情况

🎯 用途:
   • 故障排查和调试
   • 环境配置验证
   • 性能监控
   • 支持请求时提供环境信息
`)
    }
} 

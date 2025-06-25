import { Command } from 'commander'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { platform, arch, release, cpus, totalmem, freemem } from 'os'
import Table from 'cli-table3'
import chalk from 'chalk'
import ora from 'ora'

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * 配置 env 命令
 * @param program Commander 程序实例
 */
export function configureEnvCommand(program: Command): void {
    program
        .command('env')
        .description('Display environment and system information')
        .option('-s, --simple', 'show simplified output')
        .option('-j, --json', 'output as JSON')
        .addHelpText('after', `
💡 示例:
   cosy env             显示完整的环境信息
   cosy env --simple    显示简化的环境信息
   cosy env --json      以 JSON 格式输出

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
        .action(async (options: {
            simple?: boolean
            json?: boolean
        }) => {
            const spinner = ora('收集环境信息...').start()

            try {
                const envInfo = collectEnvironmentInfo()
                spinner.succeed('环境信息收集完成')

                if (options.json) {
                    console.log(JSON.stringify(envInfo, null, 2))
                    return
                }

                if (options.simple) {
                    displaySimpleInfo(envInfo)
                } else {
                    displayDetailedInfo(envInfo)
                }
            } catch (error) {
                spinner.fail('环境信息收集失败')
                console.error(error)
            }
        })
}

/**
 * 收集环境信息
 */
function collectEnvironmentInfo() {
    const totalMem = totalmem()
    const freeMem = freemem()
    const usedMem = totalMem - freeMem
    const memUsage = process.memoryUsage()

    return {
        system: {
            platform: platform(),
            arch: arch(),
            release: release(),
            cpuCores: cpus().length,
            cpuModel: cpus()[0]?.model || '未知'
        },
        node: {
            version: process.version,
            v8Version: process.versions.v8,
            npmVersion: process.versions.npm || '未知',
            execPath: process.execPath
        },
        framework: {
            version: getFrameworkVersion(),
            packageManager: detectPackageManager(),
            workingDirectory: process.cwd(),
            startTime: new Date().toISOString()
        },
        environment: getEnvironmentVariables(),
        memory: {
            system: {
                total: totalMem,
                free: freeMem,
                used: usedMem,
                usagePercent: ((usedMem / totalMem) * 100).toFixed(1)
            },
            process: {
                rss: memUsage.rss,
                heapTotal: memUsage.heapTotal,
                heapUsed: memUsage.heapUsed,
                external: memUsage.external
            }
        }
    }
}

/**
 * 显示详细信息
 */
function displayDetailedInfo(envInfo: any): void {
    console.log('\n' + chalk.bold.cyan('📊 环境信息') + '\n')

    // 系统信息表格
    const systemTable = new Table({
        head: [chalk.cyan('🖥️  系统信息 '), chalk.cyan('值')],
        style: { head: [], border: [] }
    })

    systemTable.push(
        ['操作系统', `${envInfo.system.platform} ${envInfo.system.arch}`],
        ['系统版本', envInfo.system.release],
        ['CPU 核心数', envInfo.system.cpuCores],
        ['CPU 型号', envInfo.system.cpuModel]
    )
    console.log(systemTable.toString() + '\n')

    // Node.js 信息表格
    const nodeTable = new Table({
        head: [chalk.green('🟢 Node.js 信息'), chalk.green('值')],
        style: { head: [], border: [] }
    })

    nodeTable.push(
        ['Node 版本', envInfo.node.version],
        ['V8 版本', envInfo.node.v8Version],
        ['npm 版本', envInfo.node.npmVersion],
        ['执行路径', envInfo.node.execPath]
    )
    console.log(nodeTable.toString() + '\n')

    // 框架信息表格
    const frameworkTable = new Table({
        head: [chalk.yellow('🚀 Cosy Framework'), chalk.yellow('值')],
        style: { head: [], border: [] }
    })

    frameworkTable.push(
        ['框架版本', envInfo.framework.version],
        ['包管理器', envInfo.framework.packageManager],
        ['工作目录', envInfo.framework.workingDirectory],
        ['启动时间', new Date(envInfo.framework.startTime).toLocaleString('zh-CN')]
    )
    console.log(frameworkTable.toString() + '\n')

    // 环境变量表格
    if (Object.keys(envInfo.environment).length > 0) {
        const envTable = new Table({
            head: [chalk.magenta('🔧 环境变量'), chalk.magenta('值')],
            style: { head: [], border: [] }
        })

        for (const [key, value] of Object.entries(envInfo.environment)) {
            envTable.push([key, value as string])
        }
        console.log(envTable.toString() + '\n')
    } else {
        console.log(chalk.magenta('🔧 环境变量:'))
        console.log(chalk.gray('   (未设置重要的环境变量)\n'))
    }

    // 内存信息表格
    const memoryTable = new Table({
        head: [chalk.blue('💾 内存信息'), chalk.blue('值')],
        style: { head: [], border: [] }
    })

    memoryTable.push(
        ['系统总内存', formatBytes(envInfo.memory.system.total)],
        ['系统可用', formatBytes(envInfo.memory.system.free)],
        ['系统已用', `${formatBytes(envInfo.memory.system.used)} (${envInfo.memory.system.usagePercent}%)`],
        ['进程内存', formatBytes(envInfo.memory.process.rss)],
        ['堆内存', `${formatBytes(envInfo.memory.process.heapUsed)} / ${formatBytes(envInfo.memory.process.heapTotal)}`]
    )
    console.log(memoryTable.toString() + '\n')
}

/**
 * 显示简化信息
 */
function displaySimpleInfo(envInfo: any): void {
    const table = new Table({
        head: [chalk.cyan('📊 环境概览'), chalk.cyan('值')],
        style: { head: [], border: [] }
    })

    table.push(
        ['🖥️  系统', `${envInfo.system.platform} ${envInfo.system.arch}`],
        ['🟢 Node.js', envInfo.node.version],
        ['🚀 Framework', `v${envInfo.framework.version}`],
        ['📦 包管理器', envInfo.framework.packageManager],
        ['💾 内存使用', `${envInfo.memory.system.usagePercent}% (${formatBytes(envInfo.memory.system.used)}/${formatBytes(envInfo.memory.system.total)})`],
        ['📁 工作目录', envInfo.framework.workingDirectory]
    )

    console.log('\n' + table.toString() + '\n')
}

/**
 * 获取框架版本
 */
function getFrameworkVersion(): string {
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
function detectPackageManager(): string {
    // 检查锁文件（优先级更高）- 向上查找项目根目录
    try {
        let currentDir = process.cwd()
        const root = '/'

        while (currentDir !== root) {
            const pnpmLockPath = join(currentDir, 'pnpm-lock.yaml')
            const yarnLockPath = join(currentDir, 'yarn.lock')
            const npmLockPath = join(currentDir, 'package-lock.json')

            if (existsSync(pnpmLockPath)) {
                return 'pnpm'
            }
            if (existsSync(yarnLockPath)) {
                return 'yarn'
            }
            if (existsSync(npmLockPath)) {
                return 'npm'
            }

            // 向上一级目录查找
            const parentDir = dirname(currentDir)
            if (parentDir === currentDir) break // 已到达根目录
            currentDir = parentDir
        }
    } catch {
        // 忽略错误
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
 * 获取重要的环境变量
 */
function getEnvironmentVariables(): Record<string, string> {
    const importantEnvs = [
        'NODE_ENV',
        'DEBUG',
        'PORT',
        'HOST',
        'DATABASE_URL',
        'LOG_LEVEL'
    ]

    const envVars: Record<string, string> = {}

    for (const envVar of importantEnvs) {
        const value = process.env[envVar]
        if (value !== undefined) {
            envVars[envVar] = value
        }
    }

    return envVars
}

/**
 * 格式化字节数
 */
function formatBytes(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 B'

    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    const formattedSize = (bytes / Math.pow(1024, i)).toFixed(1)

    return `${formattedSize} ${sizes[i]}`
} 

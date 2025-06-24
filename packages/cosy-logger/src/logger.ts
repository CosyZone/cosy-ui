import { ILogger, LogLevel, LogContext, LoggerConfig } from '@coffic/cosy-interfaces'
import pino, { Logger as PinoLogger } from 'pino'
import pretty from 'pino-pretty'
import { fileURLToPath } from 'url'

/**
 * 获取调用栈中的源文件位置
 */
function getCallerLocation(depth = 2): string {
    const error = new Error()
    const stack = error.stack?.split('\n')[depth]
    if (!stack) return ''

    const match = stack.match(/at\s+.*\s+\((.*):(\d+):(\d+)\)/)
    if (!match) return ''

    const [_, filePath, line] = match
    if (!filePath) return ''

    // 如果是 file:// URL，转换为文件路径
    const resolvedPath = filePath.startsWith('file://') ? fileURLToPath(filePath) : filePath
    return `${resolvedPath}:${line}`
    // 获取相对于工作目录的路径
    // const relativePath = path.relative(process.cwd(), resolvedPath)
    // return `${relativePath}:${line}`
}

/**
 * Pino 日志记录器实现
 */
export class Logger implements ILogger {
    private logger: PinoLogger

    constructor(config: LoggerConfig = {}) {
        const pinoConfig: pino.LoggerOptions = {
            level: config.level || LogLevel.INFO,
            timestamp: config.timestamp !== false,
            messageKey: 'msg',
            base: null, // 禁用默认的基础字段
            formatters: {
                level: (label: string) => {
                    return { level: label.toUpperCase() }
                }
            }
        }

        // 如果需要美化输出
        if (config.pretty) {
            const stream = pretty({
                colorize: true,
                singleLine: true, // 强制单行输出
                hideObject: false // 显示额外的上下文信息
            })

            // 创建基础 logger
            this.logger = pino(pinoConfig, stream)
        } else {
            this.logger = pino(pinoConfig)
        }

        // 如果配置了文件输出
        if (config.file) {
            const fileStream = pino.destination({
                dest: config.file,
                sync: false // 异步写入以提高性能
            })
            this.logger = pino(pinoConfig, fileStream)
        }
    }

    private addCallerInfo(message: string, context?: LogContext): { message: string; context: LogContext | undefined } {
        const callerLocation = getCallerLocation(4) // 调整深度以获取正确的调用位置
        return {
            message: `${callerLocation} ${message}`,
            context
        }
    }

    error(message: string, context?: LogContext): void {
        const callerLocation = getCallerLocation(4)
        this.log(LogLevel.ERROR, `${callerLocation} ${message}`, context)
    }

    warn(message: string, context?: LogContext): void {
        const callerLocation = getCallerLocation(4)
        this.log(LogLevel.WARN, `${callerLocation} ${message}`, context)
    }

    info(message: string, context?: LogContext): void {
        const callerLocation = getCallerLocation(4)
        this.log(LogLevel.INFO, `${callerLocation} ${message}`, context)
    }

    debug(message: string, context?: LogContext): void {
        const callerLocation = getCallerLocation(4)
        this.log(LogLevel.DEBUG, `${callerLocation} ${message}`, context)
    }

    log(level: LogLevel, message: string, context?: LogContext): void {
        if (context) {
            this.logger[level](context, message)
        } else {
            this.logger[level](message)
        }
    }

    child(name: string, context?: LogContext): ILogger {
        const childLogger = this.logger.child({
            component: name,
            ...context
        })
        const logger = Object.create(this) as Logger
        logger.logger = childLogger
        return logger
    }
} 

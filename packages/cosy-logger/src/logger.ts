import { ILogger, LogLevel, LogContext, LoggerConfig } from '@coffic/cosy-interfaces'
import pino, { Logger as PinoLogger } from 'pino'
import pretty from 'pino-pretty'

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

    error(message: string, context?: LogContext): void {
        this.log(LogLevel.ERROR, message, context)
    }

    warn(message: string, context?: LogContext): void {
        this.log(LogLevel.WARN, message, context)
    }

    info(message: string, context?: LogContext): void {
        this.log(LogLevel.INFO, message, context)
    }

    debug(message: string, context?: LogContext): void {
        this.log(LogLevel.DEBUG, message, context)
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

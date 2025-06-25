/**
 * 日志级别
 */
export enum LogLevel {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug'
}

/**
 * 日志上下文接口
 */
export interface LogContext {
    [key: string]: any;
}

/**
 * 日志配置接口
 */
export interface LoggerConfig {
    /**
     * 日志级别
     * @default LogLevel.INFO
     */
    level?: LogLevel;

    /**
     * 是否打印时间戳
     * @default true
     */
    timestamp?: boolean;

    /**
     * 是否美化输出
     * @default false
     */
    pretty?: boolean;

    /**
     * 日志文件路径
     * 如果设置，日志将同时写入文件
     */
    file?: string;

    /**
     * 自定义格式化函数
     */
    format?: (level: LogLevel, message: string, context?: LogContext) => string;

    /**
     * 默认上下文
     * 这些值会被添加到每条日志中
     */
    context?: LogContext;

    /**
     * 日志消息前缀
     * 如果设置，每条日志消息前都会添加这个前缀
     */
    prefix?: string;
}

/**
 * 日志记录器接口
 */
export interface ILogger {
    /**
     * 记录错误级别的日志
     */
    error(message: string, context?: LogContext): void;

    /**
     * 记录警告级别的日志
     */
    warn(message: string, context?: LogContext): void;

    /**
     * 记录信息级别的日志
     */
    info(message: string, context?: LogContext): void;

    /**
     * 记录调试级别的日志
     */
    debug(message: string, context?: LogContext): void;

    /**
     * 记录指定级别的日志
     */
    log(level: LogLevel, message: string, context?: LogContext): void;

    /**
     * 创建子日志记录器
     * @param name 子日志记录器名称
     * @param context 默认上下文
     */
    child(name: string, context?: LogContext): ILogger;
} 

import { ILogger } from '@coffic/cosy-interfaces'

/**
 * 应用程序基类
 * 
 * 提供所有应用程序类型的基础功能：
 * 1. 日志记录
 * 2. 基础配置管理
 * 3. 生命周期管理基础
 */
export abstract class Application {
    /**
     * 日志记录器
     * 
     * 应用程序的核心日志记录器，所有继承的应用都可以使用。
     * 提供统一的日志记录接口和格式。
     */
    protected logger: ILogger

    /**
     * 应用程序名称
     */
    protected name: string

    /**
     * 应用程序环境
     */
    protected env: string

    /**
     * 是否处于调试模式
     */
    protected debug: boolean

    /**
     * 创建应用程序实例
     * @param logger 日志记录器
     * @param name 应用程序名称
     * @param env 环境名称
     * @param debug 是否启用调试模式
     */
    constructor(
        logger: ILogger,
        name: string = 'Application',
        env: string = 'development',
        debug: boolean = false
    ) {
        this.logger = logger
        this.name = name
        this.env = env
        this.debug = debug

        // 记录应用程序基础初始化日志
        this.logger.debug('Application base initialized', {
            name: this.name,
            env: this.env,
            debug: this.debug,
            type: this.constructor.name
        })
    }

    /**
     * 获取应用程序名称
     */
    getName(): string {
        return this.name
    }

    /**
     * 获取应用程序环境
     */
    getEnv(): string {
        return this.env
    }

    /**
     * 是否处于调试模式
     */
    isDebug(): boolean {
        return this.debug
    }

    /**
     * 获取日志记录器
     */
    getLogger(): ILogger {
        return this.logger
    }

    /**
     * 创建子日志记录器
     * @param name 子日志记录器名称
     * @param context 额外的上下文
     */
    protected createChildLogger(name: string, context: Record<string, any> = {}): ILogger {
        return this.logger.child(name, {
            app: this.name,
            env: this.env,
            ...context
        })
    }
}
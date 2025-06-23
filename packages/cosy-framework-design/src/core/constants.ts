// 占位符常量
export const CORE_TEMP = 'temp';

/**
 * 应用程序状态枚举
 */
export enum ApplicationStatus {
    /**
     * 初始化状态
     */
    INIT = 'init',

    /**
     * 启动中
     */
    BOOTING = 'booting',

    /**
     * 已启动
     */
    BOOTED = 'booted',

    /**
     * 运行中
     */
    RUNNING = 'running',

    /**
     * 停止中
     */
    STOPPING = 'stopping',

    /**
     * 已停止
     */
    STOPPED = 'stopped'
}

/**
 * 应用程序环境枚举
 */
export enum ApplicationEnvironment {
    /**
     * 开发环境
     */
    DEVELOPMENT = 'development',

    /**
     * 测试环境
     */
    TEST = 'test',

    /**
     * 生产环境
     */
    PRODUCTION = 'production'
}

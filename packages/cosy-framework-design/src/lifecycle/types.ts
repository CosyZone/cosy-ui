/**
 * 生命周期阶段
 */
export enum LifecyclePhase {
    /**
     * 初始化阶段
     */
    INIT = 'init',

    /**
     * 配置加载阶段
     */
    CONFIG = 'config',

    /**
     * 服务注册阶段
     */
    REGISTER = 'register',

    /**
     * 启动阶段
     */
    BOOT = 'boot',

    /**
     * 运行阶段
     */
    RUN = 'run',

    /**
     * 关闭阶段
     */
    SHUTDOWN = 'shutdown'
}

/**
 * 生命周期钩子函数类型
 */
export type LifecycleHook = () => Promise<void> | void;

/**
 * 生命周期状态
 */
export interface ILifecycleState {
    /**
     * 当前阶段
     */
    currentPhase: LifecyclePhase;

    /**
     * 是否正在运行
     */
    isRunning: boolean;

    /**
     * 启动时间
     */
    startTime?: Date;

    /**
     * 运行时长（毫秒）
     */
    uptime(): number;
}

/**
 * 生命周期错误
 */
export class LifecycleError extends Error {
    constructor(
        message: string,
        public phase: LifecyclePhase,
        public originalError?: Error
    ) {
        super(message);
    }
} 

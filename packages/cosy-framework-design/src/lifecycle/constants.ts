/**
 * 生命周期事件类型
 */
export enum LifecycleEventType {
    /**
     * 阶段开始事件
     */
    PHASE_START = 'phase:start',

    /**
     * 阶段结束事件
     */
    PHASE_END = 'phase:end',

    /**
     * 错误事件
     */
    ERROR = 'error'
} 

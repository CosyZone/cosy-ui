import { LifecyclePhase, LifecycleHook } from './types';
import { LifecycleEventType } from './constants';

/**
 * 生命周期管理器接口
 */
export interface ILifecycleManager {
    /**
     * 注册钩子函数
     * @param phase 生命周期阶段
     * @param hook 钩子函数
     */
    hook(phase: LifecyclePhase, hook: LifecycleHook): void;

    /**
     * 启动应用
     */
    boot(): Promise<void>;

    /**
     * 关闭应用
     */
    shutdown(): Promise<void>;

    /**
     * 获取当前阶段
     */
    getCurrentPhase(): LifecyclePhase;
}

/**
 * 生命周期事件接口
 */
export interface ILifecycleEvent {
    /**
     * 事件类型
     */
    type: LifecycleEventType;

    /**
     * 生命周期阶段
     */
    phase: LifecyclePhase;

    /**
     * 事件数据
     */
    data?: any;
}

/**
 * 事件监听器类型
 */
export type EventListener = (event: ILifecycleEvent) => void;

/**
 * 事件管理器接口
 */
export interface IEventManager {
    /**
     * 注册事件监听器
     * @param type 事件类型
     * @param listener 监听器函数
     */
    on(type: LifecycleEventType, listener: EventListener): void;

    /**
     * 触发事件
     * @param event 事件对象
     */
    emit(event: ILifecycleEvent): void;
} 

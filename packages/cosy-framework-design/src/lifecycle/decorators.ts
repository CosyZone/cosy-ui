import { LifecyclePhase } from './types';

/**
 * 钩子装饰器选项
 */
export interface IHookOptions {
    /**
     * 生命周期阶段
     */
    phase: LifecyclePhase;

    /**
     * 执行顺序
     */
    order?: number;
}

/**
 * 钩子装饰器类型
 */
export type HookDecorator = (options: IHookOptions) => MethodDecorator;

/**
 * 预定义钩子装饰器
 */
export interface ILifecycleDecorators {
    OnInit: () => MethodDecorator;
    OnConfig: () => MethodDecorator;
    OnBoot: () => MethodDecorator;
    OnShutdown: () => MethodDecorator;
} 

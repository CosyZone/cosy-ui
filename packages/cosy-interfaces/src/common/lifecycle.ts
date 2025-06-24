/**
 * 生命周期钩子接口
 * 
 * 定义了应用程序生命周期中的各个阶段的钩子函数。
 * 这些钩子允许在应用程序的关键时刻执行自定义逻辑。
 * 
 * @example
 * ```typescript
 * const hooks: ILifecycleHooks = {
 *   async beforeBoot() {
 *     // 在应用启动前执行初始化
 *     await loadConfig();
 *   },
 *   async afterStart() {
 *     // 在应用启动后执行
 *     console.log('Application is running!');
 *   }
 * };
 * ```
 */
export interface ILifecycleHooks {
    /**
     * 在应用程序启动前执行
     */
    beforeBoot?: () => Promise<void> | void

    /**
     * 在应用程序启动后执行
     */
    afterBoot?: () => Promise<void> | void

    /**
     * 在应用程序开始运行前执行
     */
    beforeStart?: () => Promise<void> | void

    /**
     * 在应用程序开始运行后执行
     */
    afterStart?: () => Promise<void> | void

    /**
     * 在应用程序停止前执行
     */
    beforeStop?: () => Promise<void> | void

    /**
     * 在应用程序停止后执行
     */
    afterStop?: () => Promise<void> | void
} 

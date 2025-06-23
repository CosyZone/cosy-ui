import { Application as BaseApplication } from './application'

// 导出应用程序核心
export { BaseApplication as Application }

// 导出其他核心组件
export { Bootstrap } from './bootstrap'
export {
    App,
    AutoRegister,
    OnStart,
    OnStop,
    createApp,
    getAppMetadata,
    shouldAutoRegister
} from './decorators'

export {
    createWebApp,
    createApiApp,
    gracefulShutdown,
    setupErrorHandling
} from './helpers'

// 导出类型
export type {
    ApplicationInterface,
    ApplicationConfig,
    ApplicationLifecycleHooks,
    BootstrapOptions
} from '../types'

// 导出默认应用实例
export const app = new BaseApplication() 

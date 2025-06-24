// 导入 reflect-metadata（必须在最前面）
import 'reflect-metadata'

// 核心模块
export { Application } from './core/application'
export { Bootstrap } from './core/bootstrap'

// 类型
export {
    ApplicationConfig,
    LifecycleHooks,
    ServiceProvider,
    Application as ApplicationInterface,
    BootstrapOptions,
    Constructor
} from './types'
/**
 * 核心模块导出
 * 
 * 本模块是框架的核心，提供了所有基础功能的导出。
 * 它组织了应用程序的主要组件，包括：
 * - 应用程序核心类
 * - 启动器
 * - 装饰器
 * - 辅助函数
 * - 类型定义
 */

import { Application as BaseApplication } from './application'

/**
 * 导出应用程序核心类
 * 这是框架的主要入口点，提供了应用程序的核心功能
 */
export { BaseApplication as Application }

/**
 * 导出启动器
 * 提供了应用程序的启动和配置机制
 */
export { Bootstrap } from './bootstrap'

/**
 * 导出装饰器
 * 提供了声明式的配置和功能注入机制
 */
export {
    App,           // 应用程序装饰器
    AutoRegister,  // 自动注册装饰器
    OnStart,       // 启动生命周期装饰器
    OnStop,        // 停止生命周期装饰器
    createApp,     // 应用程序工厂函数
    getAppMetadata,// 元数据访问函数
    shouldAutoRegister // 自动注册检查函数
} from './decorators'

/**
 * 导出辅助函数
 * 提供了常用的应用程序创建和管理功能
 */
export {
    createWebApp,      // Web应用程序创建
    createApiApp,      // API应用程序创建
    gracefulShutdown,  // 优雅关闭处理
    setupErrorHandling // 错误处理配置
} from './helpers'

/**
 * 导出类型定义
 * 提供了框架核心的类型定义
 */
export type {
    ApplicationInterface,   // 应用程序接口
    ApplicationConfig,      // 应用程序配置
    ApplicationLifecycleHooks, // 生命周期钩子
    BootstrapOptions       // 启动选项
} from '../types'

/**
 * 导出默认应用实例
 * 提供了一个全局的默认应用程序实例
 */
export const app = new BaseApplication() 

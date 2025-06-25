import 'reflect-metadata'
import { Constructor } from '../../types.js'
import { Application } from './application.js'

// 元数据键
const APP_METADATA = Symbol('app')
const CONTROLLER_METADATA = Symbol('controller')

/**
 * 应用程序装饰器 - 用于配置应用程序类
 * 
 * 原理：
 * 1. 使用 reflect-metadata 在类上存储应用程序配置元数据
 * 2. 当应用程序启动时，会读取这些元数据来配置应用程序
 * 
 * 工作流程：
 * 1. 装饰器在类定义时执行
 * 2. 将配置信息作为元数据存储在类上
 * 3. 应用程序启动时读取并应用这些配置
 * 
 * 使用示例：
 * ```typescript
 * @App({
 *   name: 'My App',
 *   port: 3000,
 *   debug: true
 * })
 * class MyApplication {
 *   // ...
 * }
 * ```
 * 
 * @param config 应用程序配置对象
 */
export function App(config?: any) {
    return function <T extends Constructor<any>>(target: T) {
        Reflect.defineMetadata('app:config', config || {}, target)
        return target
    }
}

/**
 * 自动注册装饰器 - 用于自动注册控制器和其他组件
 * 
 * 原理：
 * 1. 在类上存储自动注册标记
 * 2. 应用程序启动时扫描所有带有此标记的类
 * 3. 自动将这些类注册到应用程序中
 * 
 * 工作流程：
 * 1. 装饰器标记类为可自动注册
 * 2. 启动时扫描所有带有标记的类
 * 3. 根据类型自动注册到相应的系统中
 * 
 * 使用示例：
 * ```typescript
 * @AutoRegister()
 * class UserController {
 *   // ...
 * }
 * ```
 */
export function AutoRegister() {
    return function <T extends Constructor<any>>(target: T) {
        Reflect.defineMetadata('app:auto-register', true, target)
        return target
    }
}

/**
 * 启动生命周期装饰器 - 用于标记应用程序启动时执行的方法
 * 
 * 原理：
 * 1. 在方法上存储启动钩子标记
 * 2. 应用程序启动时自动调用这些方法
 * 
 * 工作流程：
 * 1. 装饰器标记方法为启动钩子
 * 2. 启动时收集所有启动钩子
 * 3. 按照依赖顺序执行这些方法
 * 
 * 使用示例：
 * ```typescript
 * class AppModule {
 *   @OnStart()
 *   async initialize() {
 *     // 初始化逻辑
 *   }
 * }
 * ```
 */
export function OnStart() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('lifecycle:start', true, target, propertyKey)
        return descriptor
    }
}

/**
 * 停止生命周期装饰器 - 用于标记应用程序停止时执行的方法
 * 
 * 原理：
 * 1. 在方法上存储停止钩子标记
 * 2. 应用程序停止时自动调用这些方法
 * 
 * 工作流程：
 * 1. 装饰器标记方法为停止钩子
 * 2. 停止时收集所有停止钩子
 * 3. 按照依赖顺序的逆序执行这些方法
 * 
 * 使用示例：
 * ```typescript
 * class AppModule {
 *   @OnStop()
 *   async cleanup() {
 *     // 清理逻辑
 *   }
 * }
 * ```
 */
export function OnStop() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('lifecycle:stop', true, target, propertyKey)
        return descriptor
    }
}

/**
 * 获取应用程序元数据
 * 
 * @param target 目标类
 * @returns 应用程序配置元数据
 */
export function getAppMetadata(target: any): any {
    return Reflect.getMetadata('app:config', target)
}

/**
 * 检查类是否需要自动注册
 * 
 * @param target 目标类
 * @returns 是否需要自动注册
 */
export function shouldAutoRegister(target: any): boolean {
    return Reflect.getMetadata('app:auto-register', target) === true
}

/**
 * 创建应用程序实例
 * 
 * 原理：
 * 1. 读取类上的应用程序配置元数据
 * 2. 根据配置创建和配置应用程序实例
 * 
 * @param AppClass 应用程序类
 * @returns 配置好的应用程序实例
 */
export function createApp(AppClass: Constructor<Application>): Application {
    const config = getAppMetadata(AppClass)
    const app = new AppClass()

    // 这里可以根据装饰器配置应用程序
    // 实际实现需要更复杂的逻辑

    return app
} 

import 'reflect-metadata'
import { ApplicationInterface, Constructor } from '../types'

// 元数据键
const APP_METADATA = Symbol('app')
const CONTROLLER_METADATA = Symbol('controller')

/**
 * 应用程序装饰器
 */
export function App(config?: any) {
    return function <T extends Constructor>(target: T) {
        Reflect.defineMetadata(APP_METADATA, config || {}, target)
        return target
    }
}

/**
 * 自动注册控制器装饰器
 */
export function AutoRegister() {
    return function <T extends Constructor>(target: T) {
        Reflect.defineMetadata(CONTROLLER_METADATA, true, target)
        return target
    }
}

/**
 * 获取应用程序元数据
 */
export function getAppMetadata(target: any): any {
    return Reflect.getMetadata(APP_METADATA, target)
}

/**
 * 检查是否需要自动注册
 */
export function shouldAutoRegister(target: any): boolean {
    return Reflect.getMetadata(CONTROLLER_METADATA, target) === true
}

/**
 * 启动装饰器（方法装饰器）
 */
export function OnStart() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('lifecycle:start', true, target, propertyKey)
        return descriptor
    }
}

/**
 * 停止装饰器（方法装饰器）
 */
export function OnStop() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('lifecycle:stop', true, target, propertyKey)
        return descriptor
    }
}

/**
 * 应用程序工厂
 */
export function createApp(AppClass: Constructor<any>): ApplicationInterface {
    const config = getAppMetadata(AppClass)
    const app = new AppClass()

    // 这里可以根据装饰器配置应用程序
    // 实际实现需要更复杂的逻辑

    return app
} 

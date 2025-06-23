import 'reflect-metadata'
import { INJECTABLE_TOKEN, INJECT_TOKEN, Constructor } from '../types'

/**
 * 标记类为可注入
 */
export function Injectable<T extends Constructor>(target: T): T {
    Reflect.defineMetadata(INJECTABLE_TOKEN, true, target)
    return target
}

/**
 * 注入依赖装饰器
 */
export function Inject(token: string | symbol) {
    return function (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {
        const existingTokens = Reflect.getMetadata(INJECT_TOKEN, target) || {}
        existingTokens[parameterIndex] = token
        Reflect.defineMetadata(INJECT_TOKEN, existingTokens, target)
    }
}

/**
 * 自动注入装饰器（用于属性注入）
 */
export function AutoInject(token?: string | symbol) {
    return function (target: any, propertyKey: string | symbol) {
        const injectToken = token || propertyKey

        Object.defineProperty(target, propertyKey, {
            get() {
                const container = require('./index').container
                return container.resolve(injectToken)
            },
            enumerable: true,
            configurable: true
        })
    }
} 

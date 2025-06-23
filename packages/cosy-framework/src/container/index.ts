import 'reflect-metadata'
import { Container, ServiceBinding, Constructor, INJECTABLE_TOKEN, INJECT_TOKEN, DEPENDENCIES_TOKEN } from '../types'

export class ServiceContainer implements Container {
    private bindings = new Map<string | symbol, ServiceBinding>()
    private instances = new Map<string | symbol, any>()

    /**
     * 绑定服务到容器
     */
    bind<T>(token: string | symbol, implementation: Constructor<T>, singleton = false): void {
        this.bindings.set(token, {
            token,
            implementation,
            singleton
        })
    }

    /**
     * 绑定单例服务
     */
    singleton<T>(token: string | symbol, implementation: Constructor<T>): void {
        this.bind(token, implementation, true)
    }

    /**
     * 解析服务
     */
    resolve<T>(token: string | symbol): T {
        // 检查是否有现有实例（单例模式）
        if (this.instances.has(token)) {
            return this.instances.get(token)
        }

        // 获取绑定信息
        const binding = this.bindings.get(token)
        if (!binding) {
            throw new Error(`Service not found: ${String(token)}`)
        }

        // 创建实例
        const instance = this.make(binding.implementation)

        // 如果是单例，缓存实例
        if (binding.singleton) {
            this.instances.set(token, instance)
        }

        return instance
    }

    /**
     * 创建类实例并自动注入依赖
     */
    make<T>(implementation: Constructor<T>): T {
        // 获取构造函数依赖
        const dependencies = this.getDependencies(implementation)

        // 解析依赖
        const resolvedDependencies = dependencies.map(dep => {
            if (typeof dep === 'string' || typeof dep === 'symbol') {
                return this.resolve(dep)
            }
            return this.make(dep)
        })

        // 创建实例
        return new implementation(...resolvedDependencies)
    }

    /**
     * 检查服务是否存在
     */
    has(token: string | symbol): boolean {
        return this.bindings.has(token) || this.instances.has(token)
    }

    /**
     * 直接设置实例
     */
    instance<T>(token: string | symbol, instance: T): void {
        this.instances.set(token, instance)
    }

    /**
 * 获取构造函数的依赖列表
 */
    private getDependencies(target: Constructor<any>): (string | symbol | Constructor<any>)[] {
        // 从装饰器元数据获取依赖
        const dependencies = Reflect.getMetadata('design:paramtypes', target) || []
        const injectTokens = Reflect.getMetadata(INJECT_TOKEN, target) || {}

        // 如果有显式注入令牌，使用令牌数量作为参数数量
        const paramCount = Object.keys(injectTokens).length > 0
            ? Math.max(...Object.keys(injectTokens).map(k => parseInt(k))) + 1
            : dependencies.length

        const result: (string | symbol | Constructor<any>)[] = []

        for (let index = 0; index < paramCount; index++) {
            // 如果有显式注入令牌，使用令牌
            if (injectTokens[index]) {
                result.push(injectTokens[index])
            } else if (dependencies[index]) {
                // 否则使用类型作为令牌
                result.push(dependencies[index])
            } else {
                throw new Error(`Cannot resolve dependency at index ${index} for ${target.name}. Use @Inject decorator to specify the token.`)
            }
        }

        return result
    }
}

// 默认容器实例
export const container = new ServiceContainer()

// 导出装饰器
export { Injectable, Inject, AutoInject } from './decorators'

// 导出服务提供者
export { BaseServiceProvider } from './service-provider'

// 导出类型和常量
export type { Container, ServiceBinding, Constructor, ServiceProvider } from '../types'
export { INJECTABLE_TOKEN, INJECT_TOKEN, DEPENDENCIES_TOKEN } from '../types'

// 容器模块 - 稍后实现
export const CONTAINER_MODULE = 'container' 

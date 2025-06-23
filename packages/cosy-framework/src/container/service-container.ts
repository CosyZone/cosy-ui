import 'reflect-metadata'
import { Container, ServiceBinding, Constructor, INJECTABLE_TOKEN, INJECT_TOKEN, DEPENDENCIES_TOKEN } from '../types'

/**
 * @class ServiceContainer
 * @implements {Container}
 * @description 依赖注入容器的核心实现类。负责管理服务的注册、解析和生命周期。
 * 
 * @example
 * ```typescript
 * const container = new ServiceContainer();
 * 
 * // 注册服务
 * container.bind('database', DatabaseService);
 * 
 * // 注册单例服务
 * container.singleton('cache', CacheService);
 * 
 * // 解析服务
 * const db = container.resolve('database');
 * ```
 */
export class ServiceContainer implements Container {
    /** 存储服务绑定信息的Map */
    private bindings = new Map<string | symbol, ServiceBinding>()
    /** 存储单例服务实例的Map */
    private instances = new Map<string | symbol, any>()

    /**
     * 将服务实现绑定到指定的令牌
     * @template T 服务类型
     * @param {string | symbol} token 服务标识符
     * @param {Constructor<T>} implementation 服务的具体实现类
     * @param {boolean} [singleton=false] 是否为单例服务
     */
    bind<T>(token: string | symbol, implementation: Constructor<T>, singleton = false): void {
        this.bindings.set(token, {
            token,
            implementation,
            singleton
        })
    }

    /**
     * 将服务注册为单例模式
     * @template T 服务类型
     * @param {string | symbol} token 服务标识符
     * @param {Constructor<T>} implementation 服务的具体实现类
     */
    singleton<T>(token: string | symbol, implementation: Constructor<T>): void {
        this.bind(token, implementation, true)
    }

    /**
     * 解析并返回服务实例
     * @template T 服务类型
     * @param {string | symbol} token 服务标识符
     * @returns {T} 服务实例
     * @throws {Error} 当服务未注册时抛出错误
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
     * 创建类的新实例，自动注入其依赖
     * @template T 要创建的类型
     * @param {Constructor<T>} implementation 要实例化的类
     * @returns {T} 类的新实例
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
     * 检查服务是否已注册到容器中
     * @param {string | symbol} token 服务标识符
     * @returns {boolean} 如果服务已注册则返回true，否则返回false
     */
    has(token: string | symbol): boolean {
        return this.bindings.has(token) || this.instances.has(token)
    }

    /**
     * 直接注册一个已存在的实例到容器中
     * @template T 实例类型
     * @param {string | symbol} token 服务标识符
     * @param {T} instance 要注册的实例
     */
    instance<T>(token: string | symbol, instance: T): void {
        this.instances.set(token, instance)
    }

    /**
     * 获取类的构造函数依赖列表
     * @private
     * @param {Constructor<any>} target 目标类
     * @returns {(string | symbol | Constructor<any>)[]} 依赖列表
     * @throws {Error} 当无法解析依赖且未使用@Inject装饰器时抛出错误
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

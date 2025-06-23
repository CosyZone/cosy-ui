import 'reflect-metadata'
import { INJECTABLE_TOKEN, INJECT_TOKEN, Constructor } from '../types'

/**
 * Injectable 装饰器 - 依赖注入系统的核心装饰器
 * 
 * 原理：
 * 1. 使用 reflect-metadata 在类上存储元数据，标记该类为可注入的服务
 * 2. 当容器解析这个类时，会检查这个元数据来确定如何实例化
 * 
 * 工作流程：
 * 1. 装饰器在类定义时执行
 * 2. 将 INJECTABLE_TOKEN 作为元数据键，true 作为值存储在类上
 * 3. 容器在实例化时会检查这个标记来确定是否允许注入
 * 
 * 使用示例：
 * ```typescript
 * @Injectable
 * class UserService {
 *   constructor(private database: DatabaseService) {}
 * }
 * ```
 * 
 * @param target 被装饰的类构造函数
 * @returns 被装饰的类构造函数
 */
export function Injectable<T extends Constructor>(target: T): T {
    Reflect.defineMetadata(INJECTABLE_TOKEN, true, target)
    return target
}

/**
 * Inject 装饰器 - 用于构造函数参数注入
 * 
 * 原理：
 * 1. 在参数级别存储依赖注入的元数据
 * 2. 使用参数索引作为键，将注入标记存储为值
 * 3. 容器在创建实例时会读取这些元数据来解析依赖
 * 
 * 工作流程：
 * 1. 装饰器在参数定义时执行
 * 2. 获取已存在的注入标记映射（如果有）
 * 3. 将新的注入标记添加到映射中
 * 4. 将更新后的映射存储回元数据
 * 
 * 使用示例：
 * ```typescript
 * class UserService {
 *   constructor(
 *     @Inject('DATABASE') private database: DatabaseService,
 *     @Inject('CONFIG') private config: ConfigService
 *   ) {}
 * }
 * ```
 * 
 * @param token 依赖注入的标识符
 * @returns 参数装饰器函数
 */
export function Inject(token: string | symbol) {
    return function (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {
        const existingTokens = Reflect.getMetadata(INJECT_TOKEN, target) || {}
        existingTokens[parameterIndex] = token
        Reflect.defineMetadata(INJECT_TOKEN, existingTokens, target)
    }
}

/**
 * AutoInject 装饰器 - 用于属性的延迟注入
 * 
 * 原理：
 * 1. 使用 Object.defineProperty 定义属性访问器
 * 2. 在首次访问属性时才从容器中解析依赖
 * 3. 实现了真正的延迟加载，避免循环依赖问题
 * 
 * 工作流程：
 * 1. 装饰器在属性定义时执行
 * 2. 创建属性的 getter 访问器
 * 3. getter 在首次调用时从容器中解析依赖
 * 4. 支持自定义注入标记或使用属性名作为默认标记
 * 
 * 优势：
 * 1. 延迟解析：只在实际需要时才解析依赖
 * 2. 避免循环依赖：因为是在运行时解析，可以打破循环依赖
 * 3. 更灵活的注入方式：不限于构造函数注入
 * 
 * 使用示例：
 * ```typescript
 * class UserController {
 *   @AutoInject()
 *   private userService: UserService;
 * 
 *   @AutoInject('CUSTOM_CONFIG')
 *   private config: ConfigService;
 * }
 * ```
 * 
 * @param token 可选的依赖注入标识符，默认使用属性名
 * @returns 属性装饰器函数
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

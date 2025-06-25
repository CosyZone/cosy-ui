import 'reflect-metadata'
import { Constructor, INJECTABLE_TOKEN, INJECT_TOKEN } from './types.js'

/**
 * 标记一个类可以被注入
 * 
 * @example
 * ```typescript
 * @Injectable()
 * class UserService {
 *   constructor(private database: Database) {}
 * }
 * ```
 */
export function Injectable(): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata(INJECTABLE_TOKEN, true, target)
    }
}

/**
 * 指定要注入的服务标识符
 * 
 * @param token 服务标识符
 * 
 * @example
 * ```typescript
 * class UserController {
 *   constructor(@Inject('UserService') private users: UserService) {}
 * }
 * ```
 */
export function Inject(token?: string | symbol | Constructor<any>): ParameterDecorator {
    return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
        const existingTokens = Reflect.getMetadata(INJECT_TOKEN, target) || {}
        existingTokens[parameterIndex] = token || Reflect.getMetadata('design:paramtypes', target)[parameterIndex]
        Reflect.defineMetadata(INJECT_TOKEN, existingTokens, target)
    }
}

/**
 * 用于属性的延迟注入
 * 
 * 原理：
 * 1. 使用 Object.defineProperty 定义属性访问器
 * 2. 在首次访问属性时才从容器中解析依赖
 * 3. 实现了真正的延迟加载，避免循环依赖问题
 * 
 * @example
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
 */
export function AutoInject(token?: string | symbol) {
    return function (target: any, propertyKey: string | symbol) {
        const injectToken = token || propertyKey

        Object.defineProperty(target, propertyKey, {
            get() {
                // 从默认容器实例中解析依赖
                const { container } = require('../index')
                return container.resolve(injectToken)
            },
            enumerable: true,
            configurable: true
        })
    }
} 

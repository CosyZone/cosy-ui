// 导入 reflect-metadata（必须在最前面）
import 'reflect-metadata'

// 核心模块导出
export * from './core'
export * from './container'
export * from './routing'
export * from './middleware'
export * from './http'
export * from './config'

// 类型导出
export type {
    Constructor,
    ClassDecorator,
    MethodDecorator,
    ParameterDecorator,
    ServiceBinding,
    RouteHandler,
    NextFunction,
    Awaitable,
    Optional,
    RequiredKeys
} from './types'

// 版本信息
export const VERSION = '0.1.0'

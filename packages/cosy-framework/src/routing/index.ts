export const ROUTING_MODULE = 'routing'

// 核心类
export { Router } from './router'
export { Route } from './route'
export { DefaultRouteCompiler } from './compiler'

// 装饰器
export {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Options,
    Head,
    Route as RouteDecorator,
    getControllerRoutes,
    getControllerPrefix,
    type RouteMetadata
} from './decorators'

// 类型
export type {
    RouteInterface,
    RouterInterface,
    RouteMatch,
    RouteGroupOptions,
    RouteCompiler,
    CompiledRoute,
    RouteMatchResult,
    MiddlewareHandler
} from '../types' 

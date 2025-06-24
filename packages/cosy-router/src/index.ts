// 导入 reflect-metadata（必须在最前面）
import 'reflect-metadata'

// 导出路由实现
export { Route } from './route'
export { Router } from './router'
export { DefaultRouteCompiler } from './compiler'
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

// 版本信息
export const VERSION = '0.1.0' 

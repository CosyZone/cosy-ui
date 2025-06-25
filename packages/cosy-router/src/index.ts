// 导入 reflect-metadata（必须在最前面）
import 'reflect-metadata'

// 导出路由实现
export { Route } from './route.js'
export { Router } from './router.js'
export { DefaultRouteCompiler } from './compiler.js'
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
} from './decorators.js'

// 版本信息
export const VERSION = '0.1.0' 

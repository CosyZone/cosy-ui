import 'reflect-metadata'
import { HttpMethod } from '../types'

// 元数据键
const ROUTES_METADATA = Symbol('routes')

export interface RouteMetadata {
    method: string | string[]
    path: string
    methodName: string
}

/**
 * 控制器装饰器
 */
export function Controller(prefix?: string) {
    return function <T extends new (...args: any[]) => any>(target: T) {
        Reflect.defineMetadata('controller:prefix', prefix || '', target)
        return target
    }
}

/**
 * GET 路由装饰器
 */
export function Get(path: string = '') {
    return createRouteDecorator(HttpMethod.GET, path)
}

/**
 * POST 路由装饰器
 */
export function Post(path: string = '') {
    return createRouteDecorator(HttpMethod.POST, path)
}

/**
 * PUT 路由装饰器
 */
export function Put(path: string = '') {
    return createRouteDecorator(HttpMethod.PUT, path)
}

/**
 * PATCH 路由装饰器
 */
export function Patch(path: string = '') {
    return createRouteDecorator(HttpMethod.PATCH, path)
}

/**
 * DELETE 路由装饰器
 */
export function Delete(path: string = '') {
    return createRouteDecorator(HttpMethod.DELETE, path)
}

/**
 * OPTIONS 路由装饰器
 */
export function Options(path: string = '') {
    return createRouteDecorator(HttpMethod.OPTIONS, path)
}

/**
 * HEAD 路由装饰器
 */
export function Head(path: string = '') {
    return createRouteDecorator(HttpMethod.HEAD, path)
}

/**
 * 匹配多个方法的路由装饰器
 */
export function Route(methods: string[], path: string = '') {
    return createRouteDecorator(methods, path)
}

/**
 * 创建路由装饰器的工厂函数
 */
function createRouteDecorator(method: string | string[], path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const routes: RouteMetadata[] = Reflect.getMetadata(ROUTES_METADATA, target.constructor) || []

        routes.push({
            method,
            path,
            methodName: propertyKey
        })

        Reflect.defineMetadata(ROUTES_METADATA, routes, target.constructor)
        return descriptor
    }
}

/**
 * 获取控制器的路由元数据
 */
export function getControllerRoutes(target: any): RouteMetadata[] {
    return Reflect.getMetadata(ROUTES_METADATA, target) || []
}

/**
 * 获取控制器前缀
 */
export function getControllerPrefix(target: any): string {
    return Reflect.getMetadata('controller:prefix', target) || ''
} 

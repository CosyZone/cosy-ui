import { IMiddleware } from '../middleware';
import { HttpMethod, RouteHandler, IRouteParams } from './types';
import { RoutePattern } from './constants';

/**
 * 路由配置接口
 */
export interface IRouteConfig {
    /**
     * 路由路径
     */
    path: string;

    /**
     * HTTP 方法
     */
    method: HttpMethod;

    /**
     * 处理函数
     */
    handler: RouteHandler;

    /**
     * 中间件列表
     */
    middlewares?: IMiddleware[];
}

/**
 * 路由接口
 */
export interface IRoute {
    /**
     * 获取路由配置
     */
    getConfig(): IRouteConfig;

    /**
     * 匹配请求路径
     * @param path 请求路径
     * @param method HTTP方法
     */
    matches(path: string, method: HttpMethod): boolean;

    /**
     * 提取路由参数
     * @param path 请求路径
     */
    extractParams(path: string): IRouteParams;
}

/**
 * 路由管理器接口
 */
export interface IRouteManager {
    /**
     * 注册路由
     * @param config 路由配置
     */
    register(config: IRouteConfig): void;

    /**
     * 查找匹配的路由
     * @param path 请求路径
     * @param method HTTP方法
     */
    find(path: string, method: HttpMethod): IRoute | null;

    /**
     * 获取所有路由
     */
    getRoutes(): IRoute[];
}

/**
 * 路由编译结果
 */
export interface IRouteCompileResult {
    /**
     * 路由模式
     */
    pattern: RoutePattern;

    /**
     * 参数名列表
     */
    paramNames: string[];

    /**
     * 正则表达式
     */
    regex: RegExp;
}

/**
 * 路由编译器接口
 */
export interface IRouteCompiler {
    /**
     * 编译路由路径
     * @param path 路由路径
     */
    compile(path: string): IRouteCompileResult;

    /**
     * 解析路由参数
     * @param path 请求路径
     * @param result 编译结果
     */
    parse(path: string, result: IRouteCompileResult): IRouteParams;
}


// 构造函数类型
export type Constructor<T = any> = new (...args: any[]) => T;

// 服务标识符类型
export type ServiceIdentifier = string | symbol;

// 中间件处理函数类型
export type MiddlewareHandler = (ctx: any, next: () => Promise<void>) => Promise<void>;

// 路由处理函数类型
export type RouteHandler = (ctx: any) => Promise<any>;

// 配置回调函数类型
import { Application } from './application';
export type ConfigureCallback = (app: Application) => void; 

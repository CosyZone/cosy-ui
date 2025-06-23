import { HttpContext } from '../http/types';

// 路由处理函数类型
export type RouteHandler = (ctx: HttpContext) => Promise<any>;

// HTTP方法枚举
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS'
}

// 路由项接口
interface RouteEntry {
    method: HttpMethod;
    path: string;
    pattern: RegExp;
    paramNames: string[];
    handler: RouteHandler;
}

export class Router {
    private routes: RouteEntry[] = [];

    // 注册路由
    register(method: HttpMethod, path: string, handler: RouteHandler): this {
        // 将路径转换为正则表达式
        const paramNames: string[] = [];
        const pattern = this.pathToPattern(path, paramNames);

        this.routes.push({
            method,
            path,
            pattern,
            paramNames,
            handler
        });

        return this;
    }

    // 便捷方法
    get(path: string, handler: RouteHandler): this {
        return this.register(HttpMethod.GET, path, handler);
    }

    post(path: string, handler: RouteHandler): this {
        return this.register(HttpMethod.POST, path, handler);
    }

    put(path: string, handler: RouteHandler): this {
        return this.register(HttpMethod.PUT, path, handler);
    }

    delete(path: string, handler: RouteHandler): this {
        return this.register(HttpMethod.DELETE, path, handler);
    }

    patch(path: string, handler: RouteHandler): this {
        return this.register(HttpMethod.PATCH, path, handler);
    }

    // 路由匹配
    match(method: string, path: string): { handler: RouteHandler; params: Record<string, string> } | null {
        for (const route of this.routes) {
            if (route.method !== method) {
                continue;
            }

            const matches = path.match(route.pattern);
            if (!matches) {
                continue;
            }

            // 提取参数
            const params: Record<string, string> = {};
            route.paramNames.forEach((name, index) => {
                params[name] = matches[index + 1];
            });

            return {
                handler: route.handler,
                params
            };
        }

        return null;
    }

    // 控制器装饰器工厂
    controller(prefix: string = ''): ClassDecorator {
        return (target: any) => {
            // 获取原型上的所有方法
            const prototype = target.prototype;
            const methodNames = Object.getOwnPropertyNames(prototype)
                .filter(name => name !== 'constructor' && typeof prototype[name] === 'function');

            // 处理每个路由方法
            methodNames.forEach(methodName => {
                const routeMetadata = Reflect.getMetadata('route', prototype, methodName);
                if (routeMetadata) {
                    const { method, path } = routeMetadata;
                    const fullPath = prefix + path;
                    const handler = prototype[methodName].bind(prototype);
                    this.register(method, fullPath, handler);
                }
            });
        };
    }

    // 路由方法装饰器
    route(method: HttpMethod, path: string): MethodDecorator {
        return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
            Reflect.defineMetadata('route', { method, path }, target, propertyKey);
            return descriptor;
        };
    }

    // 辅助方法：将路径转换为正则表达式
    private pathToPattern(path: string, paramNames: string[]): RegExp {
        const pattern = path
            .replace(/\//g, '\\/') // 转义斜杠
            .replace(/:([a-zA-Z][a-zA-Z0-9]*)/g, (_, paramName) => {
                paramNames.push(paramName);
                return '([^/]+)';
            }); // 替换参数为捕获组

        return new RegExp(`^${pattern}$`);
    }
}

// 导出装饰器工厂函数
export function createRouteDecorators(router: Router) {
    return {
        controller: (prefix?: string) => router.controller(prefix),
        get: (path: string) => router.route(HttpMethod.GET, path),
        post: (path: string) => router.route(HttpMethod.POST, path),
        put: (path: string) => router.route(HttpMethod.PUT, path),
        delete: (path: string) => router.route(HttpMethod.DELETE, path),
        patch: (path: string) => router.route(HttpMethod.PATCH, path)
    };
} 

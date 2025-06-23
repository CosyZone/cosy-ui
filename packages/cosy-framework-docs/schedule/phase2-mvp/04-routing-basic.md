# MVP 路由基础实现

在这个步骤中，我们将实现框架的路由系统。路由系统负责将HTTP请求映射到相应的处理函数，并支持参数提取和控制器模式。

## 路由系统设计

### 1. 核心功能

- 路由注册
- 路由参数支持
- HTTP方法支持
- 路由匹配
- 控制器支持

### 2. 类型定义

```typescript
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
```

## 路由器实现

### 1. 基本路由注册

```typescript
export class Router {
    private routes: RouteEntry[] = [];

    register(method: HttpMethod, path: string, handler: RouteHandler): this {
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
    // ... 其他HTTP方法
}
```

### 2. 路由参数支持

```typescript
private pathToPattern(path: string, paramNames: string[]): RegExp {
    const pattern = path
        .replace(/\//g, '\\/') // 转义斜杠
        .replace(/:([a-zA-Z][a-zA-Z0-9]*)/g, (_, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)';
        }); // 替换参数为捕获组

    return new RegExp(`^${pattern}$`);
}
```

### 3. 路由匹配

```typescript
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
```

### 4. 控制器支持

```typescript
// 控制器装饰器工厂
controller(prefix: string = ''): ClassDecorator {
    return (target: any) => {
        const prototype = target.prototype;
        const methodNames = Object.getOwnPropertyNames(prototype)
            .filter(name => name !== 'constructor' && typeof prototype[name] === 'function');

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
```

## 使用示例

### 1. 基本路由

```typescript
const app = new Application();

app.get('/users', async (ctx) => {
    return { users: [] };
});

app.post('/users', async (ctx) => {
    const user = ctx.request.body;
    return { id: 1, ...user };
});
```

### 2. 路由参数

```typescript
app.get('/users/:id', async (ctx) => {
    const { id } = ctx.request.params;
    return { id, name: 'John' };
});

app.get('/users/:userId/posts/:postId', async (ctx) => {
    const { userId, postId } = ctx.request.params;
    return { userId, postId, title: 'Post Title' };
});
```

### 3. 控制器模式

```typescript
const router = app.getRouter();
const { controller, get, post } = createRouteDecorators(router);

@controller('/api/users')
class UserController {
    @get('/')
    async getUsers() {
        return { users: [] };
    }

    @get('/:id')
    async getUser(ctx: HttpContext) {
        const { id } = ctx.request.params;
        return { id, name: 'John' };
    }

    @post('/')
    async createUser(ctx: HttpContext) {
        const user = ctx.request.body;
        return { id: 1, ...user };
    }
}

// 实例化控制器
new UserController();
```

## 测试用例

```typescript
describe('Router', () => {
    let router: Router;

    beforeEach(() => {
        router = new Router();
    });

    it('should register a route', () => {
        const handler = async () => ({ message: 'test' });
        router.register(HttpMethod.GET, '/test', handler);

        const match = router.match('GET', '/test');
        expect(match).toBeTruthy();
        expect(match?.handler).toBe(handler);
    });

    it('should match route with parameters', () => {
        const handler = async () => ({ message: 'test' });
        router.get('/users/:id', handler);

        const match = router.match('GET', '/users/123');
        expect(match).toBeTruthy();
        expect(match?.params).toEqual({ id: '123' });
    });

    // ... 更多测试用例
});
```

## 关键点说明

1. **简化的实现**：
   - 使用正则表达式进行路由匹配
   - 支持基本的路由参数
   - 提供控制器模式支持

2. **保留的核心功能**：
   - 路由注册和匹配
   - 参数提取
   - HTTP方法支持
   - 控制器装饰器

3. **验证要点**：
   - 路由注册是否正确
   - 参数提取是否准确
   - 控制器模式是否工作
   - HTTP方法是否正确匹配

## 下一步

在实现了基本的路由系统后，我们将在 [示例应用](./05-example-basic.md) 中创建一个完整的API示例，展示如何使用这些功能构建实际应用。

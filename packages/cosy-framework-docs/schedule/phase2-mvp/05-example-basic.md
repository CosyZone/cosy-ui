# MVP 示例应用

在这个步骤中，我们将创建一个简单的Todo API示例，展示如何使用框架的各个功能构建实际应用。

## 项目结构

```
src/
├── controllers/
│   └── todo-controller.ts
├── services/
│   └── todo-service.ts
├── middleware/
│   └── auth-middleware.ts
└── app.ts
```

## 实现步骤

### 1. Todo服务

创建 `src/services/todo-service.ts`：

```typescript
// 定义Todo类型
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// Todo服务实现
export class TodoService {
    private todos: Todo[] = [];
    private nextId: number = 1;

    // 获取所有Todo
    async getAll(): Promise<Todo[]> {
        return this.todos;
    }

    // 获取单个Todo
    async getById(id: number): Promise<Todo | null> {
        return this.todos.find(todo => todo.id === id) || null;
    }

    // 创建Todo
    async create(title: string): Promise<Todo> {
        const todo: Todo = {
            id: this.nextId++,
            title,
            completed: false
        };
        this.todos.push(todo);
        return todo;
    }

    // 更新Todo
    async update(id: number, data: Partial<Todo>): Promise<Todo | null> {
        const todo = await this.getById(id);
        if (!todo) {
            return null;
        }

        Object.assign(todo, data);
        return todo;
    }

    // 删除Todo
    async delete(id: number): Promise<boolean> {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) {
            return false;
        }

        this.todos.splice(index, 1);
        return true;
    }
}
```

### 2. 认证中间件

创建 `src/middleware/auth-middleware.ts`：

```typescript
import { HttpContext } from '@coffic/cosy-framework-mvp';

export async function authMiddleware(ctx: HttpContext, next: () => Promise<void>) {
    const apiKey = ctx.request.headers['x-api-key'];
    
    if (!apiKey || apiKey !== 'test-key') {
        ctx.response.status = 401;
        ctx.response.json({ error: 'Unauthorized' });
        return;
    }

    await next();
}
```

### 3. Todo控制器

创建 `src/controllers/todo-controller.ts`：

```typescript
import { HttpContext } from '@coffic/cosy-framework-mvp';
import { TodoService } from '../services/todo-service';

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    @get('/')
    async getAllTodos(ctx: HttpContext) {
        const todos = await this.todoService.getAll();
        return { todos };
    }

    @get('/:id')
    async getTodo(ctx: HttpContext) {
        const id = parseInt(ctx.request.params.id);
        const todo = await this.todoService.getById(id);
        
        if (!todo) {
            ctx.response.status = 404;
            return { error: 'Todo not found' };
        }

        return { todo };
    }

    @post('/')
    async createTodo(ctx: HttpContext) {
        const { title } = ctx.request.body;
        
        if (!title) {
            ctx.response.status = 400;
            return { error: 'Title is required' };
        }

        const todo = await this.todoService.create(title);
        ctx.response.status = 201;
        return { todo };
    }

    @put('/:id')
    async updateTodo(ctx: HttpContext) {
        const id = parseInt(ctx.request.params.id);
        const updates = ctx.request.body;
        
        const todo = await this.todoService.update(id, updates);
        
        if (!todo) {
            ctx.response.status = 404;
            return { error: 'Todo not found' };
        }

        return { todo };
    }

    @delete('/:id')
    async deleteTodo(ctx: HttpContext) {
        const id = parseInt(ctx.request.params.id);
        const deleted = await this.todoService.delete(id);
        
        if (!deleted) {
            ctx.response.status = 404;
            return { error: 'Todo not found' };
        }

        ctx.response.status = 204;
        return null;
    }
}
```

### 4. 应用入口

创建 `src/app.ts`：

```typescript
import { Application } from '@coffic/cosy-framework-mvp';
import { TodoController } from './controllers/todo-controller';
import { authMiddleware } from './middleware/auth-middleware';

async function bootstrap() {
    const app = new Application();
    
    // 注册中间件
    app.use(async (ctx, next) => {
        console.log(`${ctx.request.method} ${ctx.request.url}`);
        await next();
    });

    app.use(authMiddleware);

    // 注册控制器
    const router = app.getRouter();
    const { controller } = createRouteDecorators(router);

    @controller('/api/todos')
    class TodoControllerImpl extends TodoController {}

    new TodoControllerImpl();

    // 启动应用
    await app.start(3000);
    console.log('Server started on http://localhost:3000');
}

bootstrap().catch(console.error);
```

## 使用示例

### 1. 创建Todo

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test-key" \
  -d '{"title": "Learn Cosy Framework"}'
```

### 2. 获取所有Todo

```bash
curl http://localhost:3000/api/todos \
  -H "X-API-Key: test-key"
```

### 3. 获取单个Todo

```bash
curl http://localhost:3000/api/todos/1 \
  -H "X-API-Key: test-key"
```

### 4. 更新Todo

```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test-key" \
  -d '{"completed": true}'
```

### 5. 删除Todo

```bash
curl -X DELETE http://localhost:3000/api/todos/1 \
  -H "X-API-Key: test-key"
```

## 关键点说明

1. **分层架构**：
   - 控制器处理HTTP请求和响应
   - 服务层处理业务逻辑
   - 中间件处理横切关注点

2. **功能展示**：
   - 路由参数提取
   - 请求体解析
   - 状态码设置
   - 错误处理
   - 中间件链
   - 控制器装饰器

3. **最佳实践**：
   - 类型定义
   - 错误处理
   - 状态码使用
   - 响应格式
   - 中间件组合

## 下一步

这个示例展示了框架的基本功能。在实际应用中，你可能需要：

1. 添加数据库支持
2. 实现用户认证
3. 添加请求验证
4. 实现日志系统
5. 添加测试用例

这些功能将在框架的完整实现中提供。

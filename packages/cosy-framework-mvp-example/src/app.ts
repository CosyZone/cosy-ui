import { Application, createRouteDecorators } from '@coffic/cosy-framework-mvp';
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
    const { controller, get, post, put, delete: del } = createRouteDecorators(router);

    @controller('/api/todos')
    class TodoControllerImpl extends TodoController {
        @get('/')
        getAllTodos = super.getAllTodos;

        @get('/:id')
        getTodo = super.getTodo;

        @post('/')
        createTodo = super.createTodo;

        @put('/:id')
        updateTodo = super.updateTodo;

        @del('/:id')
        deleteTodo = super.deleteTodo;
    }

    new TodoControllerImpl();

    // 启动应用
    await app.start(3000);
    console.log('Server started on http://localhost:3000');
}

bootstrap().catch(console.error); 

import { HttpContext } from '@coffic/cosy-framework-mvp';
import { TodoService } from '../services/todo-service';

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    async getAllTodos(ctx: HttpContext) {
        const todos = await this.todoService.getAll();
        return { todos };
    }

    async getTodo(ctx: HttpContext) {
        const id = parseInt(ctx.request.params.id);
        const todo = await this.todoService.getById(id);

        if (!todo) {
            ctx.response.status = 404;
            return { error: 'Todo not found' };
        }

        return { todo };
    }

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

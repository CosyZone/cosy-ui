// 定义Todo类型
export interface Todo {
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

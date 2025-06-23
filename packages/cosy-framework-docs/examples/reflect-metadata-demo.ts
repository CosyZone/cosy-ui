import 'reflect-metadata';

// 1. 基础元数据操作
class Example {
    @Reflect.metadata('role', 'admin')
    adminMethod() { }

    @Reflect.metadata('role', 'user')
    userMethod() { }
}

// 读取元数据
const adminRole = Reflect.getMetadata('role', Example.prototype, 'adminMethod');
const userRole = Reflect.getMetadata('role', Example.prototype, 'userMethod');

console.log('Admin role:', adminRole); // 'admin'
console.log('User role:', userRole);   // 'user'

// 2. 自动获取类型信息
class DatabaseService {
    connect() {
        console.log('Database connected');
    }
}

class UserService {
    // TypeScript 会自动生成参数类型元数据
    constructor(private db: DatabaseService) { }

    getUsers() {
        this.db.connect();
        return ['user1', 'user2'];
    }
}

// 3. 简单的依赖注入容器演示
class SimpleContainer {
    private services = new Map();

    register<T>(token: string, implementation: new (...args: any[]) => T) {
        this.services.set(token, implementation);
    }

    resolve<T>(token: string): T {
        const implementation = this.services.get(token);
        if (!implementation) {
            throw new Error(`Service ${token} not found`);
        }

        // 获取构造函数参数类型（这就是 reflect-metadata 的作用！）
        const paramTypes = Reflect.getMetadata('design:paramtypes', implementation) || [];

        console.log('Parameter types:', paramTypes.map((type: any) => type.name));

        // 递归解析依赖
        const dependencies = paramTypes.map((type: any) => {
            // 简化版：直接使用类型名作为 token
            return this.resolve(type.name);
        });

        // 创建实例
        return new implementation(...dependencies);
    }
}

// 使用演示
const container = new SimpleContainer();
container.register('DatabaseService', DatabaseService);
container.register('UserService', UserService);

const userService = container.resolve<UserService>('UserService');
console.log('Users:', userService.getUsers());

// 4. 装饰器与元数据结合
function Component(name: string) {
    return function (target: any) {
        Reflect.defineMetadata('component:name', name, target);
        Reflect.defineMetadata('component:dependencies',
            Reflect.getMetadata('design:paramtypes', target) || [], target);
    };
}

@Component('UserController')
class UserController {
    constructor(private userService: UserService) { }
}

// 读取组件信息
const componentName = Reflect.getMetadata('component:name', UserController);
const dependencies = Reflect.getMetadata('component:dependencies', UserController);

console.log('Component name:', componentName);
console.log('Dependencies:', dependencies.map((dep: any) => dep.name)); 

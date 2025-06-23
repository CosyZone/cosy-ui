#!/usr/bin/env tsx
/**
 * reflect-metadata 教程演示
 * 
 * 运行方式：
 * npx tsx examples/reflect-metadata-tutorial.ts
 */

import 'reflect-metadata';

console.log('🚀 reflect-metadata 教程开始\n');

// ============================================================================
// 第一部分：基础元数据操作
// ============================================================================
console.log('📘 第一部分：基础元数据操作');

class BasicExample {
    name: string = 'example';
}

// 定义元数据
Reflect.defineMetadata('custom:info', 'This is a basic example', BasicExample);
Reflect.defineMetadata('custom:version', '1.0.0', BasicExample);

// 读取元数据
const info = Reflect.getMetadata('custom:info', BasicExample);
const version = Reflect.getMetadata('custom:version', BasicExample);

console.log('✅ 基础元数据:', { info, version });

// ============================================================================
// 第二部分：方法和属性元数据
// ============================================================================
console.log('\n📘 第二部分：方法和属性元数据');

class MetadataExample {
    @Reflect.metadata('role', 'admin')
    adminMethod() {
        return 'admin action';
    }

    @Reflect.metadata('role', 'user')
    @Reflect.metadata('permission', 'read')
    userMethod() {
        return 'user action';
    }
}

const adminRole = Reflect.getMetadata('role', MetadataExample.prototype, 'adminMethod');
const userRole = Reflect.getMetadata('role', MetadataExample.prototype, 'userMethod');
const userPermission = Reflect.getMetadata('permission', MetadataExample.prototype, 'userMethod');

console.log('✅ 方法元数据:', { adminRole, userRole, userPermission });

// ============================================================================
// 第三部分：自动类型信息（核心特性）
// ============================================================================
console.log('\n📘 第三部分：自动类型信息（核心特性）');

class DatabaseService {
    connect() {
        return 'Connected to database';
    }
}

class LoggerService {
    log(message: string) {
        console.log(`[LOG] ${message}`);
    }
}

class UserService {
    constructor(
        private db: DatabaseService,
        private logger: LoggerService
    ) { }

    getUsers() {
        this.db.connect();
        this.logger.log('Getting users');
        return ['user1', 'user2'];
    }
}

// TypeScript 自动生成的类型信息
const paramTypes = Reflect.getMetadata('design:paramtypes', UserService);
const paramNames = paramTypes?.map((type: any) => type.name) || [];

console.log('✅ 自动类型信息:', paramNames); // ['DatabaseService', 'LoggerService']

// ============================================================================
// 第四部分：简单的依赖注入容器
// ============================================================================
console.log('\n📘 第四部分：简单的依赖注入容器');

class SimpleContainer {
    private bindings = new Map<string, any>();
    private instances = new Map<string, any>();

    /**
     * 注册服务
     */
    bind<T>(token: string, implementation: new (...args: any[]) => T, singleton: boolean = false) {
        this.bindings.set(token, { implementation, singleton });
        console.log(`📦 注册服务: ${token} ${singleton ? '(单例)' : '(每次新建)'}`);
    }

    /**
     * 解析服务
     */
    resolve<T>(token: string): T {
        console.log(`🔍 正在解析: ${token}`);

        // 检查单例缓存
        if (this.instances.has(token)) {
            console.log(`💾 从缓存获取: ${token}`);
            return this.instances.get(token);
        }

        const binding = this.bindings.get(token);
        if (!binding) {
            throw new Error(`❌ 找不到服务: ${token}`);
        }

        const { implementation: Implementation, singleton } = binding;

        // 获取构造函数参数类型（关键！）
        const paramTypes = Reflect.getMetadata('design:paramtypes', Implementation) || [];
        console.log(`🔧 ${token} 需要依赖:`, paramTypes.map((t: any) => t.name));

        // 递归解析依赖
        const dependencies = paramTypes.map((ParamType: any) => {
            return this.resolve(ParamType.name);
        });

        // 创建实例
        const instance = new Implementation(...dependencies);
        console.log(`✨ 创建实例: ${token}`);

        // 缓存单例
        if (singleton) {
            this.instances.set(token, instance);
        }

        return instance;
    }
}

// 使用容器
const container = new SimpleContainer();

// 注册服务
container.bind('DatabaseService', DatabaseService, true);  // 单例
container.bind('LoggerService', LoggerService, true);      // 单例  
container.bind('UserService', UserService);               // 每次新建

// 解析服务
console.log('\n🎯 开始解析 UserService...');
const userService = container.resolve<UserService>('UserService');

console.log('\n🎉 测试服务功能:');
const users = userService.getUsers();
console.log('获取到的用户:', users);

// 验证单例行为
console.log('\n🔍 验证单例行为:');
const userService2 = container.resolve<UserService>('UserService');
const db1 = container.resolve<DatabaseService>('DatabaseService');
const db2 = container.resolve<DatabaseService>('DatabaseService');

console.log('UserService 是不同实例:', userService !== userService2);
console.log('DatabaseService 是相同实例:', db1 === db2);

// ============================================================================
// 第五部分：装饰器与依赖注入
// ============================================================================
console.log('\n📘 第五部分：装饰器与依赖注入');

// 定义装饰器
function Injectable(target: any) {
    Reflect.defineMetadata('injectable', true, target);
    console.log(`💉 标记为可注入: ${target.name}`);
}

function Inject(token: string) {
    return function (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {
        const existingTokens = Reflect.getMetadata('inject-tokens', target) || [];
        existingTokens[parameterIndex] = token;
        Reflect.defineMetadata('inject-tokens', existingTokens, target);
        console.log(`🎯 标记注入点: ${target.name} 参数 ${parameterIndex} -> ${token}`);
    };
}

// 使用装饰器
@Injectable
class AdvancedUserService {
    constructor(
        @Inject('DatabaseService') private db: DatabaseService,
        @Inject('LoggerService') private logger: LoggerService
    ) { }

    createUser(name: string) {
        this.logger.log(`Creating user: ${name}`);
        // 模拟数据库操作
        return { id: 1, name, createdAt: new Date() };
    }
}

// 高级容器实现
class AdvancedContainer extends SimpleContainer {
    resolve<T>(token: string): T {
        const binding = (this as any).bindings.get(token);
        if (!binding) {
            throw new Error(`❌ 找不到服务: ${token}`);
        }

        const { implementation: Implementation } = binding;

        // 检查是否可注入
        const injectable = Reflect.getMetadata('injectable', Implementation);
        if (!injectable) {
            console.log(`⚠️  ${token} 未标记为 @Injectable`);
        }

        // 获取注入令牌
        const injectTokens = Reflect.getMetadata('inject-tokens', Implementation) || [];
        const paramTypes = Reflect.getMetadata('design:paramtypes', Implementation) || [];

        // 解析依赖（优先使用 @Inject 指定的令牌）
        const dependencies = paramTypes.map((ParamType: any, index: number) => {
            const token = injectTokens[index] || ParamType.name;
            return super.resolve(token);
        });

        return new Implementation(...dependencies);
    }
}

// 测试高级容器
console.log('\n🚀 测试高级容器:');
const advancedContainer = new AdvancedContainer();
advancedContainer.bind('DatabaseService', DatabaseService, true);
advancedContainer.bind('LoggerService', LoggerService, true);
advancedContainer.bind('AdvancedUserService', AdvancedUserService);

const advancedUserService = advancedContainer.resolve<AdvancedUserService>('AdvancedUserService');
const newUser = advancedUserService.createUser('张三');

console.log('\n🎉 创建的用户:', newUser);

// ============================================================================
// 总结
// ============================================================================
console.log('\n🎓 总结:');
console.log('✅ reflect-metadata 让我们能够:');
console.log('   1. 在运行时保留 TypeScript 类型信息');
console.log('   2. 通过装饰器存储和读取元数据');
console.log('   3. 实现自动依赖注入和解析');
console.log('   4. 构建现代化的 TypeScript 框架');
console.log('\n🚀 这就是现代框架（如 Angular、NestJS）的基础原理！'); 

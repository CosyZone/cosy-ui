#!/usr/bin/env tsx
/**
 * reflect-metadata 简化教程演示
 * 这个版本避免了装饰器语法问题，专注于核心概念
 * 
 * 运行方式：
 * npx tsx examples/reflect-metadata-simple.ts
 */

import 'reflect-metadata';

console.log('🚀 reflect-metadata 核心概念演示\n');

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
// 第二部分：自动类型信息（核心特性）
// ============================================================================
console.log('\n📘 第二部分：自动类型信息（核心特性）');

class DatabaseService {
    connect() {
        console.log('Connected to database');
        return 'database connection';
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

// 手动添加类型元数据（模拟 TypeScript 编译器的行为）
Reflect.defineMetadata('design:paramtypes', [DatabaseService, LoggerService], UserService);

// TypeScript 自动生成的类型信息
const paramTypes = Reflect.getMetadata('design:paramtypes', UserService);
const paramNames = paramTypes?.map((type: any) => type.name) || [];

console.log('✅ 自动类型信息:', paramNames); // ['DatabaseService', 'LoggerService']

// ============================================================================
// 第三部分：依赖注入容器实现
// ============================================================================
console.log('\n📘 第三部分：依赖注入容器实现');

class Container {
    protected bindings = new Map<string, any>();
    protected instances = new Map<string, any>();

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

        // 获取构造函数参数类型（这是关键！）
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

// ============================================================================
// 第四部分：容器使用演示
// ============================================================================
console.log('\n📘 第四部分：容器使用演示');

// 创建容器
const container = new Container();

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
// 第五部分：装饰器原理模拟
// ============================================================================
console.log('\n📘 第五部分：装饰器原理模拟（手动实现）');

// 模拟 @Injectable 装饰器的效果
function markAsInjectable(target: any) {
    Reflect.defineMetadata('injectable', true, target);
    console.log(`💉 标记为可注入: ${target.name}`);
}

// 模拟 @Inject 装饰器的效果
function markInjectToken(target: any, parameterIndex: number, token: string) {
    const existingTokens = Reflect.getMetadata('inject-tokens', target) || [];
    existingTokens[parameterIndex] = token;
    Reflect.defineMetadata('inject-tokens', existingTokens, target);
    console.log(`🎯 标记注入点: ${target.name} 参数 ${parameterIndex} -> ${token}`);
}

// 定义一个使用特殊注入令牌的服务
class AdvancedUserService {
    constructor(
        private db: DatabaseService,
        private logger: LoggerService
    ) { }

    createUser(name: string) {
        this.logger.log(`Creating user: ${name}`);
        // 模拟数据库操作
        return { id: 1, name, createdAt: new Date() };
    }
}

// 手动添加元数据（模拟装饰器效果）
Reflect.defineMetadata('design:paramtypes', [DatabaseService, LoggerService], AdvancedUserService);
markAsInjectable(AdvancedUserService);
markInjectToken(AdvancedUserService, 0, 'DatabaseService');
markInjectToken(AdvancedUserService, 1, 'LoggerService');

// 高级容器（支持装饰器元数据）
class AdvancedContainer extends Container {
    override resolve<T>(token: string): T {
        const binding = this.bindings.get(token);
        if (!binding) {
            throw new Error(`❌ 找不到服务: ${token}`);
        }

        const { implementation: Implementation } = binding;

        // 检查是否可注入
        const injectable = Reflect.getMetadata('injectable', Implementation);
        if (injectable) {
            console.log(`✅ ${token} 已标记为可注入`);
        } else {
            console.log(`⚠️  ${token} 未标记为 @Injectable，使用默认行为`);
        }

        // 获取注入令牌
        const injectTokens = Reflect.getMetadata('inject-tokens', Implementation) || [];
        const paramTypes = Reflect.getMetadata('design:paramtypes', Implementation) || [];

        console.log(`🔧 ${token} 注入令牌:`, injectTokens);

        // 解析依赖（优先使用指定的令牌）
        const dependencies = paramTypes.map((ParamType: any, index: number) => {
            const dependencyToken = injectTokens[index] || ParamType.name;
            console.log(`   -> 参数 ${index}: 使用令牌 "${dependencyToken}"`);
            return super.resolve(dependencyToken);
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
console.log('✅ reflect-metadata 的核心价值:');
console.log('   1. 在运行时保留 TypeScript 类型信息');
console.log('   2. 为装饰器提供数据存储能力');
console.log('   3. 实现自动依赖发现和注入');
console.log('   4. 支持现代框架的优雅语法');
console.log('\n💡 关键概念:');
console.log('   - design:paramtypes: 构造函数参数类型');
console.log('   - 元数据存储: Reflect.defineMetadata');
console.log('   - 元数据读取: Reflect.getMetadata');
console.log('   - 递归依赖解析: 容器自动创建依赖链');
console.log('\n🚀 这就是现代 TypeScript 框架的基础原理！'); 

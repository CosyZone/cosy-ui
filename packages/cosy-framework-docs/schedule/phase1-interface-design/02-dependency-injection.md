# 依赖注入系统设计

## 学习目标

完成本节后，你将能够：
1. 理解依赖注入的核心概念和原理
2. 设计基本的依赖注入接口
3. 实现服务容器的基础功能
4. 在 cosy-framework-design 中完成依赖注入模块的接口设计

## 1. 理解依赖注入

### 1.1 基本概念

依赖注入（DI）是一种设计模式，它通过控制反转（IoC）来实现组件之间的解耦。

**动手实践 1**：
在 `src/container/types.ts` 中定义基本类型：

```typescript
/**
 * 服务标识符类型
 */
export type ServiceToken = string | symbol | Constructor;

/**
 * 构造函数类型
 */
export type Constructor<T = any> = new (...args: any[]) => T;
```

### 1.2 服务生命周期

服务实例的生命周期类型：

```typescript
// src/container/constants.ts
export enum LifecycleEnum {
  /**
   * 每次解析都创建新实例
   */
  TRANSIENT = 'transient',
  
  /**
   * 在容器中只有一个实例
   */
  SINGLETON = 'singleton',
  
  /**
   * 在特定作用域内共享实例
   */
  SCOPED = 'scoped'
}
```

**动手实践 2**：
1. 创建上述枚举定义
2. 添加相应的类型定义
3. 在 index.ts 中导出

## 2. 设计核心接口

### 2.1 容器接口

在 `src/container/interfaces.ts` 中定义容器接口：

```typescript
/**
 * 服务容器接口
 * @interface IContainer
 */
export interface IContainer {
  /**
   * 注册服务
   * @param token 服务标识符
   * @param provider 服务提供者
   */
  register(token: ServiceToken, provider: ServiceProvider): void;

  /**
   * 解析服务
   * @param token 服务标识符
   */
  resolve<T>(token: ServiceToken): T;
}
```

**动手实践 3**：
1. 创建容器接口
2. 添加必要的方法定义
3. 编写完整的类型注释

### 2.2 服务提供者接口

```typescript
/**
 * 服务提供者配置
 */
export interface IServiceProvider<T = any> {
  /**
   * 使用类作为提供者
   */
  useClass?: Constructor<T>;
  
  /**
   * 使用工厂函数作为提供者
   */
  useFactory?: (...args: any[]) => T;
  
  /**
   * 使用值作为提供者
   */
  useValue?: T;
  
  /**
   * 服务生命周期
   */
  lifecycle?: LifecycleEnum;
}
```

**动手实践 4**：
1. 创建提供者接口
2. 实现不同的提供者类型
3. 添加生命周期支持

## 3. 实现装饰器类型

### 3.1 Injectable 装饰器

在 `src/container/decorators.ts` 中定义装饰器类型：

```typescript
/**
 * 服务注入选项
 */
export interface IInjectableOptions {
  /**
   * 服务生命周期
   */
  lifecycle?: LifecycleEnum;
}

/**
 * Injectable 装饰器类型
 */
export type InjectableDecorator = (options?: IInjectableOptions) => ClassDecorator;
```

**动手实践 5**：
1. 创建装饰器类型定义
2. 添加配置选项接口
3. 导出所有类型定义

### 3.2 Inject 装饰器

```typescript
/**
 * Inject 装饰器选项
 */
export interface IInjectOptions {
  /**
   * 服务标识符
   */
  token?: ServiceToken;
}

/**
 * 参数注入装饰器类型
 */
export type InjectDecorator = (options?: IInjectOptions) => ParameterDecorator;
```

**动手实践 6**：
1. 创建注入装饰器类型
2. 添加参数装饰器支持
3. 完善类型定义

## 4. 设计辅助类型

### 4.1 反射元数据类型

```typescript
/**
 * 依赖项元数据
 */
export interface IDependencyMetadata {
  /**
   * 参数索引
   */
  index: number;
  
  /**
   * 服务标识符
   */
  token: ServiceToken;
}

/**
 * 服务元数据
 */
export interface IServiceMetadata {
  /**
   * 生命周期
   */
  lifecycle: LifecycleEnum;
  
  /**
   * 依赖项列表
   */
  dependencies: IDependencyMetadata[];
}
```

**动手实践 7**：
1. 创建元数据类型定义
2. 实现依赖项描述
3. 添加服务描述支持

## 5. 集成示例

### 5.1 基本使用示例

```typescript
// 定义服务接口
interface IUserService {
  getUser(id: number): Promise<User>;
}

// 使用装饰器注册服务
@Injectable({ lifecycle: LifecycleEnum.SINGLETON })
class UserService implements IUserService {
  constructor(
    @Inject() private database: Database,
    @Inject('CONFIG') private config: Config
  ) {}

  async getUser(id: number) {
    return this.database.query('users', id);
  }
}
```

**动手实践 8**：
1. 创建示例服务接口
2. 实现服务类
3. 应用装饰器

### 5.2 容器使用示例

```typescript
// 创建容器实例
const container = new Container();

// 注册服务
container.register(Database, {
  useClass: DatabaseImpl,
  lifecycle: LifecycleEnum.SINGLETON
});

container.register('CONFIG', {
  useValue: {
    host: 'localhost',
    port: 3306
  }
});

// 注册服务类
container.register(UserService, {
  useClass: UserService
});

// 解析服务
const userService = container.resolve<UserService>(UserService);
```

**动手实践 9**：
1. 编写完整的使用示例
2. 测试不同的注册方式
3. 验证依赖解析

## 6. 导出模块

在 `src/container/index.ts` 中导出所有类型：

```typescript
export * from './interfaces';
export * from './types';
export * from './constants';
export * from './decorators';
```

**动手实践 10**：
1. 创建模块导出文件
2. 确保所有类型都被导出
3. 验证模块的完整性

## 下一步

完成本节后，你应该已经：
1. 在 cosy-framework-design 项目中创建了完整的依赖注入接口设计
2. 理解了依赖注入的核心概念和实现方式
3. 掌握了服务容器的设计原则

继续阅读 [03-middleware-design.md](./03-middleware-design.md) 来学习中间件系统的设计。 

# 服务容器接口设计

## 学习目标

完成本节后，你将能够：
1. 理解服务容器的核心概念和工作原理
2. 设计服务容器的基本接口和类型
3. 实现服务注册和解析机制
4. 在 cosy-framework-design 中完成服务容器模块的接口设计

## 1. 理解服务容器

### 1.1 基本概念

服务容器是依赖注入的核心组件，负责管理服务的注册和解析。在 `src/container/types.ts` 中定义基本类型：

```typescript
/**
 * 服务标识符类型
 */
export type ServiceIdentifier = string | symbol | Constructor<any>;

/**
 * 构造函数类型
 */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 * 工厂函数类型
 */
export type Factory<T = any> = (container: IContainer) => T;
```

### 1.2 服务作用域

在 `src/container/constants.ts` 中定义作用域类型：

```typescript
/**
 * 服务作用域枚举
 */
export enum ServiceScope {
  /**
   * 单例作用域
   * 整个应用生命周期只创建一个实例
   */
  SINGLETON = 'singleton',

  /**
   * 瞬态作用域
   * 每次解析都创建新实例
   */
  TRANSIENT = 'transient',

  /**
   * 作用域单例
   * 在特定作用域内共享同一个实例
   */
  SCOPED = 'scoped'
}
```

**动手实践 1**：
1. 创建服务容器基本类型
2. 定义作用域枚举
3. 在 index.ts 中导出

## 2. 设计核心接口

### 2.1 容器接口

在 `src/container/interfaces.ts` 中定义容器接口：

```typescript
/**
 * 服务容器接口
 */
export interface IContainer {
  /**
   * 注册服务
   * @param id 服务标识符
   * @param provider 服务提供者
   */
  register(id: ServiceIdentifier, provider: IServiceProvider): void;

  /**
   * 解析服务
   * @param id 服务标识符
   */
  resolve<T>(id: ServiceIdentifier): T;

  /**
   * 创建作用域容器
   */
  createScope(): IContainer;

  /**
   * 检查服务是否已注册
   * @param id 服务标识符
   */
  has(id: ServiceIdentifier): boolean;
}
```

**动手实践 2**：
1. 创建容器接口
2. 添加核心方法定义
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
  useFactory?: Factory<T>;

  /**
   * 使用值作为提供者
   */
  useValue?: T;

  /**
   * 服务作用域
   */
  scope?: ServiceScope;
}

/**
 * 服务提供者接口
 */
export interface IServiceProviderClass {
  /**
   * 注册服务
   * @param container 服务容器
   */
  register(container: IContainer): void;

  /**
   * 启动服务
   */
  boot?(): Promise<void>;
}
```

**动手实践 3**：
1. 创建提供者接口
2. 实现不同的提供者类型
3. 添加生命周期支持

## 3. 实现装饰器类型

### 3.1 Injectable 装饰器

在 `src/container/decorators.ts` 中定义装饰器类型：

```typescript
/**
 * Injectable 装饰器选项
 */
export interface IInjectableOptions {
  /**
   * 服务作用域
   */
  scope?: ServiceScope;

  /**
   * 服务标识符
   */
  id?: ServiceIdentifier;
}

/**
 * Injectable 装饰器类型
 */
export type InjectableDecorator = (options?: IInjectableOptions) => ClassDecorator;
```

### 3.2 Inject 装饰器

```typescript
/**
 * Inject 装饰器选项
 */
export interface IInjectOptions {
  /**
   * 服务标识符
   */
  id?: ServiceIdentifier;
}

/**
 * Inject 装饰器类型
 */
export type InjectDecorator = (options?: IInjectOptions) => ParameterDecorator;
```

**动手实践 4**：
1. 创建装饰器类型定义
2. 添加配置选项接口
3. 导出所有类型定义

## 4. 设计辅助类型

### 4.1 服务描述类型

```typescript
/**
 * 服务依赖项
 */
export interface IServiceDependency {
  /**
   * 参数索引
   */
  index: number;

  /**
   * 服务标识符
   */
  id: ServiceIdentifier;
}

/**
 * 服务描述
 */
export interface IServiceDescription {
  /**
   * 服务标识符
   */
  id: ServiceIdentifier;

  /**
   * 服务提供者
   */
  provider: IServiceProvider;

  /**
   * 服务作用域
   */
  scope: ServiceScope;

  /**
   * 依赖项列表
   */
  dependencies: IServiceDependency[];
}
```

**动手实践 5**：
1. 创建服务描述类型
2. 实现依赖项描述
3. 添加元数据支持

## 5. 集成示例

### 5.1 基本服务示例

```typescript
// 定义服务接口
interface IUserService {
  getUser(id: string): Promise<User>;
  createUser(data: UserData): Promise<User>;
}

// 实现服务类
@Injectable({ scope: ServiceScope.SINGLETON })
class UserService implements IUserService {
  constructor(
    @Inject() private database: Database,
    @Inject('CONFIG') private config: Config
  ) {}

  async getUser(id: string): Promise<User> {
    return this.database.findOne('users', id);
  }

  async createUser(data: UserData): Promise<User> {
    return this.database.insert('users', data);
  }
}
```

**动手实践 6**：
1. 创建示例服务
2. 实现依赖注入
3. 测试服务注册和解析

### 5.2 服务提供者示例

```typescript
class DatabaseProvider implements IServiceProviderClass {
  register(container: IContainer): void {
    // 注册数据库配置
    container.register('DB_CONFIG', {
      useValue: {
        host: 'localhost',
        port: 5432,
        database: 'app'
      }
    });

    // 注册数据库服务
    container.register(Database, {
      useFactory: (container) => {
        const config = container.resolve('DB_CONFIG');
        return new Database(config);
      },
      scope: ServiceScope.SINGLETON
    });
  }

  async boot(): Promise<void> {
    // 初始化数据库连接
    await this.initializeDatabase();
  }
}
```

**动手实践 7**：
1. 创建服务提供者
2. 实现服务注册
3. 添加启动逻辑

### 5.3 容器使用示例

```typescript
// 创建容器实例
const container = new Container();

// 注册服务
container.register(UserService, {
  useClass: UserService,
  scope: ServiceScope.SINGLETON
});

container.register('CONFIG', {
  useValue: {
    apiKey: 'secret',
    debug: true
  }
});

// 创建作用域容器
const scopedContainer = container.createScope();

// 解析服务
const userService = scopedContainer.resolve<UserService>(UserService);
```

**动手实践 8**：
1. 创建容器实例
2. 注册不同类型的服务
3. 测试作用域容器

## 6. 导出模块

在 `src/container/index.ts` 中导出所有类型：

```typescript
export * from './interfaces';
export * from './types';
export * from './constants';
export * from './decorators';
```

**动手实践 9**：
1. 创建模块导出文件
2. 确保所有类型都被导出
3. 验证模块的完整性

## 下一步

完成本节后，你应该已经：
1. 在 cosy-framework-design 项目中创建了完整的服务容器接口设计
2. 理解了服务容器的核心概念和实现方式
3. 掌握了依赖注入的设计原则

继续阅读 [07-http-interface.md](./07-http-interface.md) 来学习 HTTP 接口的设计。 

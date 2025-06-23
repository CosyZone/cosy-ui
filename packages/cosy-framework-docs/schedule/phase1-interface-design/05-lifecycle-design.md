# 生命周期系统设计

## 学习目标

完成本节后，你将能够：
1. 理解应用生命周期的核心概念和工作原理
2. 设计生命周期钩子和事件系统
3. 实现启动和关闭流程
4. 在 cosy-framework-design 中完成生命周期模块的接口设计

## 1. 理解生命周期系统

### 1.1 基本概念

生命周期系统管理应用程序的启动、运行和关闭过程。在 `src/lifecycle/types.ts` 中定义基本类型：

```typescript
/**
 * 生命周期阶段
 */
export enum LifecyclePhase {
  /**
   * 初始化阶段
   */
  INIT = 'init',

  /**
   * 配置加载阶段
   */
  CONFIG = 'config',

  /**
   * 服务注册阶段
   */
  REGISTER = 'register',

  /**
   * 启动阶段
   */
  BOOT = 'boot',

  /**
   * 运行阶段
   */
  RUN = 'run',

  /**
   * 关闭阶段
   */
  SHUTDOWN = 'shutdown'
}

/**
 * 生命周期钩子函数类型
 */
export type LifecycleHook = () => Promise<void> | void;
```

### 1.2 生命周期事件

在 `src/lifecycle/constants.ts` 中定义事件类型：

```typescript
/**
 * 生命周期事件类型
 */
export enum LifecycleEventType {
  /**
   * 阶段开始事件
   */
  PHASE_START = 'phase:start',

  /**
   * 阶段结束事件
   */
  PHASE_END = 'phase:end',

  /**
   * 错误事件
   */
  ERROR = 'error'
}
```

**动手实践 1**：
1. 创建生命周期基本类型
2. 定义事件类型枚举
3. 在 index.ts 中导出

## 2. 设计核心接口

### 2.1 生命周期管理器接口

在 `src/lifecycle/interfaces.ts` 中定义管理器接口：

```typescript
/**
 * 生命周期管理器接口
 */
export interface ILifecycleManager {
  /**
   * 注册钩子函数
   * @param phase 生命周期阶段
   * @param hook 钩子函数
   */
  hook(phase: LifecyclePhase, hook: LifecycleHook): void;

  /**
   * 启动应用
   */
  boot(): Promise<void>;

  /**
   * 关闭应用
   */
  shutdown(): Promise<void>;

  /**
   * 获取当前阶段
   */
  getCurrentPhase(): LifecyclePhase;
}
```

**动手实践 2**：
1. 创建管理器接口
2. 添加钩子注册方法
3. 实现启动和关闭方法

### 2.2 事件管理器接口

```typescript
/**
 * 生命周期事件接口
 */
export interface ILifecycleEvent {
  /**
   * 事件类型
   */
  type: LifecycleEventType;

  /**
   * 生命周期阶段
   */
  phase: LifecyclePhase;

  /**
   * 事件数据
   */
  data?: any;
}

/**
 * 事件监听器类型
 */
export type EventListener = (event: ILifecycleEvent) => void;

/**
 * 事件管理器接口
 */
export interface IEventManager {
  /**
   * 注册事件监听器
   * @param type 事件类型
   * @param listener 监听器函数
   */
  on(type: LifecycleEventType, listener: EventListener): void;

  /**
   * 触发事件
   * @param event 事件对象
   */
  emit(event: ILifecycleEvent): void;
}
```

**动手实践 3**：
1. 创建事件接口
2. 实现事件管理器
3. 添加事件监听机制

## 3. 实现装饰器类型

### 3.1 生命周期钩子装饰器

在 `src/lifecycle/decorators.ts` 中定义装饰器类型：

```typescript
/**
 * 钩子装饰器选项
 */
export interface IHookOptions {
  /**
   * 生命周期阶段
   */
  phase: LifecyclePhase;

  /**
   * 执行顺序
   */
  order?: number;
}

/**
 * 钩子装饰器类型
 */
export type HookDecorator = (options: IHookOptions) => MethodDecorator;

/**
 * 预定义钩子装饰器
 */
export interface ILifecycleDecorators {
  OnInit: () => MethodDecorator;
  OnConfig: () => MethodDecorator;
  OnBoot: () => MethodDecorator;
  OnShutdown: () => MethodDecorator;
}
```

**动手实践 4**：
1. 创建装饰器类型定义
2. 添加配置选项接口
3. 导出所有类型定义

## 4. 设计辅助类型

### 4.1 生命周期状态类型

```typescript
/**
 * 生命周期状态
 */
export interface ILifecycleState {
  /**
   * 当前阶段
   */
  currentPhase: LifecyclePhase;

  /**
   * 是否正在运行
   */
  isRunning: boolean;

  /**
   * 启动时间
   */
  startTime?: Date;

  /**
   * 运行时长（毫秒）
   */
  uptime(): number;
}

/**
 * 生命周期错误
 */
export class LifecycleError extends Error {
  constructor(
    message: string,
    public phase: LifecyclePhase,
    public originalError?: Error
  ) {
    super(message);
  }
}
```

**动手实践 5**：
1. 创建状态类型定义
2. 实现错误处理类
3. 添加状态管理支持

## 5. 集成示例

### 5.1 基本服务示例

```typescript
@Injectable()
class DatabaseService {
  @OnInit()
  async initialize(): Promise<void> {
    // 初始化数据库连接
  }

  @OnShutdown()
  async cleanup(): Promise<void> {
    // 关闭数据库连接
  }
}

@Injectable()
class CacheService {
  @OnBoot()
  async warmup(): Promise<void> {
    // 预热缓存
  }

  @OnShutdown()
  async flush(): Promise<void> {
    // 刷新缓存
  }
}
```

**动手实践 6**：
1. 创建示例服务
2. 实现生命周期钩子
3. 测试钩子执行顺序

### 5.2 事件监听示例

```typescript
@Injectable()
class LifecycleLogger {
  constructor(private eventManager: IEventManager) {
    this.setupListeners();
  }

  private setupListeners(): void {
    this.eventManager.on(LifecycleEventType.PHASE_START, (event) => {
      console.log(`Starting phase: ${event.phase}`);
    });

    this.eventManager.on(LifecycleEventType.PHASE_END, (event) => {
      console.log(`Completed phase: ${event.phase}`);
    });

    this.eventManager.on(LifecycleEventType.ERROR, (event) => {
      console.error(`Error in phase ${event.phase}:`, event.data);
    });
  }
}
```

**动手实践 7**：
1. 创建日志服务
2. 实现事件监听
3. 测试事件触发

### 5.3 生命周期管理器使用示例

```typescript
// 创建生命周期管理器
const lifecycleManager = new LifecycleManager();

// 注册钩子
lifecycleManager.hook(LifecyclePhase.INIT, async () => {
  // 初始化逻辑
});

lifecycleManager.hook(LifecyclePhase.BOOT, async () => {
  // 启动逻辑
});

lifecycleManager.hook(LifecyclePhase.SHUTDOWN, async () => {
  // 关闭逻辑
});

// 启动应用
await lifecycleManager.boot();

// 关闭应用
await lifecycleManager.shutdown();
```

**动手实践 8**：
1. 创建管理器实例
2. 注册不同阶段的钩子
3. 测试完整的生命周期流程

## 6. 导出模块

在 `src/lifecycle/index.ts` 中导出所有类型：

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
1. 在 cosy-framework-design 项目中创建了完整的生命周期接口设计
2. 理解了生命周期系统的核心概念和实现方式
3. 掌握了生命周期钩子和事件的设计原则

继续阅读 [06-container-interface.md](./06-container-interface.md) 来学习服务容器接口的设计。 

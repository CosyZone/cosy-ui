# 配置系统接口设计

## 设计目标

配置系统负责管理应用程序的配置信息，提供灵活的配置加载和访问机制。设计目标包括：

1. 支持多种配置源
2. 提供类型安全的配置访问
3. 实现配置的热重载
4. 支持环境变量覆盖
5. 提供配置验证机制

## 核心接口

### 1. 配置管理器接口

```typescript
interface ConfigInterface {
  // 配置加载
  load(source: ConfigSource): Promise<void>;
  loadSync(source: ConfigSource): void;
  reload(): Promise<void>;
  
  // 配置访问
  get<T>(key: string, defaultValue?: T): T;
  has(key: string): boolean;
  set(key: string, value: any): void;
  
  // 配置管理
  merge(config: Record<string, any>): void;
  clear(): void;
  
  // 配置监听
  onChange(callback: ConfigChangeCallback): void;
  offChange(callback: ConfigChangeCallback): void;
}

type ConfigChangeCallback = (key: string, newValue: any, oldValue: any) => void;
```

### 2. 配置源接口

```typescript
interface ConfigSource {
  // 配置加载
  load(): Promise<Record<string, any>>;
  loadSync(): Record<string, any>;
  
  // 源信息
  getName(): string;
  getPriority(): number;
  isReloadable(): boolean;
  
  // 重载支持
  watch?(): void;
  unwatch?(): void;
}
```

### 3. 配置验证器接口

```typescript
interface ConfigValidator {
  // 验证方法
  validate(config: Record<string, any>): ValidationResult;
  validateKey(key: string, value: any): ValidationResult;
  
  // 规则管理
  addRule(key: string, rule: ValidationRule): this;
  removeRule(key: string): boolean;
  
  // 错误处理
  getErrors(): ValidationError[];
}

interface ValidationRule {
  type?: string;
  required?: boolean;
  pattern?: RegExp;
  validate?(value: any): boolean | Promise<boolean>;
  message?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

interface ValidationError {
  key: string;
  value: any;
  rule: string;
  message: string;
}
```

## 扩展接口

### 1. 环境配置

```typescript
interface EnvironmentConfig extends ConfigSource {
  // 环境变量
  setPrefix(prefix: string): this;
  setMapping(mapping: Record<string, string>): this;
  
  // 转换规则
  setTransform(transform: (value: string) => any): this;
  setKeyTransform(transform: (key: string) => string): this;
}
```

### 2. 文件配置

```typescript
interface FileConfig extends ConfigSource {
  // 文件操作
  setPath(path: string): this;
  setFormat(format: string): this;
  
  // 文件监听
  enableWatch(): this;
  disableWatch(): this;
  
  // 缓存控制
  setCaching(enabled: boolean): this;
  clearCache(): void;
}
```

### 3. 远程配置

```typescript
interface RemoteConfig extends ConfigSource {
  // 远程设置
  setEndpoint(url: string): this;
  setHeaders(headers: Record<string, string>): this;
  
  // 重试策略
  setRetry(count: number, delay: number): this;
  
  // 缓存策略
  setCacheTTL(ttl: number): this;
  invalidateCache(): void;
}
```

## 工厂接口

### 1. 配置源工厂

```typescript
interface ConfigSourceFactory {
  // 创建配置源
  createFileSource(path: string): FileConfig;
  createEnvSource(prefix?: string): EnvironmentConfig;
  createRemoteSource(url: string): RemoteConfig;
  createMemorySource(data?: Record<string, any>): ConfigSource;
}
```

### 2. 验证器工厂

```typescript
interface ValidatorFactory {
  // 创建验证器
  create(rules?: Record<string, ValidationRule>): ConfigValidator;
  createFromSchema(schema: any): ConfigValidator;
}
```

## 使用示例

### 1. 基本配置管理

```typescript
// 创建配置管理器
const config = new Config();

// 加载配置
await config.load(new FileConfig('config.json'));
await config.load(new EnvConfig('APP_'));

// 访问配置
const port = config.get<number>('app.port', 3000);
const debug = config.get<boolean>('app.debug');

// 监听变化
config.onChange((key, newValue, oldValue) => {
  console.log(`Config changed: ${key}`);
});
```

### 2. 配置验证

```typescript
// 创建验证器
const validator = new ConfigValidator({
  'app.port': {
    type: 'number',
    required: true,
    validate: value => value > 0 && value < 65536
  },
  'app.name': {
    type: 'string',
    required: true,
    pattern: /^[a-zA-Z0-9-_]+$/
  }
});

// 验证配置
const result = validator.validate({
  app: {
    port: 3000,
    name: 'my-app'
  }
});

if (!result.valid) {
  console.error('Config validation failed:', result.errors);
}
```

### 3. 环境特定配置

```typescript
// 加载基础配置
await config.load(new FileConfig('config/default.json'));

// 加载环境配置
const env = process.env.NODE_ENV || 'development';
await config.load(new FileConfig(`config/${env}.json`));

// 加载环境变量
await config.load(new EnvConfig('APP_', {
  mapping: {
    'APP_PORT': 'app.port',
    'APP_NAME': 'app.name'
  },
  transform: (value) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (/^\d+$/.test(value)) return parseInt(value);
    return value;
  }
}));
```

## 设计原则

### 1. 灵活性

- 支持多种配置源
- 可扩展的验证规则
- 自定义转换规则

### 2. 类型安全

- 泛型配置访问
- 配置验证
- 类型转换

### 3. 可维护性

- 配置分层
- 环境隔离
- 变更追踪

### 4. 性能优化

- 配置缓存
- 懒加载
- 增量更新

## 注意事项

1. **配置优先级**
   - 明确配置源优先级
   - 处理配置冲突
   - 环境变量覆盖

2. **安全考虑**
   - 敏感信息保护
   - 配置加密
   - 访问控制

3. **性能考虑**
   - 减少配置重载
   - 优化配置访问
   - 合理使用缓存

## 下一步

理解了配置系统接口后，我们将：

1. 学习应用程序接口
2. 了解错误处理接口
3. 掌握日志系统接口

请继续阅读 [02.6-application.md](./02.6-application.md) 了解应用程序接口设计。 

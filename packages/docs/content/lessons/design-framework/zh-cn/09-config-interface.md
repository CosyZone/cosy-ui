---
title: 配置系统接口设计
---

# 配置系统接口设计

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

## 下一步

理解了配置系统接口后，我们将：

1. 学习应用程序接口
2. 了解错误处理接口
3. 掌握日志系统接口

请继续阅读 [10-application-interface.md](./10-application-interface.md) 了解应用程序接口设计。 

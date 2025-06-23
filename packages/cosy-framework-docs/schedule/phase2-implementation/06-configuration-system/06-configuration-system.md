# 步骤 006：配置系统

## 目标
实现灵活的配置管理系统，支持环境变量、配置文件和运行时配置。

## 任务清单
- [ ] 创建配置管理器
- [ ] 支持多种配置源
- [ ] 实现配置验证
- [ ] 添加环境管理
- [ ] 创建配置测试

## 执行步骤

### 1. 更新类型定义

**更新文件**: `src/types/index.ts`

在现有内容后添加：

```typescript
// 配置相关类型
export interface ConfigManager {
  get<T = any>(key: string, defaultValue?: T): T
  set(key: string, value: any): void
  has(key: string): boolean
  all(): Record<string, any>
  load(source: ConfigSource): Promise<void>
  merge(config: Record<string, any>): void
  validate(): boolean
  getErrors(): string[]
}

export interface ConfigSource {
  name: string
  load(): Promise<Record<string, any>>
  watch?(callback: (config: Record<string, any>) => void): void
}

export interface ConfigValidator {
  rules: Record<string, ConfigRule>
  validate(config: Record<string, any>): ConfigValidationResult
}

export interface ConfigRule {
  required?: boolean
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object'
  default?: any
  validator?: (value: any) => boolean | string
  transform?: (value: any) => any
}

export interface ConfigValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export interface EnvironmentConfig {
  name: string
  debug?: boolean
  [key: string]: any
}
```

### 2. 创建配置管理器

**创建文件**: `src/config/manager.ts`

```typescript
import { ConfigManager, ConfigSource, ConfigValidator, ConfigValidationResult } from '../types'

export class Configuration implements ConfigManager {
  private config: Record<string, any> = {}
  private sources: ConfigSource[] = []
  private validator?: ConfigValidator
  private errors: string[] = []

  /**
   * 获取配置值
   */
  get<T = any>(key: string, defaultValue?: T): T {
    const keys = key.split('.')
    let value: any = this.config

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return defaultValue as T
      }
    }

    return value as T
  }

  /**
   * 设置配置值
   */
  set(key: string, value: any): void {
    const keys = key.split('.')
    let current = this.config

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i]
      if (!(k in current) || typeof current[k] !== 'object') {
        current[k] = {}
      }
      current = current[k]
    }

    current[keys[keys.length - 1]] = value
  }

  /**
   * 检查配置是否存在
   */
  has(key: string): boolean {
    return this.get(key) !== undefined
  }

  /**
   * 获取所有配置
   */
  all(): Record<string, any> {
    return { ...this.config }
  }

  /**
   * 加载配置源
   */
  async load(source: ConfigSource): Promise<void> {
    try {
      const config = await source.load()
      this.merge(config)
      this.sources.push(source)

      // 设置监听器（如果支持）
      if (source.watch) {
        source.watch((newConfig) => {
          this.merge(newConfig)
        })
      }
    } catch (error) {
      this.errors.push(`Failed to load config from ${source.name}: ${(error as Error).message}`)
    }
  }

  /**
   * 合并配置
   */
  merge(config: Record<string, any>): void {
    this.config = this.deepMerge(this.config, config)
  }

  /**
   * 设置验证器
   */
  setValidator(validator: ConfigValidator): void {
    this.validator = validator
  }

  /**
   * 验证配置
   */
  validate(): boolean {
    this.errors = []

    if (!this.validator) {
      return true
    }

    const result = this.validator.validate(this.config)
    this.errors = result.errors

    return result.valid
  }

  /**
   * 获取错误信息
   */
  getErrors(): string[] {
    return [...this.errors]
  }

  /**
   * 深度合并对象
   */
  private deepMerge(target: any, source: any): any {
    const result = { ...target }

    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }

    return result
  }

  /**
   * 重新加载所有配置源
   */
  async reload(): Promise<void> {
    this.config = {}
    const sources = [...this.sources]
    this.sources = []

    for (const source of sources) {
      await this.load(source)
    }
  }

  /**
   * 清除配置
   */
  clear(): void {
    this.config = {}
    this.sources = []
    this.errors = []
  }
}
```

### 3. 创建配置源

**创建文件**: `src/config/sources.ts`

```typescript
import { ConfigSource } from '../types'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { watch } from 'fs'

/**
 * 环境变量配置源
 */
export class EnvironmentSource implements ConfigSource {
  name = 'environment'
  private prefix: string

  constructor(prefix = '') {
    this.prefix = prefix
  }

  async load(): Promise<Record<string, any>> {
    const config: Record<string, any> = {}

    for (const [key, value] of Object.entries(process.env)) {
      if (this.prefix && !key.startsWith(this.prefix)) {
        continue
      }

      const configKey = this.prefix 
        ? key.substring(this.prefix.length).toLowerCase()
        : key.toLowerCase()

      // 转换环境变量值
      config[configKey] = this.transformValue(value || '')
    }

    return config
  }

  private transformValue(value: string): any {
    // 尝试解析为 JSON
    if (value.startsWith('{') || value.startsWith('[')) {
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    }

    // 布尔值
    if (value.toLowerCase() === 'true') return true
    if (value.toLowerCase() === 'false') return false

    // 数字
    if (/^\d+$/.test(value)) return parseInt(value, 10)
    if (/^\d+\.\d+$/.test(value)) return parseFloat(value)

    return value
  }
}

/**
 * JSON 文件配置源
 */
export class JsonFileSource implements ConfigSource {
  name: string
  private filePath: string
  private watchCallback?: (config: Record<string, any>) => void

  constructor(filePath: string) {
    this.filePath = filePath
    this.name = `json:${filePath}`
  }

  async load(): Promise<Record<string, any>> {
    if (!existsSync(this.filePath)) {
      throw new Error(`Config file not found: ${this.filePath}`)
    }

    try {
      const content = await readFile(this.filePath, 'utf-8')
      return JSON.parse(content)
    } catch (error) {
      throw new Error(`Failed to parse JSON config: ${(error as Error).message}`)
    }
  }

  watch(callback: (config: Record<string, any>) => void): void {
    this.watchCallback = callback

    watch(this.filePath, async (eventType) => {
      if (eventType === 'change') {
        try {
          const config = await this.load()
          callback(config)
        } catch (error) {
          console.error('Failed to reload config:', error)
        }
      }
    })
  }
}

/**
 * 对象配置源
 */
export class ObjectSource implements ConfigSource {
  name: string
  private config: Record<string, any>

  constructor(config: Record<string, any>, name = 'object') {
    this.config = config
    this.name = name
  }

  async load(): Promise<Record<string, any>> {
    return { ...this.config }
  }
}

/**
 * 多源配置源（按优先级合并）
 */
export class MultiSource implements ConfigSource {
  name = 'multi'
  private sources: ConfigSource[]

  constructor(sources: ConfigSource[]) {
    this.sources = sources
  }

  async load(): Promise<Record<string, any>> {
    let merged = {}

    for (const source of this.sources) {
      try {
        const config = await source.load()
        merged = this.deepMerge(merged, config)
      } catch (error) {
        console.warn(`Failed to load from ${source.name}:`, error)
      }
    }

    return merged
  }

  watch(callback: (config: Record<string, any>) => void): void {
    this.sources.forEach(source => {
      if (source.watch) {
        source.watch(async () => {
          const config = await this.load()
          callback(config)
        })
      }
    })
  }

  private deepMerge(target: any, source: any): any {
    const result = { ...target }

    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }

    return result
  }
}
```

### 4. 创建配置验证器

**创建文件**: `src/config/validator.ts`

```typescript
import { ConfigValidator, ConfigRule, ConfigValidationResult } from '../types'

export class DefaultConfigValidator implements ConfigValidator {
  rules: Record<string, ConfigRule>

  constructor(rules: Record<string, ConfigRule> = {}) {
    this.rules = rules
  }

  validate(config: Record<string, any>): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 验证必需字段
    for (const [key, rule] of Object.entries(this.rules)) {
      const value = this.getValue(config, key)

      // 检查必需字段
      if (rule.required && (value === undefined || value === null)) {
        errors.push(`Required config key '${key}' is missing`)
        continue
      }

      // 如果值不存在且有默认值，跳过验证
      if (value === undefined && rule.default !== undefined) {
        continue
      }

      // 类型验证
      if (value !== undefined && rule.type) {
        if (!this.validateType(value, rule.type)) {
          errors.push(`Config key '${key}' must be of type ${rule.type}, got ${typeof value}`)
          continue
        }
      }

      // 自定义验证器
      if (value !== undefined && rule.validator) {
        const result = rule.validator(value)
        if (typeof result === 'string') {
          errors.push(`Config key '${key}': ${result}`)
        } else if (!result) {
          errors.push(`Config key '${key}' failed validation`)
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    }
  }

  private getValue(config: Record<string, any>, key: string): any {
    const keys = key.split('.')
    let value = config

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return undefined
      }
    }

    return value
  }

  private validateType(value: any, type: string): boolean {
    switch (type) {
      case 'string':
        return typeof value === 'string'
      case 'number':
        return typeof value === 'number' && !isNaN(value)
      case 'boolean':
        return typeof value === 'boolean'
      case 'array':
        return Array.isArray(value)
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value)
      default:
        return true
    }
  }
}

/**
 * 创建配置验证规则的辅助函数
 */
export function required(type?: string, validator?: (value: any) => boolean | string): ConfigRule {
  return {
    required: true,
    type: type as any,
    validator
  }
}

export function optional(type?: string, defaultValue?: any, validator?: (value: any) => boolean | string): ConfigRule {
  return {
    required: false,
    type: type as any,
    default: defaultValue,
    validator
  }
}

export function string(required = false, defaultValue?: string): ConfigRule {
  return {
    required,
    type: 'string',
    default: defaultValue
  }
}

export function number(required = false, defaultValue?: number, min?: number, max?: number): ConfigRule {
  const validator = (value: number) => {
    if (min !== undefined && value < min) {
      return `Value must be at least ${min}`
    }
    if (max !== undefined && value > max) {
      return `Value must be at most ${max}`
    }
    return true
  }

  return {
    required,
    type: 'number',
    default: defaultValue,
    validator: min !== undefined || max !== undefined ? validator : undefined
  }
}

export function boolean(required = false, defaultValue?: boolean): ConfigRule {
  return {
    required,
    type: 'boolean',
    default: defaultValue
  }
}

export function array(required = false, defaultValue?: any[]): ConfigRule {
  return {
    required,
    type: 'array',
    default: defaultValue
  }
}

export function object(required = false, defaultValue?: Record<string, any>): ConfigRule {
  return {
    required,
    type: 'object',
    default: defaultValue
  }
}
```

### 5. 创建环境管理器

**创建文件**: `src/config/environment.ts`

```typescript
import { EnvironmentConfig } from '../types'

export class Environment {
  private static current: string = process.env.NODE_ENV || 'development'
  private static configs = new Map<string, EnvironmentConfig>()

  /**
   * 设置当前环境
   */
  static setCurrent(environment: string): void {
    this.current = environment
  }

  /**
   * 获取当前环境
   */
  static getCurrent(): string {
    return this.current
  }

  /**
   * 注册环境配置
   */
  static register(name: string, config: EnvironmentConfig): void {
    this.configs.set(name, { ...config, name })
  }

  /**
   * 获取环境配置
   */
  static getConfig(environment?: string): EnvironmentConfig | undefined {
    const env = environment || this.current
    return this.configs.get(env)
  }

  /**
   * 检查是否为指定环境
   */
  static is(environment: string): boolean {
    return this.current === environment
  }

  /**
   * 检查是否为开发环境
   */
  static isDevelopment(): boolean {
    return this.is('development')
  }

  /**
   * 检查是否为生产环境
   */
  static isProduction(): boolean {
    return this.is('production')
  }

  /**
   * 检查是否为测试环境
   */
  static isTesting(): boolean {
    return this.is('test') || this.is('testing')
  }

  /**
   * 检查是否为调试模式
   */
  static isDebug(): boolean {
    const config = this.getConfig()
    return config?.debug ?? this.isDevelopment()
  }

  /**
   * 获取所有注册的环境
   */
  static getEnvironments(): string[] {
    return Array.from(this.configs.keys())
  }

  /**
   * 初始化默认环境
   */
  static initDefaults(): void {
    this.register('development', {
      name: 'development',
      debug: true
    })

    this.register('production', {
      name: 'production',
      debug: false
    })

    this.register('test', {
      name: 'test',
      debug: false
    })
  }
}

// 自动初始化默认环境
Environment.initDefaults()
```

### 6. 更新配置模块导出

**更新文件**: `src/config/index.ts`

```typescript
// 核心类
export { Configuration } from './manager'
export { Environment } from './environment'

// 配置源
export {
  EnvironmentSource,
  JsonFileSource,
  ObjectSource,
  MultiSource
} from './sources'

// 验证器
export {
  DefaultConfigValidator,
  required,
  optional,
  string,
  number,
  boolean,
  array,
  object
} from './validator'

// 类型
export type {
  ConfigManager,
  ConfigSource,
  ConfigValidator,
  ConfigRule,
  ConfigValidationResult,
  EnvironmentConfig
} from '../types'
```

### 7. 创建配置测试

**创建文件**: `tests/unit/config.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { 
  Configuration, 
  Environment,
  EnvironmentSource,
  ObjectSource,
  DefaultConfigValidator,
  required,
  optional,
  string,
  number
} from '../../src/config'

describe('Configuration System', () => {
  let config: Configuration

  beforeEach(() => {
    config = new Configuration()
  })

  describe('Configuration Manager', () => {
    it('should set and get config values', () => {
      config.set('app.name', 'Test App')
      config.set('app.version', '1.0.0')

      expect(config.get('app.name')).toBe('Test App')
      expect(config.get('app.version')).toBe('1.0.0')
    })

    it('should handle nested config keys', () => {
      config.set('database.mysql.host', 'localhost')
      config.set('database.mysql.port', 3306)

      expect(config.get('database.mysql.host')).toBe('localhost')
      expect(config.get('database.mysql.port')).toBe(3306)
      expect(config.get('database.mysql')).toEqual({
        host: 'localhost',
        port: 3306
      })
    })

    it('should return default values for missing keys', () => {
      expect(config.get('missing.key', 'default')).toBe('default')
      expect(config.get('missing.key')).toBeUndefined()
    })

    it('should check if keys exist', () => {
      config.set('existing.key', 'value')

      expect(config.has('existing.key')).toBe(true)
      expect(config.has('missing.key')).toBe(false)
    })

    it('should merge configurations', () => {
      config.set('app.name', 'Original')
      config.set('app.debug', true)

      config.merge({
        app: {
          name: 'Updated',
          version: '2.0.0'
        },
        database: {
          host: 'localhost'
        }
      })

      expect(config.get('app.name')).toBe('Updated')
      expect(config.get('app.debug')).toBe(true)
      expect(config.get('app.version')).toBe('2.0.0')
      expect(config.get('database.host')).toBe('localhost')
    })
  })

  describe('Configuration Sources', () => {
    it('should load from environment variables', async () => {
      // 设置环境变量
      process.env.TEST_APP_NAME = 'Test App'
      process.env.TEST_APP_PORT = '3000'
      process.env.TEST_APP_DEBUG = 'true'

      const source = new EnvironmentSource('TEST_')
      await config.load(source)

      expect(config.get('app_name')).toBe('Test App')
      expect(config.get('app_port')).toBe(3000)
      expect(config.get('app_debug')).toBe(true)

      // 清理环境变量
      delete process.env.TEST_APP_NAME
      delete process.env.TEST_APP_PORT
      delete process.env.TEST_APP_DEBUG
    })

    it('should load from object source', async () => {
      const source = new ObjectSource({
        app: {
          name: 'Object App',
          version: '1.0.0'
        },
        database: {
          host: 'localhost',
          port: 5432
        }
      })

      await config.load(source)

      expect(config.get('app.name')).toBe('Object App')
      expect(config.get('database.port')).toBe(5432)
    })
  })

  describe('Configuration Validation', () => {
    it('should validate required fields', () => {
      const validator = new DefaultConfigValidator({
        'app.name': required('string'),
        'app.port': required('number'),
        'app.debug': optional('boolean', false)
      })

      config.setValidator(validator)

      // 缺少必需字段
      config.merge({
        app: {
          name: 'Test App'
          // 缺少 port
        }
      })

      expect(config.validate()).toBe(false)
      expect(config.getErrors()).toContain("Required config key 'app.port' is missing")
    })

    it('should validate field types', () => {
      const validator = new DefaultConfigValidator({
        'app.name': string(true),
        'app.port': number(true),
        'app.debug': optional('boolean', false)
      })

      config.setValidator(validator)

      config.merge({
        app: {
          name: 123, // 应该是字符串
          port: '3000', // 应该是数字
          debug: false
        }
      })

      expect(config.validate()).toBe(false)
      const errors = config.getErrors()
      expect(errors.some(e => e.includes('app.name'))).toBe(true)
      expect(errors.some(e => e.includes('app.port'))).toBe(true)
    })

    it('should pass validation with correct config', () => {
      const validator = new DefaultConfigValidator({
        'app.name': string(true),
        'app.port': number(true, 3000, 1000, 9999),
        'app.debug': optional('boolean', false)
      })

      config.setValidator(validator)

      config.merge({
        app: {
          name: 'Test App',
          port: 3000,
          debug: true
        }
      })

      expect(config.validate()).toBe(true)
      expect(config.getErrors()).toHaveLength(0)
    })
  })

  describe('Environment Management', () => {
    it('should manage environments', () => {
      expect(Environment.getCurrent()).toBeDefined()
      
      Environment.setCurrent('test')
      expect(Environment.getCurrent()).toBe('test')
      expect(Environment.isTesting()).toBe(true)
      expect(Environment.isProduction()).toBe(false)
    })

    it('should register custom environments', () => {
      Environment.register('staging', {
        name: 'staging',
        debug: true,
        apiUrl: 'https://api-staging.example.com'
      })

      const config = Environment.getConfig('staging')
      expect(config?.name).toBe('staging')
      expect(config?.debug).toBe(true)
    })
  })
})
```

## 验证步骤

### 1. 构建项目
```bash
cd packages/cosy-framework
npm run build
```

### 2. 运行测试
```bash
npm test tests/unit/config.test.ts
```

### 3. 创建手动测试

**创建文件**: `tests/manual-config-test.ts`

```typescript
import { 
  Configuration, 
  Environment,
  EnvironmentSource,
  ObjectSource,
  MultiSource,
  DefaultConfigValidator,
  required,
  string,
  number,
  boolean
} from '../src/config'

console.log('=== 配置系统测试 ===')

// 1. 基础配置管理
console.log('\n1. 基础配置管理')
const config = new Configuration()

config.set('app.name', 'Cosy Framework')
config.set('app.version', '0.1.0')
config.set('database.host', 'localhost')
config.set('database.port', 5432)

console.log('应用名称:', config.get('app.name'))
console.log('数据库配置:', config.get('database'))
console.log('所有配置:', config.all())

// 2. 配置源测试
console.log('\n2. 配置源测试')

// 环境变量源
process.env.COSY_APP_DEBUG = 'true'
process.env.COSY_APP_PORT = '3000'

const envSource = new EnvironmentSource('COSY_')
await config.load(envSource)

console.log('从环境变量加载的配置:')
console.log('- app_debug:', config.get('app_debug'))
console.log('- app_port:', config.get('app_port'))

// 对象源
const objSource = new ObjectSource({
  server: {
    host: '0.0.0.0',
    timeout: 30000
  },
  logging: {
    level: 'info',
    file: './logs/app.log'
  }
}, 'default-config')

await config.load(objSource)

console.log('合并后的配置:')
console.log('- server.host:', config.get('server.host'))
console.log('- logging.level:', config.get('logging.level'))

// 3. 多源配置
console.log('\n3. 多源配置测试')

const multiConfig = new Configuration()
const multiSource = new MultiSource([
  new ObjectSource({
    app: { name: 'Base App', debug: false },
    api: { version: 'v1' }
  }),
  new ObjectSource({
    app: { debug: true }, // 覆盖 debug 设置
    database: { host: 'prod-db' }
  })
])

await multiConfig.load(multiSource)

console.log('多源合并结果:')
console.log('- app.name:', multiConfig.get('app.name'))
console.log('- app.debug:', multiConfig.get('app.debug'))
console.log('- api.version:', multiConfig.get('api.version'))
console.log('- database.host:', multiConfig.get('database.host'))

// 4. 配置验证
console.log('\n4. 配置验证测试')

const validator = new DefaultConfigValidator({
  'app.name': string(true),
  'app.port': number(true, 3000, 1000, 9999),
  'app.debug': boolean(false, false),
  'database.host': required('string'),
  'database.port': number(true, 5432)
})

const validConfig = new Configuration()
validConfig.setValidator(validator)

// 测试有效配置
validConfig.merge({
  app: {
    name: 'Valid App',
    port: 3000,
    debug: true
  },
  database: {
    host: 'localhost',
    port: 5432
  }
})

console.log('配置验证结果:', validConfig.validate() ? '通过' : '失败')
if (!validConfig.validate()) {
  console.log('验证错误:', validConfig.getErrors())
}

// 测试无效配置
const invalidConfig = new Configuration()
invalidConfig.setValidator(validator)

invalidConfig.merge({
  app: {
    name: 123, // 错误类型
    port: 99999, // 超出范围
    debug: 'yes' // 错误类型
  },
  database: {
    // 缺少 host
    port: 'invalid' // 错误类型
  }
})

console.log('\n无效配置验证结果:', invalidConfig.validate() ? '通过' : '失败')
console.log('验证错误:')
invalidConfig.getErrors().forEach(error => console.log(`- ${error}`))

// 5. 环境管理
console.log('\n5. 环境管理测试')

console.log('当前环境:', Environment.getCurrent())
console.log('是否为开发环境:', Environment.isDevelopment())
console.log('是否为生产环境:', Environment.isProduction())
console.log('是否为调试模式:', Environment.isDebug())

// 注册自定义环境
Environment.register('staging', {
  name: 'staging',
  debug: true,
  apiUrl: 'https://api-staging.example.com',
  dbUrl: 'postgres://staging-db:5432/app'
})

Environment.setCurrent('staging')
console.log('\n切换到 staging 环境')
console.log('当前环境:', Environment.getCurrent())
console.log('环境配置:', Environment.getConfig())

console.log('\n所有注册的环境:', Environment.getEnvironments())

// 6. 实际应用示例
console.log('\n6. 实际应用配置示例')

const appConfig = new Configuration()

// 设置验证规则
const appValidator = new DefaultConfigValidator({
  'app.name': string(true),
  'app.port': number(true, 3000),
  'app.debug': boolean(false, false),
  'database.url': string(true),
  'redis.url': string(false, 'redis://localhost:6379'),
  'jwt.secret': string(true),
  'jwt.expiresIn': string(false, '1h')
})

appConfig.setValidator(appValidator)

// 加载配置
const appSources = new MultiSource([
  new ObjectSource({
    app: {
      name: 'Cosy Framework App',
      port: 3000,
      debug: false
    },
    database: {
      url: 'postgres://localhost:5432/cosy_app'
    },
    jwt: {
      secret: 'your-secret-key',
      expiresIn: '24h'
    }
  }, 'defaults'),
  new EnvironmentSource('COSY_')
])

await appConfig.load(appSources)

console.log('应用配置加载完成')
console.log('验证结果:', appConfig.validate() ? '通过' : '失败')

if (appConfig.validate()) {
  console.log('最终配置:')
  const finalConfig = appConfig.all()
  console.log(JSON.stringify(finalConfig, null, 2))
} else {
  console.log('配置错误:', appConfig.getErrors())
}

console.log('\n=== 配置系统测试完成 ===')
```

运行：
```bash
npx tsx tests/manual-config-test.ts
```

## 完成标志

- [ ] 配置管理器基本功能正常
- [ ] 配置源加载正确
- [ ] 配置验证功能正常
- [ ] 环境管理正常工作
- [ ] 所有测试通过
- [ ] TypeScript 类型检查无错误

## 下一步

完成此步骤后，继续执行 `step-007-application-core.md`。 

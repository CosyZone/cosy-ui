# 步骤 001：项目基础设置

## 目标
建立 Cosy Framework 的基础项目结构和配置文件。

## 任务清单
- [ ] 创建目录结构
- [ ] 配置 package.json
- [ ] 配置 TypeScript
- [ ] 创建基础入口文件
- [ ] 验证构建流程

## 执行步骤

### 1. 创建目录结构

在 `packages/cosy-framework/` 目录下执行：

```bash
mkdir -p src/{core,container,routing,middleware,config,http,database,orm,migrations,auth,validation,events,queue,view,cache,logging,types}
mkdir -p cli/{src,bin,templates}
mkdir -p tests/{unit,integration,feature}
mkdir -p examples
mkdir -p docs
```

### 2. 创建 package.json

**文件**: `packages/cosy-framework/package.json`

```json
{
  "name": "@coffic/cosy-framework",
  "version": "0.1.0",
  "description": "A Laravel-inspired TypeScript framework with Astro and Cosy-UI integration",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./auth": "./dist/auth/index.js",
    "./view": "./dist/view/index.js",
    "./database": "./dist/database/index.js",
    "./validation": "./dist/validation/index.js",
    "./events": "./dist/events/index.js",
    "./queue": "./dist/queue/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "reflect-metadata": "^0.1.13"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "vitest": "^1.0.0",
    "@types/node": "^20.0.0",
    "@vitest/coverage-v8": "^1.0.0"
  },
  "keywords": [
    "framework",
    "typescript",
    "astro",
    "laravel",
    "web-framework"
  ],
  "author": "Your Name",
  "license": "MIT"
}
```

### 3. 配置 TypeScript

**文件**: `packages/cosy-framework/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "allowJs": false,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "resolveJsonModule": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "tests",
    "examples"
  ]
}
```

### 4. 创建基础类型定义

**文件**: `src/types/index.ts`

```typescript
// 基础类型定义
export type Constructor<T = {}> = new (...args: any[]) => T

// 装饰器类型
export interface ClassDecorator {
  <TFunction extends Function>(target: TFunction): TFunction | void
}

export interface MethodDecorator {
  <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void
}

export interface ParameterDecorator {
  (target: any, propertyKey: string | symbol | undefined, parameterIndex: number): void
}

// 服务容器类型
export interface ServiceBinding<T = any> {
  token: string | symbol
  implementation: Constructor<T>
  singleton: boolean
  instance?: T
}

// HTTP 类型
export type RouteHandler = (...args: any[]) => any
export type NextFunction = (request?: any) => Promise<any>

// 通用工具类型
export type Awaitable<T> = T | Promise<T>
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]
```

### 5. 创建主入口文件

**文件**: `src/index.ts`

```typescript
// 导入 reflect-metadata（必须在最前面）
import 'reflect-metadata'

// 核心模块导出
export * from './core'
export * from './container'
export * from './routing'
export * from './middleware'
export * from './http'
export * from './config'

// 类型导出
export type {
  Constructor,
  ClassDecorator,
  MethodDecorator,
  ParameterDecorator,
  ServiceBinding,
  RouteHandler,
  NextFunction,
  Awaitable,
  Optional,
  RequiredKeys
} from './types'

// 版本信息
export const VERSION = '0.1.0'
```

### 6. 创建临时模块文件（避免构建错误）

**文件**: `src/core/index.ts`
```typescript
// 核心模块 - 稍后实现
export const CORE_MODULE = 'core'
```

**文件**: `src/container/index.ts`
```typescript
// 容器模块 - 稍后实现
export const CONTAINER_MODULE = 'container'
```

**文件**: `src/routing/index.ts`
```typescript
// 路由模块 - 稍后实现
export const ROUTING_MODULE = 'routing'
```

**文件**: `src/middleware/index.ts`
```typescript
// 中间件模块 - 稍后实现
export const MIDDLEWARE_MODULE = 'middleware'
```

**文件**: `src/http/index.ts`
```typescript
// HTTP模块 - 稍后实现
export const HTTP_MODULE = 'http'
```

**文件**: `src/config/index.ts`
```typescript
// 配置模块 - 稍后实现
export const CONFIG_MODULE = 'config'
```

### 7. 创建测试配置

**文件**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/',
        '**/*.d.ts'
      ]
    }
  }
})
```

### 8. 创建基础测试

**文件**: `tests/basic.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { VERSION } from '../src'

describe('Basic Framework Tests', () => {
  it('should export version', () => {
    expect(VERSION).toBe('0.1.0')
  })

  it('should import without errors', async () => {
    const framework = await import('../src')
    expect(framework).toBeDefined()
    expect(framework.VERSION).toBe('0.1.0')
  })
})
```

## 验证步骤

### 1. 安装依赖
```bash
cd packages/cosy-framework
pnpm install
```

### 2. 运行构建
```bash
pnpm run build
```

应该能看到 `dist` 目录被创建，且包含编译后的文件。

### 3. 运行测试
```bash
pnpm test
```

应该能看到测试通过。

### 4. 检查生成的文件
```bash
ls -la dist/
```

应该能看到：
- `index.js`
- `index.d.ts`
- 各个子目录的编译结果

## 完成标志

- [ ] 项目能成功构建（`npm run build` 无错误）
- [ ] 测试能正常运行（`npm test` 通过）
- [ ] TypeScript 类型检查无错误
- [ ] 生成的 `dist` 目录包含所有预期文件

## 下一步

完成此步骤后，继续执行 `step-002-service-container.md`。 
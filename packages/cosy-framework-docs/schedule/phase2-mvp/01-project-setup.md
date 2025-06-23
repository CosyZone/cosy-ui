# MVP 项目设置

在这个阶段，我们将设置一个最小的项目结构，用于验证框架的核心设计。我们将创建 `cosy-framework-mvp` 包，它将实现框架的基本功能。

## 项目结构

首先，我们需要创建以下项目结构：

```
packages/cosy-framework-mvp/
├── package.json         # 项目配置和依赖
├── tsconfig.json       # TypeScript 配置
└── src/
    ├── core/           # 核心功能
    │   └── application.ts
    ├── http/           # HTTP 处理
    │   └── server.ts
    ├── routing/        # 路由系统
    │   └── router.ts
    └── index.ts        # 主入口
```

## 基础依赖

创建 `package.json` 文件，添加必要的依赖：

```json
{
  "name": "@coffic/cosy-framework-mvp",
  "version": "0.1.0",
  "description": "MVP implementation of Cosy Framework",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest",
    "dev": "tsc -w"
  },
  "dependencies": {
    "reflect-metadata": "^0.1.13"
  },
  "devDependencies": {
    "@types/node": "^18.0.0",
    "typescript": "^5.0.0",
    "vitest": "^0.34.0"
  }
}
```

## TypeScript 配置

创建 `tsconfig.json` 文件：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["ES2020"],
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## 入口文件

创建 `src/index.ts` 作为框架的主入口：

```typescript
// 导入基础依赖
import 'reflect-metadata';

// 导出核心功能
export * from './core/application';
export * from './http/server';
export * from './routing/router';
```

## 测试设置

创建 `vitest.config.ts` 文件：

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

## 实现步骤

1. 创建项目目录结构：
   ```bash
   mkdir -p packages/cosy-framework-mvp/src/{core,http,routing}
   ```

2. 初始化 package.json：
   ```bash
   cd packages/cosy-framework-mvp
   pnpm init
   ```

3. 安装依赖：
   ```bash
   pnpm add reflect-metadata
   pnpm add -D @types/node typescript vitest
   ```

4. 创建配置文件：
   - tsconfig.json
   - vitest.config.ts

5. 创建基础源文件：
   - src/index.ts
   - src/core/application.ts
   - src/http/server.ts
   - src/routing/router.ts

## 验证

完成设置后，运行以下命令验证项目配置：

```bash
# 安装依赖
pnpm install

# 检查 TypeScript 编译
pnpm build

# 运行测试
pnpm test
```

## 下一步

在完成项目设置后，我们将在 [核心功能](./02-core-basic.md) 中开始实现框架的基本功能。

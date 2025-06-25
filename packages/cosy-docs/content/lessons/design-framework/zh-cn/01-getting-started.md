---
title: 开始设计 Cosy Framework
---

# 开始设计 Cosy Framework

## 1. 项目设置

### 1.1 创建项目结构

```bash
# 1. 创建项目目录
mkdir -p packages/cosy-framework-design/src

# 2. 初始化 package.json
cd packages/cosy-framework-design
pnpm init

# 3. 安装必要的开发依赖
pnpm add -D typescript @types/node
```

### 1.2 配置 TypeScript

创建 `tsconfig.json`：

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
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 1.3 创建模块结构

首先，我们需要创建基本的目录结构和文件。每个模块都应该包含以下文件：
- `index.ts` - 导出模块的所有内容
- `constants.ts` - 存放常量定义
- `interfaces.ts` - 定义接口
- `types.ts` - 定义类型

按照以下步骤创建项目结构：

1. 在 `src` 目录下创建以下模块目录：
   - `container` - 依赖注入容器
   - `http` - HTTP 相关功能
   - `routing` - 路由系统
   - `middleware` - 中间件系统
   - `config` - 配置系统
   - `core` - 核心功能

2. 在每个模块目录中创建必要的文件：
   ```
   src/
   ├── container/
   │   ├── index.ts
   │   ├── constants.ts
   │   ├── interfaces.ts
   │   └── types.ts
   ├── http/
   │   ├── index.ts
   │   ├── constants.ts
   │   ├── interfaces.ts
   │   └── types.ts
   // ... 其他模块同样的结构
   ```

3. 在每个模块的 `index.ts` 中添加以下导出语句：
   ```typescript
   export * from './constants';
   export * from './interfaces';
   export * from './types';
   ```

4. 在根目录的 `src/index.ts` 中添加以下导出语句：
   ```typescript
   export * from './container';
   export * from './http';
   export * from './routing';
   export * from './middleware';
   export * from './config';
   export * from './core';
   ```

这样的结构设计有以下优点：
- 清晰的模块分离
- 统一的文件组织
- 方便的类型和接口管理
- 集中的常量定义

因为没有实际的导出内容，IDE 可能会提示错误，暂时可忽略。

在接下来的章节中，我们将逐步完善每个模块的具体实现。

## 2. 设计规范

- 接口名使用 `I` 前缀，如 `IContainer`
- 类型名使用 `Type` 后缀，如 `ConfigType`
- 枚举名使用 `Enum` 后缀，如 `ScopeEnum`

```typescript
// 示例
export interface IContainer {
  // ...
}

export type ConfigType = {
  // ...
}

export enum ScopeEnum {
  // ...
}
```

## 3. 开发工具配置

### 3.1 ESLint 配置

安装 ESLint：

```bash
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

创建 `.eslintrc.js`：

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // 自定义规则
  }
};
```

### 3.2 编辑器配置

创建 `.vscode/settings.json`：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 4. 文档规范

### 4.1 接口文档规范

所有接口都应该包含完整的 JSDoc 注释：

```typescript
/**
 * 服务容器接口
 * @interface IContainer
 * @description 负责管理应用中的所有服务实例
 */
export interface IContainer {
  /**
   * 注册一个服务到容器
   * @param token - 服务标识符
   * @param provider - 服务提供者
   */
  register(token: ServiceToken, provider: ServiceProvider): void;
}
```

### 4.2 示例代码规范

所有接口设计都应该包含使用示例：

```typescript
/**
 * @example
 * ```typescript
 * const container = new Container();
 * container.register(UserService, {
 *   useClass: UserServiceImpl
 * });
 * ```
 */
```

## 5. 版本控制

### 5.1 Git 配置

创建 `.gitignore`：

```
node_modules/
dist/
.DS_Store
*.log
```

## 下一步

完成本节的设置后，你的项目应该已经具备了开始设计的基础结构。接下来，我们将开始设计第一个核心模块：[依赖注入系统](./02-dependency-injection.md)。

在继续之前，请确保：
1. 所有的项目结构都已正确创建
2. 开发工具配置完成并正常工作
3. 理解了基本的设计规范和要求 

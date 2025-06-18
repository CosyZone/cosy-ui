# Cosy UI Workspace

这是一个基于 pnpm 的工作空间项目，包含了 Cosy UI 组件库的多个子项目。

## 项目结构

```
cosy-ui/
├── packages/
│   ├── astro/          # Astro 组件库主包
│   └── docs/           # 文档项目
├── package.json        # 工作空间配置
├── pnpm-workspace.yaml # pnpm 工作空间配置
└── README.md
```

## 工作空间管理

### 安装依赖

```bash
# 安装所有项目的依赖
pnpm install

# 为特定项目安装依赖
pnpm --filter @coffic/cosy-ui add <package-name>
pnpm --filter @coffic/cosy-ui-docs add <package-name>
```

### 构建

```bash
# 构建所有项目
pnpm build

# 构建特定项目
pnpm --filter @coffic/cosy-ui build
pnpm --filter @coffic/cosy-ui-docs build
```

### 开发

```bash
# 启动所有项目的开发服务器
pnpm dev

# 启动特定项目的开发服务器
pnpm --filter @coffic/cosy-ui dev
pnpm --filter @coffic/cosy-ui-docs dev
```

### 类型检查

```bash
# 检查所有项目
pnpm check

# 检查特定项目
pnpm --filter @coffic/cosy-ui check
```

### 代码格式化

```bash
# 格式化所有代码
pnpm format

# 代码检查
pnpm lint
```

## 子项目

### @coffic/cosy-ui

主要的 Astro 组件库包，包含所有可复用的 UI 组件。

- **位置**: `packages/cosy-ui/`
- **开发服务器**: `http://localhost:4321`
- **构建输出**: `packages/cosy-ui/dist/`

### @coffic/cosy-ui-docs

组件库的文档网站，使用 Astro 构建。

- **位置**: `packages/docs/`
- **开发服务器**: `http://localhost:6688`
- **构建输出**: `packages/docs/dist-docs/`

## 开发工作流

1. **克隆项目并安装依赖**:

   ```bash
   git clone <repository-url>
   cd cosy-ui
   pnpm install
   ```

2. **开发组件**:

   ```bash
   # 启动组件库开发环境
   pnpm --filter @coffic/cosy-ui dev
   ```

3. **编写文档**:

   ```bash
   # 启动文档开发环境
   pnpm --filter @coffic/cosy-ui-docs dev
   ```

4. **构建和测试**:

   ```bash
   # 构建所有项目
   pnpm build

   # 类型检查
   pnpm check

   # 代码检查
   pnpm lint
   ```

## 工具配置

- **包管理器**: pnpm v8+
- **TypeScript**: 共享配置
- **ESLint**: 支持 Astro 和 TypeScript
- **Prettier**: 代码格式化，支持 Astro
- **Node.js**: v18+

## 许可证

MIT

## 贡献

欢迎贡献代码和建议。请确保在提交前运行 `pnpm lint` 和 `pnpm build`。

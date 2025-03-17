# Cosy UI

这是一个 Astro 组件库，为同一个组织下的多个项目提供统一的 UI 风格。

## 快速开始

安装

```bash
npm install @coffic/cosy-ui
```

在 Astro 组件中使用：

```js
---
import { Button } from "@coffic/cosy-ui";
---
<Button>Hi</Button>
```

## 开发

### 项目结构

项目使用 pnpm 工作区（workspace）管理，包含以下部分：

- `packages/cosy-ui`：组件库的源码
- `demo`：在开发阶段用来测试这些组件的样本项目

### 安装依赖

```bash
pnpm install
```

### 启动

```bash
pnpm run dev
```

### 构建

构建Demo：

```bash
pnpm build
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT

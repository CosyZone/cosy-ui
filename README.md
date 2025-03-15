# Cosy UI

这是一个 Astro 组件库，为同一个组织下的多个项目提供统一的 UI 风格。

## 项目结构

项目使用 pnpm 工作区（workspace）管理，包含以下部分：

- `packages/cosy-ui`：组件库的源码
- `example`：在开发阶段用来测试这些组件的样本项目

## 开发

### 安装依赖

```bash
pnpm install
```

### 开发组件库

```bash
pnpm dev:ui
```

### 开发示例项目

```bash
pnpm dev:example
```

### 构建

构建组件库：

```bash
pnpm build:ui
```

构建示例项目：

```bash
pnpm build:example
```

构建所有项目：

```bash
pnpm build
```

## 样式

- 使用原生 CSS

## 图标

- 统一放入 icons 来管理

## 代码风格

- 遵循关注点分离原则
- 每个文件指处理单一的一件事
- 单个文件不要过大，适当拆分代码到多个文件中

## 安装

```bash
npm install @coffic/cosy-ui
```

在 Tailwind 的 CSS 文件中增加：

```css
@source '../node_modules/@coffic/shared-ui';
```

## 必要依赖

本组件库依赖以下包，请确保您的项目中已正确安装和配置：

- Astro
- TailwindCSS
- DaisyUI

## 内置组件

- Footer
- 更多组件可通过 IDE 的智能提示看到

## 注意事项

1. 本组件库使用 TailwindCSS 和 DaisyUI 的样式类，这意味着：

   - 组件的样式会受到您项目中 Tailwind 配置的影响
   - 如果您修改了 Tailwind 的默认主题或 DaisyUI 的主题，可能会影响组件的外观

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT

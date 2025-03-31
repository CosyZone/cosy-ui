# Cosy UI

[English](#english) | [中文](#chinese)

<a id="english"></a>

## English

This is an Astro component library that provides a unified UI style for multiple projects under the same organization.

### Quick Start

Installation

```bash
npm install @coffic/cosy-ui
```

Usage in Astro components:

```js
---
import { Button } from "@coffic/cosy-ui";
---
<Button>Hi</Button>
```

### Development

#### Project Structure

The project is managed using pnpm workspaces and consists of the following parts:

- `packages/cosy-ui`: Source code of the component library
- `demo`: Sample project used to test these components during development

#### Install Dependencies

```bash
pnpm install
```

#### Start Development Server

```bash
pnpm run dev
```

#### Build

Build the Demo:

```bash
pnpm build
```

### Contributing

Issues and Pull Requests are welcome!

### License

MIT

---

<a id="chinese"></a>

## 中文

这是一个 Astro 组件库，为同一个组织下的多个项目提供统一的 UI 风格。

### 快速开始

Installation

```bash
npm install @coffic/cosy-ui
```

Usage in an Astro component:

```js
---
import { Button } from "@coffic/cosy-ui";
---
<Button>Hi</Button>
```

### 开发

#### 项目结构

The project is managed using pnpm workspaces, and includes the following parts:

- `packages/cosy-ui`: Source code of the component library
- `demo`: Sample project used to test these components during development

#### 安装依赖

```bash
pnpm install
```

#### 启动

```bash
pnpm run dev
```

#### 构建

Build the Demo:

```bash
pnpm build
```

### 贡献

Issues and Pull Requests are welcome!

### 许可证

MIT

# @coffic/shared-ui

Coffic 组织的共享 UI 组件库，提供了一系列可复用的 Astro 组件。

## 特性

- 🎨 独立的主题系统
- 🔌 易于集成
- 🌗 内置暗色模式支持
- 📦 基于 Astro 构建
- 🎯 TypeScript 支持

## 安装

```bash
# npm
npm install @coffic/shared-ui

# pnpm
pnpm add @coffic/shared-ui

# yarn
yarn add @coffic/shared-ui
```

## 快速开始

1. 导入并使用组件：

```astro
---
import { Footer } from '@coffic/shared-ui';

const footerConfig = {
  homeLink: '/',
  siteName: 'Your Site',
  slogan: 'Your Slogan',
  // ... 其他配置
};
---

<Footer config={footerConfig} />
```

2. 配置主题（在你的入口文件中）：

```typescript
import { applyTheme } from '@coffic/shared-ui/themes';

// 使用默认主题
applyTheme('light');

// 或者自定义主题
applyTheme({
  '--ui-primary-color': '#your-color',
  '--ui-secondary-color': '#your-secondary-color',
  // ... 其他自定义值
});
```

## 主题定制

组件库使用 CSS 变量进行主题定制。你可以覆盖以下变量来自定义主题：

```css
:root {
  --ui-primary-color: #4a90e2;
  --ui-secondary-color: #f5f5f5;
  --ui-background-color: #ffffff;
  --ui-text-color: #333333;
  --ui-spacing-base: 1rem;
  --ui-border-radius: 0.25rem;
}
```

### DaisyUI 集成

如果你的项目使用 DaisyUI，可以这样映射变量：

```css
:root {
  --ui-primary-color: var(--p);
  --ui-secondary-color: var(--s);
  --ui-background-color: var(--b1);
  --ui-text-color: var(--bc);
}
```

## 组件文档

### Footer

页脚组件，支持自定义导航链接和社交媒体图标。

```typescript
interface FooterConfig {
  homeLink: string; // 首页链接
  siteName: string; // 站点名称
  slogan: string; // 站点标语
  socialLinks: Array<{
    // 社交媒体链接
    name: string;
    url: string;
    icon: Component;
  }>;
  navGroups: Array<{
    // 导航组
    titleKey: string;
    links: Array<{
      href: string;
      text: string;
      external?: boolean;
    }>;
  }>;
  inspirationalSlogan: string; // 鼓励性标语
  company: string; // 公司名称
  copyright: string; // 版权信息
  icp?: string; // ICP 备案号（可选）
}
```

使用示例：

```astro
---
import { Footer } from '@coffic/shared-ui';
import { RiGithubFill } from '@remixicon/vue';

const footerConfig = {
  homeLink: '/',
  siteName: 'My Site',
  slogan: 'Amazing slogan here',
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/your-org',
      icon: RiGithubFill
    }
  ],
  // ... 其他配置
};
---

<Footer config={footerConfig} />
```

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的改动 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

[MIT License](LICENSE)

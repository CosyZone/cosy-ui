# @coffic/shared-ui

🎨 Coffic 组织的共享 UI 组件库，基于 Vue 3 和 TailwindCSS 构建，提供了一系列可复用的组件。

## ✨ 特性

- 🎯 基于 Vue 3 构建
- 🎨 完整的 TypeScript 支持
- 🌗 内置暗色模式支持
- 📦 支持 ESM 和 CommonJS 模块格式
- 🔌 易于集成
- 🎨 使用 TailwindCSS 进行样式管理

## 📦 安装

```bash
# npm
npm install @coffic/shared-ui

# pnpm
pnpm add @coffic/shared-ui

# yarn
yarn add @coffic/shared-ui
```

## 🚀 快速开始

1. 导入样式和组件：

```vue
<script setup lang="ts">
  import { Footer } from '@coffic/shared-ui';
  import '@coffic/shared-ui/style.css';
  import { RiGithubFill } from '@remixicon/vue';

  const footerConfig = {
    homeLink: '/',
    siteName: 'Your Site',
    slogan: 'Your Slogan',
    socialLinks: [
      {
        name: 'GitHub',
        url: 'https://github.com/your-org',
        icon: {
          type: 'component',
          content: RiGithubFill,
        },
      },
    ],
    navGroups: [
      {
        titleKey: 'Products',
        links: [
          {
            href: '/products',
            text: 'All Products',
            external: false,
          },
        ],
      },
    ],
    inspirationalSlogan: 'Building the future together',
    company: 'Your Company',
    copyright: 'All rights reserved',
  };
</script>

<template>
  <Footer :config="footerConfig" />
</template>
```

## 🎨 主题定制

组件库使用 TailwindCSS 进行样式管理，支持通过 CSS 变量进行主题定制：

```css
:root {
  --shared-ui-primary-color: #4a90e2;
  --shared-ui-secondary-color: #f5f5f5;
  --shared-ui-background-color: #ffffff;
  --shared-ui-text-color: #333333;
}

/* 暗色主题 */
[data-theme='dark'] {
  --shared-ui-background-color: #1a1a1a;
  --shared-ui-text-color: #ffffff;
  --shared-ui-primary-color: #60a5fa;
  --shared-ui-secondary-color: #374151;
}
```

## 📝 组件文档

### Footer

页脚组件，支持自定义导航链接和社交媒体图标。

#### Props

```typescript
interface FooterProps {
  config: {
    homeLink: string; // 首页链接
    siteName: string; // 站点名称
    slogan: string; // 站点标语
    socialLinks: Array<{
      // 社交媒体链接
      name: string;
      url: string;
      icon: {
        type: 'svg' | 'image' | 'component';
        content: string | Component;
      };
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
  };
}
```

## 🛠️ 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的改动 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 📄 许可证

[MIT License](LICENSE)

# Coffic Shared UI

这是一个 Astro 组件库，为同一个组织下的多个项目提供统一的 UI 风格。

## 安装

```bash
npm install @coffic/shared-ui
```

## 必要依赖

本组件库依赖以下包，请确保您的项目中已正确安装和配置：

### 1. Astro

确保您的项目是一个 Astro 项目。如果不是，可以按照以下步骤创建：

```bash
npm create astro@latest
```

### 2. TailwindCSS

如果您的项目还没有配置 TailwindCSS，请按照以下步骤安装：

```bash
npm install -D tailwindcss @astrojs/tailwind
```

然后在您的 `astro.config.mjs` 中添加：

```javascript
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
});
```

### 3. DaisyUI

安装 DaisyUI：

```bash
npm install -D daisyui
```

在您的 `tailwind.config.js` 中添加 DaisyUI：

```javascript
export default {
  plugins: [require('daisyui')],
};
```

### 4. CSS

```css
@source '../node_modules/@coffic/shared-ui';
```

## 内置组件

- Footer
- 更多组件可通过 IDE 的智能提示看到

## 注意事项

1. 本组件库使用 TailwindCSS 和 DaisyUI 的样式类，这意味着：

   - 组件的样式会受到您项目中 Tailwind 配置的影响
   - 如果您修改了 Tailwind 的默认主题或 DaisyUI 的主题，可能会影响组件的外观

2. 建议在您的项目中保持默认的 Tailwind 和 DaisyUI 配置，以确保组件显示正常

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT

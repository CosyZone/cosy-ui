# Cosy UI

这是一个 Astro 组件库，为同一个组织下的多个项目提供统一的 UI 风格。

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

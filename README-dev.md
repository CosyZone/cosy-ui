# 开发

## 常见问题

1. 使用组件库时依赖 TailwindCSS 吗？

不需要。因为 pnpm build 时，生成了构建后的app.css。

- pnpm build 时，使用vite构建
- vite.config.ts 中有 TailwindCSS 的插件
- 构建出app.css放入dist目录


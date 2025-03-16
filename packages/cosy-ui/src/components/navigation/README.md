# 导航组件 (Navigation Components)

这个目录包含了与网站导航和用户界面导航相关的组件。

## 设计原则

1. **直观性**：导航应该清晰易懂，用户能够直观地理解如何使用
2. **一致性**：导航行为和样式应该在整个应用中保持一致
3. **响应式**：适应不同的屏幕尺寸和设备类型

## 包含的组件

- `LanguageSwitcher.astro`: 语言切换组件
- `ThemeSwitcher.astro`: 主题切换组件
- `TableOfContents.astro`: 目录导航组件

## 使用指南

导航组件通常需要配置相应的数据和回调函数：

```astro
<LanguageSwitcher languages={['zh', 'en']} />
<TableOfContents items={tocItems} />
``` 
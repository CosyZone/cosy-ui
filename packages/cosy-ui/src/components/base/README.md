# 基础组件 (Base Components)

这个目录包含了最基础和常用的UI组件，它们是构建用户界面的基础构建块。

## 设计原则

1. **简单性**：每个组件都应该专注于单一功能
2. **可复用性**：组件应该足够通用，可以在各种场景下使用
3. **可定制性**：提供足够的props来满足不同的使用需求

## 包含的组件

- `Root.astro`: 根组件，负责全局样式和配置的管理
- `Button.astro`: 按钮组件，用于触发操作
- `Link.astro`: 链接组件，用于页面导航
- `Image.astro`: 图片组件，提供图片加载优化
- `ThemeItem.astro`: 主题项组件，用于主题切换
- `Alert.astro`: 提示组件，用于显示重要信息

## 使用指南

### Root 组件

Root 组件是所有其他组件的容器，负责：

- 导入全局样式
- 提供主题支持
- 设置语言环境
- 管理过渡动画

必须将其他组件包裹在 Root 组件内使用：

```astro
---
import { Root, Button, Alert } from '@coffic/cosy-ui';
---

<Root theme="light" lang="zh">
  <Button variant="primary">点击我</Button>
  <Alert type="info">这是一条信息</Alert>
</Root>
```

### 其他基础组件

所有基础组件都需要在 Root 组件内使用：

```astro
<Root>
  <Button variant="primary" size="md">点击我</Button>
  <Alert type="info">这是一条信息</Alert>
</Root>
```

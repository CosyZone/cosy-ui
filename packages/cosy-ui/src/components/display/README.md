# 展示组件 (Display Components)

这个目录包含了用于内容展示的组件，主要用于展示信息和内容的呈现。

## 设计原则

1. **视觉层次**：合理使用视觉层次来突出重要信息
2. **一致的美学**：保持组件风格的一致性
3. **灵活布局**：适应不同的内容长度和类型

## 包含的组件

- `Card.astro`: 卡片组件，用于信息分组展示
- `Banner.astro`: 横幅组件，用于重要信息展示
- `Hero.astro`: 英雄区组件，用于页面主要内容展示
- `Modal.astro`: 模态框组件，用于弹出式内容展示
- `CodeBlock.astro`: 代码块组件，用于代码展示
- `CodeExample.astro`: 代码示例组件，用于展示可运行的代码示例

## 使用指南

展示组件通常需要传入具体的内容和配置：

```astro
<Card title="标题">
  这是卡片内容
</Card>

<Modal isOpen={true} onClose={handleClose}>
  这是模态框内容
</Modal>
``` 
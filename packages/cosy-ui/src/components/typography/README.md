# 排版组件 (Typography Components)

这个目录包含了用于文本排版和内容展示的基础组件。

## 设计原则

1. **可读性**：确保文本清晰易读
2. **层次感**：通过不同的文本样式创建视觉层次
3. **一致性**：保持文本样式的一致性

## 包含的组件

- `Heading.astro`: 标题组件，用于各级标题
- `Article.astro`: 文章组件，用于文章内容的排版
- `Text.astro`: 文本组件，用于普通段落文本

## 使用指南

排版组件用于构建结构化的文本内容：

```astro
<Heading level={1}>主标题</Heading>
<Heading level={2}>副标题</Heading>

<Article>
  <Text>这是一段普通的文本内容</Text>
  <Text variant="lead">这是一段引导文本</Text>
</Article>
```

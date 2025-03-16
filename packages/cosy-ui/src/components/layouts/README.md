# 布局组件 (Layout Components)

这个目录包含了用于页面布局和元素排列的基础组件。

## 设计原则

1. **灵活性**：适应各种布局需求
2. **响应式**：自适应不同屏幕尺寸
3. **可组合**：组件之间可以自由组合使用

## 包含的组件

- `Grid.astro`: 网格布局组件
- `Flex.astro`: 弹性布局组件
- `Stack.astro`: 堆叠布局组件

## 使用指南

布局组件通常作为容器使用，可以嵌套其他组件：

```astro
<Grid cols={3} gap="md">
  <Card />
  <Card />
  <Card />
</Grid>

<Flex justify="between" align="center">
  <div>左侧内容</div>
  <div>右侧内容</div>
</Flex>

<Stack gap="lg">
  <div>第一项</div>
  <div>第二项</div>
</Stack>
``` 
<!--
@component Container

@description
Container 组件是一个基础的布局容器，用于限制内容宽度并居中显示。
它提供了多种尺寸和内边距选项，适用于各种布局需求。

@design
设计理念：
1. 内容约束 - 限制内容宽度，提高可读性和视觉美感
2. 响应式设计 - 在不同屏幕尺寸下自动调整内边距
3. 灵活配置 - 支持多种尺寸和内边距选项
4. 简单易用 - 提供直观的API，易于集成到各种页面布局中

@usage
基本用法：
```vue
<Container>
  <p>内容将被限制在一个合理的宽度内并居中显示</p>
</Container>
```

自定义尺寸和内边距：
```vue
<Container size="sm" padding="lg">
  <p>小尺寸容器，大内边距</p>
</Container>
```

全宽容器：
```vue
<Container size="full" padding="none">
  <p>全宽容器，无内边距</p>
</Container>
```

不居中的容器：
```vue
<Container :centered="false">
  <p>不居中的容器，靠左对齐</p>
</Container>
```

带边框的容器：
```vue
<Container border>
  <p>带有边框的容器</p>
</Container>
```

Flex布局容器（按行排列）：
```vue
<Container flex="row" gap="md">
  <div>第一项</div>
  <div>第二项</div>
</Container>
```

Flex布局容器（按列排列）：
```vue
<Container flex="col" gap="md" items="center" justify="between">
  <div>第一项</div>
  <div>第二项</div>
</Container>
```

@props
@prop {('xs'|'sm'|'md'|'lg'|'xl'|'full')} [size='md'] - 容器尺寸
@prop {('none'|'sm'|'md'|'lg'|'xl')} [padding='md'] - 内边距大小
@prop {boolean} [centered=true] - 是否居中显示
@prop {boolean} [border=false] - 是否显示边框
@prop {('row'|'col'|'row-reverse'|'col-reverse')} [flex] - flex布局方向
@prop {('none'|'xs'|'sm'|'md'|'lg'|'xl')} [gap='none'] - flex项目间距
@prop {('start'|'end'|'center'|'baseline'|'stretch')} [items] - flex项目水平对齐方式
@prop {('start'|'end'|'center'|'between'|'around'|'evenly')} [justify] - flex项目垂直对齐方式
@prop {string} [class=''] - 自定义类名
-->

<script setup lang="ts">
import '../../style';
import { computed } from 'vue';

interface Props {
  /**
   * 容器尺寸
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * 内边距大小
   * @default "md"
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 是否居中显示
   * @default true
   */
  centered?: boolean;

  /**
   * 是否显示边框
   * @default false
   */
  border?: boolean;

  /**
   * flex布局方向，不设置则不启用flex布局
   */
  flex?: 'row' | 'col' | 'row-reverse' | 'col-reverse';

  /**
   * flex项目间距
   * @default "none"
   */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * flex项目水平对齐方式
   */
  items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';

  /**
   * flex项目垂直对齐方式
   */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

  /**
   * 自定义类名
   */
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  padding: 'md',
  centered: true,
  border: false,
  gap: 'none',
  class: '',
});

// 静态类名映射
const sizeClasses = {
  xs: 'cosy:max-w-xs',
  sm: 'cosy:max-w-sm',
  md: 'cosy:max-w-2xl',
  lg: 'cosy:max-w-4xl',
  xl: 'cosy:max-w-6xl',
  full: 'cosy:w-full',
} as const;

const paddingClasses = {
  none: 'cosy:p-0',
  sm: 'cosy:p-2',
  md: 'cosy:p-4',
  lg: 'cosy:p-6',
  xl: 'cosy:p-8',
} as const;

const flexClasses = {
  row: 'cosy:flex cosy:flex-row',
  col: 'cosy:flex cosy:flex-col',
  'row-reverse': 'cosy:flex cosy:flex-row-reverse',
  'col-reverse': 'cosy:flex cosy:flex-col-reverse',
} as const;

const gapClasses = {
  none: 'cosy:gap-0',
  xs: 'cosy:gap-1',
  sm: 'cosy:gap-2',
  md: 'cosy:gap-4',
  lg: 'cosy:gap-6',
  xl: 'cosy:gap-8',
} as const;

const itemsClasses = {
  start: 'cosy:items-start',
  end: 'cosy:items-end',
  center: 'cosy:items-center',
  baseline: 'cosy:items-baseline',
  stretch: 'cosy:items-stretch',
} as const;

const justifyClasses = {
  start: 'cosy:justify-start',
  end: 'cosy:justify-end',
  center: 'cosy:justify-center',
  between: 'cosy:justify-between',
  around: 'cosy:justify-around',
  evenly: 'cosy:justify-evenly',
} as const;

// 构建CSS类名
const containerClasses = computed(() => [
  'cosy:w-full',
  props.centered ? 'cosy:mx-auto' : '',
  sizeClasses[props.size],
  paddingClasses[props.padding],
  props.border ? 'cosy:border cosy:rounded-lg' : '',
  props.flex ? flexClasses[props.flex] : '',
  props.flex ? gapClasses[props.gap] : '',
  props.items && props.flex ? itemsClasses[props.items] : '',
  props.justify && props.flex ? justifyClasses[props.justify] : '',
  props.class,
]);
</script>

<template>
  <section :class="containerClasses">
    <slot />
  </section>
</template>

<!--
@component Badge
@description 一个用于高亮信息的小组件。
@usage
```vue
<Badge>默认</Badge>
<Badge variant="primary">Primary</Badge>
```
@props
@prop {('primary'|'secondary'|'accent'|'ghost'|'info'|'success'|'warning'|'error')} [variant] - 徽章的颜色变体。
@prop {('xs'|'sm'|'md'|'lg')} [size] - 徽章的尺寸。
@prop {boolean} [outline=false] - 徽章是否为描边样式。
@prop {string} [class] - 自定义 CSS 类。
@slots
@slot default - 徽章内容。
-->
<script setup lang="ts">
  import { computed } from 'vue';
  import type { IBadgeProps } from './props';
  import { BadgeFacade } from '../../src/components/badge';

  const props = withDefaults(defineProps<IBadgeProps>(), {
    outline: false,
  });

  // 使用 Badge 门面获取类名
  const badgeClasses = computed(() => BadgeFacade.getClassString(props));
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

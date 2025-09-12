<script setup lang="ts">
import '../../style';
import { computed } from 'vue';
import type { IContainerProps } from './types';
import { allBackgroundClasses } from '../../src/common/backgrounds';
import {
  widthClasses,
  flexClasses,
  gapClasses,
  itemsClasses,
  justifyClasses,
  roundedClasses,
} from '../../src/common';
import { paddingClasses } from '../../src/common/padding';

/**
 * @component Container
 * @description Vue 版本的 Container 组件，是一个基础的布局容器，用于限制内容宽度并居中显示
 * @props {boolean} [border=false] - 是否显示边框
 * @props {boolean} [centered=true] - 是否居中显示
 * @props {string} [class=''] - 自定义类名
 * @props {('row'|'col'|'row-reverse'|'col-reverse')} [flex] - flex布局方向
 * @props {('none'|'xs'|'sm'|'md'|'lg'|'xl')} [gap='none'] - flex项目间距
 * @props {('start'|'end'|'center'|'baseline'|'stretch')} [items] - flex项目水平对齐方式
 * @props {('start'|'end'|'center'|'between'|'around'|'evenly')} [justify] - flex项目垂直对齐方式
 * @props {('none'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl')} [padding='md'] - 内边距大小
 * @props {('xs'|'sm'|'md'|'lg'|'xl'|'full')} [size='md'] - 容器尺寸
 * @props {('none'|'sm'|'md'|'lg'|'xl'|'full')} [rounded='none'] - 圆角大小
 * @props {string} [background] - 预设的语义化背景色，使用 Tailwind v4 语法（如 bg-primary/50）
 */

interface Props extends IContainerProps {}

const props = withDefaults(defineProps<Props>(), {
  padding: 'md',
  centered: true,
  border: false,
  gap: 'none',
  rounded: 'none',
  class: '',
});

// 构建CSS类名
const resolvedSize = computed(() => props.width ?? 'md');

const containerClasses = computed(() => [
  'cosy:w-full',
  props.centered ? 'cosy:mx-auto' : '',
  widthClasses[resolvedSize.value],
  paddingClasses[props.padding],
  roundedClasses[props.rounded],
  props.border ? 'cosy:border' : '',
  props.flex ? flexClasses[props.flex] : '',
  props.flex ? gapClasses[props.gap] : '',
  props.items && props.flex ? itemsClasses[props.items] : '',
  props.justify && props.flex ? justifyClasses[props.justify] : '',
  // 处理背景色 - 使用预定义的完整类名
  props.background
    ? allBackgroundClasses[
        props.background as keyof typeof allBackgroundClasses
      ]
    : '',
  props.class,
]);
</script>

<template>
  <section :class="containerClasses" container>
    <slot />
  </section>
</template>

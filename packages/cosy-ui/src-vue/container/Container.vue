<script setup lang="ts">
import '../../style';
import { computed } from 'vue';
import type { IContainerProps } from './types';
import { allBackgroundClasses } from './backgrounds';

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
 * @props {('none'|'sm'|'md'|'lg'|'xl')} [padding='md'] - 内边距大小
 * @props {('xs'|'sm'|'md'|'lg'|'xl'|'full')} [size='md'] - 容器尺寸
 * @props {('none'|'sm'|'md'|'lg'|'xl'|'full')} [rounded='none'] - 圆角大小
 * @props {string} [background] - 预设的语义化背景色，使用 Tailwind v4 语法（如 bg-primary/50）
 */

interface Props extends IContainerProps { }

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    padding: 'md',
    centered: true,
    border: false,
    gap: 'none',
    rounded: 'none',
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

const roundedClasses = {
    none: '',
    sm: 'cosy:rounded-sm',
    md: 'cosy:rounded-md',
    lg: 'cosy:rounded-lg',
    xl: 'cosy:rounded-xl',
    full: 'cosy:rounded-full',
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
    roundedClasses[props.rounded],
    props.border ? 'cosy:border' : '',
    props.flex ? flexClasses[props.flex] : '',
    props.flex ? gapClasses[props.gap] : '',
    props.items && props.flex ? itemsClasses[props.items] : '',
    props.justify && props.flex ? justifyClasses[props.justify] : '',
    // 处理背景色 - 使用预定义的完整类名
    props.background ? allBackgroundClasses[props.background] : '',
    props.class,
]);
</script>

<template>
    <section :class="containerClasses" container>
        <slot />
    </section>
</template>

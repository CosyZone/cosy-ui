<script setup lang="ts">
import { computed } from 'vue';

/**
 * @component Text
 *
 * @description
 * Text 组件用于创建各种文本元素，提供一致的排版样式和灵活的定制选项。
 *
 * @design
 * 设计理念：
 * 1. 一致性 - 确保整个应用中文本样式的一致性
 * 2. 可读性 - 优化文本的可读性和舒适度
 * 3. 可定制性 - 支持多种配置选项，适应不同场景需求
 * 4. 无障碍性 - 遵循语义化HTML标准，确保屏幕阅读器可以正确解析内容
 *
 * @usage
 * 基本用法：
 * ```vue
 * <Text>这是一段普通文本</Text>
 * ```
 *
 * 不同大小：
 * ```vue
 * <Text size="xs">超小文本</Text>
 * <Text size="sm">小文本</Text>
 * <Text size="md">中等文本</Text>
 * <Text size="lg">大文本</Text>
 * <Text size="xl">超大文本</Text>
 * ```
 *
 * @props
 * @prop {string} [as='p'] - 要渲染的HTML元素，如 'p', 'span', 'div' 等
 * @prop {'xs'|'sm'|'md'|'lg'|'xl'} [size='md'] - 文本大小
 * @prop {'light'|'normal'|'medium'|'semibold'|'bold'} [weight='normal'] - 字体粗细
 * @prop {'default'|'primary'|'secondary'|'accent'|'muted'} [color='default'] - 文本颜色
 * @prop {'left'|'center'|'right'|'justify'} [align='left'] - 文本对齐方式
 * @prop {boolean} [italic=false] - 是否使用斜体
 * @prop {boolean} [underline=false] - 是否添加下划线
 * @prop {boolean} [truncate=false] - 是否截断文本并显示省略号
 * @prop {string} [class] - 自定义 CSS 类名
 * @prop {string} [style] - 自定义内联样式
 */

export interface ITextProps {
  as?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted';
  align?: 'left' | 'center' | 'right' | 'justify';
  italic?: boolean;
  underline?: boolean;
  truncate?: boolean;
  class?: string;
  style?: string;
}

const props = withDefaults(defineProps<ITextProps>(), {
  as: 'p',
  size: 'md',
  weight: 'normal',
  color: 'default',
  align: 'left',
  italic: false,
  underline: false,
  truncate: false,
  class: '',
  style: '',
});

// 根据大小设置样式
const sizeClasses = {
  xs: 'cosy:text-xs',
  sm: 'cosy:text-sm',
  md: 'cosy:text-base',
  lg: 'cosy:text-lg',
  xl: 'cosy:text-xl',
};

// 根据粗细设置样式
const weightClasses = {
  light: 'cosy:font-light',
  normal: 'cosy:font-normal',
  medium: 'cosy:font-medium',
  semibold: 'cosy:font-semibold',
  bold: 'cosy:font-bold',
};

// 根据颜色设置样式
const colorClasses = {
  default: '',
  primary: 'cosy:text-primary-600 cosy:dark:text-primary-400',
  secondary: 'cosy:text-secondary-600 cosy:dark:text-secondary-400',
  accent: 'cosy:text-accent-600 cosy:dark:text-accent-400',
  muted: 'cosy:text-gray-600 cosy:dark:text-gray-400',
};

// 根据对齐方式设置样式
const alignClasses = {
  left: 'cosy:text-left',
  center: 'cosy:text-center',
  right: 'cosy:text-right',
  justify: 'cosy:text-justify',
};

// 计算样式类
const element = computed(() => props.as);
const sizeClass = computed(() => sizeClasses[props.size]);
const weightClass = computed(() => weightClasses[props.weight]);
const colorClass = computed(() => colorClasses[props.color]);
const alignClass = computed(() => alignClasses[props.align]);
const italicClass = computed(() => (props.italic ? 'cosy:italic' : ''));
const underlineClass = computed(() =>
  props.underline ? 'cosy:underline' : ''
);
const truncateClass = computed(() => (props.truncate ? 'cosy:truncate' : ''));

// 组合所有类名
const combinedClass = computed(
  () =>
    `text ${sizeClass.value} ${weightClass.value} ${colorClass.value} ${alignClass.value} ${italicClass.value} ${underlineClass.value} ${truncateClass.value} ${props.class}`
);
</script>

<template>
  <component :is="element" :class="combinedClass" :style="style">
    <slot />
  </component>
</template>

<style scoped>
.text {
  margin-bottom: 1em;
  line-height: 1.5;
}

/* 确保截断文本正常工作 */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>

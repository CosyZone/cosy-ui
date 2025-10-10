<script setup lang="ts">
import { computed } from "vue";
import { textColorClasses } from "../../src/common/textColors";
import { textWeightClasses } from "../../src/common/textWeights";
import { textSizeClasses } from "../../src/common/textSizes";
import { textAlignClasses } from "../../src/common/textAlign";
import type { ITextProps } from "./props";
import { textDefaultProps } from "./props";

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
 * 不同颜色：
 * ```vue
 * <Text color="primary">主要颜色文本</Text>
 * <Text color="secondary">次要颜色文本</Text>
 * <Text color="accent">强调色文本</Text>
 * <Text color="muted">柔和色文本</Text>
 * ```
 *
 * 字体粗细：
 * ```vue
 * <Text weight="light">细体文本</Text>
 * <Text weight="normal">常规文本</Text>
 * <Text weight="medium">中等粗文本</Text>
 * <Text weight="semibold">半粗体文本</Text>
 * <Text weight="bold">粗体文本</Text>
 * ```
 *
 * 文本对齐：
 * ```vue
 * <Text align="left">左对齐文本</Text>
 * <Text align="center">居中对齐文本</Text>
 * <Text align="right">右对齐文本</Text>
 * <Text align="justify">两端对齐文本</Text>
 * ```
 *
 * 文本截断：
 * ```vue
 * <Text truncate>这是一段很长的文本，将会被截断并显示省略号...</Text>
 * ```
 *
 * 组合使用：
 * ```vue
 * <Text
 *   size="lg"
 *   color="primary"
 *   weight="bold"
 *   align="center"
 *   class="my-4"
 * >
 *   这是一段重要的提示文本
 * </Text>
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

const props = withDefaults(defineProps<ITextProps>(), textDefaultProps);

// 根据大小设置样式（使用 common 映射）
const sizeClass = computed(() => textSizeClasses[props.size]);

// 根据粗细设置样式（使用 common 映射）
const weightClass = computed(() => textWeightClasses[props.weight]);

// 根据颜色设置样式（使用 common 映射）
const colorClass = computed(() => textColorClasses[props.color]);

// 根据对齐方式设置样式（使用 common 映射）
const alignClass = computed(() => textAlignClasses[props.align]);

// 其他样式
const italicClass = computed(() => (props.italic ? "cosy:italic" : ""));
const underlineClass = computed(() => (props.underline ? "cosy:underline" : ""));
const truncateClass = computed(() => (props.truncate ? "cosy:truncate" : ""));

// 组合所有类名
const combinedClass = computed(
  () =>
    `text ${sizeClass.value} ${weightClass.value} ${colorClass.value} ${alignClass.value} ${italicClass.value} ${underlineClass.value} ${truncateClass.value} ${props.class}`,
);
</script>

<template>
  <component :is="props.as" :class="combinedClass" :style="style">
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
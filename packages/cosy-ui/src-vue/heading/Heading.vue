<template>
  <component :is="headingTag" :id="id" :class="combinedClass">
    <slot />
    <HeadingAnchor :id="id" :show="anchor" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import HeadingAnchor from './HeadingAnchor.vue';
import type { IHeadingProps } from './types';
import {
  getBackgroundClass,
  type BackgroundColor,
} from '../../src/common/backgrounds';

/**
 * @component Heading
 *
 * @description
 * Heading 组件用于创建各级标题，提供一致的排版样式和灵活的定制选项。
 * 支持链接功能，当传入 href 属性时，标题会变成可点击的链接。
 * 组件保持语义化结构：即使作为链接使用时，仍然渲染正确的 h1-h6 标签。
 *
 * @design
 * 设计理念：
 * 1. 层次清晰 - 通过不同级别的标题建立内容的视觉层次结构
 * 2. 一致性 - 确保整个应用中标题样式的一致性
 * 3. 可定制性 - 支持多种配置选项，适应不同场景需求
 * 4. 字体控制 - 提供精细的字体粗细控制，满足不同设计需求
 * 5. 无障碍性 - 遵循语义化HTML标准，确保屏幕阅读器可以正确解析内容结构
 * 6. 链接支持 - 标题可以作为链接使用，提供更好的导航体验
 *
 * 视觉特点：
 * - 字体大小和粗细随级别变化
 * - 支持自定义字体粗细（thin 到 black 共8个级别）
 * - 可选的下划线或底部边框
 * - 可定制的颜色和间距
 * - 响应式设计，在不同屏幕尺寸下保持良好的可读性
 * - 链接状态下的悬停效果
 *
 * @usage
 * 基本用法：
 * ```vue
 * <Heading :level="1">这是一个一级标题</Heading>
 * <Heading :level="2">这是一个二级标题</Heading>
 * <Heading :level="3">这是一个三级标题</Heading>
 * ```
 *
 * 链接标题：
 * ```vue
 * <Heading :level="2" href="/about">关于我们</Heading>
 * <Heading :level="3" href="https://example.com" :external="true">外部链接标题</Heading>
 * ```
 *
 * 自定义样式：
 * ```vue
 * <Heading :level="2" color="primary" :underline="true">带下划线的二级标题</Heading>
 * ```
 *
 * 带锚点链接：
 * ```vue
 * <Heading :level="2" id="section-1" :anchor="true">带锚点的标题</Heading>
 * ```
 *
 * 自定义间距：
 * ```vue
 * <Heading :level="1" class="cosy:mb-8">自定义底部间距的标题</Heading>
 * ```
 *
 * 外边距控制：
 * ```vue
 * <Heading :level="2" margin="none">无外边距的标题</Heading>
 * <Heading :level="2" margin="sm">小外边距的标题</Heading>
 * <Heading :level="2" margin="lg">大外边距的标题</Heading>
 * <Heading :level="2" margin="xl">超大外边距的标题</Heading>
 * ```
 *
 * 背景色支持：
 * ```vue
 * <Heading :level="3" background="base-300" padding="sm">带背景色的标题</Heading>
 * <Heading :level="3" background="primary" color="white">主要背景色标题</Heading>
 * <Heading :level="3" background="primary/50" padding="sm">半透明背景色标题</Heading>
 * ```
 *
 * 字体粗细支持：
 * ```vue
 * <Heading :level="2" weight="thin">细体标题</Heading>
 * <Heading :level="2" weight="light">轻体标题</Heading>
 * <Heading :level="2" weight="normal">正常标题</Heading>
 * <Heading :level="2" weight="medium">中等标题</Heading>
 * <Heading :level="2" weight="semibold">半粗体标题</Heading>
 * <Heading :level="2" weight="bold">粗体标题</Heading>
 * <Heading :level="2" weight="extrabold">特粗体标题</Heading>
 * <Heading :level="2" weight="black">超粗体标题</Heading>
 * ```
 *
 * @props
 * @prop {'left'|'center'|'right'} [align='left'] - 文本对齐方式
 * @prop {boolean} [anchor=false] - 是否显示锚点链接图标
 * @prop {BackgroundColor} [background] - 背景色类型，支持所有预设背景色和透明度变体
 * @prop {'default'|'primary'|'secondary'|'accent'|'muted'|'info'|'success'|'warning'|'error'|'base-content'|'neutral-content'} [color='default'] - 标题颜色
 * @prop {string} [class] - 自定义 CSS 类名
 * @prop {boolean} [external=false] - 是否为外部链接，影响链接的打开方式
 * @prop {string} [href] - 链接地址，传入后标题会变成可点击的链接
 * @prop {string} [id] - 标题的 ID，用于锚点链接
 * @prop {1|2|3|4|5|6} [level=2] - 标题级别，对应 h1-h6 标签
 * @prop {'none'|'sm'|'md'|'lg'|'xl'} [margin='md'] - 上下外边距大小
 * @prop {'none'|'sm'|'md'|'lg'|'xl'} [padding='none'] - 内边距大小（仅在设置背景色时生效）
 * @prop {boolean} [underline=false] - 是否显示下划线
 * @prop {'thin'|'light'|'normal'|'medium'|'semibold'|'bold'|'extrabold'|'black'} [weight] - 字体粗细，不指定时根据标题级别使用默认粗细（h1: bold, h2-h3: semibold, h4-h6: medium）
 *
 * @slots
 * @slot default - 标题内容
 *
 * @accessibility
 * - 使用语义化的 h1-h6 标签
 * - 锚点链接带有描述性 aria-label
 * - 遵循标题层次结构的最佳实践
 * - 链接标题保持良好的可访问性
 *
 * @dependencies
 * 依赖于以下组件：
 * - HeadingAnchor (用于锚点链接)
 */

interface Props extends IHeadingProps {}

const props = withDefaults(defineProps<Props>(), {
  align: 'left',
  anchor: false,
  color: 'default',
  external: false,
  level: 2,
  margin: 'md',
  padding: 'none',
  underline: false,
  weight: undefined,
});

// 字体粗细映射
const weightClassMap = {
  thin: 'cosy:font-thin',
  light: 'cosy:font-light',
  normal: 'cosy:font-normal',
  medium: 'cosy:font-medium',
  semibold: 'cosy:font-semibold',
  bold: 'cosy:font-bold',
  extrabold: 'cosy:font-extrabold',
  black: 'cosy:font-black',
};

// 根据级别设置基础样式（不包含字体粗细）
const baseHeadingClass = computed(() => {
  const levelMap = {
    1: 'cosy:text-4xl',
    2: 'cosy:text-3xl',
    3: 'cosy:text-2xl',
    4: 'cosy:text-xl',
    5: 'cosy:text-lg',
    6: 'cosy:text-base',
  };
  return levelMap[props.level as keyof typeof levelMap] || levelMap[2];
});

// 默认字体粗细（当未指定 weight 时使用）
const defaultWeightClass = computed(() => {
  const defaultMap = {
    1: 'cosy:font-bold',
    2: 'cosy:font-semibold',
    3: 'cosy:font-semibold',
    4: 'cosy:font-medium',
    5: 'cosy:font-medium',
    6: 'cosy:font-medium',
  };
  return defaultMap[props.level as keyof typeof defaultMap] || defaultMap[2];
});

// 字体粗细样式
const weightClass = computed(() => {
  if (props.weight && props.weight in weightClassMap) {
    return weightClassMap[props.weight as keyof typeof weightClassMap];
  }
  return defaultWeightClass.value;
});

// 组合标题样式类
const headingClass = computed(() => {
  return `${baseHeadingClass.value} ${weightClass.value}`;
});

const colorClass = computed(() => {
  const colorMap = {
    default: '',
    primary: 'cosy:text-primary cosy:dark:text-primary',
    secondary: 'cosy:text-secondary cosy:dark:text-secondary',
    accent: 'cosy:text-accent cosy:dark:text-accent',
    muted: 'cosy:text-gray-600 cosy:dark:text-gray-400',
    info: 'cosy:text-info cosy:dark:text-info',
    success: 'cosy:text-success cosy:dark:text-success',
    warning: 'cosy:text-warning cosy:dark:text-warning',
    error: 'cosy:text-error cosy:dark:text-error',
    'base-content': 'cosy:text-base-content cosy:dark:text-base-content',
    'neutral-content':
      'cosy:text-neutral-content cosy:dark:text-neutral-content',
  };
  return colorMap[props.color as keyof typeof colorMap] || colorMap.default;
});

const alignClass = computed(() => {
  const alignMap = {
    left: 'cosy:text-left',
    center: 'cosy:text-center',
    right: 'cosy:text-right',
  };
  return alignMap[props.align as keyof typeof alignMap] || alignMap.left;
});

const underlineClass = computed(() => {
  return props.underline
    ? 'cosy:border-b cosy:pb-2 cosy:border-gray-200 cosy:dark:border-gray-700'
    : '';
});

// 外边距样式
const marginClass = computed(() => {
  const marginMap = {
    none: '',
    sm: 'cosy:my-2',
    md: 'cosy:my-4',
    lg: 'cosy:my-6',
    xl: 'cosy:my-8',
  };
  return marginMap[props.margin as keyof typeof marginMap] || marginMap.md;
});

// 使用通用背景色函数
const backgroundClass = computed(() => {
  return getBackgroundClass(props.background);
});

// 内边距样式映射
const paddingClassMap = {
  none: '',
  sm: 'cosy:py-2',
  md: 'cosy:py-4',
  lg: 'cosy:py-6',
  xl: 'cosy:py-8',
} as const;

const paddingClass = computed(() => {
  return paddingClassMap[props.padding as keyof typeof paddingClassMap] || '';
});

// 组合所有类名
const combinedClass = computed(() => {
  return `heading cosy:w-full ${headingClass.value} ${colorClass.value} ${alignClass.value} ${underlineClass.value} ${marginClass.value} ${backgroundClass.value} ${paddingClass.value} ${props.class || ''}`;
});

// 如果有链接，添加链接相关的样式
const linkClass = computed(() => {
  return props.href ? 'cosy:hover:opacity-80 cosy:transition-opacity' : '';
});

// 标题标签
const headingTag = computed(() => {
  if (props.href) {
    return 'a';
  }
  return `h${props.level}`;
});
</script>

<style scoped>
.heading {
  line-height: 1.2;
  scroll-margin-top: 100px;
}

.heading-anchor {
  color: inherit;
  text-decoration: none;
  vertical-align: middle;
}

/* 悬停效果 */
.heading:hover .heading-anchor {
  opacity: 0.7 !important;
}

.heading-anchor:hover {
  opacity: 1 !important;
}
</style>

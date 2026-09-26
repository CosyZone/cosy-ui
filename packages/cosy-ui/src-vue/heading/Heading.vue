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

  /**
   * @component Heading
   *
   * @description
   * Heading 组件用于创建各级标题，提供一致的排版样式和灵活的定制选项。
   * 支持链接功能，当传入 href 属性时，标题会变成可点击的链接。
   * 组件保持语义化结构：即使作为链接使用时，仍然渲染正确的 h1-h6 标签。
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

  // BEM 类名计算（与 Heading.astro 一致）
  const colorMap = { default:'', primary:'cosy-heading--color-primary', secondary:'cosy-heading--color-secondary', accent:'cosy-heading--color-accent', muted:'cosy-heading--color-muted', white:'cosy-heading--color-white' };
  const alignMap = { left:'cosy-heading--align-left', center:'cosy-heading--align-center', right:'cosy-heading--align-right' };
  const weightMap = { thin:'cosy-heading--weight-thin', light:'cosy-heading--weight-light', normal:'cosy-heading--weight-normal', medium:'cosy-heading--weight-medium', semibold:'cosy-heading--weight-semibold', bold:'cosy-heading--weight-bold', extrabold:'cosy-heading--weight-extrabold' };
  const marginMap = { none:'cosy-heading--my-none', xs:'cosy-heading--my-xs', sm:'cosy-heading--my-sm', md:'cosy-heading--my-md', lg:'cosy-heading--my-lg', xl:'cosy-heading--my-xl' };
  const paddingMap = { none:'cosy-heading--py-none', xs:'cosy-heading--py-xs', sm:'cosy-heading--py-sm', md:'cosy-heading--py-md', lg:'cosy-heading--py-lg', xl:'cosy-heading--py-xl' };

  const combinedClass = computed(() =>
    [
      'cosy-heading',
      `cosy-heading--h${props.level}`,
      colorMap[props.color] || '',
      alignMap[props.align] || '',
      weightMap[props.weight] || '',
      marginMap[props.margin] || '',
      paddingMap[props.padding] || '',
      props.underline ? 'cosy-heading--underline' : '',
    ].filter(Boolean).join(' '),
  );

  const linkClass = computed(() => props.href ? 'cosy-heading__link' : '');

  // 标题标签
  const headingTag = computed(() => {
    if (props.href) {
      return 'a';
    }
    return `h${props.level}`;
  });
</script>

<style>
  .cosy-heading { --cosy-heading-base-content:#1d1d1d; --cosy-heading-primary:#4b6bfb; --cosy-heading-secondary:#7b92b2; --cosy-heading-accent:#67baa3; line-height:1.2; scroll-margin-top:100px; color:var(--cosy-heading-base-content); }
  .cosy-heading--h1 { font-size:2.25rem; font-weight:700; }
  .cosy-heading--h2 { font-size:1.875rem; font-weight:600; }
  .cosy-heading--h3 { font-size:1.5rem; font-weight:600; }
  .cosy-heading--h4 { font-size:1.25rem; font-weight:500; }
  .cosy-heading--h5 { font-size:1.125rem; font-weight:500; }
  .cosy-heading--h6 { font-size:1rem; font-weight:500; }
  .cosy-heading--color-primary { color:var(--cosy-heading-primary); }
  .cosy-heading--color-secondary { color:var(--cosy-heading-secondary); }
  .cosy-heading--color-accent { color:var(--cosy-heading-accent); }
  .cosy-heading--color-muted { color:var(--cosy-heading-secondary); }
  .cosy-heading--color-white { color:#fff; }
  .cosy-heading--align-left { text-align:left; }
  .cosy-heading--align-center { text-align:center; }
  .cosy-heading--align-right { text-align:right; }
  .cosy-heading--weight-thin { font-weight:100; }
  .cosy-heading--weight-light { font-weight:300; }
  .cosy-heading--weight-normal { font-weight:400; }
  .cosy-heading--weight-medium { font-weight:500; }
  .cosy-heading--weight-semibold { font-weight:600; }
  .cosy-heading--weight-bold { font-weight:700; }
  .cosy-heading--weight-extrabold { font-weight:800; }
  .cosy-heading--my-none { margin-top:0; margin-bottom:0; }
  .cosy-heading--my-xs { margin-top:.5rem; margin-bottom:.5rem; }
  .cosy-heading--my-sm { margin-top:1rem; margin-bottom:1rem; }
  .cosy-heading--my-md { margin-top:1.5rem; margin-bottom:1.5rem; }
  .cosy-heading--my-lg { margin-top:2rem; margin-bottom:2rem; }
  .cosy-heading--my-xl { margin-top:3rem; margin-bottom:3rem; }
  .cosy-heading--py-none { padding-top:0; padding-bottom:0; }
  .cosy-heading--py-xs { padding-top:.5rem; padding-bottom:.5rem; }
  .cosy-heading--py-sm { padding-top:1rem; padding-bottom:1rem; }
  .cosy-heading--py-md { padding-top:1.5rem; padding-bottom:1.5rem; }
  .cosy-heading--py-lg { padding-top:2rem; padding-bottom:2rem; }
  .cosy-heading--py-xl { padding-top:3rem; padding-bottom:3rem; }
  .cosy-heading--underline { text-decoration:underline; }
  .cosy-heading__anchor { color:inherit; text-decoration:none; vertical-align:middle; margin-left:.5rem; opacity:0; transition:opacity .2s; }
  .cosy-heading:hover .cosy-heading__anchor { opacity:1; }
  .cosy-heading__link { color:inherit; text-decoration:none; transition:opacity .2s; }
  .cosy-heading__link:hover { opacity:.8; }
</style>

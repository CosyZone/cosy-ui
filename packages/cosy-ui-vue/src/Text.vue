<script setup lang="ts">
  import { computed } from 'vue';

  /**
   * @component Text
   * 自包含实现：BEM 命名 + 原生 CSS（与 Astro 端一致）。
   */

  interface ITextProps {
    as?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
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

  const sizeMap: Record<string, string> = {
    xs: 'cosy-text--xs', sm: 'cosy-text--sm', md: 'cosy-text--md',
    lg: 'cosy-text--lg', xl: 'cosy-text--xl',
  };
  const weightMap: Record<string, string> = {
    thin: 'cosy-text--weight-thin', light: 'cosy-text--weight-light', normal: 'cosy-text--weight-normal',
    medium: 'cosy-text--weight-medium', semibold: 'cosy-text--weight-semibold', bold: 'cosy-text--weight-bold',
    extrabold: 'cosy-text--weight-extrabold', black: 'cosy-text--weight-black',
  };
  const colorMap: Record<string, string> = {
    default: '', primary: 'cosy-text--primary', secondary: 'cosy-text--secondary',
    accent: 'cosy-text--accent', muted: 'cosy-text--muted',
  };
  const alignMap: Record<string, string> = {
    left: 'cosy-text--left', center: 'cosy-text--center', right: 'cosy-text--right', justify: 'cosy-text--justify',
  };

  const combinedClass = computed(() =>
    [
      'cosy-text',
      sizeMap[props.size] || '',
      weightMap[props.weight] || '',
      colorMap[props.color] || '',
      alignMap[props.align] || '',
      props.italic ? 'cosy-text--italic' : '',
      props.underline ? 'cosy-text--underline' : '',
      props.truncate ? 'cosy-text--truncate' : '',
      props.class,
    ].filter(Boolean).join(' '),
  );

  const tagName = computed(() => props.as || 'p');
</script>

<template>
  <component :is="tagName" :class="combinedClass" :style="style">
    <slot />
  </component>
</template>

<style>
  /* Text - 原生 CSS 实现（与 Text.astro 一致） */
  .cosy-text {
    --cosy-text-primary: var(--color-primary, #4b6bfb);
    --cosy-text-secondary: var(--color-secondary, #7b92b2);
    --cosy-text-accent: var(--color-accent, #67baa3);
    --cosy-text-base-content: var(--color-base-content, #1d1d1d);
    margin-bottom: 1em;
    line-height: 1.5;
    color: var(--cosy-text-base-content);
    font-weight: 400;
  }
  .cosy-text--xs { font-size: 0.75rem; }
  .cosy-text--sm { font-size: 0.875rem; }
  .cosy-text--md { font-size: 1rem; }
  .cosy-text--lg { font-size: 1.125rem; }
  .cosy-text--xl { font-size: 1.25rem; }
  .cosy-text--weight-thin { font-weight: 100; }
  .cosy-text--weight-light { font-weight: 300; }
  .cosy-text--weight-normal { font-weight: 400; }
  .cosy-text--weight-medium { font-weight: 500; }
  .cosy-text--weight-semibold { font-weight: 600; }
  .cosy-text--weight-bold { font-weight: 700; }
  .cosy-text--weight-extrabold { font-weight: 800; }
  .cosy-text--weight-black { font-weight: 900; }
  .cosy-text--primary { color: var(--cosy-text-primary); }
  .cosy-text--secondary { color: var(--cosy-text-secondary); }
  .cosy-text--accent { color: var(--cosy-text-accent); }
  .cosy-text--muted { color: var(--cosy-text-secondary); opacity: 0.8; }
  .cosy-text--left { text-align: left; }
  .cosy-text--center { text-align: center; }
  .cosy-text--right { text-align: right; }
  .cosy-text--justify { text-align: justify; }
  .cosy-text--italic { font-style: italic; }
  .cosy-text--underline { text-decoration: underline; }
  .cosy-text--truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
</style>

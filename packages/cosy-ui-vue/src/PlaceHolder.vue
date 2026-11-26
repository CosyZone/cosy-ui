<script setup lang="ts">
import { computed } from "vue";
import type { IPlaceHolderProps } from "../internal/components/placeholder/types";

/**
 * @component PlaceHolder
 * @description 占位符组件，用于在布局中占用指定的空间，支持自定义宽度、高度、内边距和背景色
 * @props
 * @prop {string} [background] - 背景色类型
 * @prop {('none'|'sm'|'md'|'lg'|'xl')} [border='none'] - 边框尺寸
 * @prop {string} [class] - 自定义 CSS 类名
 * @prop {string} [height='md'] - 高度尺寸
 * @prop {boolean} [muted=false] - 是否使用柔和色背景
 * @prop {string} [padding='none'] - 内边距大小
 * @prop {string} [width='md'] - 宽度尺寸
 * @slot default - 占位符内容
 */
const props = withDefaults(defineProps<IPlaceHolderProps>(), {
  height: "md",
  padding: "none",
  width: "md",
  border: "none",
  muted: false,
});

const widthModifierMap: Record<string, string> = {
  xs: "cosy-placeholder--w-xs",
  sm: "cosy-placeholder--w-sm",
  md: "cosy-placeholder--w-md",
  lg: "cosy-placeholder--w-lg",
  xl: "cosy-placeholder--w-xl",
  "2xl": "cosy-placeholder--w-2xl",
  "3xl": "cosy-placeholder--w-3xl",
  "4xl": "cosy-placeholder--w-4xl",
  "5xl": "cosy-placeholder--w-5xl",
  "6xl": "cosy-placeholder--w-6xl",
  full: "cosy-placeholder--w-full",
};

const heightModifierMap: Record<string, string> = {
  "3xs": "cosy-placeholder--h-3xs",
  "2xs": "cosy-placeholder--h-2xs",
  xs: "cosy-placeholder--h-xs",
  sm: "cosy-placeholder--h-sm",
  md: "cosy-placeholder--h-md",
  lg: "cosy-placeholder--h-lg",
  xl: "cosy-placeholder--h-xl",
  "2xl": "cosy-placeholder--h-2xl",
  "3xl": "cosy-placeholder--h-3xl",
  "4xl": "cosy-placeholder--h-4xl",
  "5xl": "cosy-placeholder--h-5xl",
  "6xl": "cosy-placeholder--h-6xl",
  screen: "cosy-placeholder--h-screen",
  auto: "cosy-placeholder--h-auto",
  full: "cosy-placeholder--h-full",
};

const paddingModifierMap: Record<string, string> = {
  none: "cosy-placeholder--p-none",
  xs: "cosy-placeholder--p-xs",
  sm: "cosy-placeholder--p-sm",
  md: "cosy-placeholder--p-md",
  lg: "cosy-placeholder--p-lg",
  xl: "cosy-placeholder--p-xl",
  "2xl": "cosy-placeholder--p-2xl",
  "3xl": "cosy-placeholder--p-3xl",
  "4xl": "cosy-placeholder--p-4xl",
  "5xl": "cosy-placeholder--p-5xl",
};

const borderModifierMap: Record<string, string> = {
  none: "",
  sm: "cosy-placeholder--border-sm",
  md: "cosy-placeholder--border-md",
  lg: "cosy-placeholder--border-lg",
  xl: "cosy-placeholder--border-xl",
};

const backgroundModifierMap: Record<string, string> = {
  primary: "cosy-placeholder--bg-primary",
  secondary: "cosy-placeholder--bg-secondary",
  accent: "cosy-placeholder--bg-accent",
  neutral: "cosy-placeholder--bg-neutral",
  "base-100": "cosy-placeholder--bg-base-100",
  "base-200": "cosy-placeholder--bg-base-200",
  "base-300": "cosy-placeholder--bg-base-300",
  info: "cosy-placeholder--bg-info",
  success: "cosy-placeholder--bg-success",
  warning: "cosy-placeholder--bg-warning",
  error: "cosy-placeholder--bg-error",
  transparent: "cosy-placeholder--bg-transparent",
  none: "",
};

const combinedClass = computed(() =>
  [
    "cosy-placeholder",
    widthModifierMap[props.width ?? "md"] ?? "",
    heightModifierMap[props.height ?? "md"] ?? "",
    paddingModifierMap[props.padding ?? "none"] ?? "",
    props.background ? backgroundModifierMap[props.background] ?? "" : "",
    borderModifierMap[props.border ?? "none"] ?? "",
    props.muted ? "cosy-placeholder--muted" : "",
    props.class,
  ]
    .filter(Boolean)
    .join(" "),
);
</script>

<template>
  <div :class="combinedClass">
    <slot />
  </div>
</template>

<style>
  /* PlaceHolder - 原生 CSS 实现（与 Placeholder.astro 一致，daisyui corporate 主题色） */
  .cosy-placeholder {
    --cosy-ph-primary: var(--color-primary, #4b6bfb);
    --cosy-ph-secondary: var(--color-secondary, #7b92b2);
    --cosy-ph-accent: var(--color-accent, #67baa3);
    --cosy-ph-neutral: var(--color-neutral, #181a2a);
    --cosy-ph-base-100: var(--color-base-100, #ffffff);
    --cosy-ph-base-200: var(--color-base-200, #e9e9e9);
    --cosy-ph-base-300: var(--color-base-300, #d7d7d7);
    --cosy-ph-info: var(--color-info, #2563eb);
    --cosy-ph-success: var(--color-success, #16a34a);
    --cosy-ph-warning: var(--color-warning, #d97706);
    --cosy-ph-error: var(--color-error, #dc2626);

    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
  }

  .cosy-placeholder--w-xs { max-width: 20rem; }
  .cosy-placeholder--w-sm { max-width: 24rem; }
  .cosy-placeholder--w-md { max-width: 42rem; }
  .cosy-placeholder--w-lg { max-width: 56rem; }
  .cosy-placeholder--w-xl { max-width: 72rem; }
  .cosy-placeholder--w-2xl { max-width: 80rem; }
  .cosy-placeholder--w-3xl { max-width: 88rem; }
  .cosy-placeholder--w-4xl { max-width: 96rem; }
  .cosy-placeholder--w-5xl { max-width: 104rem; }
  .cosy-placeholder--w-6xl { max-width: 112rem; }
  .cosy-placeholder--w-full { width: 100%; max-width: none; }

  .cosy-placeholder--h-3xs { height: 2.5rem; }
  .cosy-placeholder--h-2xs { height: 3rem; }
  .cosy-placeholder--h-xs { height: 4rem; }
  .cosy-placeholder--h-sm { height: 6rem; }
  .cosy-placeholder--h-md { height: 8rem; }
  .cosy-placeholder--h-lg { height: 10rem; }
  .cosy-placeholder--h-xl { height: 12rem; }
  .cosy-placeholder--h-2xl { height: 14rem; }
  .cosy-placeholder--h-3xl { height: 16rem; }
  .cosy-placeholder--h-4xl { height: 18rem; }
  .cosy-placeholder--h-5xl { height: 20rem; }
  .cosy-placeholder--h-6xl { height: 24rem; }
  .cosy-placeholder--h-screen { height: 100vh; }
  .cosy-placeholder--h-auto { height: auto; }
  .cosy-placeholder--h-full { height: 100%; }

  .cosy-placeholder--p-none { padding: 0; }
  .cosy-placeholder--p-xs { padding: 0.25rem; }
  .cosy-placeholder--p-sm { padding: 0.5rem; }
  .cosy-placeholder--p-md { padding: 1rem; }
  .cosy-placeholder--p-lg { padding: 1.5rem; }
  .cosy-placeholder--p-xl { padding: 2rem; }
  .cosy-placeholder--p-2xl { padding: 2.5rem; }
  .cosy-placeholder--p-3xl { padding: 3rem; }
  .cosy-placeholder--p-4xl { padding: 4rem; }
  .cosy-placeholder--p-5xl { padding: 5rem; }

  .cosy-placeholder--bg-primary { background: var(--cosy-ph-primary); }
  .cosy-placeholder--bg-secondary { background: var(--cosy-ph-secondary); }
  .cosy-placeholder--bg-accent { background: var(--cosy-ph-accent); }
  .cosy-placeholder--bg-neutral { background: var(--cosy-ph-neutral); }
  .cosy-placeholder--bg-base-100 { background: var(--cosy-ph-base-100); }
  .cosy-placeholder--bg-base-200 { background: var(--cosy-ph-base-200); }
  .cosy-placeholder--bg-base-300 { background: var(--cosy-ph-base-300); }
  .cosy-placeholder--bg-info { background: var(--cosy-ph-info); }
  .cosy-placeholder--bg-success { background: var(--cosy-ph-success); }
  .cosy-placeholder--bg-warning { background: var(--cosy-ph-warning); }
  .cosy-placeholder--bg-error { background: var(--cosy-ph-error); }
  .cosy-placeholder--bg-transparent { background: transparent; }

  .cosy-placeholder--border-sm { border: 1px solid var(--cosy-ph-base-300); }
  .cosy-placeholder--border-md { border: 2px solid var(--cosy-ph-base-300); }
  .cosy-placeholder--border-lg { border: 4px solid var(--cosy-ph-base-300); }
  .cosy-placeholder--border-xl { border: 8px solid var(--cosy-ph-base-300); }

  .cosy-placeholder--muted {
    background: #f3f4f6;
    opacity: 0.6;
    pointer-events: none;
  }
  .cosy-placeholder--muted > * {
    color: #9ca3af !important;
    fill: #9ca3af !important;
  }
</style>

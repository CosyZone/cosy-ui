<script setup lang="ts">
  import { computed } from "vue";
  import type { IButtonProps } from "../internal/components/button/props";

  /**
   * @component Button
   * @description Vue 版本的 Button 组件，用于触发一个即时操作，如表单提交、打开对话框等
   * @props {string} [variant='primary'] - 按钮样式变体，支持 primary、secondary、accent、info、success、warning、error、ghost、link、outline、neutral、gradient-sky 等渐变变体
   * @props {string} [size='md'] - 按钮尺寸，支持 lg、md、sm、xs
   * @props {string} [shape] - 按钮形状，支持 circle、square
   * @props {boolean} [wide=false] - 是否为宽按钮
   * @props {boolean} [block=false] - 是否为块级显示
   * @props {boolean} [loading=false] - 是否显示加载状态
   * @props {boolean} [disabled=false] - 是否禁用按钮
   * @props {string} [type='button'] - 按钮类型，支持 button、submit、reset
   * @props {string} [href] - 链接地址，设置后按钮变为链接形式
   * @props {string} [target] - 链接目标，支持 _self、_blank、_parent、_top
   * @props {Function} [onClick] - 点击事件处理函数
   * @props {string|object} [class] - 自定义 CSS 类名，支持字符串或对象形式
   */

  interface Props extends IButtonProps {}

  const props = withDefaults(defineProps<Props>(), {
    variant: "primary",
    size: "md",
    wide: false,
    block: false,
    loading: false,
    disabled: false,
    type: "button",
  });

  // 变体类名映射（与 Button.astro 一致）
  const variantClassMap: Record<string, string> = {
    primary: "cosy-btn--primary",
    secondary: "cosy-btn--secondary",
    accent: "cosy-btn--accent",
    info: "cosy-btn--info",
    success: "cosy-btn--success",
    warning: "cosy-btn--warning",
    error: "cosy-btn--error",
    ghost: "cosy-btn--ghost",
    link: "cosy-btn--link",
    outline: "cosy-btn--outline",
    neutral: "cosy-btn--neutral",
    "gradient-sky": "cosy-btn--gradient-sky",
    "gradient-watermelon": "cosy-btn--gradient-watermelon",
    "gradient-lemon": "cosy-btn--gradient-lemon",
    "gradient-grape": "cosy-btn--gradient-grape",
    "gradient-mango": "cosy-btn--gradient-mango",
    "gradient-forest": "cosy-btn--gradient-forest",
    "gradient-ocean": "cosy-btn--gradient-ocean",
    "gradient-sunset": "cosy-btn--gradient-sunset",
    "gradient-flower": "cosy-btn--gradient-flower",
    "gradient-pitaya": "cosy-btn--gradient-pitaya",
    "gradient-banana": "cosy-btn--gradient-banana",
    "gradient-blueberry": "cosy-btn--gradient-blueberry",
    "gradient-kiwi": "cosy-btn--gradient-kiwi",
  };

  // 尺寸类名映射
  const sizeClassMap: Record<string, string> = {
    xs: "cosy-btn--xs",
    sm: "cosy-btn--sm",
    md: "cosy-btn--md",
    lg: "cosy-btn--lg",
  };

  // 形状类名映射
  const shapeClassMap: Record<string, string> = {
    circle: "cosy-btn--circle",
    square: "cosy-btn--square",
  };

  // 规范化 class 属性（支持字符串或对象）
  function normalizeClass(className: string | Record<string, any> | undefined): string {
    if (!className) return "";
    if (typeof className === "string") return className;
    return Object.entries(className)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(" ");
  }

  // 组合 Button 类名（与 Button.astro 渲染逻辑一致）
  const buttonClasses = computed(() => {
    const { variant = "primary", size = "md", shape, wide, block, loading, disabled } = props;
    return [
      "cosy-btn",
      variantClassMap[variant] || "",
      sizeClassMap[size] || sizeClassMap.md,
      shape ? shapeClassMap[shape] || "" : "",
      wide ? "cosy-btn--wide" : "",
      block ? "cosy-btn--block" : "",
      loading ? "cosy-btn--loading" : "",
      disabled ? "cosy-btn--disabled" : "",
      normalizeClass(props.class as string | Record<string, any> | undefined),
    ]
      .filter(Boolean)
      .join(" ");
  });

  // 处理点击事件
  const handleClick = (event: Event) => {
    if (props.onClick && typeof props.onClick === "function") {
      props.onClick();
    }
  };
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :class="buttonClasses"
    :type="props.href ? undefined : props.type"
    :disabled="props.disabled"
    :href="props.href"
    :target="props.target"
    @click="handleClick">
    <span class="cosy-btn__content">
      <slot name="icon-left" />
      <slot />
      <slot name="icon-right" />
    </span>
  </component>
</template>

<style>
  /* Button - 原生 CSS 实现（与 Button.astro 一致） */
  .cosy-btn {
    --cosy-btn-primary: #4b6bfb;
    --cosy-btn-secondary: #7b92b2;
    --cosy-btn-accent: #67baa3;
    --cosy-btn-neutral: #181a2a;
    --cosy-btn-base-100: #ffffff;
    --cosy-btn-base-200: #e9e9e9;
    --cosy-btn-base-300: #d7d7d7;
    --cosy-btn-base-content: #1d1d1d;
    --cosy-btn-info: #2563eb;
    --cosy-btn-success: #16a34a;
    --cosy-btn-warning: #d97706;
    --cosy-btn-error: #dc2626;

    --cosy-btn-bg: transparent;
    --cosy-btn-color: var(--cosy-btn-base-content);
    --cosy-btn-border: transparent;

    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0 1rem;
    border: 1px solid var(--cosy-btn-border);
    border-radius: 0.5rem;
    background: var(--cosy-btn-bg);
    color: var(--cosy-btn-color);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease, color 0.2s ease,
      border-color 0.2s ease, opacity 0.2s ease, filter 0.2s ease;
  }

  .cosy-btn__content {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .cosy-btn--xs { height: 1.5rem; padding: 0 0.5rem; font-size: 0.75rem; }
  .cosy-btn--sm { height: 2rem; padding: 0 0.75rem; font-size: 0.875rem; }
  .cosy-btn--md { height: 2.5rem; padding: 0 1rem; font-size: 0.875rem; }
  .cosy-btn--lg { height: 3rem; padding: 0 1.25rem; font-size: 1.125rem; }

  .cosy-btn--circle,
  .cosy-btn--square { padding: 0; aspect-ratio: 1 / 1; }
  .cosy-btn--circle { border-radius: 9999px; }

  .cosy-btn--wide { width: 16rem; }
  .cosy-btn--block { width: 100%; }

  .cosy-btn--primary {
    --cosy-btn-bg: var(--cosy-btn-primary);
    --cosy-btn-color: #fff;
    --cosy-btn-border: var(--cosy-btn-primary);
  }
  .cosy-btn--secondary {
    --cosy-btn-bg: var(--cosy-btn-secondary);
    --cosy-btn-color: #fff;
    --cosy-btn-border: var(--cosy-btn-secondary);
  }
  .cosy-btn--accent {
    --cosy-btn-bg: var(--cosy-btn-accent);
    --cosy-btn-color: var(--cosy-btn-base-content);
    --cosy-btn-border: var(--cosy-btn-accent);
  }
  .cosy-btn--neutral {
    --cosy-btn-bg: var(--cosy-btn-neutral);
    --cosy-btn-color: #fff;
    --cosy-btn-border: var(--cosy-btn-neutral);
  }
  .cosy-btn--info {
    --cosy-btn-bg: var(--cosy-btn-info);
    --cosy-btn-color: #fff;
    --cosy-btn-border: var(--cosy-btn-info);
  }
  .cosy-btn--success {
    --cosy-btn-bg: var(--cosy-btn-success);
    --cosy-btn-color: #fff;
    --cosy-btn-border: var(--cosy-btn-success);
  }
  .cosy-btn--warning {
    --cosy-btn-bg: var(--cosy-btn-warning);
    --cosy-btn-color: #fff;
    --cosy-btn-border: var(--cosy-btn-warning);
  }
  .cosy-btn--error {
    --cosy-btn-bg: var(--cosy-btn-error);
    --cosy-btn-color: #fff;
    --cosy-btn-border: var(--cosy-btn-error);
  }

  .cosy-btn--ghost {
    --cosy-btn-bg: transparent;
    --cosy-btn-border: transparent;
    --cosy-btn-color: var(--cosy-btn-base-content);
  }
  .cosy-btn--ghost:hover {
    background: color-mix(in srgb, currentColor 10%, transparent);
  }
  .cosy-btn--link {
    --cosy-btn-bg: transparent;
    --cosy-btn-border: transparent;
    --cosy-btn-color: var(--cosy-btn-primary);
    height: auto;
    padding: 0;
  }
  .cosy-btn--link:hover { text-decoration: underline; }
  .cosy-btn--outline {
    --cosy-btn-bg: transparent;
    --cosy-btn-border: currentColor;
    --cosy-btn-color: var(--cosy-btn-base-content);
  }
  .cosy-btn--outline:hover {
    background: color-mix(in srgb, currentColor 10%, transparent);
  }

  .cosy-btn--primary:hover,
  .cosy-btn--secondary:hover,
  .cosy-btn--accent:hover,
  .cosy-btn--neutral:hover,
  .cosy-btn--info:hover,
  .cosy-btn--success:hover,
  .cosy-btn--warning:hover,
  .cosy-btn--error:hover {
    filter: brightness(0.92);
  }

  .cosy-btn--disabled,
  .cosy-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  .cosy-btn--loading::before {
    content: "";
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: cosy-btn-spin 0.7s linear infinite;
  }
  @keyframes cosy-btn-spin {
    to { transform: rotate(360deg); }
  }

  .cosy-btn--gradient-sky {
    background: linear-gradient(to right, #38bdf8, #6366f1);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-sky:hover {
    background: linear-gradient(to right, #0ea5e9, #4f46e5);
  }
  .cosy-btn--gradient-watermelon {
    background: linear-gradient(to right, #86efac, #f472b6, #ef4444);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-watermelon:hover {
    background: linear-gradient(to right, #4ade80, #f472b6, #dc2626);
  }
  .cosy-btn--gradient-lemon {
    background: linear-gradient(to right, #fef08a, #facc15, #ca8a04);
    color: #1d1d1d;
    border-color: transparent;
  }
  .cosy-btn--gradient-lemon:hover {
    background: linear-gradient(to right, #fde047, #facc15, #a16207);
  }
  .cosy-btn--gradient-grape {
    background: linear-gradient(to right, #c084fc, #6366f1, #7e22ce);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-grape:hover {
    background: linear-gradient(to right, #a855f7, #6366f1, #6b21a8);
  }
  .cosy-btn--gradient-mango {
    background: linear-gradient(to right, #fde047, #fb923c, #ea580c);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-mango:hover {
    background: linear-gradient(to right, #facc15, #fb923c, #c2410c);
  }
  .cosy-btn--gradient-forest {
    background: linear-gradient(to right, #15803d, #bef264);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-forest:hover {
    background: linear-gradient(to right, #166534, #a3e635);
  }
  .cosy-btn--gradient-ocean {
    background: linear-gradient(to right, #22d3ee, #1d4ed8);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-ocean:hover {
    background: linear-gradient(to right, #06b6d4, #1e40af);
  }
  .cosy-btn--gradient-sunset {
    background: linear-gradient(to right, #fb923c, #ec4899, #ef4444);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-sunset:hover {
    background: linear-gradient(to right, #f97316, #ec4899, #dc2626);
  }
  .cosy-btn--gradient-flower {
    background: linear-gradient(to right, #f9a8d4, #c084fc, #d946ef);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-flower:hover {
    background: linear-gradient(to right, #f472b6, #c084fc, #c026d3);
  }
  .cosy-btn--gradient-pitaya {
    background: linear-gradient(to right, #fbcfe8, #e879f9, #bef264);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-pitaya:hover {
    background: linear-gradient(to right, #f9a8d4, #e879f9, #a3e635);
  }
  .cosy-btn--gradient-banana {
    background: linear-gradient(to right, #fef9c3, #fde047, #eab308);
    color: #1d1d1d;
    border-color: transparent;
  }
  .cosy-btn--gradient-banana:hover {
    background: linear-gradient(to right, #fef08a, #fde047, #ca8a04);
  }
  .cosy-btn--gradient-blueberry {
    background: linear-gradient(to right, #60a5fa, #2563eb, #4338ca);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-blueberry:hover {
    background: linear-gradient(to right, #3b82f6, #2563eb, #3730a3);
  }
  .cosy-btn--gradient-kiwi {
    background: linear-gradient(to right, #d9f99d, #4ade80, #15803d);
    color: #fff;
    border-color: transparent;
  }
  .cosy-btn--gradient-kiwi:hover {
    background: linear-gradient(to right, #bef264, #4ade80, #166534);
  }
</style>

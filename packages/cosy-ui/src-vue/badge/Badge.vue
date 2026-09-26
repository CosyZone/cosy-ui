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

  const props = withDefaults(defineProps<IBadgeProps>(), {
    outline: false,
  });

  // 变体类名映射（与 Badge.astro 一致）
  const variantClassMap: Record<string, string> = {
    primary: 'cosy-badge--primary',
    secondary: 'cosy-badge--secondary',
    accent: 'cosy-badge--accent',
    ghost: 'cosy-badge--ghost',
    info: 'cosy-badge--info',
    success: 'cosy-badge--success',
    warning: 'cosy-badge--warning',
    error: 'cosy-badge--error',
  };

  // 尺寸类名映射
  const sizeClassMap: Record<string, string> = {
    xs: 'cosy-badge--xs',
    sm: 'cosy-badge--sm',
    md: 'cosy-badge--md',
    lg: 'cosy-badge--lg',
  };

  // 组合 Badge 类名（与 Badge.astro 渲染逻辑一致）
  const badgeClasses = computed(() => {
    const { variant, size, outline } = props;
    return [
      'cosy-badge',
      variant ? variantClassMap[variant] || '' : '',
      size ? sizeClassMap[size] || '' : '',
      outline ? 'cosy-badge--outline' : '',
      props.class,
    ]
      .filter(Boolean)
      .join(' ');
  });
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<style>
  /* Badge - 原生 CSS 实现（与 Badge.astro 一致） */
  .cosy-badge {
    --cosy-badge-primary: #4b6bfb;
    --cosy-badge-secondary: #7b92b2;
    --cosy-badge-accent: #67baa3;
    --cosy-badge-neutral: #181a2a;
    --cosy-badge-base-content: #1d1d1d;
    --cosy-badge-info: #2563eb;
    --cosy-badge-success: #16a34a;
    --cosy-badge-warning: #d97706;
    --cosy-badge-error: #dc2626;

    --cosy-badge-bg: transparent;
    --cosy-badge-color: var(--cosy-badge-base-content);
    --cosy-badge-border: transparent;

    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    height: 2rem;
    padding: 0 0.5rem;
    border: 1px solid var(--cosy-badge-border);
    border-radius: 0.25rem;
    background: var(--cosy-badge-bg);
    color: var(--cosy-badge-color);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
  }

  .cosy-badge--xs { height: 1rem; padding: 0 0.25rem; font-size: 0.6875rem; }
  .cosy-badge--sm { height: 1.5rem; padding: 0 0.375rem; font-size: 0.75rem; }
  .cosy-badge--md { height: 2rem; padding: 0 0.5rem; font-size: 0.875rem; }
  .cosy-badge--lg { height: 2.5rem; padding: 0 0.75rem; font-size: 1rem; }

  .cosy-badge--primary {
    --cosy-badge-bg: var(--cosy-badge-primary);
    --cosy-badge-color: #fff;
    --cosy-badge-border: var(--cosy-badge-primary);
  }
  .cosy-badge--secondary {
    --cosy-badge-bg: var(--cosy-badge-secondary);
    --cosy-badge-color: #fff;
    --cosy-badge-border: var(--cosy-badge-secondary);
  }
  .cosy-badge--accent {
    --cosy-badge-bg: var(--cosy-badge-accent);
    --cosy-badge-color: var(--cosy-badge-base-content);
    --cosy-badge-border: var(--cosy-badge-accent);
  }
  .cosy-badge--info {
    --cosy-badge-bg: var(--cosy-badge-info);
    --cosy-badge-color: #fff;
    --cosy-badge-border: var(--cosy-badge-info);
  }
  .cosy-badge--success {
    --cosy-badge-bg: var(--cosy-badge-success);
    --cosy-badge-color: #fff;
    --cosy-badge-border: var(--cosy-badge-success);
  }
  .cosy-badge--warning {
    --cosy-badge-bg: var(--cosy-badge-warning);
    --cosy-badge-color: #fff;
    --cosy-badge-border: var(--cosy-badge-warning);
  }
  .cosy-badge--error {
    --cosy-badge-bg: var(--cosy-badge-error);
    --cosy-badge-color: #fff;
    --cosy-badge-border: var(--cosy-badge-error);
  }

  .cosy-badge--ghost {
    --cosy-badge-bg: transparent;
    --cosy-badge-border: transparent;
    --cosy-badge-color: var(--cosy-badge-base-content);
  }

  .cosy-badge--outline {
    --cosy-badge-bg: transparent;
    --cosy-badge-border: currentColor;
  }
</style>

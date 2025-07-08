<script setup lang="ts">
import { computed } from 'vue';
import '../../style';

interface Props {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost'
    | 'link'
    | 'outline'
    | 'neutral';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  shape?: 'circle' | 'square';
  wide?: boolean;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  wide: false,
  block: false,
  loading: false,
  disabled: false,
  type: 'button',
});

const buttonClasses = computed(() => {
  const classes = ['cosy:btn'];

  // Variant classes
  const variantClasses = {
    primary: 'cosy:btn-primary',
    secondary: 'cosy:btn-secondary',
    accent: 'cosy:btn-accent',
    info: 'cosy:btn-info',
    success: 'cosy:btn-success',
    warning: 'cosy:btn-warning',
    error: 'cosy:btn-error',
    ghost: 'cosy:btn-ghost',
    link: 'cosy:btn-link',
    outline: 'cosy:btn-outline',
    neutral: 'cosy:btn-neutral',
  };

  // Size classes
  const sizeClasses = {
    lg: 'cosy:btn-lg',
    md: 'cosy:btn-md',
    sm: 'cosy:btn-sm',
    xs: 'cosy:btn-xs',
  };

  // Shape classes
  const shapeClasses = {
    circle: 'cosy:btn-circle',
    square: 'cosy:btn-square',
  };

  if (variantClasses[props.variant]) {
    classes.push(variantClasses[props.variant]);
  }

  if (sizeClasses[props.size]) {
    classes.push(sizeClasses[props.size]);
  }

  if (props.shape && shapeClasses[props.shape]) {
    classes.push(shapeClasses[props.shape]);
  }

  if (props.wide) classes.push('cosy:btn-wide');
  if (props.block) classes.push('cosy:btn-block');
  if (props.loading) classes.push('cosy:loading');

  return classes;
});
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :class="buttonClasses"
    :type="props.href ? undefined : props.type"
    :disabled="props.disabled"
    :href="props.href"
    :target="props.target"
  >
    <span class="cosy:flex cosy:items-center cosy:gap-2">
      <slot name="icon-left" />
      <slot />
      <slot name="icon-right" />
    </span>
  </component>
</template>

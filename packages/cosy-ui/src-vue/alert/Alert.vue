<!--
@component Alert

@description
Alert 组件用于向用户显示重要的提示信息，支持多种类型的提示样式和交互效果。

@usage
基本用法：
```vue
<Alert type="info">这是一条信息提示</Alert>
```

带标题：
```vue
<Alert type="success" title="操作成功">您的操作已成功完成</Alert>
```

不显示图标：
```vue
<Alert type="warning" :show-icon="false">不显示图标的警告</Alert>
```

设置垂直外边距：
```vue
<Alert type="info" margin-y="md">带垂直外边距的提示</Alert>
```

组合使用：
```vue
<Alert
  type="error"
  title="提交失败"
  class="my-custom-class"
  margin-y="lg"
>
  请检查表单并重新提交
</Alert>
```

自定义操作按钮：
```vue
<Alert type="info">
  这是带自定义操作的提示
  <template #action>
    <button @click="doSomething">操作</button>
  </template>
</Alert>
```

@props
@prop {('info'|'success'|'warning'|'error')} [type='info'] - 提示类型，影响颜色和图标，支持 info、success、warning、error 四种类型
@prop {string} [title] - 提示标题，可选，显示为粗体文本
@prop {string} [description] - 描述文本，显示在标题下方，字体较小且透明度降低
@prop {string} [class] - 自定义 CSS 类名，用于覆盖默认样式
@prop {boolean} [closable=true] - 是否可关闭，设置为 false 时隐藏关闭按钮
@prop {boolean} [showIcon=true] - 是否显示图标，设置为 false 时隐藏类型对应的图标
@prop {('solid'|'outline'|'dash'|'soft')} [variant='solid'] - 样式变体，支持 solid（实心）、outline（描边）、dash（虚线）、soft（柔和）四种风格
@prop {('none'|'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'|'6xl')} [marginY] - 垂直方向外边距大小，支持预设的尺寸值

@slots
@slot default - 提示内容，主要文本内容
@slot action - 自定义操作按钮，显示在 alert 右侧，适合放置自定义按钮或其他操作
-->

<script setup lang="ts">
  import { RiCloseLine } from '@remixicon/vue';
  import { computed } from 'vue';
  import {
    ErrorIcon,
    InfoIcon,
    SuccessIcon,
    WarningIcon,
  } from '../icons/index';
  import type { IAlertProps } from './props';

  interface Props extends IAlertProps {}

  const props = withDefaults(defineProps<Props>(), {
    type: 'info',
    title: '',
    description: '',
    class: '',
    closable: true,
    showIcon: true,
    variant: 'solid',
    marginY: undefined,
  });

  const emit = defineEmits(['close']);

  const handleClose = () => {
    emit('close');
  };

  // 类型类名映射
  const alertTypeClassMap: Record<string, string> = {
    info: 'cosy-alert--info',
    success: 'cosy-alert--success',
    warning: 'cosy-alert--warning',
    error: 'cosy-alert--error',
  };

  // 变体类名映射
  const alertVariantClassMap: Record<string, string> = {
    solid: 'cosy-alert--solid',
    outline: 'cosy-alert--outline',
    dash: 'cosy-alert--dash',
    soft: 'cosy-alert--soft',
  };

  // 垂直外边距类名映射
  const alertMarginClassMap: Record<string, string> = {
    none: '',
    xs: 'cosy-alert--my-xs',
    sm: 'cosy-alert--my-sm',
    md: 'cosy-alert--my-md',
    lg: 'cosy-alert--my-lg',
    xl: 'cosy-alert--my-xl',
    '2xl': 'cosy-alert--my-2xl',
    '3xl': 'cosy-alert--my-3xl',
    '4xl': 'cosy-alert--my-4xl',
    '5xl': 'cosy-alert--my-5xl',
    '6xl': 'cosy-alert--my-6xl',
  };

  // 组合 Alert 容器类名（与 Alert.astro 渲染逻辑一致）
  const alertClasses = computed(() => {
    const typeClass = alertTypeClassMap[props.type] || alertTypeClassMap.info;
    const variantClass =
      alertVariantClassMap[props.variant] || alertVariantClassMap.solid;
    const marginClass = props.marginY ? alertMarginClassMap[props.marginY] : '';
    return [
      'cosy-alert',
      typeClass,
      variantClass,
      marginClass,
      props.class,
    ]
      .filter(Boolean)
      .join(' ');
  });

  // 根据类型设置图标组件
  const IconComponent = computed(() => {
    const iconComponents = {
      info: InfoIcon,
      success: SuccessIcon,
      warning: WarningIcon,
      error: ErrorIcon,
    };
    return iconComponents[props.type];
  });

  // 内部结构类名（原生 CSS，与 Alert.astro 一致）
  const containerClass = 'cosy-alert__container';
  const contentWrapperClass = 'cosy-alert__body';
  const contentClass = 'cosy-alert__content';
  const actionsClass = 'cosy-alert__actions';
  const titleClass = 'cosy-alert__title';
  const descriptionClass = 'cosy-alert__desc';
  const slotClass = 'cosy-alert__content-text';
</script>

<template>
  <div :class="alertClasses" role="alert">
    <div :class="containerClass">
      <div :class="contentWrapperClass">
        <component
          :is="IconComponent"
          v-if="showIcon"
          class="cosy-alert__icon" />

        <div :class="contentClass">
          <h3
            v-if="props.title"
            :class="titleClass"
            style="margin-top: 0 !important">
            {{ props.title }}
          </h3>
          <div v-if="props.description" :class="descriptionClass">
            {{ props.description }}
          </div>
          <div v-if="props.title" :class="slotClass">
            <slot />
          </div>
          <slot v-else />
        </div>
      </div>

      <div :class="actionsClass" data-role="actions">
        <slot name="action" />

        <button
          v-if="props.closable"
          @click="handleClose"
          class="cosy-alert__close">
          <RiCloseLine class="cosy-alert__icon-svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<style>
  /* Alert - 原生 CSS 实现（与 Alert.astro 一致） */
  .cosy-alert {
    --cosy-alert-info: #2563eb;
    --cosy-alert-success: #16a34a;
    --cosy-alert-warning: #d97706;
    --cosy-alert-error: #dc2626;
    --cosy-alert-bg: var(--cosy-alert-info);

    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #fff;
    border: 1px solid transparent;
    background: var(--cosy-alert-bg);
  }

  .cosy-alert--info { --cosy-alert-bg: var(--cosy-alert-info); }
  .cosy-alert--success { --cosy-alert-bg: var(--cosy-alert-success); }
  .cosy-alert--warning { --cosy-alert-bg: var(--cosy-alert-warning); }
  .cosy-alert--error { --cosy-alert-bg: var(--cosy-alert-error); }

  .cosy-alert--solid {
    background: var(--cosy-alert-bg);
    color: #fff;
  }
  .cosy-alert--outline {
    background: transparent;
    color: var(--cosy-alert-bg);
    border-color: var(--cosy-alert-bg);
  }
  .cosy-alert--dash {
    background: transparent;
    color: var(--cosy-alert-bg);
    border: 1px dashed var(--cosy-alert-bg);
  }
  .cosy-alert--soft {
    background: color-mix(in srgb, var(--cosy-alert-bg) 10%, transparent);
    color: var(--cosy-alert-bg);
  }

  .cosy-alert--my-xs { margin-top: 0.25rem; margin-bottom: 0.25rem; }
  .cosy-alert--my-sm { margin-top: 0.5rem; margin-bottom: 0.5rem; }
  .cosy-alert--my-md { margin-top: 1rem; margin-bottom: 1rem; }
  .cosy-alert--my-lg { margin-top: 1.5rem; margin-bottom: 1.5rem; }
  .cosy-alert--my-xl { margin-top: 2rem; margin-bottom: 2rem; }
  .cosy-alert--my-2xl { margin-top: 3rem; margin-bottom: 3rem; }
  .cosy-alert--my-3xl { margin-top: 4rem; margin-bottom: 4rem; }
  .cosy-alert--my-4xl { margin-top: 5rem; margin-bottom: 5rem; }
  .cosy-alert--my-5xl { margin-top: 6rem; margin-bottom: 6rem; }
  .cosy-alert--my-6xl { margin-top: 8rem; margin-bottom: 8rem; }

  .cosy-alert__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    width: 100%;
  }
  .cosy-alert__body {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
  }
  .cosy-alert__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 1 auto;
    gap: 0.25rem;
  }
  .cosy-alert__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }
  .cosy-alert__title {
    margin: 0;
    font-weight: 700;
    font-size: 1em;
  }
  .cosy-alert__desc {
    font-size: 0.75rem;
    opacity: 0.8;
  }
  .cosy-alert__content-text {
    font-size: 0.75rem;
  }
  .cosy-alert__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }
  .cosy-alert__icon-svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }
  .cosy-alert__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: none;
    border-radius: 9999px;
    background: transparent;
    color: currentColor;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }
  .cosy-alert__close:hover {
    background: color-mix(in srgb, currentColor 12%, transparent);
  }
  .cosy-alert__close .cosy-alert__icon-svg {
    width: 1.25rem;
    height: 1.25rem;
  }
</style>

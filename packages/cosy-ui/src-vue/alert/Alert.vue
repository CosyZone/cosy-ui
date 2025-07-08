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

组合使用：
```vue
<Alert
  type="error"
  title="提交失败"
  class="my-custom-class"
>
  请检查表单并重新提交
</Alert>
```

@props
@prop {('info'|'success'|'warning'|'error')} [type='info'] - 提示类型，影响颜色和图标
@prop {string} [title] - 提示标题，可选
@prop {string} [class] - 自定义 CSS 类名

@slots
@slot default - 提示内容
-->

<script setup lang="ts">
import '../../style';
import { computed } from 'vue';
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon } from '../icons/index';

interface Props {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  title: '',
  class: '',
});

// 根据类型设置样式
const alertClass = computed(() => {
  const alertClasses = {
    info: 'cosy:alert-info',
    success: 'cosy:alert-success',
    warning: 'cosy:alert-warning',
    error: 'cosy:alert-error',
  };
  return alertClasses[props.type];
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
</script>

<template>
  <div :class="['cosy:alert', alertClass, props.class]" role="alert">
    <div
      class="cosy:flex cosy:flex-row cosy:items-center cosy:gap-4 cosy:alert-content"
    >
      <component :is="IconComponent" />

      <div class="cosy:flex cosy:flex-col cosy:items-center cosy:h-full">
        <h3
          v-if="props.title"
          class="cosy:font-bold"
          style="margin-top: 0 !important"
        >
          {{ props.title }}
        </h3>
        <div v-if="props.title" class="cosy:text-xs">
          <slot />
        </div>
        <slot v-else />
      </div>
    </div>
  </div>
</template>

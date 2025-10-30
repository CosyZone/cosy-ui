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
@prop {('xs'|'sm'|'md'|'lg'|'xl')} [marginY] - 垂直方向外边距大小，支持预设的尺寸值

@slots
@slot default - 提示内容，主要文本内容
@slot action - 自定义操作按钮，显示在 alert 右侧，适合放置自定义按钮或其他操作
-->

<script setup lang="ts">
  import { RiCloseLine } from '@remixicon/vue';
  import { computed } from 'vue';
  import { cn } from '../../src/class/classBuilder';
  import { AlertFacade } from '../../src/components/alert';
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

  // 使用 Alert 门面获取类名
  const alertClasses = computed(() => AlertFacade.getClassString(props));

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

  // 使用 classBuilder 构建类名
  const containerClass = cn()
    .flex('row')
    .items('center')
    .gap(4)
    .justify('between')
    .w('full')
    .build();

  const contentWrapperClass = cn().flex().items('center').gap(4).build();

  const contentClass = cn()
    .flex('col')
    .items('start')
    .h('full')
    .add('cosy:flex-1')
    .build();

  const actionsClass = cn().flex('row').items('center').gap(2).build();

  const descriptionClass = cn().text('xs').opacity(80).build();

  const slotClass = cn().text('xs').build();
</script>

<template>
  <div :class="alertClasses" role="alert">
    <div :class="containerClass">
      <div :class="contentWrapperClass">
        <component
          :is="IconComponent"
          v-if="showIcon"
          class="cosy:btn cosy:btn-sm cosy:btn-ghost cosy:btn-circle" />

        <div :class="contentClass">
          <h3
            v-if="props.title"
            class="cosy:font-bold"
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
          class="cosy:btn cosy:btn-ghost cosy:btn-sm cosy:btn-circle">
          <RiCloseLine class="cosy:h-5 cosy:w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

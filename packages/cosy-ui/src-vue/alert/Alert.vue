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
@prop {('info'|'success'|'warning'|'error')} [type='info'] - 提示类型，影响颜色和图标
@prop {string} [title] - 提示标题，可选
@prop {string} [class] - 自定义 CSS 类名
@prop {boolean} [closable] - 是否可关闭，默认可关闭
@prop {MarginSize} [marginY] - 垂直外边距大小

@slots
@slot default - 提示内容
@slot action - 自定义操作按钮，显示在 alert 右侧
-->

<script setup lang="ts">
import "../../style";
import { computed } from "vue";
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon } from "../icons/index";
import { RiCloseLine } from "@remixicon/vue";
import { marginClasses, type MarginSize } from "../../src/common/margin";

interface Props {
	type?: "info" | "success" | "warning" | "error";
	title?: string;
	class?: string;
	closable?: boolean;
	marginY?: MarginSize;
}

const props = withDefaults(defineProps<Props>(), {
	type: "info",
	title: "",
	class: "",
	closable: true,
	marginY: undefined,
});

const emit = defineEmits(["close"]);

const handleClose = () => {
	emit("close");
};

// 根据类型设置样式
const alertClass = computed(() => {
	const alertClasses = {
		info: "cosy:alert-info",
		success: "cosy:alert-success",
		warning: "cosy:alert-warning",
		error: "cosy:alert-error",
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

// 根据 marginY 值设置对应的 CSS 类
const marginYClass = computed(() => {
	return props.marginY ? marginClasses[props.marginY] : "";
});
</script>

<template>
  <div
    :class="[
      'cosy:alert cosy:w-full cosy:flex',
      alertClass,
      marginYClass,
      props.class,
    ]"
    role="alert"
  >
    <div
      class="cosy:flex cosy:flex-row cosy:items-center cosy:gap-4 cosy:justify-between cosy:w-full"
    >
      <div class="cosy:flex cosy:items-center cosy:gap-4">
        <component
          :is="IconComponent"
          class="cosy:btn cosy:btn-sm cosy:btn-ghost cosy:btn-circle"
        />

        <div
          class="cosy:flex cosy:flex-col cosy:items-start cosy:h-full cosy:flex-1"
        >
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

      <div
        class="cosy:flex cosy:flex-row cosy:items-center cosy:gap-2"
        data-role="actions"
      >
        <slot name="action" />

        <button
          v-if="props.closable"
          @click="handleClose"
          class="cosy:btn cosy:btn-ghost cosy:btn-sm cosy:btn-circle"
        >
          <RiCloseLine class="cosy:h-5 cosy:w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

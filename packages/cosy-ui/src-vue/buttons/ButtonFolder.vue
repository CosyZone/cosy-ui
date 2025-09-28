<!--
ButtonFolder 组件

一个专门用于文件夹操作的按钮组件，封装了 Button 组件，并添加了文件夹图标。

使用示例：
```vue
<ButtonFolder @click="openFolder" />
<ButtonFolder style="ghost" size="sm" @click="openFolder" tooltip="打开文件夹" />
```

属性：
- 继承 Button 组件的所有属性
- 默认使用 ghost 样式

事件：
- click: 点击按钮时触发（disabled状态下不触发）
-->

<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@coffic/cosy-ui/vue";
import { RiFolderOpenLine } from "@remixicon/vue";

interface Props {
	// 按钮颜色
	color?:
		| "neutral"
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
	// 按钮样式
	style?: "outline" | "dash" | "soft" | "ghost" | "link";
	// 按钮大小
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	// 按钮形状
	shape?: "square" | "circle";
	// 是否禁用
	disabled?: boolean;
	// 是否激活
	active?: boolean;
	// 提示文本
	tooltip?: string;
}

const props = withDefaults(defineProps<Props>(), {
	style: "ghost",
	size: "md",
	disabled: false,
	active: false,
});

const emit = defineEmits<{
	(e: "click", event: MouseEvent): void;
}>();

// 处理点击事件
const handleClick = (event: MouseEvent) => {
	// 如果按钮已经处于禁用状态，不触发事件
	if (props.disabled) return;

	// 触发点击事件
	emit("click", event);
};

// 计算图标大小类名
const iconSizeClass = computed(() => {
	if (props.size === "xs" || props.size === "sm") return "cosy:w-4 cosy:h-4";
	if (props.size === "lg" || props.size === "xl") return "cosy:w-6 cosy:h-6";
	return "cosy:w-5 cosy:h-5"; // 默认中等大小
});
</script>

<template>
  <div
    class="cosy:relative cosy:inline-block"
    :data-tip="tooltip"
    :class="{ tooltip: tooltip }"
  >
    <Button
      :color="color"
      :style="style"
      :shape="shape"
      :disabled="disabled"
      :active="active"
      @click="handleClick"
    >
      <RiFolderOpenLine
        :class="[iconSizeClass, 'cosy:transition-all cosy:duration-300']"
      />
      <slot></slot>
    </Button>
  </div>
</template>

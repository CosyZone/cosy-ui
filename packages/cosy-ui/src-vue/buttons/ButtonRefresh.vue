<!--
ButtonRefresh 组件

一个专门用于刷新操作的按钮组件，封装了 Button 组件，并添加了动画效果。
当处于加载状态时，图标会旋转，提供视觉反馈。

使用示例：
```vue
<ButtonRefresh @click="refreshData" :loading="isLoading" />
<ButtonRefresh style="ghost" size="sm" @click="refreshData" />
```

属性：
- 继承 Button 组件的所有属性
- 默认使用 ghost 样式

事件：
- click: 点击按钮时触发（disabled或loading状态下不触发）
-->

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Button } from "@coffic/cosy-ui/vue";
import { RiRefreshLine } from "@remixicon/vue";

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
	// 是否显示加载状态
	loading?: boolean;
	// 是否禁用
	disabled?: boolean;
	// 是否激活
	active?: boolean;
	// 提示文本
	tooltip?: string;
	// 最小动画时间（毫秒）
	minAnimationTime?: number;
}

const props = withDefaults(defineProps<Props>(), {
	style: "ghost",
	size: "md",
	loading: false,
	disabled: false,
	active: false,
	minAnimationTime: 800, // 默认最小动画时间为 800 毫秒
});

const emit = defineEmits<{
	(e: "click", event: MouseEvent): void;
}>();

// 处理点击事件
const handleClick = async (event: MouseEvent) => {
	// 如果按钮已经处于加载或禁用状态，不触发事件
	if (props.disabled || internalLoading.value) return;

	// 触发点击事件
	emit("click", event);
};

// 内部加载状态
const internalLoading = ref(false);

// 记录动画开始时间
const animationStartTime = ref(0);

// 监听外部加载状态
watch(
	() => props.loading,
	(newVal, oldVal) => {
		if (newVal === true) {
			// 开始加载，记录当前时间
			animationStartTime.value = Date.now();
			internalLoading.value = true;
		} else if (oldVal === true && newVal === false) {
			// 加载结束，计算已经经过的时间
			const elapsedTime = Date.now() - animationStartTime.value;
			const remainingTime = Math.max(0, props.minAnimationTime - elapsedTime);

			if (remainingTime > 0) {
				// 如果还没有达到最小动画时间，延迟关闭加载状态
				setTimeout(() => {
					internalLoading.value = false;
				}, remainingTime);
			} else {
				// 已经超过最小动画时间，直接关闭
				internalLoading.value = false;
			}
		}
	},
	{ immediate: true },
);

// 计算内容类名
const contentClass = computed(() => {
	return {
		hidden: internalLoading.value,
	};
});

// 计算图标大小类名
const iconSizeClass = computed(() => {
	if (props.size === "xs" || props.size === "sm") return "cosy:w-4 cosy:h-4";
	if (props.size === "lg" || props.size === "xl") return "cosy:w-6 cosy:h-6";
	return "cosy:w-5 cosy:h-5"; // 默认中等大小
});

// 计算加载器类名
const loadingClass = computed(() => {
	return [
		"loading",
		"loading-spinner",
		props.size === "xs" || props.size === "sm"
			? "loading-xs"
			: props.size === "lg" || props.size === "xl"
				? "loading-lg"
				: "loading-md",
		iconSizeClass.value, // 使用相同的大小类
		{ hidden: !internalLoading.value },
	];
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
      :disabled="disabled || internalLoading"
      :active="active"
      @click="handleClick"
    >
      <span :class="loadingClass"></span>
      <span :class="contentClass">
        <RiRefreshLine
          :class="[iconSizeClass, 'cosy:transition-all cosy:duration-300']"
        />
        <slot></slot>
      </span>
    </Button>
  </div>
</template>

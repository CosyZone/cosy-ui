<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

/**
 * @component ImagePreview
 * @description 图片预览模态框组件，处理图片预览、键盘事件和滚动控制
 */

interface IImagePreviewProps {
	visible: boolean;
	imageUrl: string;
	showPreview: boolean;
}

type IImagePreviewEmits = (e: "close") => void;

const props = defineProps<IImagePreviewProps>();
const emit = defineEmits<IImagePreviewEmits>();

// 客户端渲染状态
const isClient = ref(false);

// 键盘事件处理
const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === "Escape") {
		emit("close");
	}
};

// 点击背景关闭
const handleBackgroundClick = (e: Event) => {
	if (e.target === e.currentTarget) {
		emit("close");
	}
};

// 保存原始滚动状态
let originalOverflow = "";
let originalScrollTop = 0;
let hasDisabledScroll = false;

// 禁止背景滚动
const disableScroll = () => {
	if (!isClient.value) return;

	try {
		// 保存当前状态
		originalOverflow = document.body.style.overflow;
		originalScrollTop =
			window.pageYOffset || document.documentElement.scrollTop;

		// 禁用滚动
		document.body.style.overflow = "hidden";
		document.body.style.position = "fixed";
		document.body.style.top = `-${originalScrollTop}px`;
		document.body.style.width = "100%";

		hasDisabledScroll = true;
	} catch (error) {
		console.warn("Failed to disable scroll:", error);
	}
};

// 恢复背景滚动
const enableScroll = () => {
	if (!isClient.value) return;

	try {
		if (hasDisabledScroll) {
			// 恢复滚动
			document.body.style.overflow = originalOverflow;
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";

			// 恢复滚动位置
			window.scrollTo(0, originalScrollTop);

			hasDisabledScroll = false;
		}
	} catch (error) {
		console.warn("Failed to enable scroll:", error);
		// 如果恢复失败，强制重置为默认状态
		document.body.style.overflow = "";
		document.body.style.position = "";
		document.body.style.top = "";
		document.body.style.width = "";
	}
};

// 生命周期钩子
onMounted(() => {
	isClient.value = true;
	document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
	document.removeEventListener("keydown", handleKeyDown);
	// 确保在组件销毁时恢复滚动
	enableScroll();
});

// 监听 visible 变化，控制滚动
watch(
	() => props.visible,
	(newVisible: boolean) => {
		if (newVisible) {
			disableScroll();
		} else {
			// 延迟恢复滚动，确保过渡动画完成
			setTimeout(() => {
				enableScroll();
			}, 200);
		}
	},
	{ immediate: true },
);
</script>

<template>
  <!-- 只在客户端渲染时显示 Teleport，避免 SSR 水合问题 -->
  <Teleport v-if="isClient" to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible && showPreview && isClient"
        class="cosy:fixed cosy:inset-0 cosy:bg-black/75 cosy:flex cosy:items-center cosy:justify-center cosy:z-50"
        @click="handleBackgroundClick"
      >
        <div class="cosy:relative cosy:max-w-[95vw] cosy:max-h-[95vh] cosy:p-4">
          <!-- 图片容器 -->
          <div class="cosy:relative">
            <img
              :src="imageUrl"
              :alt="`图片预览`"
              class="cosy:max-w-[90vw] cosy:max-h-[90vh] cosy:object-contain cosy:rounded-lg cosy:shadow-2xl"
              @error="emit('close')"
            />

            <!-- 关闭按钮 -->
            <button
              @click="emit('close')"
              class="cosy:absolute cosy:top-2 cosy:right-2 cosy:text-white cosy:text-2xl cosy:font-bold cosy:hover:text-base-300 cosy:transition-colors cosy:duration-200 cosy:bg-black/50 cosy:hover:bg-black/70 cosy:rounded-full cosy:w-8 cosy:h-8 cosy:flex cosy:items-center cosy:justify-center"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

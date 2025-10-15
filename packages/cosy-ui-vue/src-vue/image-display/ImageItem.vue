<script setup lang="ts">
import { ref } from "vue";

/**
 * @component ImageItem
 * @description 单个图片项组件，处理图片展示、悬停效果和点击事件
 */

interface IImageItemProps {
	imageUrl: string;
	index: number;
	size: "sm" | "md" | "lg";
}

interface IImageItemEmits {
	(e: "imageClick", imageUrl: string): void;
}

const props = defineProps<IImageItemProps>();
const emit = defineEmits<IImageItemEmits>();

// 客户端渲染状态
const isClient = ref(false);

// 获取尺寸类名
const getSizeClasses = () => {
	const sizeMap = {
		sm: "cosy:w-12 cosy:h-12",
		md: "cosy:w-16 cosy:h-16",
		lg: "cosy:w-24 cosy:h-24",
	};
	return sizeMap[props.size];
};

// 处理图片点击
const handleImageClick = () => {
	emit("imageClick", props.imageUrl);
};

// 处理图片加载错误
const handleImageError = (event: Event) => {
	if (!isClient.value) return;

	const img = event.target as HTMLImageElement;
	img.style.display = "none";

	// 创建错误占位符
	const placeholder = document.createElement("div");
	placeholder.className = `${getSizeClasses()} cosy:bg-base-200 cosy:rounded cosy:border cosy:border-base-300 cosy:flex cosy:items-center cosy:justify-center`;
	placeholder.innerHTML = `
    <div class="cosy:text-center">
      <div class="cosy:text-base-content/60 cosy:text-xs">加载失败</div>
    </div>
  `;

	// 插入到图片位置
	img.parentNode?.insertBefore(placeholder, img);
};

// 在客户端挂载后设置状态
import { onMounted } from "vue";
onMounted(() => {
	isClient.value = true;
});
</script>

<template>
  <div
    class="cosy:relative cosy:group cosy:cursor-pointer"
    @click="handleImageClick"
  >
    <!-- 图片 -->
    <img
      :src="imageUrl"
      :alt="`图片 ${index + 1}`"
      :class="`${getSizeClasses()} cosy:object-cover cosy:rounded cosy:border cosy:border-base-300 cosy:hover:scale-105 cosy:transition-transform cosy:duration-200`"
      @error="handleImageError"
    />

    <!-- 悬停遮罩 - 默认不显示，hover时显示 -->
    <div
      class="cosy:absolute cosy:inset-0 cosy:bg-black/50 cosy:rounded cosy:flex cosy:items-center cosy:justify-center cosy:pointer-events-none cosy:opacity-0 cosy:group-hover:opacity-100 cosy:transition-opacity cosy:duration-200"
    >
      <span class="cosy:text-white cosy:text-xs"> 点击查看 </span>
    </div>
  </div>
</template>

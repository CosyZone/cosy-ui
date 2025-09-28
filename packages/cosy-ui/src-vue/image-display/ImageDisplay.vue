<script setup lang="ts">
import { ref } from "vue";
import ImageGrid from "./ImageGrid.vue";
import ImagePreview from "./ImagePreview.vue";
import type { IImageDisplayProps, IImageDisplayEmits } from "./types";

/**
 * @component ImageDisplay
 * @description 图片展示组件，支持图片网格展示、预览功能和错误处理
 * @props images - 图片URL数组
 * @props size - 图片尺寸大小
 * @props showPreview - 是否显示预览功能
 * @props maxDisplay - 最大显示图片数量
 */

const props = withDefaults(defineProps<IImageDisplayProps>(), {
	size: "md",
	showPreview: true,
	maxDisplay: 4,
});

const emit = defineEmits<IImageDisplayEmits>();

// 预览状态
const previewState = ref({
	visible: false,
	imageUrl: "",
});

// 处理图片点击
const handleImageClick = (imageUrl: string) => {
	if (props.showPreview) {
		previewState.value = {
			visible: true,
			imageUrl,
		};
	} else {
		emit("imageClick", imageUrl);
	}
};

// 关闭预览
const closePreview = () => {
	previewState.value.visible = false;
};
</script>

<template>
  <div class="space-y-2">
    <!-- 图片网格 -->
    <ImageGrid
      :images="images"
      :size="size"
      :max-display="maxDisplay"
      @image-click="handleImageClick"
    />

    <!-- 图片预览 -->
    <ImagePreview
      :visible="previewState.visible"
      :image-url="previewState.imageUrl"
      :show-preview="showPreview"
      @close="closePreview"
    />
  </div>
</template>

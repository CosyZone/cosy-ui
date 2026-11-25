<script setup lang="ts">
import { computed } from "vue";
import ImageItem from "./ImageItem.vue";
import MoreImagesIndicator from "./MoreImagesIndicator.vue";

/**
 * @component ImageGrid
 * @description 图片网格组件，负责图片的网格布局和展示逻辑
 */

interface IImageGridProps {
	images: string[];
	size: "sm" | "md" | "lg";
	maxDisplay: number;
}

type IImageGridEmits = (e: "imageClick", imageUrl: string) => void;

const props = defineProps<IImageGridProps>();
const emit = defineEmits<IImageGridEmits>();

// 计算显示的图片数量
const displayImages = computed(() => {
	return props.images.slice(0, props.maxDisplay);
});

// 是否有更多图片
const hasMoreImages = computed(() => {
	return props.images.length > props.maxDisplay;
});

// 处理图片点击
const handleImageClick = (imageUrl: string) => {
	emit("imageClick", imageUrl);
};
</script>

<template>
  <div class="cosy:flex cosy:flex-wrap cosy:gap-2">
    <!-- 图片项 -->
    <ImageItem
      v-for="(imageUrl, index) in displayImages"
      :key="index"
      :image-url="imageUrl"
      :index="index"
      :size="size"
      @image-click="handleImageClick"
    />

    <!-- 更多图片提示 -->
    <MoreImagesIndicator
      v-if="hasMoreImages"
      :total-count="images.length"
      :max-display="maxDisplay"
      :size="size"
    />
  </div>
</template>

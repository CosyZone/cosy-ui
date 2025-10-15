<template>
  <div>
    <ImageDisplay
      :images="sampleImages"
      size="md"
      :show-preview="true"
      :max-display="4"
      @image-click="handleImageClick"
    />
    <p class="text-xs text-gray-500 mt-1">点击图片可预览大图</p>
  </div>
</template>

<script setup lang="ts">
import { ImageDisplay } from "@coffic/cosy-ui/vue";
import {
	getExampleImage,
	getAvatarImage,
	getProductImage,
} from "@coffic/cosy-ui/vue";

// 使用稳定的图片URL，避免水合不匹配
const sampleImages = [
	getExampleImage({
		width: 200,
		height: 200,
		provider: "picsum",
		randomSeed: "stable1",
	}),
	getAvatarImage({ width: 200, height: 200, randomSeed: "user1" }),
	getProductImage({
		width: 200,
		height: 200,
		tag: "tech",
		randomSeed: "stable2",
	}),
	getExampleImage({
		width: 200,
		height: 200,
		provider: "picsum",
		tag: "nature",
		randomSeed: "stable3",
	}),
];

const handleImageClick = (imageUrl: string) => {
	console.log("点击了图片:", imageUrl);
	alert(`点击了图片: ${imageUrl}`);
};
</script>

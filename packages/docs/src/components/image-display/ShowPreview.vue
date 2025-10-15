<template>
  <div class="space-y-4">
    <div>
      <h4 class="text-sm font-medium mb-2">开启预览功能 (默认)</h4>
      <ImageDisplay
        :images="sampleImages"
        size="md"
        :show-preview="true"
        :max-display="4"
        @image-click="handleImageClick"
      />
      <p class="text-xs text-gray-500 mt-1">点击图片可预览大图</p>
    </div>

    <div>
      <h4 class="text-sm font-medium mb-2">关闭预览功能</h4>
      <ImageDisplay
        :images="sampleImages"
        size="md"
        :show-preview="false"
        :max-display="4"
        @image-click="handleImageClick"
      />
      <p class="text-xs text-gray-500 mt-1">点击图片会触发 imageClick 事件</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImageDisplay } from "@coffic/cosy-ui/vue";
import {
	getExampleImage,
	getAvatarImage,
	getProductImage,
} from "@coffic/cosy-ui/vue";

const sampleImages = [
	getExampleImage({
		width: 200,
		height: 200,
		provider: "picsum",
		randomSeed: "stable1",
	}),
	getAvatarImage({ width: 200, height: 200, randomSeed: "user1" }),
	getProductImage({ width: 200, height: 200, tag: "tech" }),
	getExampleImage({
		width: 200,
		height: 200,
		provider: "picsum",
		tag: "nature",
		randomSeed: "stable2",
	}),
];

const handleImageClick = (imageUrl: string) => {
	console.log("点击了图片:", imageUrl);
	alert(`点击了图片: ${imageUrl}`);
};
</script>

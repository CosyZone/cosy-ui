<template>
  <div>
    <ImageDisplay
      :images="fewImages"
      size="md"
      :show-preview="true"
      :max-display="6"
    />
  </div>
</template>

<script setup lang="ts">
import { 
	getAvatarImage,
	getExampleImage,
	getProductImage,ImageDisplay, } from "@coffic/cosy-ui/vue";

// 使用稳定的图片URL，避免水合不匹配
const fewImages = [
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
];
</script>

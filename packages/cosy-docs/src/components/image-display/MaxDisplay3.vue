<template>
  <div>
    <ImageDisplay
      :images="sampleImages"
      size="md"
      :show-preview="true"
      :max-display="3"
    />
  </div>
</template>

<script setup lang="ts">
import { 
	getAvatarImage,
	getExampleImage,
	getLandscapeImage,
	getProductImage,ImageDisplay, } from "@coffic/cosy-ui/vue";

// 使用稳定的图片URL，避免水合不匹配
const sampleImages = [
	getExampleImage({
		width: 200,
		height: 200,
		provider: "picsum",
		randomSeed: "stable1",
	}),
	getExampleImage({
		width: 200,
		height: 200,
		provider: "picsum",
		tag: "nature",
		randomSeed: "stable2",
	}),
	getAvatarImage({ width: 200, height: 200, randomSeed: "user1" }),
	getProductImage({
		width: 200,
		height: 200,
		tag: "tech",
		randomSeed: "stable3",
	}),
	getExampleImage({
		width: 200,
		height: 200,
		provider: "robohash",
		randomSeed: "robot1",
	}),
	getExampleImage({
		width: 200,
		height: 200,
		provider: "placeholder",
		tag: "Image 6",
		randomSeed: "stable4",
	}),
];
</script>

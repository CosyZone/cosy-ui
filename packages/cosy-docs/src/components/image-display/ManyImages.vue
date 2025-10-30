<template>
  <div>
    <ImageDisplay
      :images="manyImages"
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
const manyImages = [
	// 使用不同的图片服务提供商，但保持稳定的随机种子
	...Array.from({ length: 3 }, (_, i) =>
		getExampleImage({
			width: 200,
			height: 200,
			provider: "picsum",
			randomSeed: `stable-picsum-${i + 1}`,
		}),
	),
	...Array.from({ length: 3 }, (_, i) =>
		getExampleImage({
			width: 200,
			height: 200,
			provider: "picsum",
			tag: ["nature", "city", "food"][i],
			randomSeed: `stable-picsum-${i + 1}`,
		}),
	),
	...Array.from({ length: 3 }, (_, i) =>
		getAvatarImage({ width: 200, height: 200, randomSeed: `user${i + 1}` }),
	),
	...Array.from({ length: 3 }, (_, i) =>
		getProductImage({
			width: 200,
			height: 200,
			tag: ["tech", "fashion", "home"][i],
			randomSeed: `stable-product-${i + 1}`,
		}),
	),
];
</script>

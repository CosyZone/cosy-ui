<template>
  <div class="space-y-4">
    <div>
      <h4 class="text-sm font-medium mb-2">小尺寸 (sm)</h4>
      <ImageDisplay
        :images="sampleImages"
        size="sm"
        :show-preview="true"
        :max-display="6"
      />
    </div>

    <div>
      <h4 class="text-sm font-medium mb-2">中等尺寸 (md) - 默认</h4>
      <ImageDisplay
        :images="sampleImages"
        size="md"
        :show-preview="true"
        :max-display="6"
      />
    </div>

    <div>
      <h4 class="text-sm font-medium mb-2">大尺寸 (lg)</h4>
      <ImageDisplay
        :images="sampleImages"
        size="lg"
        :show-preview="true"
        :max-display="6"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImageDisplay } from "@coffic/cosy-ui/vue";
import {
	getExampleImage,
	getAvatarImage,
	getProductImage,
	getLandscapeImage,
} from "@coffic/cosy-ui/vue";

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

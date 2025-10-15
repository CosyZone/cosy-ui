<template>
  <div class="space-y-4">
    <div>
      <h4 class="text-sm font-medium mb-2">最大显示 3 张</h4>
      <ImageDisplay
        :images="sampleImages"
        size="md"
        :show-preview="true"
        :max-display="3"
      />
    </div>

    <div>
      <h4 class="text-sm font-medium mb-2">最大显示 4 张</h4>
      <ImageDisplay
        :images="sampleImages"
        size="md"
        :show-preview="true"
        :max-display="4"
      />
    </div>

    <div>
      <h4 class="text-sm font-medium mb-2">最大显示 6 张</h4>
      <ImageDisplay
        :images="sampleImages"
        size="md"
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
	getLandscapeImage({
		width: 200,
		height: 200,
		tag: "city",
		randomSeed: "stable5",
	}),
	getExampleImage({
		width: 200,
		height: 200,
		provider: "picsum",
		tag: "food",
		randomSeed: "stable6",
	}),
];
</script>

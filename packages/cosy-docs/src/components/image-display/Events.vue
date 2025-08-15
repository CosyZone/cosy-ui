<template>
  <div class="space-y-4">
    <div>
      <h4 class="text-sm font-medium mb-2">事件处理示例</h4>
      <ImageDisplay
        :images="sampleImages"
        size="md"
        :show-preview="false"
        :max-display="4"
        @image-click="handleImageClick"
      />
      <p class="text-xs text-gray-500 mt-1">点击图片查看控制台输出</p>
    </div>

    <div v-if="clickedImages.length > 0">
      <h4 class="text-sm font-medium mb-2">已点击的图片:</h4>
      <div class="space-y-2">
        <div
          v-for="(image, index) in clickedImages"
          :key="index"
          class="flex items-center space-x-2 p-2 bg-gray-100 rounded"
        >
          <img
            :src="image"
            alt="点击的图片"
            class="w-8 h-8 object-cover rounded"
          />
          <span class="text-sm">{{ image }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ImageDisplay } from '@coffic/cosy-ui/vue';
import {
  getExampleImage,
  getAvatarImage,
  getProductImage,
} from '@coffic/cosy-ui/vue';

// 使用稳定的图片URL，避免水合不匹配
const sampleImages = [
  getExampleImage({
    width: 200,
    height: 200,
    provider: 'picsum',
    randomSeed: 'stable1',
  }),
  getAvatarImage({ width: 200, height: 200, randomSeed: 'user1' }),
  getProductImage({
    width: 200,
    height: 200,
    tag: 'tech',
    randomSeed: 'stable2',
  }),
  getExampleImage({
    width: 200,
    height: 200,
    provider: 'picsum',
    tag: 'nature',
    randomSeed: 'stable3',
  }),
];

const clickedImages = ref<string[]>([]);

const handleImageClick = (imageUrl: string) => {
  console.log('点击了图片:', imageUrl);
  clickedImages.value.push(imageUrl);
};
</script>

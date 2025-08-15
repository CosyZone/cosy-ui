<template>
  <div>
    <ImageDisplay
      :images="sampleImages"
      size="md"
      :show-preview="true"
      :max-display="4"
      @image-click="handleImageClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ImageDisplay } from '@coffic/cosy-ui/vue';
import {
  getExampleImage,
  getAvatarImage,
  getProductImage,
} from '@coffic/cosy-ui/vue';

// 使用稳定的图片URL，避免水合不匹配
const sampleImages = [
  // 使用固定的随机种子，确保服务端和客户端一致
  getExampleImage({
    width: 200,
    height: 200,
    provider: 'picsum',
    randomSeed: 'stable1',
  }),
  // 使用固定的标签，确保一致性
  getExampleImage({
    width: 200,
    height: 200,
    provider: 'picsum',
    tag: 'nature',
    randomSeed: 'stable2',
  }),
  // 头像使用固定种子
  getAvatarImage({ width: 200, height: 200, randomSeed: 'user1' }),
  // 产品图片使用固定标签
  getProductImage({
    width: 200,
    height: 200,
    tag: 'tech',
    randomSeed: 'stable3',
  }),
  // 机器人头像使用固定种子
  getExampleImage({
    width: 200,
    height: 200,
    provider: 'robohash',
    randomSeed: 'robot1',
  }),
  // 占位符图片使用固定文本
  getExampleImage({
    width: 200,
    height: 200,
    provider: 'placeholder',
    tag: 'Image 6',
    randomSeed: 'stable4',
  }),
];

const handleImageClick = (imageUrl: string) => {
  console.log('点击了图片:', imageUrl);
};
</script>

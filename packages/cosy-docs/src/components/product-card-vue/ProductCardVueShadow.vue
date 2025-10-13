<template>
  <ProductCard
    name="带阴影的产品卡片"
    :image="productImage"
    description="这是一个带有自定义阴影效果的产品卡片示例。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl"
    shadow="lg" />
</template>

<script setup lang="ts">
  import { ProductCard, getProductImage } from '@coffic/cosy-ui/vue';
  import { ref } from 'vue';

  const productUrl = ref('https://example.com');
  const appStoreUrl = ref('https://apps.apple.com/app/example');
  const productImage = getProductImage({
    width: 300,
    height: 200,
    tag: 'product-shadow',
  });
</script>

<template>
  <ProductCard
    name="自定义次按钮文本的产品卡片"
    :image="productImage"
    description="这是一个自定义次按钮文本的产品卡片示例。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl"
    secondaryButtonText="下载应用" />
</template>

<script setup lang="ts">
  import { ProductCard, getProductImage } from '@coffic/cosy-ui/vue';
  import { ref } from 'vue';

  const productUrl = ref('https://example.com');
  const appStoreUrl = ref('https://apps.apple.com/app/example');
  const productImage = getProductImage({
    width: 300,
    height: 200,
    tag: 'product-secondary-button',
  });
</script>

<template>
  <ProductCard
    name="Vue 产品卡片"
    :image="productImage"
    description="这是一个使用 Vue 版本的 ProductCard 组件的示例。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl" />
</template>

<script setup lang="ts">
  import { ProductCard, getProductImage } from '@coffic/cosy-ui/vue';
  import { ref } from 'vue';

  const productUrl = ref('https://example.com');
  const appStoreUrl = ref('https://apps.apple.com/app/example');
  const productImage = getProductImage({
    width: 300,
    height: 200,
    tag: 'product-basic',
  });
</script>

<template>
  <ProductCard
    name="静音产品卡片"
    :image="productImage"
    description="这是一个使用了 muted 属性的产品卡片，看起来处于未激活状态。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl"
    muted />
</template>

<script setup lang="ts">
  import { ProductCard, getProductImage } from '@coffic/cosy-ui/vue';
  import { ref } from 'vue';

  const productUrl = ref('https://example.com');
  const appStoreUrl = ref('https://apps.apple.com/app/example');
  const productImage = getProductImage({
    width: 300,
    height: 200,
    tag: 'product-muted',
  });
</script>

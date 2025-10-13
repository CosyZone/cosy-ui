<template>
  <ProductCard
    name="带 App Store 链接的产品卡片"
    :image="productImage"
    description="这是一个带有 App Store 链接的产品卡片示例。"
    appStoreUrl="https://apps.apple.com/app/example"
    :productUrl="productUrl" />
</template>

<script setup lang="ts">
import { ProductCard, getProductImage } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const productUrl = ref("https://example.com");
const productImage = getProductImage({
	width: 300,
	height: 200,
	tag: "product-appstore",
});
</script>

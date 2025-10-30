<template>
  <ProductCard
    name="带产品链接的产品卡片"
    :image="productImage"
    description="这是一个带有产品官网链接的产品卡片示例。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl" />
</template>

<script setup lang="ts">
import { getProductImage, ProductCard } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const productUrl = ref("https://example.com");
const appStoreUrl = ref("https://apps.apple.com/app/example");
const productImage = getProductImage({
	width: 300,
	height: 200,
	tag: "product-url",
});
</script>
<template>
  <ProductCard
    name="等高产品卡片"
    :image="productImage"
    description="这是一个启用等高设置的产品卡片示例。在网格布局中使用时，所有卡片会保持相同的高度。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl"
    equalHeight />
</template>

<script setup lang="ts">
import { ProductCard, getProductImage } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const productUrl = ref("https://example.com");
const appStoreUrl = ref("https://apps.apple.com/app/example");
const productImage = getProductImage({
	width: 300,
	height: 200,
	tag: "product-equal-height",
});
</script>

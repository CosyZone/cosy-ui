<template>
  <ProductCard
    name="自定义样式的产品卡片"
    :image="productImage"
    description="这是一个使用自定义样式的產品卡片示例。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl"
    class="custom-product-card" />
</template>

<script setup lang="ts">
import { getProductImage, ProductCard } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const productUrl = ref("https://example.com");
const appStoreUrl = ref("https://apps.apple.com/app/example");
const productImage = getProductImage({
	width: 300,
	height: 200,
	tag: "product-class",
});
</script>

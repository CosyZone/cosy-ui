<template>
  <ProductCard
    name="产品名称示例"
    :image="productImage"
    description="这是一个展示产品名称的产品卡片示例。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl" />
</template>

<script setup lang="ts">
import { ProductCard, getProductImage } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const productUrl = ref("https://example.com");
const appStoreUrl = ref("https://apps.apple.com/app/example");
const productImage = getProductImage({
	width: 300,
	height: 200,
	tag: "product-name",
});
</script>

<template>
  <ProductCard
    name="限制描述行数的产品卡片"
    :image="productImage"
    description="这是一个限制描述文本显示行数的产品卡片示例。当描述文本超过指定行数时，会自动截断并显示省略号。这个描述文本比较长，用来演示行数限制的效果。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl"
    :descriptionLines="2" />
</template>

<script setup lang="ts">
import { getProductImage, ProductCard } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const productUrl = ref("https://example.com");
const appStoreUrl = ref("https://apps.apple.com/app/example");
const productImage = getProductImage({
	width: 300,
	height: 200,
	tag: "product-description-lines",
});
</script>

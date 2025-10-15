<template>
  <ProductCard
    name="带 GitHub 链接的产品卡片"
    :image="productImage"
    description="这是一个带有 GitHub 链接的产品卡片示例。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl"
    :githubUrl="githubUrl" />
</template>

<script setup lang="ts">
import { ProductCard, getProductImage } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const productUrl = ref("https://example.com");
const appStoreUrl = ref("https://apps.apple.com/app/example");
const githubUrl = ref("https://github.com/example/project");
const productImage = getProductImage({
	width: 300,
	height: 200,
	tag: "product-github",
});
</script>

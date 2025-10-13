<template>
  <ProductCard
    name="自定义 GitHub 按钮文本的产品卡片"
    :image="productImage"
    description="这是一个自定义 GitHub 按钮文本的产品卡片示例。"
    :productUrl="productUrl"
    :appStoreUrl="appStoreUrl"
    :githubUrl="githubUrl"
    githubButtonText="查看源码" />
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
	tag: "product-github-button",
});
</script>

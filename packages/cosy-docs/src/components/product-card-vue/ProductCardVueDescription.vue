<template>
  <ProductCard
    name="带描述的产品卡片"
    :image="productImage"
    description="这是一个带有详细描述的产品卡片示例。描述文本可以很长，组件会自动处理换行和截断。"
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
	tag: "product-description",
});
</script>

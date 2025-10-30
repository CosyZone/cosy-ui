<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard
      name="超小尺寸 (xs)"
      :image="productImageXs"
      description="超小尺寸产品卡片示例。"
      :productUrl="productUrl"
      :appStoreUrl="appStoreUrl"
      size="xs" />

    <ProductCard
      name="小尺寸 (sm)"
      :image="productImageSm"
      description="小尺寸产品卡片示例。"
      :productUrl="productUrl"
      :appStoreUrl="appStoreUrl"
      size="sm" />

    <ProductCard
      name="中等尺寸 (md)"
      :image="productImageMd"
      description="中等尺寸产品卡片示例。"
      :productUrl="productUrl"
      :appStoreUrl="appStoreUrl"
      size="md" />

    <ProductCard
      name="大尺寸 (lg)"
      :image="productImageLg"
      description="大尺寸产品卡片示例。"
      :productUrl="productUrl"
      :appStoreUrl="appStoreUrl"
      size="lg" />

    <ProductCard
      name="超大尺寸 (xl)"
      :image="productImageXl"
      description="超大尺寸产品卡片示例。"
      :productUrl="productUrl"
      :appStoreUrl="appStoreUrl"
      size="xl" />
  </div>
</template>

<script setup lang="ts">
import { getProductImage, ProductCard } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const productUrl = ref("https://example.com");
const appStoreUrl = ref("https://apps.apple.com/app/example");

const productImageXs = getProductImage({
	width: 200,
	height: 133,
	tag: "product-xs",
});
const productImageSm = getProductImage({
	width: 250,
	height: 167,
	tag: "product-sm",
});
const productImageMd = getProductImage({
	width: 300,
	height: 200,
	tag: "product-md",
});
const productImageLg = getProductImage({
	width: 400,
	height: 267,
	tag: "product-lg",
});
const productImageXl = getProductImage({
	width: 500,
	height: 333,
	tag: "product-xl",
});
</script>

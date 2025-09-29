<template>
  <BannerBox
    title="我们的产品特性"
    description="探索我们强大的功能集，为您的业务提供最佳解决方案"
    :features="features"
  />
</template>

<script setup lang="ts">
import { BannerBox } from "@coffic/cosy-ui/vue";

const features = [
	{ emoji: "🚀", title: "高性能", link: "#" },
	{ emoji: "⚡", title: "快速响应", link: "#" },
	{ emoji: "🔒", title: "安全可靠", link: "#" },
	{ emoji: "💡", title: "智能分析", link: "#" },
];
</script>

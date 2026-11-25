<template>
  <BannerBox title="带链接的特性" :features="featuresWithLinks" />
</template>

<script setup lang="ts">
import { BannerBox } from "@coffic/cosy-ui-vue";

const featuresWithLinks = [
	{ emoji: "💡", title: "智能分析", link: "#" },
	{ emoji: "🛠️", title: "专业支持", link: "#" },
	{ emoji: "📊", title: "数据洞察", link: "#" },
	{ emoji: "🌐", title: "全球服务", link: "#" },
];
</script>

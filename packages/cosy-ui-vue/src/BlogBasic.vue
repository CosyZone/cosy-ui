<template>
  <BlogList :blogs="blogs" lang="zh" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import BlogList from "./BlogList.vue";

const blogs = ref([
	{
		id: "1",
		title: "如何在Vue 3中使用组合式API",
		link: "/blog/vue3-composition-api",
		tags: ["Vue", "前端"],
	},
	{
		id: "2",
		title: "TypeScript高级类型技巧",
		link: "/blog/typescript-advanced-types",
		tags: ["TypeScript", "编程"],
	},
	{
		id: "3",
		title: "响应式设计最佳实践",
		link: "/blog/responsive-design-best-practices",
		tags: ["CSS", "设计"],
	},
]);
</script>

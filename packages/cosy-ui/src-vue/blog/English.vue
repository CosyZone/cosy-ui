<template>
  <BlogList :blogs="blogs" lang="en" />
</template>

<script setup lang="ts">
import "../../style";
import { ref } from "vue";
import BlogList from "./BlogList.vue";

const blogs = ref([
	{
		id: "1",
		title: "Getting Started with Vue 3 Composition API",
		link: "/blog/vue3-composition-api",
		tags: ["Vue", "Frontend"],
	},
	{
		id: "2",
		title: "Advanced TypeScript Type Techniques",
		link: "/blog/typescript-advanced-types",
		tags: ["TypeScript", "Programming"],
	},
]);
</script>

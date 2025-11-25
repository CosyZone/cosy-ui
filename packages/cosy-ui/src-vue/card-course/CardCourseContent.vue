<script setup lang="ts">
interface Props {
	displayName: string;
	description?: string;
}

const props = defineProps<Props>();
</script>

<template>
	<!-- 标题和描述区域 -->
	<div class="cosy:mb-4 cosy:transition-all cosy:duration-300 hover:cosy:transform hover:cosy:translate-x-1">
		<h3
			class="cosy:text-lg cosy:font-semibold cosy:truncate cosy:text-start cosy:transition-all cosy:duration-300 hover:cosy:scale-105 cosy:origin-left cosy:group-hover:cosy:animate-bounce">
			{{ props.displayName }}
		</h3>
		<p
			v-if="props.description"
			class="cosy:text-sm cosy:mt-4 cosy:line-clamp-3 cosy:text-start cosy:transition-all cosy:duration-300 hover:cosy:opacity-80 cosy:transform hover:cosy:translate-x-1 cosy:group-hover:cosy:animate-pulse">
			{{ props.description }}
		</p>
	</div>
</template>


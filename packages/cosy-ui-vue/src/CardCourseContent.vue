<script setup lang="ts">
interface Props {
	displayName: string;
	description?: string;
}

const props = defineProps<Props>();
</script>

<template>
	<!-- 标题和描述区域 -->
	<div class="cosy:mb-4 cosy:transition-all cosy:duration-300 cosy:hover:translate-x-1">
		<h3
			class="cosy:text-lg cosy:font-semibold cosy:truncate cosy:text-start cosy:transition-all cosy:duration-300 cosy:hover:scale-105 cosy:origin-left cosy:group-hover:animate-bounce">
			{{ props.displayName }}
		</h3>
		<p
			class="cosy:text-sm cosy:mt-4 cosy:line-clamp-2 cosy:text-start cosy:transition-all cosy:duration-300 cosy:hover:opacity-80 cosy:transform cosy:hover:translate-x-1 cosy:group-hover:animate-pulse cosy:min-h-10">
			{{ props.description || '' }}
		</p>
	</div>
</template>


<script setup lang="ts">
import { Button } from "../button";

interface Props {
	href: string;
	lang: string;
}

const props = defineProps<Props>();
</script>

<template>
	<Button :href="props.href" variant="primary" size="md">
		{{ props.lang === "en" ? "Start Learning" : "开始学习" }}
	</Button>
</template>


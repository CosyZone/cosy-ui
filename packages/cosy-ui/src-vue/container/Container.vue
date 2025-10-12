<script setup lang="ts">
import "../../style";
import { computed } from "vue";
import type { IContainerProps } from "./containerProps";
import { getContainerCombinedClassesVue } from "./containerUtils";

interface Props extends IContainerProps {}

const props = withDefaults(defineProps<Props>(), {
	padding: "md",
	centered: true,
	border: "none",
	gap: "none",
	rounded: "none",
	class: "",
});

// 使用共用的工具函数计算组合类名
const containerClasses = computed(() => getContainerCombinedClassesVue(props));
</script>

<template>
  <section :class="containerClasses" container>
    <slot />
  </section>
</template>

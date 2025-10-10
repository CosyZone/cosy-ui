<script setup lang="ts">
import "../../style";
import { computed } from "vue";
import type { IContainerProps } from "../../src/components/container/containerPropsVue";
import { getContainerCombinedClassesVue } from "../../src/components/container/containerUtils";
import { allBackgroundClasses } from "../../src/common/backgrounds";
import {
	widthClasses,
	flexClasses,
	gapClasses,
	itemsClasses,
	justifyClasses,
	roundedClasses,
} from "../../src/common";
import { paddingClasses } from "../../src/common/padding";

interface Props extends IContainerProps {}

const props = withDefaults(defineProps<Props>(), {
	padding: "md",
	centered: true,
	border: false,
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
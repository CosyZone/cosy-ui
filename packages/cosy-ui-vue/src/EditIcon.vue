<script setup lang="ts">
import Icon from "./VueIcon.vue";

interface Props {
	/**
	 * 图标的大小
	 * @default "24px"
	 */
	size?: string;
	/**
	 * 图标的颜色
	 * @default "currentColor"
	 */
	color?: string;
	/**
	 * 自定义类名
	 */
	class?: string;
}

const props = withDefaults(defineProps<Props>(), {
	size: "24px",
	color: "currentColor",
	class: "",
});
</script>

<template>
    <Icon name="edit" :size="size" :color="color" :class="props.class" />
</template>

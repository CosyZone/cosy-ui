<script setup lang="ts">
/**
 * @component Prose
 *
 * @description
 * Prose 组件用于包裹内容并应用良好的排版样式。它使用自定义的 prose 样式系统，
 * 为包裹在内的内容（如标题、段落、列表、代码块、表格等）自动应用专业的排版样式。
 *
 * @usage
 * 基本用法：
 * ```vue
 * <Prose>
 *   <h1>标题</h1>
 *   <p>段落内容</p>
 *   <table>...</table>
 * </Prose>
 * ```
 *
 * @props
 * @prop {string} [class] - 自定义 CSS 类名，用于覆盖默认样式
 */
import { computed } from "vue";
import { cn } from "../../src/class";

export interface IProseProps {
	class?: string;
	style?: string;
}

const props = withDefaults(defineProps<IProseProps>(), {
	class: "",
});

const proseClass = computed(() => {
	return cn()
		.add("cosy:prose", "cosy:dark:prose-invert")
		.add(props.class)
		.build();
});
</script>

<template>
	<div :class="proseClass" :style="style">
		<slot />
	</div>
</template>


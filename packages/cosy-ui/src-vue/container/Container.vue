<script setup lang="ts">
import "../../style";
import { computed } from "vue";
import type { IContainerProps } from "./props";
import { getContainerCombinedClassesVue } from "./class";
import ContainerBg from "./ContainerBg.vue";
import AspectRatioBox from "./AspectRatioBox.vue";
import ContainerError from "./ContainerError.vue";
import { validateContainer } from "./validate";
import type { FitMode } from "../../src/common/fitmode";

interface Props extends IContainerProps {}

const props = withDefaults(defineProps<Props>(), {
	padding: "md",
	centered: true,
	border: "none",
	gap: "none",
	rounded: "none",
	class: "",
	contentCentered: false,
	fit: "none",
});

// 校验所有配置
const validationMessages = computed(() => validateContainer(props));
const hasError = computed(() => validationMessages.value.length > 0);

// 使用共用的工具函数计算组合类名
const containerClasses = computed(() => getContainerCombinedClassesVue(props));

// 计算其他需要的属性
const fitEnabled = computed(
	() => props.fit !== "none" && typeof props.aspectRatio === "number",
);
const hasExplicitHeight = computed(
	() => !!props.height && props.height !== "none",
);
const isHeightDrivenAspect = computed(
	() =>
		!fitEnabled.value &&
		typeof props.aspectRatio === "number" &&
		!!props.height &&
		props.height !== "none",
);

// 构建内联样式
const computedInlineStyles = computed(() => {
	if (fitEnabled.value) {
		return hasExplicitHeight.value
			? "container-type: size;"
			: "container-type: inline-size;";
	}

	if (props.aspectRatio && !isHeightDrivenAspect.value) {
		return `aspect-ratio: ${props.aspectRatio};`;
	}

	return "";
});

// 用于传递给 AspectRatioBox 的 fit 属性，确保不为 "none"
const aspectRatioFit = computed(() => {
	if (props.fit === "none") return "contain"; // 默认值
	return props.fit as Exclude<FitMode, "none">;
});
</script>

<template>
  <!-- 显示错误信息 -->
  <ContainerError v-if="hasError" :messages="validationMessages" />
  
  <!-- 正常渲染容器 -->
  <section 
    v-else
    :class="containerClasses" 
    :style="computedInlineStyles"
    class="cosy:relative"
  >
    <!-- 最底层的背景图片 -->
    <ContainerBg :background-image="backgroundImage" />
    
    <!-- 当启用宽高比适配时，使用专门的宽高比组件处理 -->
    <AspectRatioBox
      v-if="fitEnabled"
      :aspect-ratio="aspectRatio!"
      :fit="aspectRatioFit"
      :rounded="rounded"
      :has-explicit-height="hasExplicitHeight"
    />
    
    <!-- 当未启用宽高比适配但需要高度驱动布局时，使用高度驱动组件 -->
    <div 
      v-else-if="isHeightDrivenAspect" 
      class="cosy:absolute cosy:inset-0 cosy:grid cosy:place-items-center"
    >
      <slot />
    </div>
    
    <!-- 默认情况，直接渲染子元素 -->
    <slot v-else />
  </section>
</template>
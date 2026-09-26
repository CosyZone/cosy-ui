<script setup lang="ts">
import { computed } from "vue";

const roundedClasses: Record<string, string> = {
	none: "",
	sm: "cosy:rounded-sm",
	md: "cosy:rounded-md",
	lg: "cosy:rounded-lg",
	xl: "cosy:rounded-xl",
	"2xl": "cosy:rounded-2xl",
	"3xl": "cosy:rounded-3xl",
	full: "cosy:rounded-full",
};


interface Props {
	aspectRatio: number;
	rounded: RoundedSize;
}

const props = defineProps<Props>();

const aspectRatioStyle = computed(
	() => `aspect-ratio: ${props.aspectRatio}; width: 100%; height: auto;`,
);
const roundedClass = computed(() => roundedClasses[props.rounded] || "");

type RoundedSize = string;
</script>

<template>
  <div :class="['cosy:grid cosy:place-items-center', roundedClass]">
    <div :style="aspectRatioStyle">
      <div
        :class="['cosy:relative cosy:w-full cosy:h-full', roundedClass]"
        aria-label="container-content"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

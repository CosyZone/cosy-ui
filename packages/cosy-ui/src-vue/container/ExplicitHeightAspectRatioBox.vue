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
	fit: Exclude<FitMode, "none">;
	rounded: RoundedSize;
}

const props = defineProps<Props>();

const widthCalculation = computed(() => {
	if (props.fit === "contain") {
		return `min(100cqw, calc(100cqh * ${props.aspectRatio}))`;
	} else {
		return `max(100cqw, calc(100cqh * ${props.aspectRatio}))`;
	}
});

const aspectRatioStyle = computed(
	() =>
		`aspect-ratio: ${props.aspectRatio}; width: ${widthCalculation.value}; height: auto;`,
);

type FitMode = string;
type RoundedSize = string;
</script>

<template>
  <div class="cosy:absolute cosy:inset-0 cosy:grid cosy:place-items-center">
    <div :style="aspectRatioStyle">
      <div class="cosy:relative cosy:w-full cosy:h-full">
        <slot />
      </div>
    </div>
  </div>
</template>

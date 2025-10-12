<script setup lang="ts">
import { computed } from "vue";
import type { RoundedSize } from "../../src/common/rounded";
import { roundedClasses } from "../../src/common";
import type { FitMode } from "../../src/common/fitmode";

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
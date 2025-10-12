<script setup lang="ts">
import { computed } from "vue";
import type { RoundedSize } from "../../src/common/rounded";
import { roundedClasses } from "../../src/common";

interface Props {
	aspectRatio: number;
	rounded: RoundedSize;
}

const props = defineProps<Props>();

const aspectRatioStyle = computed(
	() => `aspect-ratio: ${props.aspectRatio}; width: 100%; height: auto;`,
);
const roundedClass = computed(() => roundedClasses[props.rounded] || "");
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
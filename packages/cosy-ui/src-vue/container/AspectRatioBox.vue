<script setup lang="ts">
import type { FitMode } from "../../src/common/fitmode";
import type { RoundedSize } from "../../src/common/rounded";
import DefaultAspectRatioBox from "./DefaultAspectRatioBox.vue";
import ExplicitHeightAspectRatioBox from "./ExplicitHeightAspectRatioBox.vue";

interface Props {
	aspectRatio: number;
	fit: Exclude<FitMode, "none">;
	rounded: RoundedSize;
	hasExplicitHeight: boolean;
}

defineProps<Props>();
</script>

<template>
  <ExplicitHeightAspectRatioBox
    v-if="hasExplicitHeight"
    :aspect-ratio="aspectRatio"
    :fit="fit"
    :rounded="rounded"
  />
  <DefaultAspectRatioBox
    v-else
    :aspect-ratio="aspectRatio"
    :rounded="rounded"
  />
</template>
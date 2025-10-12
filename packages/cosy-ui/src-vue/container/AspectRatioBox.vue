<script setup lang="ts">
import type { RoundedSize } from "../../src/common/rounded";
import type { FitMode } from "../../src/common/fitmode";
import ExplicitHeightAspectRatioBox from "./ExplicitHeightAspectRatioBox.vue";
import DefaultAspectRatioBox from "./DefaultAspectRatioBox.vue";

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
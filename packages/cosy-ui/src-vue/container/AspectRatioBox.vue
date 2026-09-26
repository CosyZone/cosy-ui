<script setup lang="ts">
import DefaultAspectRatioBox from "./DefaultAspectRatioBox.vue";
import ExplicitHeightAspectRatioBox from "./ExplicitHeightAspectRatioBox.vue";

type FitMode = "none" | "contain" | "cover";
type RoundedSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

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

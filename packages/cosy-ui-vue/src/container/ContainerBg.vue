<script setup lang="ts">
import { computed } from "vue";

interface Props {
	backgroundImage?: string;
}

const props = defineProps<Props>();

const showBackground = computed(() => !!props.backgroundImage);
</script>

<template>
  <div 
    v-if="showBackground" 
    class="cosy:-z-10 cosy:pointer-events-none cosy:absolute cosy:inset-0 cosy:bg-cover cosy:bg-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  />
</template>
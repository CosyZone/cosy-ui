<template>
  <div
    data-type="feature-group"
    class="flex mt-8 flex-col items-center container mx-auto justify-center my-2 gap-24 w-full"
  >
    <div
      v-for="(component, index) in $slots.default?.() || []"
      :key="index"
      class="w-full relative group"
    >
      <div class="relative">
        <BaseFeature :background-class-index="index">
          <component :is="component" />
        </BaseFeature>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseFeature from './BannerBox.vue'
</script>

<script setup lang="ts">
import VueButton from './Button.vue'
</script>

<template>
  <div class="cosy:flex cosy:gap-2">
    <VueButton href="#" variant="primary">内部链接</VueButton>
    <VueButton href="https://example.com" target="_blank" variant="primary">
      外部链接
      <template #icon-right>↗</template>
    </VueButton>
  </div>
</template>
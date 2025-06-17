<script setup lang="ts">
import VueButton from './Button.vue'
</script>

<template>
  <div class="cosy:flex cosy:gap-2">
    <VueButton>
      <template #icon-left>👈</template>
      左侧图标
    </VueButton>
    <VueButton>
      右侧图标
      <template #icon-right>👉</template>
    </VueButton>
    <VueButton>
      <template #icon-left>👈</template>
      两侧图标
      <template #icon-right>👉</template>
    </VueButton>
  </div>
</template>
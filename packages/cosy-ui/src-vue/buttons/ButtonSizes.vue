<script setup lang="ts">
import VueButton from './Button.vue';
</script>

<template>
  <div class="cosy:flex cosy:items-center cosy:gap-2">
    <VueButton size="xs">超小按钮</VueButton>
    <VueButton size="sm">小型按钮</VueButton>
    <VueButton size="md">中等按钮</VueButton>
    <VueButton size="lg">大型按钮</VueButton>
  </div>
</template>

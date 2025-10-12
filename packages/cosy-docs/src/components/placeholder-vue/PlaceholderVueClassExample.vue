<template>
  <PlaceHolder width="md" height="md" class="custom-placeholder-style">
    <p>自定义样式占位符</p>
  </PlaceHolder>
</template>

<script setup lang="ts">
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>

<style scoped>
.custom-placeholder-style {
  border: 2px dashed #f0f0f0;
  background-color: #f9f9f9;
  color: #666;
  font-style: italic;
}
</style>
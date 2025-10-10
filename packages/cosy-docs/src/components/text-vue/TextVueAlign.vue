<script setup lang="ts">
import { Text } from '@coffic/cosy-ui/vue';
</script>

<template>
  <div class="cosy:space-y-4">
    <Text align="left">左对齐文本 (left)</Text>
    <Text align="center">居中对齐文本 (center)</Text>
    <Text align="right">右对齐文本 (right)</Text>
    <Text align="justify">两端对齐文本 (justify)</Text>
  </div>
</template>
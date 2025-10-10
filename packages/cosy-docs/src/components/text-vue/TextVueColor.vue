<script setup lang="ts">
import { Text } from '@coffic/cosy-ui/vue';
</script>

<template>
  <div class="cosy:space-y-4">
    <Text color="default">默认颜色文本 (default)</Text>
    <Text color="primary">主要颜色文本 (primary)</Text>
    <Text color="secondary">次要颜色文本 (secondary)</Text>
    <Text color="accent">强调色文本 (accent)</Text>
    <Text color="muted">柔和色文本 (muted)</Text>
  </div>
</template>
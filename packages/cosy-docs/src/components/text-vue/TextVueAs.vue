<script setup lang="ts">
import { Text } from '@coffic/cosy-ui/vue';
</script>

<template>
  <div class="cosy:space-y-4">
    <Text as="p">段落元素 (p)</Text>
    <Text as="span">行内元素 (span)</Text>
    <Text as="div">块级元素 (div)</Text>
    <Text as="strong">强调元素 (strong)</Text>
  </div>
</template>
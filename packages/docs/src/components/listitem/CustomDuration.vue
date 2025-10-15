<template>
  <ListItem :loading="true" :duration="2000">
    <span class="cosy:text-lg">📈 数据分析</span>
    <span class="cosy:ml-auto cosy:text-sm cosy:opacity-70">2秒进度条</span>
  </ListItem>
</template>

<script setup lang="ts">
import { ListItem } from "@coffic/cosy-ui/vue";
</script>

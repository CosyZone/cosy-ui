<template>
  <BannerBox title="基础特性" :features="basicFeatures" />
</template>

<script setup lang="ts">
import { BannerBox } from '@coffic/cosy-ui/vue';

const basicFeatures = [
  { emoji: '🚀', title: '高性能' },
  { emoji: '⚡', title: '快速响应' },
  { emoji: '🔒', title: '安全可靠' },
];
</script>

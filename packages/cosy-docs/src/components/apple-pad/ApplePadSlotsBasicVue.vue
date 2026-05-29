<script setup lang="ts">
import { ApplePad, Heading } from '@coffic/cosy-ui/vue';
</script>
<template>
  <ApplePad title="基本内容">
    <div class="cosy:p-4 cosy:text-center">
      <Heading :level="4">基本内容</Heading>
      <p class="cosy:mt-2">这是放置在 default slot 中的内容</p>
    </div>
  </ApplePad>
</template>

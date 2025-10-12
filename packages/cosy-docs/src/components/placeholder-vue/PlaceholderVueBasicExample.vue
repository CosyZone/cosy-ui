<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <PlaceHolder width="md" height="md" padding="md">
      <p style="text-align: center;">基础占位符</p>
    </PlaceHolder>

    <PlaceHolder width="xl" height="xl" padding="xl" background="primary">
      <p style="text-align: center;">超大尺寸占位符和主要背景色</p>
    </PlaceHolder>
  </div>
</template>

<script setup lang="ts">
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>
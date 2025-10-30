<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <PlaceHolder width="md" height="md" background="base-200">
      <p style="text-align: center;">基础背景色</p>
    </PlaceHolder>

    <PlaceHolder width="md" height="md" background="primary">
      <p style="text-align: center; color: white;">主题背景色</p>
    </PlaceHolder>

    <PlaceHolder width="md" height="md" background="success">
      <p style="text-align: center; color: white;">状态背景色</p>
    </PlaceHolder>
  </div>
</template>

<script setup lang="ts">
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>
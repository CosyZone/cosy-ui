<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <PlaceHolder width="md" height="md" background="success">
      <p style="text-align: center; color: white;">成功状态</p>
    </PlaceHolder>

    <PlaceHolder width="md" height="md" background="warning">
      <p style="text-align: center; color: white;">警告状态</p>
    </PlaceHolder>

    <PlaceHolder width="md" height="md" background="error">
      <p style="text-align: center; color: white;">错误状态</p>
    </PlaceHolder>
  </div>
</template>

<script setup lang="ts">
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>
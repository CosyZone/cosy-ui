<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <PlaceHolder width="md" height="md" background="base-200">
      <p style="text-align: center;">文本内容</p>
    </PlaceHolder>

    <PlaceHolder width="md" height="md" background="base-200">
      <button>按钮</button>
    </PlaceHolder>
  </div>
</template>

<script setup lang="ts">
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>
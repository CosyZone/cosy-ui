<template>
  <PlaceHolder width="md" height="md" background="base-200">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <h3 style="margin: 0;">复杂内容</h3>
      <p style="margin: 0;">这是一个包含多个元素的复杂内容示例</p>
      <button class="cosy:btn cosy:btn-sm cosy:btn-primary">操作按钮</button>
    </div>
  </PlaceHolder>
</template>

<script setup lang="ts">
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>
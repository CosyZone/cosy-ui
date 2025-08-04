<!--
@component MacWindow.CustomHeight

@description
自定义高度的MacWindow组件示例，展示height属性的使用。
-->
<template>
  <MacWindow title="自定义高度窗口-Vue版本" height="h-64">
    <div class="cosy:p-4">
      <div class="cosy:font-medium cosy:mb-2">自定义高度窗口</div>
      <div class="cosy:text-sm cosy:text-base-content/70">
        这个窗口使用了自定义的高度设置，通过 height="h-64" 属性来控制窗口高度。
      </div>
    </div>
  </MacWindow>
</template>

<script setup lang="ts">
import { MacWindow } from '@coffic/cosy-ui/vue';
</script>

<template>
  <MacWindow title="小窗口" width="sm" height="h-48">
    <PlaceHolder width="full" height="lg" padding="md">
      小宽度窗口内容
    </PlaceHolder>
  </MacWindow>
</template>

<script setup lang="ts">
import { MacWindow, PlaceHolder } from "@coffic/cosy-ui/vue";
</script>

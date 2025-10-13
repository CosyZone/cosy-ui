<template>
  <div class="flex flex-col gap-4">
    <Alert type="info" :show-icon="false"> 这是一个不显示图标的提示 </Alert>
    <Alert type="success" :show-icon="false" title="成功">
      这是一个不显示图标的带标题提示
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { Alert } from "@coffic/cosy-ui/vue";
</script>

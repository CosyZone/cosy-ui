<template>
  <div class="flex flex-col gap-4">
    <Alert type="info" margin-y="md"> 这是一个带垂直外边距的提示 </Alert>
    <Alert type="success" margin-y="lg">
      这是另一个带更大垂直外边距的提示
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { Alert } from "@coffic/cosy-ui/vue";
</script>

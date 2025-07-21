<template>
  <div class="cosy:flex cosy:flex-col cosy:gap-4">
    <Alert type="info" title="提示">这是一条信息提示</Alert>
    <Alert type="success" title="成功">操作已成功完成</Alert>
    <Alert type="warning" title="警告">这是一个警告提示</Alert>
    <Alert type="error" title="错误">发生了一个错误</Alert>
  </div>
</template>

<script setup lang="ts">
import { Alert } from '@coffic/cosy-ui/vue';
</script>

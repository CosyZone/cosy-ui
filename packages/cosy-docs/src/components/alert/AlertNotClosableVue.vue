<script setup lang="ts">
  import { Alert } from '@coffic/cosy-ui/vue';
</script>

<template>
  <Alert type="warning" :closable="false"> 这是一条不可关闭的警告提示 </Alert>
</template>

<script setup lang="ts">
  import { Alert } from '@coffic/cosy-ui/vue';
</script>

<template>
  <Alert type="info" title="自定义操作">
    你可以通过 action slot 在右侧自定义按钮。
    <template #action>
      <button
        style="
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
        "
        @click="alert('自定义操作')">
        自定义操作
      </button>
    </template>
  </Alert>
</template>

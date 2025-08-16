<script setup lang="ts">
import { Alert } from '@coffic/cosy-ui/vue';

const handleClose = () => {
    alert('close');
};
</script>

<template>
    <Alert type="info" closable @close="handleClose">这是一条信息提示</Alert>
</template>

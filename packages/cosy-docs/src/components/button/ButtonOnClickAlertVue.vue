<script setup lang="ts">
import { Button } from '@coffic/cosy-ui/vue';

const handleAlert = () => {
    alert('按钮被点击了！');
};
</script>
<template>
    <Button @click="handleAlert">点击弹出提示</Button>
</template>

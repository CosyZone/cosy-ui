<script setup lang="ts">
import { Alert } from "@coffic/cosy-ui/vue";

const handleClose = () => {
	alert("关闭了");
};
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Alert type="info" closable @close="handleClose">
            这是可关闭的提示信息
        </Alert>
        <Alert type="warning" :closable="false">
            这是不可关闭的提示信息
        </Alert>
    </div>
</template>

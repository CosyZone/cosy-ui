<script setup lang="ts">
import { Alert } from "@coffic/cosy-ui/vue";

const handleAction = () => {
	alert("执行了自定义操作");
};
</script>

<template>
    <Alert type="info">
        这是带自定义操作的提示
        <template #action>
            <button @click="handleAction" class="cosy:btn cosy:btn-sm cosy:btn-primary">
                操作
            </button>
        </template>
    </Alert>
</template>

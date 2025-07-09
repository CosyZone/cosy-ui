<template>
    <Alert type="info" title="自定义操作">
        你可以通过 action slot 在右侧自定义按钮。
        <template #action>
            <button class="cosy:btn cosy:btn-primary" @click="handleAction">
                自定义操作
            </button>
        </template>
    </Alert>
</template>

<script setup lang="ts">
import { Alert } from '@coffic/cosy-ui/vue';

const handleAction = () => {
    alert('自定义操作');
};
</script>

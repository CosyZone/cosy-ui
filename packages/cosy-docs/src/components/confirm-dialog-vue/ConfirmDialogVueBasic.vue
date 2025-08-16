<script setup lang="ts">
import { ref } from 'vue';
import { ConfirmDialog } from '@coffic/cosy-ui/vue';

const showDialog = ref(false);

const handleConfirm = () => {
    alert('用户确认了操作！');
};
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <button
            style="background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; border: none; cursor: pointer;"
            @click="showDialog = true">
            显示确认对话框
        </button>

        <ConfirmDialog v-model="showDialog" title="确认操作" message="您确定要执行此操作吗？此操作无法撤销。" @confirm="handleConfirm" />
    </div>
</template>

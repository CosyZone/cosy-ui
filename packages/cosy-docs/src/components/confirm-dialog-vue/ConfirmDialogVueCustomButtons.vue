<script setup lang="ts">
import { ref } from 'vue';
import { ConfirmDialog } from '@coffic/cosy-ui/vue';

const showDialog = ref(false);

const handleDelete = () => {
    alert('项目已被删除！');
};
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <button
            style="background-color: #ef4444; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; border: none; cursor: pointer;"
            @click="showDialog = true">
            删除项目
        </button>

        <ConfirmDialog v-model="showDialog" title="删除确认" message="您确定要删除此项目吗？此操作无法撤销。" cancel-text="保留"
            confirm-text="删除" @confirm="handleDelete" />
    </div>
</template>

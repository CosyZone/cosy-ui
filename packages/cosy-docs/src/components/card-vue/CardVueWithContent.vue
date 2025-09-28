<script setup lang="ts">
import { Card } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <Card title="带内容的卡片" subtitle="使用默认插槽添加额外内容">
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <button
                    style="background-color: #3b82f6; color: white; padding: 0.25rem 0.75rem; border-radius: 0.375rem; border: none; font-size: 0.875rem;">
                    操作按钮
                </button>
                <button
                    style="background-color: #6b7280; color: white; padding: 0.25rem 0.75rem; border-radius: 0.375rem; border: none; font-size: 0.875rem;">
                    取消
                </button>
            </div>
        </Card>
    </div>
</template>

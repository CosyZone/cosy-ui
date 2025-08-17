<script setup lang="ts">
import { MacWindow } from '@coffic/cosy-ui/vue';
</script>

<template>
    <MacWindow title="文件浏览器" bgType="orange">
        <template #toolbar>
            <button
                style="background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; border: none; margin-right: 0.5rem;">
                🔍 搜索
            </button>
            <button
                style="background-color: #6b7280; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; border: none;">
                ⚙️ 设置
            </button>
        </template>

        <div style="padding: 1rem;">
            <h3 style="margin-bottom: 1rem; font-weight: 600;">工具栏示例</h3>
            <p style="margin-bottom: 0.5rem;">工具栏位于标题栏右侧，可以放置各种功能按钮。</p>
            <p style="margin-bottom: 0.5rem;">这里展示了搜索和设置按钮的示例。</p>
            <p>你可以根据需要添加更多的工具栏功能。</p>
        </div>
    </MacWindow>
</template>

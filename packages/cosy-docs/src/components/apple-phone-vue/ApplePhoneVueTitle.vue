<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <ApplePhone title="我的应用">
            <div style="background-color: #f3f4f6; padding: 1rem; text-align: center; height: 100%;">
                <h3 style="margin: 0 0 1rem 0; color: #374151;">窗口标题</h3>
                <p style="margin: 0; color: #6b7280;">这个示例展示了如何设置窗口标题。</p>
                <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
                    注意：title 属性目前为预留功能，尚未在界面上显示
                </p>
            </div>
        </ApplePhone>
    </div>
</template>

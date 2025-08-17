<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <ApplePhone title="我的应用">
        <Heading :level="4">窗口标题</Heading>
        <p style="margin: 0; color: #6b7280;">这个示例展示了如何设置窗口标题。</p>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
            注意：title 属性目前为预留功能，尚未在界面上显示
        </p>
    </ApplePhone>
</template>

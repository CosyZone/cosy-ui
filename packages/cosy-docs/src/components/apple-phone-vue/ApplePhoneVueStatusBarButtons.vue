<script setup lang="ts">
import { ApplePhone, Heading } from "@coffic/cosy-ui/vue";
</script>

<template>
    <ApplePhone :statusBarButtons="['wifi', 'battery', 'signal']">
        <Heading :level="4">状态栏按钮</Heading>
        <p style="margin: 0; color: #6b7280;">这个示例展示了如何配置状态栏按钮。</p>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
            注意：statusBarButtons 属性目前为预留功能，尚未实现
        </p>
    </ApplePhone>
</template>

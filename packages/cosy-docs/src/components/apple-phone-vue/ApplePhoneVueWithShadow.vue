<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <ApplePhone :withShadow="true">
        <Heading :level="4">阴影效果</Heading>
        <p style="margin: 0; color: #6b7280;">这个示例展示了如何启用阴影效果。</p>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
            注意：withShadow 属性目前为预留功能，尚未实现
        </p>
    </ApplePhone>
</template>

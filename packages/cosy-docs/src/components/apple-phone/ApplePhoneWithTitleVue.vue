<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>
<template>
    <ApplePhone title="自定义标题">
        <Heading :level="4">应用内容</Heading>
        <p>标题显示在状态栏中</p>
    </ApplePhone>
</template>

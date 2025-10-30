<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>
<template>
    <ApplePhone :showFrame="true">
        <Heading :level="4">带边框</Heading>
        <p>显示完整的 iPhone 边框和状态栏</p>
    </ApplePhone>
</template>

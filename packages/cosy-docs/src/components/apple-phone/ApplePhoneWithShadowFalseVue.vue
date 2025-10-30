<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>
<template>
    <ApplePhone :withShadow="false">
        <Heading :level="4">无阴影效果</Heading>
        <p>iPhone 窗口没有阴影</p>
    </ApplePhone>
</template>

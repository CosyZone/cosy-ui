<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>
<template>
    <ApplePhone :withShadow="true">
        <Heading :level="4">带阴影效果</Heading>
        <p>iPhone 窗口带有阴影效果</p>
    </ApplePhone>
</template>

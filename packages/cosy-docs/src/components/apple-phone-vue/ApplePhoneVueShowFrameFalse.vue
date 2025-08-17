<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <ApplePhone :showFrame="false">
        <Heading :level="4">无边框</Heading>
        <p>只显示内容区域，不显示 iPhone 边框</p>
    </ApplePhone>
</template>

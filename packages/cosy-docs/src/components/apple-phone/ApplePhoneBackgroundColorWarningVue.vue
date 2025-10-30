<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>
<template>
    <ApplePhone backgroundColor="warning/10">
        <Heading :level="4">Warning 背景</Heading>
        <p>使用 warning/10 背景色</p>
    </ApplePhone>
</template>

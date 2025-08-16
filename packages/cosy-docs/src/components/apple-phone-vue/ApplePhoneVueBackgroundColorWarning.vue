<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <ApplePhone backgroundColor="warning">
        <Heading :level="4">Warning 背景色</Heading>
        <p>使用 warning 背景色的 ApplePhone 窗口。</p>
    </ApplePhone>
</template>

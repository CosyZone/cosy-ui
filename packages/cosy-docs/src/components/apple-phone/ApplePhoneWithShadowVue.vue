<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>
<template>
    <ApplePhone :withShadow="true">
        <Heading :level="4">带阴影</Heading>
        <p>显示阴影效果增加立体感</p>
    </ApplePhone>
</template>

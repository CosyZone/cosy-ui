<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <ApplePhone>
        <Heading :level="4">默认插槽内容</Heading>
        <p>这是通过默认插槽放置的内容，可以包含任何 HTML 元素。</p>
    </ApplePhone>
</template>

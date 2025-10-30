<script setup lang="ts">
import { ApplePhone, Heading } from '@coffic/cosy-ui/vue';
</script>
<template>
    <ApplePhone title="我的应用">
        <div class="cosy:p-4 cosy:text-center">
            <Heading :level="4">欢迎使用</Heading>
            <p class="cosy:mt-2">这是一个示例应用内容</p>
        </div>
    </ApplePhone>
</template>

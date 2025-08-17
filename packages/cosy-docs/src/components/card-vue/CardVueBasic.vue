<script setup lang="ts">
import { Card } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <Card title="默认模式" subtitle="compact=false，使用默认内边距" :compact="false">
            默认内边距的卡片内容
        </Card>
    </div>
</template>

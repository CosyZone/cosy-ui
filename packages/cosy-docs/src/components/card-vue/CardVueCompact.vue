<script setup lang="ts">
import { Card } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <Card title="紧凑模式" subtitle="compact=true，使用紧凑内边距" :compact="true">
            紧凑内边距的卡片内容
        </Card>
    </div>
</template>

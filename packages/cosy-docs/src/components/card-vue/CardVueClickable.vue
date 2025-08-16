<script setup lang="ts">
import { Card } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <Card title="可点击卡片" subtitle="使用 href 属性使卡片变成链接" href="#">
            点击此卡片可跳转
        </Card>
    </div>
</template>

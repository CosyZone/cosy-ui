<script setup lang="ts">
import { ErrorPage } from '@coffic/cosy-ui/vue';
</script>

<template>
    <ErrorPage
        :error-code="404"
        :debug-k-vs="{
            reason: '页面不存在',
            suggestedAction: '请检查URL拼写',
            timestamp: new Date().toISOString(),
            requestId: 'REQ_2024_001',
        }"
    />
</template>


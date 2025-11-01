<script setup lang="ts">
import { ErrorPage } from '@coffic/cosy-ui/vue';
</script>

<template>
    <ErrorPage
        :error-code="503"
        :maintenance-mode="true"
        estimated-recovery="2024-12-25 10:00"
        status-page-url="https://status.example.com"
        :debug-k-vs="{
            reason: '系统升级',
            startTime: '2024-12-25 08:00',
            version: 'v2.1.0',
        }"
    />
</template>


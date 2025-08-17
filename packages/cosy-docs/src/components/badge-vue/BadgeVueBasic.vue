<script setup lang="ts">
import { Badge } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem;">
        <Badge>默认</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="accent">Accent</Badge>
    </div>
</template>

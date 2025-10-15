<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/ghost" :btn="true" :ghost="true">幽灵按钮</Link>
    </div>
</template>

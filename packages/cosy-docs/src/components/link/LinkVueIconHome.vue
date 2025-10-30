<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/home">
        <template #icon-left>
            <span>🏠</span>
        </template>
        首页
        </Link>
    </div>
</template>

<script setup lang="ts">
import { Link } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/user">
        <template #icon-left>
            <span>👤</span>
        </template>
        用户
        </Link>
    </div>
</template>

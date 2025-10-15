<template>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <SocialIcon platform="github" size="lg"
            style="background-color: #1e40af; border-radius: 50%; padding: 0.5rem;" />
        <SocialIcon platform="github" size="lg"
            style="background-color: #059669; border-radius: 0.5rem; padding: 0.5rem;" />
        <SocialIcon platform="github" size="lg"
            style="background: linear-gradient(45deg, #f59e0b, #ec4899); border-radius: 0.25rem; padding: 0.5rem;" />
    </div>
</template>

<script setup lang="ts">
import { SocialIcon } from "@coffic/cosy-ui/vue";
</script>

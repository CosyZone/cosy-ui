<script setup lang="ts">
import { SmartIcon } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="user" class="custom-icon" />
            <span style="font-size: 0.875rem; color: #6b7280;">默认样式</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="search" class="custom-icon" />
            <span style="font-size: 0.875rem; color: #6b7280;">自定义样式</span>
        </div>
    </div>
</template>

<style scoped>
.custom-icon {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    transition: transform 0.2s ease-in-out;
}

.custom-icon:hover {
    transform: scale(1.1);
}
</style>

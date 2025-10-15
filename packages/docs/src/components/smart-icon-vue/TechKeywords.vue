<script setup lang="ts">
import { SmartIcon } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="code" />
            <span style="font-size: 0.875rem; color: #6b7280;">code</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="github" />
            <span style="font-size: 0.875rem; color: #6b7280;">github</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="settings" />
            <span style="font-size: 0.875rem; color: #6b7280;">settings</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="tools" />
            <span style="font-size: 0.875rem; color: #6b7280;">tools</span>
        </div>
    </div>
</template>

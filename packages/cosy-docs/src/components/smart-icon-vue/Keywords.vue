<script setup lang="ts">
import { SmartIcon } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="user" />
            <span style="font-size: 0.875rem; color: #6b7280;">user</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="search" />
            <span style="font-size: 0.875rem; color: #6b7280;">search</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="settings" />
            <span style="font-size: 0.875rem; color: #6b7280;">settings</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="home" />
            <span style="font-size: 0.875rem; color: #6b7280;">home</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SmartIcon } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="user profile" />
            <span style="font-size: 0.875rem; color: #6b7280;">user profile</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="search,find" />
            <span style="font-size: 0.875rem; color: #6b7280;">search,find</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="settings config" />
            <span style="font-size: 0.875rem; color: #6b7280;">settings config</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="home,main,index" />
            <span style="font-size: 0.875rem; color: #6b7280;">home,main,index</span>
        </div>
    </div>
</template>

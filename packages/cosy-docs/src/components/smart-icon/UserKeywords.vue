<script setup lang="ts">
import { SmartIcon } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="user" />
            <span style="font-size: 0.875rem; color: #6b7280;">user</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="person" />
            <span style="font-size: 0.875rem; color: #6b7280;">person</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="account" />
            <span style="font-size: 0.875rem; color: #6b7280;">account</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="profile" />
            <span style="font-size: 0.875rem; color: #6b7280;">profile</span>
        </div>
    </div>
</template>

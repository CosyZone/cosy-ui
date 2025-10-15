<script setup lang="ts">
import { SmartIcon } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="search" />
            <span style="font-size: 0.875rem; color: #6b7280;">search</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="edit" />
            <span style="font-size: 0.875rem; color: #6b7280;">edit</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="delete" />
            <span style="font-size: 0.875rem; color: #6b7280;">delete</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <SmartIcon keyword="save" />
            <span style="font-size: 0.875rem; color: #6b7280;">save</span>
        </div>
    </div>
</template>

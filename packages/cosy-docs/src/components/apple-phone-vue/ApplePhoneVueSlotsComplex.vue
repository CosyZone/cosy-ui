<script setup lang="ts">
import { ApplePhone, Heading } from "@coffic/cosy-ui/vue";
</script>

<template>
    <ApplePhone>
        <Heading :level="4">复杂布局内容</Heading>
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
            <div
                style="background-color: #3b82f6; color: white; padding: 0.5rem; border-radius: 0.375rem; flex: 1; text-align: center;">
                左侧内容
            </div>
            <div
                style="background-color: #10b981; color: white; padding: 0.5rem; border-radius: 0.375rem; flex: 1; text-align: center;">
                右侧内容
            </div>
        </div>
        <p>插槽可以包含复杂的布局结构，如 flex 布局、网格等。</p>
    </ApplePhone>
</template>

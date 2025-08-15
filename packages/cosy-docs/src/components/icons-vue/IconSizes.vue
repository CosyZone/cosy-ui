<script setup lang="ts">
import { UserIcon } from '@coffic/cosy-ui/vue';

/**
 * @component IconSizes
 * @description Vue 图标大小展示组件，展示不同大小的图标
 */
</script>

<template>
    <div style="padding: 2rem; background-color: #f8f9fa; border-radius: 0.5rem;">
        <h3 style="margin-bottom: 1.5rem; color: #333; font-size: 1.25rem;">图标大小展示</h3>

        <div style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;">
            <div style="text-align: center;">
                <UserIcon size="16px" color="#3b82f6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">16px</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="24px" color="#3b82f6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">24px</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="32px" color="#3b82f6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">32px</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="48px" color="#3b82f6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">48px</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="64px" color="#3b82f6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">64px</p>
            </div>
        </div>
    </div>
</template>

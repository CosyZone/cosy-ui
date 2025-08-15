<script setup lang="ts">
import { UserIcon } from '@coffic/cosy-ui/vue';

/**
 * @component IconColors
 * @description Vue 图标颜色展示组件，展示不同颜色的图标
 */
</script>

<template>
    <div style="padding: 2rem; background-color: #f8f9fa; border-radius: 0.5rem;">
        <h3 style="margin-bottom: 1.5rem; color: #333; font-size: 1.25rem;">图标颜色展示</h3>

        <div style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;">
            <div style="text-align: center;">
                <UserIcon size="32px" color="#ef4444" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">红色</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="32px" color="#f59e0b" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">橙色</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="32px" color="#10b981" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">绿色</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="32px" color="#3b82f6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">蓝色</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="32px" color="#8b5cf6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">紫色</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="32px" color="#ec4899" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">粉色</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="32px" color="#6b7280" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">灰色</p>
            </div>

            <div style="text-align: center;">
                <UserIcon size="32px" color="#000000" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">黑色</p>
            </div>
        </div>
    </div>
</template>

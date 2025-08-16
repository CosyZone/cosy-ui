<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="padding: 1rem;">
        <div style="display: flex; justify-content: center;">
            <ApplePhone>
                <div style="background-color: #f3f4f6; padding: 1rem; height: 100%;">
                    <h3 style="margin: 0 0 1rem 0; color: #374151;">复杂布局内容</h3>
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
                    <p style="margin: 0; color: #6b7280;">插槽可以包含复杂的布局结构，如 flex 布局、网格等。</p>
                </div>
            </ApplePhone>
        </div>
    </div>
</template>

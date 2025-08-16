<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="padding: 1rem;">
        <div style="display: flex; justify-content: center;">
            <ApplePhone :showFrame="false">
                <div
                    style="background-color: #f3f4f6; padding: 1rem; text-align: center; height: 100%; border: 2px solid #d1d5db; border-radius: 0.5rem;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #374151;">无边框</h4>
                    <p style="margin: 0; color: #6b7280;">只显示内容区域，不显示 iPhone 边框</p>
                </div>
            </ApplePhone>
        </div>
    </div>
</template>

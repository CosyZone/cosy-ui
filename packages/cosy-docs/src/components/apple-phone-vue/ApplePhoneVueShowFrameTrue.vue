<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="padding: 1rem;">
        <div style="display: flex; justify-content: center;">
            <ApplePhone :showFrame="true">
                <div style="background-color: #f3f4f6; padding: 1rem; text-align: center; height: 100%;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #374151;">带边框</h4>
                    <p style="margin: 0; color: #6b7280;">显示完整的 iPhone 边框和状态栏</p>
                </div>
            </ApplePhone>
        </div>
    </div>
</template>

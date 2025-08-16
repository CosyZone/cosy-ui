<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="padding: 1rem;">
        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">显示边框 (showFrame=true)</h4>
            <div style="display: flex; justify-content: center;">
                <ApplePhone :showFrame="true">
                    <div style="background-color: #f3f4f6; padding: 1rem; text-align: center; height: 100%;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #374151;">带边框</h4>
                        <p style="margin: 0; color: #6b7280;">显示完整的 iPhone 边框和状态栏</p>
                    </div>
                </ApplePhone>
            </div>
        </div>

        <div>
            <h4 style="margin: 0 0 1rem 0; color: #374151;">隐藏边框 (showFrame=false)</h4>
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
    </div>
</template>

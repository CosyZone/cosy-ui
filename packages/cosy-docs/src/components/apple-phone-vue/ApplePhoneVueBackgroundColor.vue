<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <ApplePhone backgroundColor="bg-blue-50">
            <div style="background-color: #dbeafe; padding: 1rem; text-align: center; height: 100%;">
                <h3 style="margin: 0 0 1rem 0; color: #1e40af;">自定义背景色</h3>
                <p style="margin: 0; color: #1d4ed8;">这个 ApplePhone 窗口使用了自定义的背景色。</p>
            </div>
        </ApplePhone>
    </div>
</template>

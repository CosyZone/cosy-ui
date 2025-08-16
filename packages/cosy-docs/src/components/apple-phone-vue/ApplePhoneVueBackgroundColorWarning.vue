<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <ApplePhone backgroundColor="warning">
            <div style="padding: 1rem; text-align: center; height: 100%;">
                <h3 style="margin: 0 0 1rem 0; color: white;">Warning 背景色</h3>
                <p style="margin: 0; color: white; opacity: 0.9;">使用 warning 背景色的 ApplePhone 窗口。</p>
            </div>
        </ApplePhone>
    </div>
</template>

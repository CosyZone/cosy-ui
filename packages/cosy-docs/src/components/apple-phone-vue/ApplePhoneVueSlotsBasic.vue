<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="padding: 1rem;">
        <div style="display: flex; justify-content: center;">
            <ApplePhone>
                <div style="background-color: #f3f4f6; padding: 1rem; text-align: center; height: 100%;">
                    <h3 style="margin: 0 0 0.5rem 0; color: #374151;">默认插槽内容</h3>
                    <p style="margin: 0; color: #6b7280;">这是通过默认插槽放置的内容，可以包含任何 HTML 元素。</p>
                </div>
            </ApplePhone>
        </div>
    </div>
</template>

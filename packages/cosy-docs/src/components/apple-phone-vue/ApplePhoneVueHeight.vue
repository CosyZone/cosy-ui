<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="padding: 1rem;">
        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">小尺寸 (height="sm")</h4>
            <div style="display: flex; justify-content: center;">
                <ApplePhone height="sm">
                    <div style="background-color: #f3f4f6; padding: 0.5rem; text-align: center; height: 100%;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #374151;">小尺寸</h4>
                        <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">256px 高度</p>
                    </div>
                </ApplePhone>
            </div>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">中等尺寸 (height="md")</h4>
            <div style="display: flex; justify-content: center;">
                <ApplePhone height="md">
                    <div style="background-color: #f3f4f6; padding: 1rem; text-align: center; height: 100%;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #374151;">中等尺寸</h4>
                        <p style="margin: 0; color: #6b7280;">320px 高度</p>
                    </div>
                </ApplePhone>
            </div>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">大尺寸 (height="lg")</h4>
            <div style="display: flex; justify-content: center;">
                <ApplePhone height="lg">
                    <div style="background-color: #f3f4f6; padding: 1rem; text-align: center; height: 100%;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #374151;">大尺寸</h4>
                        <p style="margin: 0; color: #6b7280;">384px 高度（默认）</p>
                    </div>
                </ApplePhone>
            </div>
        </div>

        <div>
            <h4 style="margin: 0 0 1rem 0; color: #374151;">超大尺寸 (height="2xl")</h4>
            <div style="display: flex; justify-content: center;">
                <ApplePhone height="2xl">
                    <div style="background-color: #f3f4f6; padding: 1rem; text-align: center; height: 100%;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #374151;">超大尺寸</h4>
                        <p style="margin: 0; color: #6b7280;">560px 高度</p>
                    </div>
                </ApplePhone>
            </div>
        </div>
    </div>
</template>

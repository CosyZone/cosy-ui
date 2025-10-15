<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="padding: 1rem;">
        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">顶部对齐 (items="start")</h4>
            <Container flex="row" gap="md" items="start">
                <div
                    style="background-color: #3b82f6; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    短项目
                </div>
                <div
                    style="background-color: #10b981; color: white; padding: 1.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    长项目<br>多行内容
                </div>
            </Container>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">居中对齐 (items="center")</h4>
            <Container flex="row" gap="md" items="center">
                <div
                    style="background-color: #f59e0b; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    短项目
                </div>
                <div
                    style="background-color: #8b5cf6; color: white; padding: 1.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    长项目<br>多行内容
                </div>
            </Container>
        </div>

        <div>
            <h4 style="margin: 0 0 1rem 0; color: #374151;">底部对齐 (items="end")</h4>
            <Container flex="row" gap="md" items="end">
                <div
                    style="background-color: #ef4444; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    短项目
                </div>
                <div
                    style="background-color: #06b6d4; color: white; padding: 1.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    长项目<br>多行内容
                </div>
            </Container>
        </div>
    </div>
</template>

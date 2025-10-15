<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="padding: 1rem;">
        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">左对齐 (justify="start")</h4>
            <Container flex="row" gap="md" justify="start">
                <div
                    style="background-color: #3b82f6; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; width: 80px;">
                    项目1
                </div>
                <div
                    style="background-color: #10b981; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; width: 80px;">
                    项目2
                </div>
            </Container>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">居中对齐 (justify="center")</h4>
            <Container flex="row" gap="md" justify="center">
                <div
                    style="background-color: #f59e0b; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; width: 80px;">
                    项目1
                </div>
                <div
                    style="background-color: #8b5cf6; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; width: 80px;">
                    项目2
                </div>
            </Container>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">两端对齐 (justify="between")</h4>
            <Container flex="row" gap="md" justify="between">
                <div
                    style="background-color: #ef4444; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; width: 80px;">
                    项目1
                </div>
                <div
                    style="background-color: #06b6d4; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; width: 80px;">
                    项目2
                </div>
            </Container>
        </div>

        <div>
            <h4 style="margin: 0 0 1rem 0; color: #374151;">右对齐 (justify="end")</h4>
            <Container flex="row" gap="md" justify="end">
                <div
                    style="background-color: #84cc16; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; width: 80px;">
                    项目1
                </div>
                <div
                    style="background-color: #f97316; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; width: 80px;">
                    项目2
                </div>
            </Container>
        </div>
    </div>
</template>

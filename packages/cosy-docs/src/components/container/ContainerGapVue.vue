<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="padding: 1rem;">
        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">小间距 (gap="sm")</h4>
            <Container flex="row" gap="sm">
                <div
                    style="background-color: #3b82f6; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    项目1
                </div>
                <div
                    style="background-color: #10b981; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    项目2
                </div>
            </Container>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">中等间距 (gap="md")</h4>
            <Container flex="row" gap="md">
                <div
                    style="background-color: #f59e0b; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    项目1
                </div>
                <div
                    style="background-color: #8b5cf6; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    项目2
                </div>
            </Container>
        </div>

        <div>
            <h4 style="margin: 0 0 1rem 0; color: #374151;">大间距 (gap="lg")</h4>
            <Container flex="row" gap="lg">
                <div
                    style="background-color: #ef4444; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    项目1
                </div>
                <div
                    style="background-color: #06b6d4; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
                    项目2
                </div>
            </Container>
        </div>
    </div>
</template>

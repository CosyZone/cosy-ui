<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="padding: 1rem;">
        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">行布局 (flex="row")</h4>
            <Container flex="row" gap="md">
                <div
                    style="background-color: #3b82f6; color: white; padding: 1rem; border-radius: 0.5rem; text-align: center; flex: 1;">
                    第一项
                </div>
                <div
                    style="background-color: #10b981; color: white; padding: 1rem; border-radius: 0.5rem; text-align: center; flex: 1;">
                    第二项
                </div>
                <div
                    style="background-color: #f59e0b; color: white; padding: 1rem; border-radius: 0.5rem; text-align: center; flex: 1;">
                    第三项
                </div>
            </Container>
        </div>

        <div>
            <h4 style="margin: 0 0 1rem 0; color: #374151;">列布局 (flex="col")</h4>
            <Container flex="col" gap="md">
                <div
                    style="background-color: #8b5cf6; color: white; padding: 1rem; border-radius: 0.5rem; text-align: center;">
                    第一项
                </div>
                <div
                    style="background-color: #ef4444; color: white; padding: 1rem; border-radius: 0.5rem; text-align: center;">
                    第二项
                </div>
                <div
                    style="background-color: #06b6d4; color: white; padding: 1rem; border-radius: 0.5rem; text-align: center;">
                    第三项
                </div>
            </Container>
        </div>
    </div>
</template>

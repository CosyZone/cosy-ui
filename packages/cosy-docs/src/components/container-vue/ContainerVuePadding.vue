<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="padding: 1rem;">
        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">无内边距 (padding="none")</h4>
            <Container padding="none" border>
                <div style="background-color: #f3f4f6; padding: 1rem; text-align: center;">
                    <p style="margin: 0; color: #6b7280;">这个容器没有内边距</p>
                </div>
            </Container>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">小内边距 (padding="sm")</h4>
            <Container padding="sm" border>
                <div style="background-color: #f3f4f6; padding: 1rem; text-align: center;">
                    <p style="margin: 0; color: #6b7280;">这个容器有小内边距</p>
                </div>
            </Container>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">中等内边距 (padding="md")</h4>
            <Container padding="md" border>
                <div style="background-color: #f3f4f6; padding: 1rem; text-align: center;">
                    <p style="margin: 0; color: #6b7280;">这个容器有中等内边距</p>
                </div>
            </Container>
        </div>

        <div>
            <h4 style="margin: 0 0 1rem 0; color: #374151;">大内边距 (padding="lg")</h4>
            <Container padding="lg" border>
                <div style="background-color: #f3f4f6; padding: 1rem; text-align: center;">
                    <p style="margin: 0; color: #6b7280;">这个容器有大内边距</p>
                </div>
            </Container>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="padding: 1rem;">
        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">小尺寸 (size="sm")</h4>
            <Container size="sm" border>
                <div style="background-color: #f3f4f6; padding: 1rem; text-align: center;">
                    <p style="margin: 0; color: #6b7280;">这是一个小尺寸容器</p>
                </div>
            </Container>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">中等尺寸 (size="md")</h4>
            <Container size="md" border>
                <div style="background-color: #f3f4f6; padding: 1rem; text-align: center;">
                    <p style="margin: 0; color: #6b7280;">这是一个中等尺寸容器</p>
                </div>
            </Container>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">大尺寸 (size="lg")</h4>
            <Container size="lg" border>
                <div style="background-color: #f3f4f6; padding: 1rem; text-align: center;">
                    <p style="margin: 0; color: #6b7280;">这是一个大尺寸容器</p>
                </div>
            </Container>
        </div>

        <div>
            <h4 style="margin: 0 0 1rem 0; color: #374151;">全宽尺寸 (size="full")</h4>
            <Container size="full" border>
                <div style="background-color: #f3f4f6; padding: 1rem; text-align: center;">
                    <p style="margin: 0; color: #6b7280;">这是一个全宽容器</p>
                </div>
            </Container>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Container } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="padding: 1rem;">
        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">居中显示 (centered=true)</h4>
            <Container :centered="true">
                <div style="background-color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; text-align: center;">
                    <p style="margin: 0; color: #6b7280;">这个容器居中显示</p>
                </div>
            </Container>
        </div>

        <div>
            <h4 style="margin: 0 0 1rem 0; color: #374151;">左对齐 (centered=false)</h4>
            <Container :centered="false">
                <div style="background-color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; text-align: center;">
                    <p style="margin: 0; color: #6b7280;">这个容器左对齐显示</p>
                </div>
            </Container>
        </div>
    </div>
</template>

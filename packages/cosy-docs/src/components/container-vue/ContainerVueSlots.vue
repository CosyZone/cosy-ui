<script setup lang="ts">
import { Container } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="padding: 1rem;">
        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">基础内容插槽</h4>
            <Container border>
                <div style="background-color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; text-align: center;">
                    <h3 style="margin: 0 0 0.5rem 0; color: #374151;">默认插槽内容</h3>
                    <p style="margin: 0; color: #6b7280;">这是通过默认插槽放置的内容，可以包含任何 HTML 元素。</p>
                </div>
            </Container>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin: 0 0 1rem 0; color: #374151;">复杂内容插槽</h4>
            <Container border>
                <div style="background-color: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">
                    <h3 style="margin: 0 0 1rem 0; color: #374151;">复杂布局内容</h3>
                    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                        <div
                            style="background-color: #3b82f6; color: white; padding: 0.5rem; border-radius: 0.375rem; flex: 1; text-align: center;">
                            左侧内容
                        </div>
                        <div
                            style="background-color: #10b981; color: white; padding: 0.5rem; border-radius: 0.375rem; flex: 1; text-align: center;">
                            右侧内容
                        </div>
                    </div>
                    <p style="margin: 0; color: #6b7280;">插槽可以包含复杂的布局结构，如 flex 布局、网格等。</p>
                </div>
            </Container>
        </div>

        <div>
            <h4 style="margin: 0 0 1rem 0; color: #374151;">表单内容插槽</h4>
            <Container border>
                <div style="background-color: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">
                    <h3 style="margin: 0 0 1rem 0; color: #374151;">表单示例</h3>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <input type="text" placeholder="用户名"
                            style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" />
                        <input type="password" placeholder="密码"
                            style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" />
                        <button
                            style="background-color: #3b82f6; color: white; padding: 0.5rem; border: none; border-radius: 0.375rem; cursor: pointer;">
                            提交
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    </div>
</template>

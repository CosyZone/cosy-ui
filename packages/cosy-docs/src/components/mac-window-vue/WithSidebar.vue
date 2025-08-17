<script setup lang="ts">
import { MacWindow } from '@coffic/cosy-ui/vue';
</script>

<template>
    <MacWindow title="文件浏览器" bgType="blue">
        <template #sidebar>
            <div style="width: 200px; background-color: #f3f4f6; border-right: 1px solid #d1d5db; padding: 1rem;">
                <h4 style="margin-bottom: 1rem; font-weight: 600; color: #374151;">文件夹</h4>
                <div
                    style="margin-bottom: 0.5rem; padding: 0.5rem; cursor: pointer; border-radius: 0.25rem; hover:background-color: #e5e7eb;">
                    📁 文档
                </div>
                <div
                    style="margin-bottom: 0.5rem; padding: 0.5rem; cursor: pointer; border-radius: 0.25rem; hover:background-color: #e5e7eb;">
                    📁 图片
                </div>
                <div
                    style="margin-bottom: 0.5rem; padding: 0.5rem; cursor: pointer; border-radius: 0.25rem; hover:background-color: #e5e7eb;">
                    📁 下载
                </div>
                <div
                    style="margin-bottom: 0.5rem; padding: 0.5rem; cursor: pointer; border-radius: 0.25rem; hover:background-color: #e5e7eb;">
                    📁 音乐
                </div>
            </div>
        </template>

        <div style="padding: 1rem; flex: 1;">
            <h3 style="margin-bottom: 1rem; font-weight: 600;">侧边栏示例</h3>
            <p style="margin-bottom: 0.5rem;">侧边栏位于窗口左侧，适合放置导航菜单、文件树等。</p>
            <p style="margin-bottom: 0.5rem;">这里展示了文件浏览器的侧边栏示例。</p>
            <p>你可以根据需要自定义侧边栏的内容和样式。</p>
        </div>
    </MacWindow>
</template>

<!--
@component MacWindow.WithSidebar

@description
带侧边栏的MacWindow组件示例，展示侧边栏插槽的使用。
-->
<template>
  <MacWindow title="文件浏览器-Vue版本">
    <div
      slot="sidebar"
      class="cosy:w-64 cosy:bg-base-200 cosy:border-r cosy:border-base-300"
    >
      <div class="cosy:p-4">
        <div class="cosy:font-medium cosy:mb-2">文件夹</div>
        <div class="cosy:space-y-1">
          <div
            class="cosy:text-sm cosy:px-2 cosy:py-1 cosy:rounded cosy:bg-base-100"
          >
            📁 文档
          </div>
          <div class="cosy:text-sm cosy:px-2 cosy:py-1 cosy:rounded">
            📁 图片
          </div>
          <div class="cosy:text-sm cosy:px-2 cosy:py-1 cosy:rounded">
            📁 音乐
          </div>
          <div class="cosy:text-sm cosy:px-2 cosy:py-1 cosy:rounded">
            📁 视频
          </div>
        </div>
      </div>
    </div>

    <div class="cosy:p-4">
      <div class="cosy:font-medium cosy:mb-4">文件列表</div>
      <div class="cosy:space-y-2">
        <div class="cosy:flex cosy:items-center cosy:space-x-2">
          <span class="cosy:text-lg">📄</span>
          <span class="cosy:text-sm">document.pdf</span>
        </div>
        <div class="cosy:flex cosy:items-center cosy:space-x-2">
          <span class="cosy:text-lg">📄</span>
          <span class="cosy:text-sm">report.docx</span>
        </div>
        <div class="cosy:flex cosy:items-center cosy:space-x-2">
          <span class="cosy:text-lg">📄</span>
          <span class="cosy:text-sm">presentation.pptx</span>
        </div>
      </div>
    </div>
  </MacWindow>
</template>

<script setup lang="ts">
import { MacWindow } from '@coffic/cosy-ui/vue';
</script>

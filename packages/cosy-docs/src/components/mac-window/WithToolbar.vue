<!--
@component MacWindow.WithToolbar

@description
带工具栏的MacWindow组件示例，展示工具栏和状态栏插槽的使用。
-->
<template>
  <MacWindow title="文件浏览器-Vue版本">
    <div slot="toolbar">
      <button class="cosy:btn cosy:btn-ghost cosy:btn-sm">
        <SearchIcon class="cosy:w-4 cosy:h-4" />
      </button>
      <button class="cosy:btn cosy:btn-ghost cosy:btn-sm">
        <SettingsIcon class="cosy:w-4 cosy:h-4" />
      </button>
    </div>

    <div class="cosy:p-4">窗口内容</div>

    <div slot="status">
      <div class="cosy:text-xs">就绪</div>
      <button class="cosy:btn cosy:btn-ghost cosy:btn-xs">
        <InfoIcon class="cosy:w-4 cosy:h-4" />
      </button>
    </div>
  </MacWindow>
</template>

<script setup lang="ts">
import { InfoIcon, MacWindow, SearchIcon, SettingsIcon } from "@coffic/cosy-ui/vue";
</script>

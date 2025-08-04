<!--
@component MacWindow.WithTabs

@description
带标签页的MacWindow组件示例，展示标签页功能。
使用Vue的响应式特性来处理标签切换，无需手动DOM操作。
-->
<template>
  <MacWindow
    title="设置-Vue版本"
    :tabs="['通用', '外观', '高级']"
    :defaultTab="activeTab"
    :onTabClick="handleTabClick"
  >
    <div class="cosy:p-4">
      <div>当前选择的标签: {{ activeTab }}</div>
    </div>
  </MacWindow>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MacWindow } from '@coffic/cosy-ui/vue';

// 响应式状态
const activeTab = ref('外观');

// 处理标签点击事件
const handleTabClick = (tab: string) => {
  console.log('切换到标签:', tab);
  activeTab.value = tab;
};
</script>

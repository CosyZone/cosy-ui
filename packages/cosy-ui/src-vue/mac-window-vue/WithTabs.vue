<script setup>
import { ref } from 'vue';
import { MacWindow } from './index';

const activeTab = ref('外观');

const handleTabClick = (tab) => {
  activeTab.value = tab;
  console.log('当前标签:', tab);
};
</script>

<template>
  <MacWindow
    title="设置"
    :tabs="['通用', '外观', '高级']"
    defaultTab="外观"
    :onTabClick="handleTabClick"
  >
    <div class="cosy:p-4">
      <div v-if="activeTab === '通用'">通用设置内容</div>
      <div v-if="activeTab === '外观'">外观设置内容</div>
      <div v-if="activeTab === '高级'">高级设置内容</div>
    </div>
  </MacWindow>
</template>

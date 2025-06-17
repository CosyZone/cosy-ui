<script setup>
import { MacWindow } from './index';
import { SearchIcon, SettingsIcon, InfoIcon } from '../../index_vue';

const handleSearch = () => {
  console.log('搜索');
};

const handleSettings = () => {
  console.log('设置');
};

const handleInfo = () => {
  console.log('信息');
};
</script>

<template>
  <MacWindow title="文件浏览器">
    <!-- 工具栏插槽 -->
    <template #toolbar>
      <button class="cosy:btn cosy:btn-ghost cosy:btn-sm" @click="handleSearch">
        <SearchIcon class="cosy:w-4 cosy:h-4" />
      </button>
      <button
        class="cosy:btn cosy:btn-ghost cosy:btn-sm"
        @click="handleSettings"
      >
        <SettingsIcon class="cosy:w-4 cosy:h-4" />
      </button>
    </template>

    <!-- 主内容 -->
    <div class="cosy:p-4">窗口内容区域</div>

    <!-- 状态栏插槽 -->
    <template #status>
      <div class="cosy:text-xs">就绪</div>
      <button class="cosy:btn cosy:btn-ghost cosy:btn-xs" @click="handleInfo">
        <InfoIcon class="cosy:w-4 cosy:h-4" />
      </button>
    </template>
  </MacWindow>
</template>

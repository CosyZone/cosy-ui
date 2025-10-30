<!--
@component MacWindow.WithEvents

@description
带事件处理的MacWindow组件示例，展示窗口操作事件。
使用Vue的响应式特性来显示事件信息，而不是使用alert。
-->
<template>
  <MacWindow
    title="应用窗口-Vue版本"
    :tabs="['信息', '设置', '帮助']"
    :onTabClick="handleTabClick"
    :onCloseWindow="handleCloseWindow"
    :onMinimizeWindow="handleMinimizeWindow"
    :onMaximizeWindow="handleMaximizeWindow"
  >
    <div class="cosy:p-4">
      <div class="cosy:space-y-2">
        <div class="cosy:font-medium">窗口内容区域</div>
        <div v-if="eventLog.length > 0" class="cosy:space-y-1">
          <div class="cosy:text-sm cosy:text-base-content/70">最近事件：</div>
          <div
            v-for="(event, index) in eventLog"
            :key="index"
            class="cosy:text-xs cosy:bg-base-200 cosy:px-2 cosy:py-1 cosy:rounded"
          >
            {{ event }}
          </div>
        </div>
      </div>
    </div>
  </MacWindow>
</template>

<script setup lang="ts">
import { MacWindow } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

// 响应式状态 - 事件日志
const eventLog = ref<string[]>([]);

// 添加事件到日志
const addEvent = (event: string) => {
	const timestamp = new Date().toLocaleTimeString();
	eventLog.value.unshift(`${timestamp} - ${event}`);
	// 只保留最近5个事件
	if (eventLog.value.length > 5) {
		eventLog.value = eventLog.value.slice(0, 5);
	}
};

// 处理标签点击事件
const handleTabClick = (tab: string) => {
	console.log("切换到标签:", tab);
	addEvent(`切换到标签: ${tab}`);
};

// 处理关闭窗口事件
const handleCloseWindow = () => {
	console.log("关闭窗口");
	addEvent("关闭窗口");
};

// 处理最小化窗口事件
const handleMinimizeWindow = () => {
	console.log("最小化窗口");
	addEvent("最小化窗口");
};

// 处理最大化窗口事件
const handleMaximizeWindow = () => {
	console.log("最大化窗口");
	addEvent("最大化窗口");
};
</script>

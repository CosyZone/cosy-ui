import Basic from './Basic.vue';
import WithTabs from './WithTabs.vue';
import WithEvents from './WithEvents.vue';
import WithToolbar from './WithToolbar.vue';
import WithSidebar from './WithSidebar.vue';
import CustomHeight from './CustomHeight.vue';
import BasicSource from './Basic.vue?raw';
import WithTabsSource from './WithTabs.vue?raw';
import WithEventsSource from './WithEvents.vue?raw';
import WithToolbarSource from './WithToolbar.vue?raw';
import WithSidebarSource from './WithSidebar.vue?raw';
import CustomHeightSource from './CustomHeight.vue?raw';

// 转换Vue SFC组件为简化的示例代码（只保留template和setup script）
function extractSimpleExample(source: string): string {
	// 提取模板部分
	const templateMatch = source.match(/<template>([\s\S]*?)<\/template>/);
	const template = templateMatch ? templateMatch[1].trim() : '';

	// 创建简化版本的代码
	return `<template>${template}</template>

<script setup>
import { MacWindow } from 'cosy-ui';
import { SearchIcon, SettingsIcon, InfoIcon } from 'cosy-ui/icons';
</script>`;
}

// 导出主组件
export { default as MacWindow } from './MacWindow.vue';

// 将示例组件整合为一个对象导出
export const MacWindowExamples = {
	Basic,
	WithTabs,
	WithEvents,
	WithToolbar,
	WithSidebar,
	CustomHeight,
};

// 导出示例组件的源代码（简化版本）
export const MacWindowExampleCodes = {
	Basic: extractSimpleExample(BasicSource),
	WithTabs: extractSimpleExample(WithTabsSource),
	WithEvents: extractSimpleExample(WithEventsSource),
	WithToolbar: extractSimpleExample(WithToolbarSource),
	WithSidebar: extractSimpleExample(WithSidebarSource),
	CustomHeight: extractSimpleExample(CustomHeightSource),
};

import Basic from './Basic.vue';
import WeatherApp from './WeatherApp.vue';
import NoFrame from './NoFrame.vue';
import CustomBackground from './CustomBackground.vue';
import BasicSource from './Basic.vue?raw';
import NoFrameSource from './NoFrame.vue?raw';
import CustomBackgroundSource from './CustomBackground.vue?raw';
import WeatherAppSource from './WeatherApp.vue?raw';

// 转换Vue SFC组件为简化的示例代码（只保留template和setup script）
function extractSimpleExample(source: string): string {
	// 提取模板部分
	const templateMatch = source.match(/<template>([\s\S]*?)<\/template>/);
	const template = templateMatch ? templateMatch[1].trim() : '';

	// 创建简化版本的代码
	return `<template>${template}</template>

<script setup>
import { iPhoneWindow } from 'cosy-ui';
</script>`;
}

// 导出主组件
export { default as iPhoneWindow } from './iPhoneWindow.vue';

// 将示例组件整合为一个对象导出
export const iPhoneWindowExamples = {
	Basic,
	WeatherApp,
	NoFrame,
	CustomBackground,
};

// 导出示例组件的源代码（简化版本）
export const iPhoneWindowExampleCodes = {
	Basic: extractSimpleExample(BasicSource),
	NoFrame: extractSimpleExample(NoFrameSource),
	CustomBackground: extractSimpleExample(CustomBackgroundSource),
	WeatherApp: extractSimpleExample(WeatherAppSource),
};

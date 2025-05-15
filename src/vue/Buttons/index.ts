import FeatureBasic from './FeatureBasic.vue';
import FeatureWithTips from './FeatureWithTips.vue';
import Multiple from './Multiple.vue';
import LinkBasic from './LinkBasic.vue';
import FeatureBasicSource from './FeatureBasic.vue?raw';
import FeatureWithTipsSource from './FeatureWithTips.vue?raw';
import MultipleSource from './Multiple.vue?raw';
import LinkBasicSource from './LinkBasic.vue?raw';

// 转换Vue SFC组件为简化的示例代码（只保留template和setup script）
function extractSimpleExample(source: string): string {
	// 提取模板部分
	const templateMatch = source.match(/<template>([\s\S]*?)<\/template>/);
	const template = templateMatch ? templateMatch[1].trim() : '';

	// 提取script setup部分（去除import部分）
	const scriptMatch = source.match(/<script setup lang="ts">([\s\S]*?)<\/script>/);
	let script = '';
	if (scriptMatch) {
		// 只保留相关变量定义，去除导入语句
		script = scriptMatch[1]
			.replace(/import [^;]+;/g, '')
			.replace(/import (FeatureButton|LinkButton) from '[^']+';/g, "import { $1 } from 'cosy-ui';")
			.trim();
	}

	// 创建简化版本的代码
	return `<template>${template}</template>

<script setup lang="ts">${script}</script>`;
}

// 导出组件
export { default as FeatureButton } from './FeatureButton.vue';
export { default as LinkButton } from './LinkButton.vue';

// 将示例组件整合为一个对象导出
export const ButtonsExamples = {
	FeatureButton: {
		Basic: FeatureBasic,
		WithTips: FeatureWithTips,
	},
	LinkButton: {
		Basic: LinkBasic,
		Multiple: Multiple,
	},
};

// 导出示例组件的源代码（简化版本）
export const ButtonsExampleCodes = {
	FeatureButton: {
		Basic: extractSimpleExample(FeatureBasicSource),
		WithTips: extractSimpleExample(FeatureWithTipsSource),
	},
	LinkButton: {
		Basic: extractSimpleExample(LinkBasicSource),
		Multiple: extractSimpleExample(MultipleSource),
	},
};

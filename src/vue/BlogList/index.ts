import Basic from './Basic.vue';
import Empty from './Empty.vue';
import English from './English.vue';
import EmptyEnglish from './EmptyEnglish.vue';
import BasicSource from './Basic.vue?raw';
import EmptySource from './Empty.vue?raw';
import EnglishSource from './English.vue?raw';
import EmptyEnglishSource from './EmptyEnglish.vue?raw';

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
			.replace(/import BlogList from '[^']+';/g, "import { BlogList } from 'cosy-ui';")
			.trim();
	}

	// 创建简化版本的代码
	return `<template>${template}</template>

<script setup lang="ts">${script}</script>`;
}

// 导出主组件
export { default as BlogList } from './BlogList.vue';

// 将示例组件整合为一个对象导出
export const BlogListExamples = {
	Basic,
	Empty,
	English,
	EmptyEnglish,
};

// 导出示例组件的源代码（简化版本）
export const BlogListExampleCodes = {
	Basic: extractSimpleExample(BasicSource),
	Empty: extractSimpleExample(EmptySource),
	English: extractSimpleExample(EnglishSource),
	EmptyEnglish: extractSimpleExample(EmptyEnglishSource),
};

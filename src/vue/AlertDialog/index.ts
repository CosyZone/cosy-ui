import Basic from './Basic.vue';
import Multilang from './Multilang.vue';
import BasicSource from './Basic.vue?raw';
import MultilangSource from './Multilang.vue?raw';

// 提取简单示例源代码函数
function extractSimpleExample(source: string): string {
	// 提取模板部分
	const templateMatch = source.match(/<template>([\s\S]*)<\/template>/m);
	const scriptMatch = source.match(/<script[\s\S]*?>([\s\S]*)<\/script>/m);

	if (!templateMatch) {
		return source;
	}

	let importSection = `<script setup lang="ts">
import { ref } from 'vue'
import { AlertDialog } from '@cosy/index_vue'
`;

	// 从源码中提取导入语句（除了组件的导入和app.css）
	if (scriptMatch && scriptMatch[1]) {
		const importLines = scriptMatch[1]
			.split('\n')
			.filter(
				(line) =>
					line.includes('import') &&
					!line.includes('../../app.css') &&
					!line.includes('AlertDialog')
			);

		if (importLines.length > 0) {
			importSection += importLines.join('\n') + '\n';
		}
	}

	importSection += '</script>\n\n';

	// 提取模板内容，并替换组件路径
	const templateContent = templateMatch[1].replace('../AlertDialog.vue', 'AlertDialog');

	return importSection + '<template>' + templateContent + '</template>';
}

// 导出主组件
export { default as AlertDialog } from './AlertDialog.vue';

// 导出示例组件
export const AlertDialogExamples = {
	Basic,
	Multilang,
};

// 导出示例源代码
export const AlertDialogExampleCodes = {
	Basic: extractSimpleExample(BasicSource),
	Multilang: extractSimpleExample(MultilangSource),
};

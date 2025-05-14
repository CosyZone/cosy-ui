import Basic from './ExampleBasic.vue';
import CustomBg from './ExampleCustomBg.vue';
import DisplayMode from './ExampleDisplayMode.vue';
import SmartBanner from './SmartBanner.vue';
import SizePreset from './ExampleSizePreset.vue';
import ImageExport from './ExampleImageExport.vue';
import CustomComponent from './ExampleCustomComponent.vue';
import BasicSource from './ExampleBasic.vue?raw';
import CustomBgSource from './ExampleCustomBg.vue?raw';
import DisplayModeSource from './ExampleDisplayMode.vue?raw';
import SmartBannerSource from './SmartBanner.vue?raw';
import SizePresetSource from './ExampleSizePreset.vue?raw';
import ImageExportSource from './ExampleImageExport.vue?raw';
import CustomComponentSource from './ExampleCustomComponent.vue?raw';

// 提取简单示例源代码函数
function extractSimpleExample(source: string): string {
	// 提取模板部分
	const templateMatch = source.match(/<template>([\s\S]*)<\/template>/m);
	const scriptMatch = source.match(/<script[\s\S]*?>([\s\S]*)<\/script>/m);

	if (!templateMatch) {
		return source;
	}

	let importSection = `<script setup>
import { BannerBox } from 'cosy-ui'
`;

	// 从源码中提取导入语句（除了组件的导入和app.css）
	if (scriptMatch && scriptMatch[1]) {
		const importLines = scriptMatch[1]
			.split('\n')
			.filter(
				(line) =>
					line.includes('import') && !line.includes('../../app.css') && !line.includes('BannerBox')
			);

		if (importLines.length > 0) {
			importSection += importLines.join('\n') + '\n';
		}
	}

	importSection += '</script>\n\n';

	// 提取模板内容，并替换组件路径
	const templateContent = templateMatch[1].replace('../BannerBox.vue', 'BannerBox');

	return importSection + '<template>' + templateContent + '</template>';
}

// 获取 BannerBox 和 FeatureCard 组件
export { default as BannerBox } from './BannerBox.vue';
export { default as FeatureCard } from './FeatureCard.vue';
export { default as DownloadButton } from './DownloadButton.vue';
export { bgClasses } from './bgStyles';

// 导出示例组件
export const BannerBoxExamples = {
	Basic,
	CustomBg,
	DisplayMode,
	SmartBanner,
	SizePreset,
	ImageExport,
	CustomComponent,
};

// 导出示例源代码
export const BannerBoxExampleCodes = {
	Basic: extractSimpleExample(BasicSource),
	CustomBg: extractSimpleExample(CustomBgSource),
	DisplayMode: extractSimpleExample(DisplayModeSource),
	SmartBanner: extractSimpleExample(SmartBannerSource),
	SizePreset: extractSimpleExample(SizePresetSource),
	ImageExport: extractSimpleExample(ImageExportSource),
	CustomComponent: extractSimpleExample(CustomComponentSource),
};

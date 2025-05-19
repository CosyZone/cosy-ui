import Basic from './Basic.vue';
import WithImage from './WithImage.vue';
import WithCustomContent from './WithCustomContent.vue';
import BasicSource from './Basic.vue?raw';
import WithImageSource from './WithImage.vue?raw';
import WithCustomContentSource from './WithCustomContent.vue?raw';
import { extractSimpleExample } from '../../utils/component';

// 导出主组件
export { default as SmartHero } from './SmartHero.vue';

// 将示例组件整合为一个对象导出
export const SmartHeroExamples = {
	Basic,
	WithImage,
	WithCustomContent,
};

// 导出示例组件的源代码（简化版本）
export const SmartHeroExampleCodes = {
	Basic: extractSimpleExample(BasicSource, 'SmartHero'),
	WithImage: extractSimpleExample(WithImageSource, 'SmartHero'),
	WithCustomContent: extractSimpleExample(WithCustomContentSource, 'SmartHero'),
};

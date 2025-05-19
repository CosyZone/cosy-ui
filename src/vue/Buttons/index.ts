import FeatureBasic from './FeatureBasic.vue';
import FeatureWithTips from './FeatureWithTips.vue';
import Multiple from './Multiple.vue';
import LinkBasic from './LinkBasic.vue';
import FeatureBasicSource from './FeatureBasic.vue?raw';
import FeatureWithTipsSource from './FeatureWithTips.vue?raw';
import MultipleSource from './Multiple.vue?raw';
import LinkBasicSource from './LinkBasic.vue?raw';
import { extractSimpleExample } from '../../utils/component';

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
		Basic: extractSimpleExample(FeatureBasicSource, 'Button'),
		WithTips: extractSimpleExample(FeatureWithTipsSource, 'Button'),
	},
	LinkButton: {
		Basic: extractSimpleExample(LinkBasicSource, 'Button'),
		Multiple: extractSimpleExample(MultipleSource, 'Button'),
	},
};

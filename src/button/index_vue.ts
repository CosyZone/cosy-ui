import FeatureBasic from './VueBtnFeatureBasic.vue';
import FeatureWithTips from './VueBtnFeatureWithTips.vue';
import Multiple from './VueBtnMultiple.vue';
import LinkBasic from './VueBtnLinkBasic.vue';
import FeatureBasicSource from './VueBtnFeatureBasic.vue?raw';
import FeatureWithTipsSource from './VueBtnFeatureWithTips.vue?raw';
import MultipleSource from './VueBtnMultiple.vue?raw';
import LinkBasicSource from './VueBtnLinkBasic.vue?raw';
import { extractSimpleExample } from '../utils/component';

// 导出组件
export { default as FeatureButton } from './VueBtnFeature.vue';
export { default as VueBtnLink } from './VueBtnLink.vue';

// 将示例组件整合为一个对象导出
export const VueButtonsExamples = {
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
export const VueButtonsExampleCodes = {
	FeatureButton: {
		Basic: extractSimpleExample(FeatureBasicSource, 'Button'),
		WithTips: extractSimpleExample(FeatureWithTipsSource, 'Button'),
	},
	LinkButton: {
		Basic: extractSimpleExample(LinkBasicSource, 'Button'),
		Multiple: extractSimpleExample(MultipleSource, 'Button'),
	},
};
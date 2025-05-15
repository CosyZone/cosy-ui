import FeatureButton from './FeatureButton.vue';
import LinkButton from './LinkButton.vue';

// 导出组件
export { FeatureButton, LinkButton };

// 示例展示
export const ButtonsExamples = {
	FeatureButton: {
		Basic: {
			render: () => ({
				components: { FeatureButton },
				template: `<FeatureButton title="特性按钮" />`,
			}),
		},
		WithTips: {
			render: () => ({
				components: { FeatureButton },
				template: `<FeatureButton title="带提示特性" showTips />`,
			}),
		},
	},
	LinkButton: {
		Basic: {
			render: () => ({
				components: { LinkButton },
				template: `<LinkButton text="了解更多" href="#" />`,
			}),
		},
		Multiple: {
			render: () => ({
				components: { LinkButton },
				template: `
                <div class="cosy:flex cosy:gap-4">
                    <LinkButton text="了解更多" href="#" />
                    <LinkButton text="立即开始" href="#get-started" />
                </div>
                `,
			}),
		},
	},
};

// 示例代码
export const ButtonsExampleCodes = {
	FeatureButton: {
		Basic: `<FeatureButton title="特性按钮" />`,
		WithTips: `<FeatureButton title="带提示特性" showTips />`,
	},
	LinkButton: {
		Basic: `<LinkButton text="了解更多" href="#" />`,
		Multiple: `
<div class="cosy:flex cosy:gap-4">
    <LinkButton text="了解更多" href="#" />
    <LinkButton text="立即开始" href="#get-started" />
</div>
        `,
	},
};

<script setup lang="ts">
import { computed } from 'vue';
type BackgroundColor = string;
type BorderColor = string;
type BorderSize = "none" | "sm" | "md" | "lg" | "xl";
type FitMode = "none" | "contain" | "cover";
type Size = "none" | "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full";
type HeightSize = Size | "screen" | "auto";
type FlexAlign = "start" | "end" | "center" | "baseline" | "stretch";
type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";
type FlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
type GapSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type MarginSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
type PaddingSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
type RoundedSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
type ShadowSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
	/** 宽高比（宽/高） */
	aspectRatio?: number;
	/** 是否居中显示 */
	centered?: boolean;
	/** 自定义类名 */
	class?: string;
	/** 内容居中 */
	contentCentered?: boolean;
	/** flex 方向 */
	flex?: FlexDirection;
	/** 适配模式 */
	fit?: FitMode;
	/** 间距 */
	gap?: GapSize;
	/** 高度 */
	height?: HeightSize;
	/** 交叉轴对齐 */
	items?: FlexAlign;
	/** 主轴分布 */
	justify?: FlexJustify;
	/** 外边距 */
	margin?: MarginSize;
	/** 柔和色 */
	muted?: boolean;
	/** 内边距 */
	padding?: PaddingSize;
	py?: PaddingSize;
	pt?: PaddingSize;
	pb?: PaddingSize;
	px?: PaddingSize;
	pl?: PaddingSize;
	pr?: PaddingSize;
	/** 阴影 */
	shadow?: ShadowSize;
	/** 宽度 */
	width?: Size;
	/** 圆角 */
	rounded?: RoundedSize;
	/** 背景色 */
	background?: BackgroundColor;
	/** 边框 */
	border?: BorderSize;
	/** 边框颜色 */
	borderColor?: BorderColor;
	/** 背景图片 URL */
	backgroundImage?: string;
}

const props = withDefaults(defineProps<Props>(), {
	padding: 'md',
	centered: true,
	border: 'none',
	gap: 'none',
	rounded: 'none',
	muted: false,
	shadow: 'none',
	class: '',
	contentCentered: false,
	fit: 'none',
	margin: 'none',
	width: 'md',
});

/* ==================== 校验（内联） ==================== */
const validationMessages = computed(() => {
	const msgs: string[] = [];
	const p = props;
	const hasPx = p.px && p.px !== 'none';
	const hasPl = p.pl && p.pl !== 'none';
	const hasPr = p.pr && p.pr !== 'none';
	const hasPy = p.py && p.py !== 'none';
	const hasPt = p.pt && p.pt !== 'none';
	const hasPb = p.pb && p.pb !== 'none';
	if (hasPx && (hasPl || hasPr)) {
		msgs.push('不能同时使用 px 和 pl/pr 属性，因为它们都会设置水平内边距。请只使用其中一种方式。');
	}
	if (hasPy && (hasPt || hasPb)) {
		msgs.push('不能同时使用 py 和 pt/pb 属性，因为它们都会设置垂直内边距。请只使用其中一种方式。');
	}
	const hasAR = p.aspectRatio !== undefined;
	const hasH = !!p.height && p.height !== 'none';
	const hasW = !!p.width && p.width !== 'none';
	if (hasAR && hasH && hasW) {
		msgs.push('不能同时设置 aspectRatio、width 与 height。可两两组合，但不能同时设置3个。');
	}
	if (p.fit && p.fit !== 'none' && !hasAR) {
		msgs.push('参数不完整：启用了 fit，但未设置 aspectRatio。');
	}
	return msgs;
});
const hasError = computed(() => validationMessages.value.length > 0);

/* ==================== BEM 类名 ==================== */
const bgColorVarMap: Record<string, string> = {
	primary: '--cosy-container-primary',
	secondary: '--cosy-container-secondary',
	accent: '--cosy-container-accent',
	neutral: '--cosy-container-neutral',
	'base-100': '--cosy-container-base-100',
	'base-200': '--cosy-container-base-200',
	'base-300': '--cosy-container-base-300',
	success: '--cosy-container-success',
	warning: '--cosy-container-warning',
	error: '--cosy-container-error',
	info: '--cosy-container-info',
	transparent: '--cosy-container-transparent',
};

function resolveBackground(background?: BackgroundColor): {
	modifier: string;
	style: Record<string, string>;
} {
	if (!background || background === 'none') return { modifier: '', style: {} };
	if (background === 'transparent')
		return { modifier: 'cosy-container--bg-transparent', style: {} };
	const idx = background.indexOf('/');
	const name = idx >= 0 ? background.slice(0, idx) : background;
	const op = idx >= 0 ? background.slice(idx + 1) : '';
	const varName = bgColorVarMap[name];
	if (!varName) return { modifier: '', style: {} };
	const modifier = `cosy-container--bg-${name}`;
	if (!op) return { modifier, style: {} };
	return {
		modifier,
		style: {
			'--cosy-container-bg': `color-mix(in srgb, var(${varName}) ${op}%, transparent)`,
		},
	};
}

function resolveBorderColor(borderColor?: BorderColor): {
	modifier: string;
	style: Record<string, string>;
} {
	if (!borderColor || borderColor === 'none') return { modifier: '', style: {} };
	if (borderColor === 'transparent')
		return { modifier: 'cosy-container--border-color-transparent', style: {} };
	const idx = borderColor.indexOf('/');
	const name = idx >= 0 ? borderColor.slice(0, idx) : borderColor;
	const op = idx >= 0 ? borderColor.slice(idx + 1) : '';
	const varName = bgColorVarMap[name];
	if (!varName) return { modifier: '', style: {} };
	const modifier = `cosy-container--border-color-${name}`;
	if (!op) return { modifier, style: {} };
	return {
		modifier,
		style: {
			'--cosy-container-border-color': `color-mix(in srgb, var(${varName}) ${op}%, transparent)`,
		},
	};
}

const sizeToMod = (prefix: string, v?: string) =>
	v && v !== 'none' ? `cosy-container--${prefix}-${v}` : '';

const fitEnabled = computed(
	() => props.fit !== 'none' && typeof props.aspectRatio === 'number',
);
const hasExplicitHeight = computed(
	() => !!props.height && props.height !== 'none',
);
const isHeightDrivenAspect = computed(
	() =>
		!fitEnabled.value &&
		typeof props.aspectRatio === 'number' &&
		!!props.height &&
		props.height !== 'none',
);

const containerClasses = computed(() => {
	const p = props;
	const { modifier: bgMod } = resolveBackground(p.background);
	const { modifier: bcMod } = resolveBorderColor(p.borderColor);
	return [
		'cosy-container',
		p.centered ? 'cosy-container--centered' : '',
		p.contentCentered ? 'cosy-container--content-centered' : '',
		sizeToMod('width', p.width),
		sizeToMod('padding', p.padding),
		sizeToMod('py', p.py),
		sizeToMod('pt', p.pt),
		sizeToMod('pb', p.pb),
		sizeToMod('px', p.px),
		sizeToMod('pl', p.pl),
		sizeToMod('pr', p.pr),
		sizeToMod('margin', p.margin),
		p.muted ? 'cosy-container--muted' : '',
		sizeToMod('rounded', p.rounded),
		bgMod,
		sizeToMod('shadow', p.shadow),
		sizeToMod('border', p.border),
		bcMod,
		p.flex ? 'cosy-container--flex' : '',
		p.flex ? `cosy-container--flex-${p.flex}` : '',
		p.flex ? sizeToMod('gap', p.gap) : '',
		p.flex && p.items ? `cosy-container--items-${p.items}` : '',
		p.flex && p.justify ? `cosy-container--justify-${p.justify}` : '',
		sizeToMod('height', p.height),
		p.class,
	]
		.filter(Boolean)
		.join(' ');
});

/* ==================== 内联样式 ==================== */
const rootStyle = computed(() => {
	const style: Record<string, string> = {};
	Object.assign(style, resolveBackground(props.background).style);
	Object.assign(style, resolveBorderColor(props.borderColor).style);
	if (fitEnabled.value) {
		style['container-type'] = hasExplicitHeight.value ? 'size' : 'inline-size';
	} else if (props.aspectRatio && !isHeightDrivenAspect.value) {
		style['aspect-ratio'] = String(props.aspectRatio);
	}
	return style;
});

const roundedClassMod = computed(() =>
	props.rounded && props.rounded !== 'none'
		? `cosy-container--rounded-${props.rounded}`
		: '',
);

const fitWidthStyle = computed(() => {
	if (props.aspectRatio == null) return '';
	return props.fit === 'contain'
		? `min(100cqw, calc(100cqh * ${props.aspectRatio}))`
		: `max(100cqw, calc(100cqh * ${props.aspectRatio}))`;
});
</script>

<template>
	<!-- 错误提示 -->
	<section v-if="hasError" class="cosy-container__error" aria-label="container-error">
		<div class="cosy-container__error-tip">
			<ul class="cosy-container__error-list">
				<li v-for="(m, i) in validationMessages" :key="i">{{ m }}</li>
			</ul>
		</div>
	</section>

	<section v-else :class="containerClasses" :style="rootStyle">
		<!-- 背景图片层 -->
		<div
			v-if="props.backgroundImage"
			class="cosy-container__bg"
			:style="{ backgroundImage: `url(${props.backgroundImage})` }"
		/>

		<!-- 情况1: fit + aspectRatio -->
		<template v-if="fitEnabled">
			<div v-if="hasExplicitHeight" class="cosy-container__aspect-abs">
				<div
					:style="`aspect-ratio: ${props.aspectRatio}; width: ${fitWidthStyle}; height: auto;`">
					<div class="cosy-container__aspect-inner"><slot /></div>
				</div>
			</div>
			<div v-else :class="['cosy-container__aspect-grid', roundedClassMod]">
				<div :style="`aspect-ratio: ${props.aspectRatio}; width: 100%; height: auto;`">
					<div
						:class="['cosy-container__aspect-inner', roundedClassMod]"
						aria-label="container-content">
						<slot />
					</div>
				</div>
			</div>
		</template>

		<!-- 情况2: 高度驱动 -->
		<div v-else-if="isHeightDrivenAspect" class="cosy-container__hd-outer">
			<div class="cosy-container__hd-inner"><slot /></div>
		</div>

		<!-- 情况3: 默认 -->
		<slot v-else />
	</section>
</template>

<style>
	/* Container - 原生 CSS 实现（与 Container.astro 一致，daisyui corporate 主题色） */
	.cosy-container {
		--cosy-container-primary: var(--color-primary, #4b6bfb);
		--cosy-container-secondary: var(--color-secondary, #7b92b2);
		--cosy-container-accent: var(--color-accent, #67baa3);
		--cosy-container-neutral: var(--color-neutral, #181a2a);
		--cosy-container-base-100: var(--color-base-100, #ffffff);
		--cosy-container-base-200: var(--color-base-200, #e9e9e9);
		--cosy-container-base-300: var(--color-base-300, #d7d7d7);
		--cosy-container-base-content: var(--color-base-content, #1d1d1d);
		--cosy-container-info: var(--color-info, #2563eb);
		--cosy-container-success: var(--color-success, #16a34a);
		--cosy-container-warning: var(--color-warning, #d97706);
		--cosy-container-error: var(--color-error, #dc2626);
		--cosy-container-transparent: transparent;

		--cosy-container-bg: transparent;
		--cosy-container-border-color: var(--cosy-container-base-300);

		box-sizing: border-box;
		position: relative;
		width: 100%;
		display: block;
		border-style: solid;
		border-width: 0;
		border-color: var(--cosy-container-border-color);
		background-color: var(--cosy-container-bg);
		color: var(--cosy-container-base-content);
	}

	.cosy-container--centered { margin-left: auto; margin-right: auto; }
	.cosy-container--content-centered {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cosy-container--width-xs { max-width: 20rem; }
	.cosy-container--width-sm { max-width: 24rem; }
	.cosy-container--width-md { max-width: 42rem; }
	.cosy-container--width-lg { max-width: 56rem; }
	.cosy-container--width-xl { max-width: 72rem; }
	.cosy-container--width-2xl { max-width: 80rem; }
	.cosy-container--width-3xl { max-width: 88rem; }
	.cosy-container--width-4xl { max-width: 96rem; }
	.cosy-container--width-full { max-width: 100%; width: 100%; }

	.cosy-container--padding-none { padding: 0; }
	.cosy-container--padding-xs { padding: 0.25rem; }
	.cosy-container--padding-sm { padding: 0.5rem; }
	.cosy-container--padding-md { padding: 1rem; }
	.cosy-container--padding-lg { padding: 1.5rem; }
	.cosy-container--padding-xl { padding: 2rem; }
	.cosy-container--padding-2xl { padding: 2.5rem; }
	.cosy-container--padding-3xl { padding: 3rem; }
	.cosy-container--padding-4xl { padding: 4rem; }
	.cosy-container--padding-5xl { padding: 5rem; }

	.cosy-container--py-none { padding-top: 0; padding-bottom: 0; }
	.cosy-container--py-xs { padding-top: 0.25rem; padding-bottom: 0.25rem; }
	.cosy-container--py-sm { padding-top: 0.5rem; padding-bottom: 0.5rem; }
	.cosy-container--py-md { padding-top: 1rem; padding-bottom: 1rem; }
	.cosy-container--py-lg { padding-top: 1.5rem; padding-bottom: 1.5rem; }
	.cosy-container--py-xl { padding-top: 2rem; padding-bottom: 2rem; }
	.cosy-container--py-2xl { padding-top: 2.5rem; padding-bottom: 2.5rem; }
	.cosy-container--py-3xl { padding-top: 3rem; padding-bottom: 3rem; }
	.cosy-container--py-4xl { padding-top: 4rem; padding-bottom: 4rem; }
	.cosy-container--py-5xl { padding-top: 5rem; padding-bottom: 5rem; }

	.cosy-container--pt-none { padding-top: 0; }
	.cosy-container--pt-xs { padding-top: 0.25rem; }
	.cosy-container--pt-sm { padding-top: 0.5rem; }
	.cosy-container--pt-md { padding-top: 1rem; }
	.cosy-container--pt-lg { padding-top: 1.5rem; }
	.cosy-container--pt-xl { padding-top: 2rem; }
	.cosy-container--pt-2xl { padding-top: 2.5rem; }
	.cosy-container--pt-3xl { padding-top: 3rem; }
	.cosy-container--pt-4xl { padding-top: 4rem; }
	.cosy-container--pt-5xl { padding-top: 5rem; }

	.cosy-container--pb-none { padding-bottom: 0; }
	.cosy-container--pb-xs { padding-bottom: 0.25rem; }
	.cosy-container--pb-sm { padding-bottom: 0.5rem; }
	.cosy-container--pb-md { padding-bottom: 1rem; }
	.cosy-container--pb-lg { padding-bottom: 1.5rem; }
	.cosy-container--pb-xl { padding-bottom: 2rem; }
	.cosy-container--pb-2xl { padding-bottom: 2.5rem; }
	.cosy-container--pb-3xl { padding-bottom: 3rem; }
	.cosy-container--pb-4xl { padding-bottom: 4rem; }
	.cosy-container--pb-5xl { padding-bottom: 5rem; }

	.cosy-container--px-none { padding-left: 0; padding-right: 0; }
	.cosy-container--px-xs { padding-left: 0.25rem; padding-right: 0.25rem; }
	.cosy-container--px-sm { padding-left: 0.5rem; padding-right: 0.5rem; }
	.cosy-container--px-md { padding-left: 1rem; padding-right: 1rem; }
	.cosy-container--px-lg { padding-left: 1.5rem; padding-right: 1.5rem; }
	.cosy-container--px-xl { padding-left: 2rem; padding-right: 2rem; }
	.cosy-container--px-2xl { padding-left: 2.5rem; padding-right: 2.5rem; }
	.cosy-container--px-3xl { padding-left: 3rem; padding-right: 3rem; }
	.cosy-container--px-4xl { padding-left: 4rem; padding-right: 4rem; }
	.cosy-container--px-5xl { padding-left: 5rem; padding-right: 5rem; }

	.cosy-container--pl-none { padding-left: 0; }
	.cosy-container--pl-xs { padding-left: 0.25rem; }
	.cosy-container--pl-sm { padding-left: 0.5rem; }
	.cosy-container--pl-md { padding-left: 1rem; }
	.cosy-container--pl-lg { padding-left: 1.5rem; }
	.cosy-container--pl-xl { padding-left: 2rem; }
	.cosy-container--pl-2xl { padding-left: 2.5rem; }
	.cosy-container--pl-3xl { padding-left: 3rem; }
	.cosy-container--pl-4xl { padding-left: 4rem; }
	.cosy-container--pl-5xl { padding-left: 5rem; }

	.cosy-container--pr-none { padding-right: 0; }
	.cosy-container--pr-xs { padding-right: 0.25rem; }
	.cosy-container--pr-sm { padding-right: 0.5rem; }
	.cosy-container--pr-md { padding-right: 1rem; }
	.cosy-container--pr-lg { padding-right: 1.5rem; }
	.cosy-container--pr-xl { padding-right: 2rem; }
	.cosy-container--pr-2xl { padding-right: 2.5rem; }
	.cosy-container--pr-3xl { padding-right: 3rem; }
	.cosy-container--pr-4xl { padding-right: 4rem; }
	.cosy-container--pr-5xl { padding-right: 5rem; }

	.cosy-container--margin-xs { margin-top: 0.25rem; margin-bottom: 0.25rem; }
	.cosy-container--margin-sm { margin-top: 0.5rem; margin-bottom: 0.5rem; }
	.cosy-container--margin-md { margin-top: 1rem; margin-bottom: 1rem; }
	.cosy-container--margin-lg { margin-top: 1.5rem; margin-bottom: 1.5rem; }
	.cosy-container--margin-xl { margin-top: 2rem; margin-bottom: 2rem; }
	.cosy-container--margin-2xl { margin-top: 3rem; margin-bottom: 3rem; }
	.cosy-container--margin-3xl { margin-top: 4rem; margin-bottom: 4rem; }
	.cosy-container--margin-4xl { margin-top: 5rem; margin-bottom: 5rem; }
	.cosy-container--margin-5xl { margin-top: 6rem; margin-bottom: 6rem; }
	.cosy-container--margin-6xl { margin-top: 8rem; margin-bottom: 8rem; }

	.cosy-container--height-3xs { height: 2.5rem; }
	.cosy-container--height-2xs { height: 3rem; }
	.cosy-container--height-xs { height: 4rem; }
	.cosy-container--height-sm { height: 6rem; }
	.cosy-container--height-md { height: 8rem; }
	.cosy-container--height-lg { height: 10rem; }
	.cosy-container--height-xl { height: 12rem; }
	.cosy-container--height-2xl { height: 14rem; }
	.cosy-container--height-3xl { height: 16rem; }
	.cosy-container--height-4xl { height: 18rem; }
	.cosy-container--height-5xl { height: 20rem; }
	.cosy-container--height-6xl { height: 24rem; }
	.cosy-container--height-screen { height: 100vh; }
	.cosy-container--height-auto { height: auto; }
	.cosy-container--height-full { height: 100%; }

	.cosy-container--rounded-sm { border-radius: 0.125rem; }
	.cosy-container--rounded-md { border-radius: 0.375rem; }
	.cosy-container--rounded-lg { border-radius: 0.5rem; }
	.cosy-container--rounded-xl { border-radius: 0.75rem; }
	.cosy-container--rounded-2xl { border-radius: 1rem; }
	.cosy-container--rounded-3xl { border-radius: 1.5rem; }
	.cosy-container--rounded-full { border-radius: 9999px; }

	.cosy-container--shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
	.cosy-container--shadow-sm:hover { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
	.cosy-container--shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
	.cosy-container--shadow-md:hover { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
	.cosy-container--shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
	.cosy-container--shadow-lg:hover { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
	.cosy-container--shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
	.cosy-container--shadow-xl:hover { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
	.cosy-container--shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }
	.cosy-container--shadow-2xl:hover { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }

	.cosy-container--border-sm { border-width: 1px; }
	.cosy-container--border-md { border-width: 2px; }
	.cosy-container--border-lg { border-width: 4px; }
	.cosy-container--border-xl { border-width: 8px; }

	.cosy-container--bg-primary { --cosy-container-bg: var(--cosy-container-primary); }
	.cosy-container--bg-secondary { --cosy-container-bg: var(--cosy-container-secondary); }
	.cosy-container--bg-accent { --cosy-container-bg: var(--cosy-container-accent); }
	.cosy-container--bg-neutral { --cosy-container-bg: var(--cosy-container-neutral); }
	.cosy-container--bg-base-100 { --cosy-container-bg: var(--cosy-container-base-100); }
	.cosy-container--bg-base-200 { --cosy-container-bg: var(--cosy-container-base-200); }
	.cosy-container--bg-base-300 { --cosy-container-bg: var(--cosy-container-base-300); }
	.cosy-container--bg-success { --cosy-container-bg: var(--cosy-container-success); }
	.cosy-container--bg-warning { --cosy-container-bg: var(--cosy-container-warning); }
	.cosy-container--bg-error { --cosy-container-bg: var(--cosy-container-error); }
	.cosy-container--bg-info { --cosy-container-bg: var(--cosy-container-info); }
	.cosy-container--bg-transparent { --cosy-container-bg: transparent; }

	.cosy-container--border-color-primary { --cosy-container-border-color: var(--cosy-container-primary); }
	.cosy-container--border-color-secondary { --cosy-container-border-color: var(--cosy-container-secondary); }
	.cosy-container--border-color-accent { --cosy-container-border-color: var(--cosy-container-accent); }
	.cosy-container--border-color-neutral { --cosy-container-border-color: var(--cosy-container-neutral); }
	.cosy-container--border-color-base-100 { --cosy-container-border-color: var(--cosy-container-base-100); }
	.cosy-container--border-color-base-200 { --cosy-container-border-color: var(--cosy-container-base-200); }
	.cosy-container--border-color-base-300 { --cosy-container-border-color: var(--cosy-container-base-300); }
	.cosy-container--border-color-success { --cosy-container-border-color: var(--cosy-container-success); }
	.cosy-container--border-color-warning { --cosy-container-border-color: var(--cosy-container-warning); }
	.cosy-container--border-color-error { --cosy-container-border-color: var(--cosy-container-error); }
	.cosy-container--border-color-info { --cosy-container-border-color: var(--cosy-container-info); }
	.cosy-container--border-color-transparent { --cosy-container-border-color: transparent; }

	.cosy-container--flex { display: flex; }
	.cosy-container--flex-row { flex-direction: row; }
	.cosy-container--flex-col { flex-direction: column; }
	.cosy-container--flex-row-reverse { flex-direction: row-reverse; }
	.cosy-container--flex-col-reverse { flex-direction: column-reverse; }
	.cosy-container--gap-none { gap: 0; }
	.cosy-container--gap-xs { gap: 0.25rem; }
	.cosy-container--gap-sm { gap: 0.5rem; }
	.cosy-container--gap-md { gap: 1rem; }
	.cosy-container--gap-lg { gap: 1.5rem; }
	.cosy-container--gap-xl { gap: 2rem; }
	.cosy-container--items-start { align-items: flex-start; }
	.cosy-container--items-end { align-items: flex-end; }
	.cosy-container--items-center { align-items: center; }
	.cosy-container--items-baseline { align-items: baseline; }
	.cosy-container--items-stretch { align-items: stretch; }
	.cosy-container--justify-start { justify-content: flex-start; }
	.cosy-container--justify-end { justify-content: flex-end; }
	.cosy-container--justify-center { justify-content: center; }
	.cosy-container--justify-between { justify-content: space-between; }
	.cosy-container--justify-around { justify-content: space-around; }
	.cosy-container--justify-evenly { justify-content: space-evenly; }

	.cosy-container--muted {
		opacity: 0.5;
		filter: blur(2px);
		transform: scale(0.98);
		transition: all 0.3s ease;
	}
	.cosy-container--muted:hover {
		opacity: 1;
		filter: none;
		transform: scale(1);
	}

	.cosy-container__bg {
		position: absolute;
		inset: 0;
		z-index: -10;
		pointer-events: none;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.cosy-container__aspect-grid {
		display: grid;
		place-items: center;
	}
	.cosy-container__aspect-inner {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.cosy-container__aspect-abs {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
	}
	.cosy-container__hd-outer {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.cosy-container__hd-inner {
		position: absolute;
		inset: 0;
	}

	.cosy-container__error {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
	}
	.cosy-container__error-tip {
		padding: 1rem;
		border-radius: 0.5rem;
		background: color-mix(in srgb, var(--cosy-container-warning) 10%, transparent);
		color: var(--cosy-container-warning);
	}
	.cosy-container__error-list {
		list-style: disc;
		padding-left: 1.25rem;
		margin: 0;
	}
	.cosy-container__error-list > li {
		font-size: 0.875rem;
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}
</style>

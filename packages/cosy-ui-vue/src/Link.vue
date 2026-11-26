<script setup lang="ts">
import { computed } from "vue";
import type { ILinkProps } from "../internal/components/link/props";

/**
 * @component Link
 * @description Vue 版本的 Link 组件，是一个增强的链接组件，提供了丰富的样式变体和动画效果
 * @props {boolean} [active=false] - 是否为激活状态
 * @props {string} [align] - 对齐方式：left、center、right
 * @props {string} [animation='none'] - 动画效果：none、hover-lift、hover-glow、hover-scale
 * @props {boolean} [block=false] - 是否为块级显示
 * @props {boolean} [btn=false] - 是否启用按钮风格
 * @props {boolean} [circle=false] - 是否为圆形按钮（需配合 btn 使用）
 * @props {string} [class] - 自定义 CSS 类名
 * @props {any} [class:list] - 类名列表
 * @props {string} [color] - 按钮颜色（需配合 btn 使用）：primary、secondary、accent、info、success、warning、error
 * @props {boolean} [debug=false] - 是否显示调试边框
 * @props {boolean} [external=false] - 是否为外部链接，自动新窗口打开
 * @props {boolean} [fullWidth=false] - 是否占满宽度
 * @props {boolean} [ghost=false] - 是否为幽灵按钮（需配合 btn 使用）
 * @props {string} href - 链接地址（必需）
 * @props {string} [hoverImage] - 悬停时显示的图片URL
 * @props {string} [hoverImageAlt] - 悬停图片的替代文本
 * @props {string} [icon] - 图标名称，支持所有可用的图标组件
 * @props {string} [navigationType] - 导航类型（需配合 navigation 变体使用）：previous、next
 * @props {boolean} [noUnderline=true] - 是否移除下划线
 * @props {string} [rounded='none'] - 圆角大小，可选值：none、sm、md、lg、xl、full
 * @props {string} [size='md'] - 尺寸大小：sm、md、lg
 * @props {string} [variant='default'] - 样式变体：default、primary、secondary、text、cta、ghost、light、navigation、github
 */

interface Props extends ILinkProps {}

const props = withDefaults(defineProps<Props>(), {
	active: false,
	animation: "none",
	block: false,
	btn: false,
	circle: false,
	debug: false,
	external: false,
	fullWidth: false,
	ghost: false,
	noUnderline: true,
	rounded: "none",
	size: "md",
	variant: "default",
});

const linkClasses = computed(() => {
	const variantMap = {
		default: 'cosy-link--variant-default',
		primary: 'cosy-link--variant-primary',
		secondary: 'cosy-link--variant-secondary',
		text: 'cosy-link--variant-text',
		cta: 'cosy-link--variant-cta',
		ghost: 'cosy-link--variant-ghost',
		light: 'cosy-link--variant-light',
		navigation: 'cosy-link--variant-navigation',
		github: 'cosy-link--variant-github',
	};
	const sizeMap = { sm: 'cosy-link--size-sm', md: 'cosy-link--size-md', lg: 'cosy-link--size-lg' };
	const roundedMap = { none: '', sm: 'cosy-link--rounded-sm', md: 'cosy-link--rounded-md', lg: 'cosy-link--rounded-lg', xl: 'cosy-link--rounded-xl', full: 'cosy-link--rounded-full' };
	const animMap = { none: '', 'hover-lift': 'cosy-link--anim-lift', 'hover-glow': 'cosy-link--anim-glow', 'hover-scale': 'cosy-link--anim-scale' };
	return [
		'cosy-link',
		variantMap[props.variant] || '',
		sizeMap[props.size] || '',
		roundedMap[props.rounded] || '',
		animMap[props.animation] || '',
		props.btn ? 'cosy-link--btn' : '',
		props.active ? 'cosy-link--active' : '',
		props.block ? 'cosy-link--block' : '',
		props.fullWidth ? 'cosy-link--full' : '',
	].filter(Boolean).join(' ');
});

const linkAttributes = computed(() => {
	const attrs: Record<string, any> = {
		href: props.href,
	};

	if (props.external) {
		attrs.target = "_blank";
		attrs.rel = "noopener noreferrer";
	}

	return attrs;
});
</script>

<template>
  <a
    v-bind="{ ...linkAttributes, ...$attrs }"
    :class="[linkClasses, $attrs.class]">
    <slot name="icon-left" />
    <slot name="icon-previous" v-if="navigationType === 'previous'" />
    <slot name="icon-github" v-if="variant === 'github'" />
    <slot name="icon" v-if="icon" />
    <slot />
    <slot name="icon-next" v-if="navigationType === 'next'" />
    <slot name="icon-right" />
  </a>
</template>

<style>
  .cosy-link { --cosy-primary:#4b6bfb; --cosy-secondary:#7b92b2; --cosy-accent:#67baa3; --cosy-info:#2563eb; --cosy-success:#16a34a; --cosy-warning:#d97706; --cosy-error:#dc2626; --cosy-base-content:#1d1d1d; display:inline-flex; align-items:center; gap:.375rem; color:var(--cosy-primary); text-decoration:none; transition:opacity .2s, transform .2s, box-shadow .2s; }
  .cosy-link--variant-default { color:var(--cosy-primary); }
  .cosy-link--variant-primary { color:#fff; background:var(--cosy-primary); padding:.5rem 1rem; }
  .cosy-link--variant-secondary { color:var(--cosy-base-content); background:var(--cosy-secondary); padding:.5rem 1rem; }
  .cosy-link--variant-text { color:var(--cosy-base-content); }
  .cosy-link--variant-cta { color:#fff; background:var(--cosy-accent); padding:.5rem 1rem; }
  .cosy-link--variant-ghost { color:var(--cosy-primary); border:1px solid var(--cosy-primary); padding:.5rem 1rem; }
  .cosy-link--variant-light { color:var(--cosy-base-content); background:#e9e9e9; padding:.5rem 1rem; }
  .cosy-link--variant-navigation { color:var(--cosy-base-content); }
  .cosy-link--variant-github { color:#fff; background:#181a2a; padding:.5rem 1rem; }
  .cosy-link--size-sm { font-size:.875rem; }
  .cosy-link--size-md { font-size:1rem; }
  .cosy-link--size-lg { font-size:1.125rem; }
  .cosy-link--rounded-sm { border-radius:.25rem; }
  .cosy-link--rounded-md { border-radius:.5rem; }
  .cosy-link--rounded-lg { border-radius:.75rem; }
  .cosy-link--rounded-xl { border-radius:1rem; }
  .cosy-link--rounded-full { border-radius:9999px; }
  .cosy-link--anim-lift:hover { transform:translateY(-2px); }
  .cosy-link--anim-glow:hover { box-shadow:0 0 12px rgba(75,107,251,.4); }
  .cosy-link--anim-scale:hover { transform:scale(1.05); }
  .cosy-link--btn { cursor:pointer; }
  .cosy-link--active { font-weight:600; }
  .cosy-link--block { display:flex; }
  .cosy-link--full { width:100%; justify-content:center; }
  .cosy-link:hover { opacity:.85; }
</style>

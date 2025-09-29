<script setup lang="ts">
/**
 * PictureBookTextBox
 *
 * 文字容器，按百分比定位于页面，并可基于父组件注入的行高（pictureBookLineHeightPx）以“行数”控制高度。
 * 提供可选的遮罩背景、模糊与文本阴影以提升可读性。
 *
 * 用法（提升可读性示例）：
 * <PictureBookTextBox
 *   :top="58" :left="52" :width="40" :heightInLines="7"
 *   bgColor="rgba(255,255,255,0.75)" :backdropBlur="4" :paddingPx="12" :roundedPx="12">
 *   文字内容…
 * </PictureBookTextBox>
 */
import { computed, inject } from "vue";

type Props = {
	/**
	 * 以容器百分比进行绝对定位。
	 * 例：{ top: 10, left: 5, width: 40 } 表示距离顶部 10%、左侧 5%，宽度 40%。
	 */
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
	width?: number;
	/** 以“行数”定义高度，结合父组件注入的行高自动换算为像素 */
	heightInLines?: number;
	/** 层叠顺序 */
	zIndex?: number;
	/** 文本盒的半透明背景色（如 'rgba(255,255,255,0.75)' 或 '#ffffffcc'） */
	bgColor?: string;
	/** 背景虚化像素（backdrop-filter: blur(px)），如 4 */
	backdropBlur?: number;
	/** 内边距（px） */
	paddingPx?: number;
	/** 圆角（px） */
	roundedPx?: number;
};

const props = withDefaults(defineProps<Props>(), {
	top: undefined,
	left: undefined,
	right: undefined,
	bottom: undefined,
	width: undefined,
	heightInLines: undefined,
	zIndex: 10,
	bgColor: undefined,
	backdropBlur: undefined,
	paddingPx: 0,
	roundedPx: 0,
});

// 从父组件注入每一行的像素高度
const lineHeightPx = inject("pictureBookLineHeightPx", null) as unknown as {
	value: number;
} | null;

const styleObject = computed(() => {
	const styles: Record<string, string | number> = {
		position: "absolute",
		zIndex: String(props.zIndex),
		padding: props.paddingPx ? `${props.paddingPx}px` : 0,
		borderRadius: props.roundedPx ? `${props.roundedPx}px` : 0,
	};
	if (props.bgColor) styles.background = props.bgColor;
	if (typeof props.backdropBlur === "number" && props.backdropBlur > 0) {
		(styles as any).backdropFilter = `blur(${props.backdropBlur}px)`;
	}

	const pct = (v?: number) => (typeof v === "number" ? `${v}%` : undefined);
	if (props.top !== undefined) styles.top = pct(props.top) as string;
	if (props.left !== undefined) styles.left = pct(props.left) as string;
	if (props.right !== undefined) styles.right = pct(props.right) as string;
	if (props.bottom !== undefined) styles.bottom = pct(props.bottom) as string;
	if (props.width !== undefined) styles.width = pct(props.width) as string;

	// 高度支持“按行数”定义，自动乘以父组件的行高
	if (
		typeof props.heightInLines === "number" &&
		lineHeightPx &&
		lineHeightPx.value
	) {
		styles.height = `${props.heightInLines * lineHeightPx.value}px`;
		styles.lineHeight = `${lineHeightPx.value}px`;
	}
	return styles;
});
</script>

<template>
    <div :style="styleObject" class="pointer-events-auto">
        <slot />
    </div>
</template>

<style scoped></style>

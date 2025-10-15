import type { IImageProps, IImagePropsBuilder } from "./types";

export function createImageProps(
	initial: Partial<IImageProps> = {},
): IImagePropsBuilder {
	let props: IImageProps = {
		// 统一默认值定义位置（与 Image.astro 保持一致）
		layout: "constrained",
		asBackground: false,
		loading: "lazy",
		objectFit: "cover",
		objectPosition: "center",
		showPlaceholder: true,
		showError: true,
		class: "",
		rounded: "none",
		mask: "none",
		shadow: "none",
		border: "none",
		hover: "none",
		transition: "none",
		tooltipPlacement: "top",
		tooltipColor: "neutral",
		tooltipOpen: false,
		preview: false,
		...initial,
	} as IImageProps;

	const api: IImagePropsBuilder = {
		alt(value) {
			props = { ...props, alt: value };
			return api;
		},
		src(value) {
			props = { ...props, src: value };
			return api;
		},
		border(value) {
			props = { ...props, border: value };
			return api;
		},
		class(value) {
			props = { ...props, class: value };
			return api;
		},
		height(value) {
			props = { ...props, height: value };
			return api;
		},
		hover(value) {
			props = { ...props, hover: value };
			return api;
		},
		lazy(value) {
			props = { ...props, lazy: value };
			return api;
		},
		loading(value) {
			props = { ...props, loading: value };
			return api;
		},
		loadingIndicator(value) {
			props = { ...props, loadingIndicator: value };
			return api;
		},
		objectFit(value) {
			props = { ...props, objectFit: value };
			return api;
		},
		objectPosition(value) {
			props = { ...props, objectPosition: value };
			return api;
		},
		rounded(value) {
			props = { ...props, rounded: value };
			return api;
		},
		mask(value) {
			props = { ...props, mask: value };
			return api;
		},
		shadow(value) {
			props = { ...props, shadow: value };
			return api;
		},
		showError(value) {
			props = { ...props, showError: value };
			return api;
		},
		showPlaceholder(value) {
			props = { ...props, showPlaceholder: value };
			return api;
		},
		tooltip(value) {
			props = { ...props, tooltip: value };
			return api;
		},
		tooltipPlacement(value) {
			props = { ...props, tooltipPlacement: value };
			return api;
		},
		tooltipColor(value) {
			props = { ...props, tooltipColor: value };
			return api;
		},
		tooltipOpen(value) {
			props = { ...props, tooltipOpen: value };
			return api;
		},
		transition(value) {
			props = { ...props, transition: value };
			return api;
		},
		width(value) {
			props = { ...props, width: value };
			return api;
		},
		asBackground(value) {
			props = { ...props, asBackground: value };
			return api;
		},
		preview(value) {
			props = { ...props, preview: value };
			return api;
		},
		layout(value) {
			props = { ...props, layout: value };
			return api;
		},
		build() {
			return props;
		},
	};

	return api;
}

export const ImageProps = createImageProps;

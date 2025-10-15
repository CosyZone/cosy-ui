import type { IHeaderProps } from "../../../dist";

export interface IHeaderPropsBuilder {
	height(value: NonNullable<IHeaderProps["height"]>): IHeaderPropsBuilder;
	logo(value: NonNullable<IHeaderProps["logo"]>): IHeaderPropsBuilder;
	logoHref(value: NonNullable<IHeaderProps["logoHref"]>): IHeaderPropsBuilder;
	navItems(value: NonNullable<IHeaderProps["navItems"]>): IHeaderPropsBuilder;
	sticky(value?: boolean): IHeaderPropsBuilder;
	background(
		value: NonNullable<IHeaderProps["background"]>,
	): IHeaderPropsBuilder;
	shadow(value: NonNullable<IHeaderProps["shadow"]>): IHeaderPropsBuilder;
	rounded(value: NonNullable<IHeaderProps["rounded"]>): IHeaderPropsBuilder;
	textColor(value: NonNullable<IHeaderProps["textColor"]>): IHeaderPropsBuilder;
	paddingHorizontal(
		value: NonNullable<IHeaderProps["paddingHorizontal"]>,
	): IHeaderPropsBuilder;
	paddingVertical(
		value: NonNullable<IHeaderProps["paddingVertical"]>,
	): IHeaderPropsBuilder;
	navPosition(
		value: NonNullable<IHeaderProps["navPosition"]>,
	): IHeaderPropsBuilder;
	showThemeSwitcher(value?: boolean): IHeaderPropsBuilder;
	gap(value: NonNullable<IHeaderProps["gap"]>): IHeaderPropsBuilder;
	astroI18n(value: any): IHeaderPropsBuilder;
	build(): IHeaderProps;
}

export function createHeaderProps(
	initial: Partial<IHeaderProps> = {},
): IHeaderPropsBuilder {
	let props: IHeaderProps = {
		height: "3xs",
		sticky: true,
		background: "base-300/90",
		shadow: "md",
		rounded: "none",
		textColor: "base-content",
		paddingHorizontal: "none",
		paddingVertical: "none",
		navPosition: "center",
		showThemeSwitcher: true,
		gap: 2,
		navItems: [],
		...initial,
	} as IHeaderProps;

	const api: IHeaderPropsBuilder = {
		height(value) {
			props = { ...props, height: value };
			return api;
		},
		logo(value) {
			props = { ...props, logo: value };
			return api;
		},
		logoHref(value) {
			props = { ...props, logoHref: value };
			return api;
		},
		navItems(value) {
			props = { ...props, navItems: value };
			return api;
		},
		sticky(value = true) {
			props = { ...props, sticky: value };
			return api;
		},
		background(value) {
			props = { ...props, background: value };
			return api;
		},
		shadow(value) {
			props = { ...props, shadow: value };
			return api;
		},
		rounded(value) {
			props = { ...props, rounded: value };
			return api;
		},
		textColor(value) {
			props = { ...props, textColor: value };
			return api;
		},
		paddingHorizontal(value) {
			props = { ...props, paddingHorizontal: value };
			return api;
		},
		paddingVertical(value) {
			props = { ...props, paddingVertical: value };
			return api;
		},
		navPosition(value) {
			props = { ...props, navPosition: value };
			return api;
		},
		showThemeSwitcher(value = true) {
			props = { ...props, showThemeSwitcher: value };
			return api;
		},
		gap(value) {
			props = { ...props, gap: value };
			return api;
		},
		astroI18n(value) {
			props = { ...props, astroI18n: value };
			return api;
		},
		build() {
			return props;
		},
	};

	return api;
}

export const HeaderProps = createHeaderProps;

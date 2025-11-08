/**
 * 通用主题配置
 * 包含所有可用的主题选项，使用 DaisyUI 主题系统
 * 主题列表从配置文件读取，实现单一数据源
 * 适用于主题切换器、主题选择器等组件
 */

import { THEME_LIST } from "../config/themes.config";

// 主题项接口
export interface IThemeItem {
	/** 主题 ID，对应 DaisyUI 主题名称 */
	id: string;
	/** 主题显示名称 */
	name: string;
	/** 主题描述（可选） */
	description?: string;
	/** 主题图标（可选） */
	icon?: string;
	/** 是否为默认主题 */
	isDefault?: boolean;
}

/**
 * 将主题 ID 转换为显示名称
 * 首字母大写，其余保持原样
 *
 * @param id 主题 ID
 * @returns 显示名称
 */
function formatThemeName(id: string): string {
	if (id.length === 0) return id;
	return id.charAt(0).toUpperCase() + id.slice(1);
}

/**
 * 获取主题列表
 * 从配置文件读取，并添加 "default"（跟随系统）选项
 *
 * @returns 主题项数组
 */
function getThemes(): IThemeItem[] {
	return [
		{ id: "default", name: "跟随系统", isDefault: true },
		...THEME_LIST.map((id) => ({
			id,
			name: formatThemeName(id),
		})),
	];
}

// 主题列表（从配置文件读取）
export const themes: IThemeItem[] = getThemes();

// 主题 ID 类型
export type ThemeId = (typeof themes)[number]["id"];

// 获取默认主题
export function getDefaultTheme(): IThemeItem {
	return themes.find((theme) => theme.isDefault) || themes[0];
}

// 根据 ID 获取主题
export function getThemeById(id: string): IThemeItem | undefined {
	return themes.find((theme) => theme.id === id);
}

// 获取主题名称
export function getThemeName(id: string): string {
	const theme = getThemeById(id);
	return theme?.name || id;
}

// 检查主题是否存在
export function isValidTheme(id: string): boolean {
	return themes.some((theme) => theme.id === id);
}

// 获取所有主题 ID
export function getAllThemeIds(): string[] {
	return themes.map((theme) => theme.id);
}

// 获取主题列表（用于下拉菜单等）
export function getThemeList(): IThemeItem[] {
	return [...themes];
}

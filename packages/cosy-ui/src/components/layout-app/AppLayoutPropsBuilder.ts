/**
 * AppLayoutPropsBuilder - AppLayout 组件的 Props 构建器
 *
 * 提供链式调用的方式来构建 AppLayout 组件的 props。
 *
 * @example
 * ```typescript
 * // 基础用法
 * const props = appLayoutProps()
 *   .metaConfig({ title: "标题" })
 *   .showHeader(true)
 *   .build();
 *
 * // 链式调用多个属性
 * const props = appLayoutProps()
 *   .theme("dark")
 *   .showFooter(false)
 *   .showSidebar(true)
 *   .build();
 * ```
 */

import type { BackgroundColor } from "../../../src/common/backgrounds";
import type { IMetaProps } from "../../../src/common/meta";
import type { ISidebarProps } from "../../../src/common/sidebar";
import type { ThemeId } from "../../../src/common/themes";
import { PropsBuilder } from "../../utils/PropsBuilder";
import type { IFooterProps } from "../footer/types";
import type { IHeaderProps } from "../header/types";
import type { IMainContentProps } from "../main/types";
import type { IAppLayoutPropsBase } from "./appLayoutPropsBase";

export class AppLayoutPropsBuilder extends PropsBuilder<IAppLayoutPropsBase> {
	// ========== 基础属性方法 ==========

	/**
	 * 设置页面类名
	 * @param value 类名字符串
	 */
	class(value: string): this {
		return this.set("class", value);
	}

	/**
	 * 设置类名列表
	 * @param value 类名列表
	 */
	classList(value: any): this {
		return this.set("class:list", value);
	}

	/**
	 * 设置背景类型
	 * @param value 背景颜色
	 */
	background(value: BackgroundColor): this {
		return this.set("background", value);
	}

	/**
	 * 设置是否只渲染 body 部分
	 * @param value 是否只渲染 body
	 */
	bodyOnly(value: boolean = false): this {
		return this.set("bodyOnly", value);
	}

	/**
	 * 设置主题
	 * @param value 主题 ID
	 */
	theme(value: ThemeId): this {
		return this.set("theme", value);
	}

	// ========== 配置对象方法 ==========

	/**
	 * 设置页脚配置
	 * @param value 页脚配置对象
	 */
	footerConfig(value: IFooterProps): this {
		return this.set("footerConfig", value);
	}

	/**
	 * 设置自定义头部内容
	 * @param value 头部内容
	 */
	head(value: any): this {
		return this.set("head", value);
	}

	/**
	 * 设置头部配置
	 * @param value 头部配置对象
	 */
	headerConfig(value: IHeaderProps): this {
		return this.set("headerConfig", value);
	}

	/**
	 * 设置加载延迟时间
	 * @param value 延迟时间（毫秒）
	 */
	loadingDelay(value: number): this {
		return this.set("loadingDelay", value);
	}

	/**
	 * 设置主内容配置
	 * @param value 主内容配置对象
	 */
	mainContentConfig(value: IMainContentProps): this {
		return this.set("mainContentConfig", value);
	}

	/**
	 * 设置元数据配置
	 * @param value Meta 配置对象
	 */
	metaConfig(value: IMetaProps): this {
		return this.set("metaConfig", value);
	}

	/**
	 * 设置侧边栏配置
	 * @param value 侧边栏配置对象
	 */
	sidebarConfig(value: ISidebarProps): this {
		return this.set("sidebarConfig", value);
	}

	// ========== 显示控制方法 ==========

	/**
	 * 设置是否显示页脚
	 * @param value 是否显示页脚
	 */
	showFooter(value: boolean = true): this {
		return this.set("showFooter", value);
	}

	/**
	 * 设置是否显示头部
	 * @param value 是否显示头部
	 */
	showHeader(value: boolean = true): this {
		return this.set("showHeader", value);
	}

	/**
	 * 设置是否显示侧边栏
	 * @param value 是否显示侧边栏
	 */
	showSidebar(value: boolean = true): this {
		return this.set("showSidebar", value);
	}

	/**
	 * 设置是否启用 ClientRouter
	 * @param value 是否启用
	 */
	enableClientRouter(value: boolean = true): this {
		return this.set("enableClientRouter", value);
	}
}

/**
 * 创建一个新的 AppLayoutPropsBuilder 实例
 * @returns AppLayoutPropsBuilder 实例
 *
 * @example
 * ```typescript
 * const props = appLayoutProps()
 *   .metaConfig({ title: "页面标题" })
 *   .showHeader(true)
 *   .showFooter(false)
 *   .build();
 * ```
 */
export function appLayoutProps(): AppLayoutPropsBuilder {
	return new AppLayoutPropsBuilder();
}

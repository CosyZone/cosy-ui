/**
 * MainFactory - Main 组件的工厂类
 *
 * 提供链式调用的方式来创建 Main 组件实例。
 * 支持静态方法和实例方法的链式调用，并封装了 Container API 的复杂性。
 *
 * @example
 * ```typescript
 * // 基础用法
 * const html = await MainFactory.create()
 *   .size('lg')
 *   .padding('xl')
 *   .withContent('<h1>Hello World</h1>')
 *   .build();
 *
 * // 文章模式
 * const html = await MainFactory.create()
 *   .isArticle()
 *   .showTableOfContents()
 *   .withContent('<article>...</article>')
 *   .build();
 *
 * // 在 Astro 组件中使用
 * ---
 * const mainElement = await MainFactory.create()
 *   .size('md')
 *   .centered()
 *   .build();
 * ---
 * <Fragment set:html={mainElement} />
 * ```
 */

import type { IMainContentProps } from "../../src/components/main/types";
import type { IMainPropsBuilder } from "./props";
import { createMainProps } from "./props";

interface SlotComponent {
	component: any;
	props?: Record<string, any>;
}

/**
 * Main 组件工厂类
 */
export class MainFactory {
	private builder: IMainPropsBuilder;
	private content: string = "";
	private slots: Record<string, SlotComponent | string> = {};

	constructor(builder?: IMainPropsBuilder) {
		this.builder = builder || createMainProps();
	}

	/**
	 * 创建新的 MainFactory 实例
	 */
	static create(): MainFactory {
		return new MainFactory();
	}

	// ========== 静态快捷方法 ==========

	/**
	 * 创建文章模式的 Main（静态方法）
	 */
	static article(): MainFactory {
		return new MainFactory().isArticle();
	}

	/**
	 * 创建居中的 Main（静态方法）
	 */
	static centered(): MainFactory {
		return new MainFactory().centered();
	}

	/**
	 * 创建指定尺寸的 Main（静态方法）
	 */
	static withSize(
		size: "xs" | "sm" | "md" | "lg" | "xl" | "full",
	): MainFactory {
		return new MainFactory().size(size);
	}

	// ========== 实例方法 ==========

	/**
	 * 设置容器大小
	 * @param value 容器大小
	 */
	size(value: "xs" | "sm" | "md" | "lg" | "xl" | "full"): MainFactory {
		this.builder.size(value);
		return this;
	}

	/**
	 * 设置内边距
	 * @param value 内边距大小
	 */
	padding(value: "none" | "sm" | "md" | "lg" | "xl"): MainFactory {
		this.builder.padding(value);
		return this;
	}

	/**
	 * 设置垂直内边距
	 * @param value 垂直内边距大小
	 */
	py(value: string): MainFactory {
		this.builder.py(value);
		return this;
	}

	/**
	 * 设置顶部内边距
	 * @param value 顶部内边距大小
	 */
	pt(value: string): MainFactory {
		this.builder.pt(value);
		return this;
	}

	/**
	 * 设置底部内边距
	 * @param value 底部内边距大小
	 */
	pb(value: string): MainFactory {
		this.builder.pb(value);
		return this;
	}

	/**
	 * 设置左侧内边距
	 * @param value 左侧内边距大小
	 */
	pl(value: string): MainFactory {
		this.builder.pl(value);
		return this;
	}

	/**
	 * 设置右侧内边距
	 * @param value 右侧内边距大小
	 */
	pr(value: string): MainFactory {
		this.builder.pr(value);
		return this;
	}

	/**
	 * 设置水平内边距
	 * @param value 水平内边距大小
	 */
	px(value: string): MainFactory {
		this.builder.px(value);
		return this;
	}

	/**
	 * 设置是否居中显示
	 * @param value 是否居中
	 */
	centered(value = true): MainFactory {
		this.builder.centered(value);
		return this;
	}

	/**
	 * 设置布局方式
	 * @param value 布局方式
	 */
	layout(value: "row" | "column"): MainFactory {
		this.builder.layout(value);
		return this;
	}

	/**
	 * 设置为文章模式
	 * @param value 是否为文章模式
	 */
	isArticle(value = true): MainFactory {
		this.builder.isArticle(value);
		return this;
	}

	/**
	 * 设置是否显示目录
	 * @param value 是否显示目录
	 */
	showTableOfContents(value = true): MainFactory {
		this.builder.showTableOfContents(value);
		return this;
	}

	/**
	 * 设置背景颜色
	 * @param value 背景颜色
	 */
	backgroundColor(value: string): MainFactory {
		this.builder.backgroundColor(value);
		return this;
	}

	/**
	 * 设置边框
	 * @param value 边框尺寸
	 */
	border(value: "none" | "sm" | "md" | "lg" | "xl"): MainFactory {
		this.builder.border(value);
		return this;
	}

	/**
	 * 设置自定义类名
	 * @param value 自定义类名
	 */
	withClass(value: string): MainFactory {
		this.builder.class(value);
		return this;
	}

	/**
	 * 设置类名列表
	 * @param value 类名列表
	 */
	withClassList(value: any): MainFactory {
		this.builder.classList(value);
		return this;
	}

	/**
	 * 设置 HTML id
	 * @param value HTML id 属性
	 */
	withId(value: string): MainFactory {
		this.builder.id(value);
		return this;
	}

	/**
	 * 设置当前语言
	 * @param value 语言代码
	 */
	withLocale(value: string): MainFactory {
		this.builder.currentLocale(value);
		return this;
	}

	/**
	 * 批量设置属性
	 * @param props 属性对象
	 */
	withProps(props: Partial<IMainContentProps>): MainFactory {
		Object.entries(props).forEach(([key, value]) => {
			if (value !== undefined) {
				const method = key as keyof IMainPropsBuilder;
				if (typeof this.builder[method] === "function") {
					(this.builder[method] as any)(value);
				}
			}
		});
		return this;
	}

	/**
	 * 设置默认内容（slot default）
	 * @param content 内容文本或 HTML
	 */
	withContent(content: string): MainFactory {
		this.content = content;
		return this;
	}

	/**
	 * 添加自定义 slot
	 * @param name slot 名称
	 * @param component Astro 组件
	 * @param props 组件 props
	 */
	slot(name: string, component: any, props?: Record<string, any>): MainFactory {
		this.slots[name] = { component, props };
		return this;
	}

	/**
	 * 构建 Main 组件实例
	 * @returns Main 组件 HTML 字符串
	 */
	async build(): Promise<string> {
		const props = this.builder.build();

		// 使用 Astro 容器 API 渲染组件
		const { experimental_AstroContainer } = await import("astro/container");
		const container = await experimental_AstroContainer.create();

		// 渲染 slots
		const renderedSlots: Record<string, string> = {};

		for (const [key, slot] of Object.entries(this.slots)) {
			if (typeof slot === "string") {
				renderedSlots[key] = slot;
			} else {
				renderedSlots[key] = await container.renderToString(slot.component, {
					props: slot.props || {},
				});
			}
		}

		// 导入 Main 组件
		const Main = (await import("./Main.astro")).default;

		// 渲染为 HTML 字符串，传入 props 和 slots
		const html = await container.renderToString(Main, {
			props: props as any,
			slots: {
				default: this.content,
				...renderedSlots,
			},
		});

		return html;
	}

	/**
	 * 构建 props 对象（用于直接传递给 Main 组件）
	 * @returns props 对象
	 */
	buildProps(): IMainContentProps {
		return this.builder.build();
	}
}

// 导入 Main 组件类型
import Main from "./Main.astro";

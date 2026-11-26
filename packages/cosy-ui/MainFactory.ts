/**
 * MainFactory - Main 组件的工厂类
 *
 * 提供链式调用的方式来创建 Main 组件实例。
 *
 * @example
 * ```typescript
 * const html = await MainFactory.create()
 *   .size('lg')
 *   .padding('xl')
 *   .withContent('<h1>Hello World</h1>')
 *   .build();
 * ```
 */

import type { IMainContentProps } from "./src/Main.astro";

interface SlotComponent {
	component: any;
	props?: Record<string, any>;
}

export class MainFactory {
	private props: IMainContentProps = {
		size: "md",
		padding: "md",
		py: "md",
		centered: true,
		layout: "column",
		isArticle: false,
		showTableOfContents: false,
	} as IMainContentProps;
	private content: string = "";
	private slots: Record<string, SlotComponent | string> = {};

	constructor() {}

	static create(): MainFactory {
		return new MainFactory();
	}

	static article(): MainFactory {
		return new MainFactory().isArticle();
	}

	static centered(): MainFactory {
		return new MainFactory().centered();
	}

	static withSize(size: "xs" | "sm" | "md" | "lg" | "xl" | "full"): MainFactory {
		return new MainFactory().size(size);
	}

	size(value: "xs" | "sm" | "md" | "lg" | "xl" | "full"): MainFactory {
		this.props = { ...this.props, size: value };
		return this;
	}

	padding(value: "none" | "sm" | "md" | "lg" | "xl"): MainFactory {
		this.props = { ...this.props, padding: value };
		return this;
	}

	py(value: string): MainFactory {
		this.props = { ...this.props, py: value };
		return this;
	}

	pt(value: string): MainFactory {
		this.props = { ...this.props, pt: value };
		return this;
	}

	pb(value: string): MainFactory {
		this.props = { ...this.props, pb: value };
		return this;
	}

	pl(value: string): MainFactory {
		this.props = { ...this.props, pl: value };
		return this;
	}

	pr(value: string): MainFactory {
		this.props = { ...this.props, pr: value };
		return this;
	}

	px(value: string): MainFactory {
		this.props = { ...this.props, px: value };
		return this;
	}

	centered(value = true): MainFactory {
		this.props = { ...this.props, centered: value };
		return this;
	}

	layout(value: "row" | "column"): MainFactory {
		this.props = { ...this.props, layout: value };
		return this;
	}

	isArticle(value = true): MainFactory {
		this.props = { ...this.props, isArticle: value };
		return this;
	}

	showTableOfContents(value = true): MainFactory {
		this.props = { ...this.props, showTableOfContents: value };
		return this;
	}

	backgroundColor(value: string): MainFactory {
		this.props = { ...this.props, backgroundColor: value };
		return this;
	}

	border(value: "none" | "sm" | "md" | "lg" | "xl"): MainFactory {
		this.props = { ...this.props, border: value };
		return this;
	}

	withClass(value: string): MainFactory {
		this.props = { ...this.props, class: value };
		return this;
	}

	withId(value: string): MainFactory {
		this.props = { ...this.props, id: value };
		return this;
	}

	withLocale(value: string): MainFactory {
		this.props = { ...this.props, currentLocale: value };
		return this;
	}

	withProps(props: Partial<IMainContentProps>): MainFactory {
		const merged = { ...this.props };
		Object.entries(props).forEach(([key, value]) => {
			if (value !== undefined) {
				(merged as Record<string, any>)[key] = value;
			}
		});
		this.props = merged;
		return this;
	}

	withContent(content: string): MainFactory {
		this.content = content;
		return this;
	}

	slot(name: string, component: any, props?: Record<string, any>): MainFactory {
		this.slots[name] = { component, props };
		return this;
	}

	async build(): Promise<string> {
		const { experimental_AstroContainer } = await import("astro/container");
		const container = await experimental_AstroContainer.create();

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

		const Main = (await import("./src/Main.astro")).default;
		const html = await container.renderToString(Main, {
			props: this.props as any,
			slots: {
				default: this.content,
				...renderedSlots,
			},
		});

		return html;
	}

	buildProps(): IMainContentProps {
		return this.props;
	}
}

/**
 * ContainerFactory - Container 组件的工厂类
 *
 * 提供链式调用的方式来创建 Container 组件实例。
 * 支持静态方法和实例方法的链式调用，并封装了 Container API 的复杂性。
 *
 * @example
 * ```typescript
 * // 基础用法
 * const html = await ContainerFactory.create()
 *   .lg()
 *   .padding('xl')
 *   .rounded('md')
 *   .withContent('<h1>Hello World</h1>')
 *   .build();
 *
 * // 使用快捷方法
 * const html = await ContainerFactory.centered()
 *   .shadow('lg')
 *   .withContent('<p>居中的容器</p>')
 *   .build();
 *
 * // 在 Astro 组件中使用
 * ---
 * const containerElement = await ContainerFactory.create()
 *   .lg()
 *   .centered()
 *   .build();
 * ---
 * <Fragment set:html={containerElement} />
 * ```
 */

import type { IContainerProps } from "./props";
import { ContainerPropsBuilder } from "../../src/components/container/ContainerPropsBuilder";
import type { BackgroundColor } from "../../src/common/backgrounds";
import type { BorderColor } from "../../src/common/border";

interface SlotComponent {
    component: any;
    props?: Record<string, any>;
}

/**
 * Container 组件工厂类
 */
export class ContainerFactory {
    private builder: ContainerPropsBuilder;
    private content: string = "";
    private slots: Record<string, SlotComponent | string> = {};

    constructor(builder?: ContainerPropsBuilder) {
        this.builder = builder || new ContainerPropsBuilder();
    }

    /**
     * 创建新的 ContainerFactory 实例
     */
    static create(): ContainerFactory {
        return new ContainerFactory();
    }

    // ========== 静态快捷方法 ==========

    /**
     * 创建居中的容器（静态方法）
     */
    static centered(): ContainerFactory {
        return new ContainerFactory().centered();
    }

    /**
     * 创建内容居中的容器（静态方法）
     */
    static contentCentered(): ContainerFactory {
        return new ContainerFactory().contentCentered();
    }

    /**
     * 创建超小宽度容器（静态方法）
     */
    static xs(): ContainerFactory {
        return new ContainerFactory().xs();
    }

    /**
     * 创建小宽度容器（静态方法）
     */
    static sm(): ContainerFactory {
        return new ContainerFactory().sm();
    }

    /**
     * 创建中等宽度容器（静态方法）
     */
    static md(): ContainerFactory {
        return new ContainerFactory().md();
    }

    /**
     * 创建大宽度容器（静态方法）
     */
    static lg(): ContainerFactory {
        return new ContainerFactory().lg();
    }

    /**
     * 创建超大宽度容器（静态方法）
     */
    static xl(): ContainerFactory {
        return new ContainerFactory().xl();
    }

    /**
     * 创建全宽容器（静态方法）
     */
    static full(): ContainerFactory {
        return new ContainerFactory().full();
    }

    // ========== 实例方法 ==========

    /**
     * 设置容器宽度
     * @param value 宽度值
     */
    width(value: "xs" | "sm" | "md" | "lg" | "xl" | "full"): ContainerFactory {
        this.builder.width(value);
        return this;
    }

    /**
     * 设置为超小宽度
     */
    xs(): ContainerFactory {
        this.builder.xs();
        return this;
    }

    /**
     * 设置为小宽度
     */
    sm(): ContainerFactory {
        this.builder.sm();
        return this;
    }

    /**
     * 设置为中等宽度
     */
    md(): ContainerFactory {
        this.builder.md();
        return this;
    }

    /**
     * 设置为大宽度
     */
    lg(): ContainerFactory {
        this.builder.lg();
        return this;
    }

    /**
     * 设置为超大宽度
     */
    xl(): ContainerFactory {
        this.builder.xl();
        return this;
    }

    /**
     * 设置为全宽
     */
    full(): ContainerFactory {
        this.builder.full();
        return this;
    }

    /**
     * 设置内边距
     * @param value 内边距大小
     */
    padding(
        value: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl",
    ): ContainerFactory {
        this.builder.padding(value);
        return this;
    }

    /**
     * 设置外边距
     * @param value 外边距大小
     */
    margin(
        value:
            | "none"
            | "xs"
            | "sm"
            | "md"
            | "lg"
            | "xl"
            | "2xl"
            | "3xl"
            | "4xl"
            | "5xl",
    ): ContainerFactory {
        this.builder.margin(value);
        return this;
    }

    /**
     * 设置圆角大小
     * @param value 圆角大小
     */
    rounded(
        value: "none" | "sm" | "md" | "lg" | "xl" | "full",
    ): ContainerFactory {
        this.builder.rounded(value);
        return this;
    }

    /**
     * 设置阴影大小
     * @param value 阴影大小
     */
    shadow(value: "none" | "sm" | "md" | "lg" | "xl" | "2xl"): ContainerFactory {
        this.builder.shadow(value);
        return this;
    }

    /**
     * 设置是否居中显示
     * @param value 是否居中
     */
    centered(value: boolean = true): ContainerFactory {
        this.builder.centered(value);
        return this;
    }

    /**
     * 设置内容是否居中
     * @param value 是否居中
     */
    contentCentered(value: boolean = true): ContainerFactory {
        this.builder.contentCentered(value);
        return this;
    }

    /**
     * 设置 flex 布局方向
     * @param value flex 方向
     */
    flex(value: "row" | "col" | "row-reverse" | "col-reverse"): ContainerFactory {
        this.builder.flex(value);
        return this;
    }

    /**
     * 设置 flex 项目间距
     * @param value 间距大小
     */
    gap(value: "none" | "xs" | "sm" | "md" | "lg" | "xl"): ContainerFactory {
        this.builder.gap(value);
        return this;
    }

    /**
     * 设置 flex 项目对齐方式
     * @param value 对齐方式
     */
    items(
        value: "start" | "end" | "center" | "baseline" | "stretch",
    ): ContainerFactory {
        this.builder.items(value);
        return this;
    }

    /**
     * 设置 flex 项目分布方式
     * @param value 分布方式
     */
    justify(
        value: "start" | "end" | "center" | "between" | "around" | "evenly",
    ): ContainerFactory {
        this.builder.justify(value);
        return this;
    }

    /**
     * 设置宽高比
     * @param value 宽高比值
     */
    aspectRatio(value: number): ContainerFactory {
        this.builder.aspectRatio(value);
        return this;
    }

    /**
     * 设置内容适配模式
     * @param value 适配模式
     */
    fit(value: "none" | "contain" | "cover"): ContainerFactory {
        this.builder.fit(value);
        return this;
    }

    /**
     * 设置自定义类名
     * @param value 自定义类名
     */
    withClass(value: string): ContainerFactory {
        this.builder.class(value);
        return this;
    }

    /**
     * 设置背景色
     * @param value 背景色
     */
    background(value: BackgroundColor): ContainerFactory {
        this.builder.background(value);
        return this;
    }

    /**
     * 设置容器高度
     * @param value 高度值
     */
    height(
        value:
            | "none"
            | "xs"
            | "sm"
            | "md"
            | "lg"
            | "xl"
            | "2xl"
            | "3xl"
            | "4xl"
            | "5xl"
            | "6xl"
            | "screen"
            | "auto",
    ): ContainerFactory {
        this.builder.height(value);
        return this;
    }

    /**
     * 设置是否使用柔和色样式
     * @param value 是否使用
     */
    muted(value: boolean = true): ContainerFactory {
        this.builder.muted(value);
        return this;
    }

    /**
     * 设置边框尺寸
     * @param value 边框尺寸
     */
    border(value: "none" | "sm" | "md" | "lg" | "xl"): ContainerFactory {
        this.builder.border(value);
        return this;
    }

    /**
     * 设置边框颜色
     * @param value 边框颜色
     */
    borderColor(value: BorderColor): ContainerFactory {
        this.builder.borderColor(value);
        return this;
    }

    /**
     * 批量设置属性
     * @param props 属性对象
     */
    withProps(props: Partial<IContainerProps>): ContainerFactory {
        this.builder.merge(props);
        return this;
    }

    /**
     * 设置默认内容
     * @param content 内容文本或 HTML
     */
    withContent(content: string): ContainerFactory {
        this.content = content;
        return this;
    }

    /**
     * 构建 Container 组件实例
     * @returns Container 组件 HTML 字符串
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

        // 导入 Container 组件
        const Container = (await import("./Container.astro")).default;

        // 渲染为 HTML 字符串，传入 props 和 slots
        const html = await container.renderToString(Container, {
            props,
            slots: {
                default: this.content,
                ...renderedSlots,
            },
        });

        return html;
    }

    /**
     * 构建 props 对象（用于直接传递给 Container 组件）
     * @returns props 对象
     */
    buildProps(): Partial<IContainerProps> {
        return this.builder.build();
    }
}

// 导入 Container 组件类型
import Container from "./Container.astro";

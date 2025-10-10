import type { IContainerProps } from "./containerProps";
import type { IContainerProps as IContainerPropsVue } from "./containerPropsVue";
import {
    widthClasses,
    flexClasses,
    gapClasses,
    itemsClasses,
    justifyClasses,
    roundedClasses,
} from "../../../src/common";
import { paddingClasses } from "../../../src/common/padding";
import { marginClasses } from "../../../src/common/margin";
import { heightClasses } from "../../../src/common/height";
import {
    paddingYClasses,
    paddingTopClasses,
    paddingBottomClasses,
    paddingLeftClasses,
    paddingRightClasses,
    paddingXClasses,
} from "../../../src/common/padding-axis";
import { getBackgroundClass } from "../../../src/common/backgrounds";
import { getBorderClass, getBorderColorClass } from "../../../src/common/border";

/**
 * 计算 Container 组件的组合类名（用于 Astro 版本）
 * @param props Container 组件的 props
 * @returns 组合后的类名数组
 */
export function getContainerCombinedClasses(props: IContainerProps): string[] {
    const {
        width = "md",
        padding = "md",
        py,
        pt,
        pb,
        px,
        pl,
        pr,
        margin = "none",
        rounded = "none",
        background,
        border = "none",
        borderColor,
        flex,
        gap = "none",
        items,
        justify,
        height,
        class: className = "",
        centered = true,
        contentCentered = false,
    } = props;

    // 构建轴向内边距类名
    const pyClass = py
        ? paddingYClasses[py as keyof typeof paddingYClasses] || ""
        : "";

    const paddingTopClass = pt
        ? paddingTopClasses[pt as keyof typeof paddingTopClasses] || ""
        : "";

    const paddingBottomClass = pb
        ? paddingBottomClasses[pb as keyof typeof paddingBottomClasses] || ""
        : "";

    const paddingLeftClass = pl
        ? paddingLeftClasses[pl as keyof typeof paddingLeftClasses] || ""
        : "";

    const paddingRightClass = pr
        ? paddingRightClasses[pr as keyof typeof paddingRightClasses] || ""
        : "";

    const paddingXClass = px
        ? paddingXClasses[px as keyof typeof paddingXClasses] || ""
        : "";

    // 构建CSS类名
    return [
        "cosy:w-full",
        centered ? "cosy:mx-auto" : "",
        contentCentered ? "cosy:flex cosy:justify-center cosy:items-center" : "",
        widthClasses[width],
        paddingClasses[padding],
        pyClass,
        paddingTopClass,
        paddingBottomClass,
        paddingLeftClass,
        paddingRightClass,
        paddingXClass,
        marginClasses[margin],
        roundedClasses[rounded],
        getBackgroundClass(background),
        getBorderClass(border),
        getBorderColorClass(borderColor),
        flex ? flexClasses[flex] : "",
        flex ? gapClasses[gap] : "",
        items && flex ? itemsClasses[items] : "",
        justify && flex ? justifyClasses[justify] : "",
        height ? heightClasses[height] : "",
        className,
    ];
}

/**
 * 计算 Container 组件的组合类名（用于 Vue 版本）
 * @param props Container 组件的 props
 * @returns 组合后的类名数组
 */
export function getContainerCombinedClassesVue(props: IContainerPropsVue): string[] {
    const {
        width = "md",
        padding = "md",
        flex,
        gap = "none",
        items,
        justify,
        rounded = "none",
        background,
        border = false,
        class: className = "",
        centered = true,
    } = props;

    // 将 Vue 版本的 border 布尔值转换为字符串
    const borderValue = border ? "md" : "none";

    // 构建CSS类名
    return [
        "cosy:w-full",
        centered ? "cosy:mx-auto" : "",
        widthClasses[width],
        paddingClasses[padding],
        roundedClasses[rounded],
        getBackgroundClass(background),
        getBorderClass(borderValue),
        flex ? flexClasses[flex] : "",
        flex ? gapClasses[gap] : "",
        items && flex ? itemsClasses[items] : "",
        justify && flex ? justifyClasses[justify] : "",
        className,
    ];
}
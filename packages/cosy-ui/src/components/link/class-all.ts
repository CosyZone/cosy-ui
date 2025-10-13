import type { ILinkPropsBase } from "./linkPropsBase";
import { getLinkBaseClasses } from "./class-base";
import { getLinkVariantClasses } from "./class-variant";
import { getLinkSizeClasses } from "./class-size";
import { getLinkRoundedClass } from "./class-rounded";
import { getLinkModifierClasses } from "./class-modifiers";
import { getLinkAlignClass } from "./class-align";
import { getLinkAnimationClasses } from "./class-animation";

/**
 * 计算 Link 组件的组合类名（用于基础接口）
 * @param props Link 组件的基础 props
 * @returns 组合后的类名数组
 */
export function getBaseLinkClasses(props: ILinkPropsBase): string[] {
    const {
        href,
        external = false,
        block = false,
        variant = "default",
        animation = "none",
        size = "md",
        class: className = "",
        "class:list": classList,
        debug = false,
        btn = false,
        circle = false,
        ghost = false,
        noUnderline = true,
        rounded = "none",
        fullWidth = false,
        color,
        align,
        active = false,
        navigationType,
        icon,
        hoverImage,
        hoverImageAlt,
        ...rest
    } = props;

    // 构建基础类名
    const baseClasses = getLinkBaseClasses(block, icon, hoverImage);

    // 构建变体类名
    const variantClasses = getLinkVariantClasses(
        variant,
        btn,
        ghost,
        color,
        fullWidth,
        circle,
        navigationType,
    );

    // 构建尺寸类名
    const sizeClasses = getLinkSizeClasses(size, btn);

    // 构建圆角类名
    const roundedClass = getLinkRoundedClass(btn, rounded);

    // 构建修饰符类名
    const modifierClasses = getLinkModifierClasses(
        btn,
        noUnderline,
        fullWidth,
        active,
        debug,
    );

    // 构建对齐类名
    const alignClass = getLinkAlignClass(align);

    // 构建动画类名
    const animationClasses = getLinkAnimationClasses(animation);

    // 组合所有类名
    const classes = [
        ...baseClasses,
        ...variantClasses,
        ...sizeClasses,
        roundedClass,
        ...modifierClasses,
        alignClass,
        ...animationClasses,
        className,
    ];

    return classes;
}

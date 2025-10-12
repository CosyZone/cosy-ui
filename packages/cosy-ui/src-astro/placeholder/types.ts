import type { IPlaceholderPropsBase } from "../../src/components/placeholder/placeholderPropsBase";
import type { BackgroundColor } from "../../src/common/backgrounds";

// 导出基础接口和背景色类型
export type { IPlaceholderPropsBase, BackgroundColor };

export type PlaceHolderWidth = IPlaceholderPropsBase["width"];
export type PlaceHolderHeight = IPlaceholderPropsBase["height"];
export type PlaceHolderPadding = IPlaceholderPropsBase["padding"];

export interface PlaceHolderProps extends IPlaceholderPropsBase {}

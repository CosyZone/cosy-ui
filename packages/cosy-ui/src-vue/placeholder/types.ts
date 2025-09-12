import type { BackgroundColor } from '../../src/common/backgrounds';

export type PlaceHolderWidth = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
export type PlaceHolderHeight = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
export type PlaceHolderPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IPlaceHolderProps {
    /** 背景色类型，支持所有预设背景色和透明度变体 */
    background?: BackgroundColor;
    /** 自定义 CSS 类名 */
    class?: string;
    /** 占位符高度 */
    height?: PlaceHolderHeight;
    /** 内边距大小 */
    padding?: PlaceHolderPadding;
    /** 占位符宽度 */
    width?: PlaceHolderWidth;
}

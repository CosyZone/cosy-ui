export interface ICarouselItem {
    /** 唯一标识（用于生成锚点 id） */
    id?: string;
    /** 图片地址 */
    src: string;
    /** 图片描述（可选） */
    alt?: string;
}

export interface ICarouselProps {
    /** 轮播项列表 */
    items: ICarouselItem[];
    /** 锚点 id 前缀，确保同页多实例不冲突 @default 'carousel' */
    idPrefix?: string;
    /** 导航按钮类名（daisyUI 按钮），默认 'btn btn-circle' */
    navButtonClass?: string;
    /** 是否显示上一页/下一页导航按钮 @default true */
    showNav?: boolean;
    /** 根元素 id（可选） */
    id?: string;
    /** 追加的类名 */
    class?: string;
    /** Astro 的 class:list 语法 */
    'class:list'?: any;
}



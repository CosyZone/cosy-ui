/**
 * 图片元数据接口
 * 用于统一管理项目中的图片元数据类型
 */
export interface IImageMetadata {
    src: string;
    width: number;
    height: number;
    format: string;
}

/**
 * 图片源类型
 * 可以是 IImageMetadata 对象或字符串 URL
 */
export type ImageSource = IImageMetadata | string;

/**
 * 表示文档中的标题结构
 */
export interface Heading {
    /** 标题深度，如 h1=1, h2=2, h3=3 等 */
    depth: number;

    /** 标题的唯一标识符，用于锚点链接 */
    slug: string;

    /** 标题文本内容 */
    text: string;
} 
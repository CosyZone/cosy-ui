/**
 * 共享的 Meta 配置
 * 用于所有 demo 页面
 */

/**
 * Meta 配置参数接口
 */
export interface IMetaConfigParams {
    /** 页面标题 */
    title: string;
    /** 页面描述 */
    description: string;
    /** 关键词 */
    keywords: string;
    /** 作者（可选，默认为 'CofficLab'） */
    author?: string;
    /** robots 设置（可选，默认为 'index, follow'） */
    robots?: string;
}

/**
 * 获取 Meta 配置
 * @param params Meta 配置参数
 * @returns Meta 配置对象
 */
export function getMetaConfig(params: IMetaConfigParams) {
    return {
        title: params.title,
        description: params.description,
        keywords: params.keywords,
        author: params.author || 'CofficLab',
        robots: params.robots || 'index, follow',
    };
}


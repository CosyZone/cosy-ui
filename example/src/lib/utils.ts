// 从 astro.config.ts 中获取基础路径
export const getBaseUrl = (): string => {
    // 在开发环境中返回空字符串，在生产环境中返回配置的基础路径
    return import.meta.env.DEV ? '/cosy-ui' : '/cosy-ui';
};

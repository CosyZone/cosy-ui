import { getBaseUrl } from './utils';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface Route {
    path: string;
    title: string;
    group?: string;
}

export interface GroupedRoute {
    group: string;
    routes: Route[];
}

// 分组映射表
const GROUP_MAPPING: Record<string, string> = {
    'installation': '安装',
    'layouts': '布局',
    'containers': '容器',
    'components': '组件'
};

// 生成带基础路径的完整 URL
export const createUrl = (path: string): string => {
    const baseUrl = getBaseUrl();
    return `${baseUrl}${path}`;
};

// 从文件路径中提取标题
function extractTitle(path: string): string {
    // 移除文件扩展名和路径
    const fileName = path.split('/').pop() || '';
    const nameWithoutExt = fileName.replace(/\.(mdx?|astro)$/, '');

    // 将 kebab-case 转换为 Title Case
    const title = nameWithoutExt
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // 如果标题以组件名结尾，添加"组件示例"后缀
    if (!title.includes('组件')) {
        return `${title} 组件示例`;
    }
    return title;
}

// 获取分组路由
export async function getGroupedRoutes(locale: string = 'zh-cn'): Promise<GroupedRoute[]> {
    const articles = await getCollection('articles');
    const groups: { [key: string]: Route[] } = {};

    // 处理每个文档
    for (const article of articles) {
        // 获取相对路径（相对于 content 目录）
        const relativePath = article.id;
        const [docLocale, ...restPath] = relativePath.split('/');

        // 只处理当前语言的文档
        if (docLocale !== locale) continue;

        const processedPath = restPath.join('/');

        // 跳过所有 index 文件
        if (processedPath.endsWith('/index.mdx') || processedPath === 'index.mdx') continue;

        // 解析路径段
        const pathSegments = processedPath.split('/');

        // 确定分组和标题
        let group: string;
        let rawPath: string;

        if (pathSegments.length === 1) {
            // 顶级文件，如 installation.mdx
            const name = pathSegments[0].replace('.mdx', '');
            group = GROUP_MAPPING[name] || name;
            rawPath = `/${locale}/${name}`;
        } else {
            // 子目录文件，如 components/alert.mdx
            const [dirName, fileName] = pathSegments;
            group = GROUP_MAPPING[dirName] || dirName;
            rawPath = `/${locale}/${processedPath.replace('.mdx', '')}`;
        }

        // 使用 createUrl 生成带有正确 base 前缀的路径
        const path = createUrl(rawPath);

        // 使用文档中定义的标题
        const title = article.data.title;

        // 添加到分组
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push({ path, title });
    }

    // 转换为数组格式并排序
    const result = Object.entries(groups)
        .filter(([group]) => group !== 'index') // 过滤掉 index 分组
        .map(([group, routes]) => ({
            group,
            routes: routes.sort((a, b) => a.title.localeCompare(b.title))
        }));

    // 打印结果
    console.log(`Generated routes structure for locale ${locale}:`);
    result.forEach(group => {
        console.log(`\n${group.group}:`);
        group.routes.forEach(route => {
            console.log(`  - ${route.title}`);
            console.log(`    path: ${route.path}`);
        });
    });

    return result;
} 
import { getBaseUrl } from './utils';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface Route {
    path: string;
    title: string;
    order: number;
}

export interface GroupedRoute {
    group: string;
    routes: Route[];
    order: number;
}

// 生成带基础路径的完整 URL
export const createUrl = (path: string): string => {
    const baseUrl = getBaseUrl();
    return `${baseUrl}${path}`;
};

// 获取分组路由
export async function getGroupedRoutes(locale: string = 'zh-cn'): Promise<GroupedRoute[]> {
    const articles = await getCollection('articles');
    const groups: { [key: string]: { title: string, order: number, routes: Route[] } } = {};

    // 第一步：找出所有标记为 folder 的文档作为组
    for (const article of articles) {
        const [docLocale, ...restPath] = article.id.split('/');
        if (docLocale !== locale) continue;

        if (article.data.folder) {
            const pathWithoutExtension = article.id.replace(/\.mdx$/, '');
            const groupPath = `/${locale}/${pathWithoutExtension.substring(docLocale.length + 1)}`;

            // 如果是 index.mdx，需要特殊处理路径
            const normalizedPath = groupPath.replace(/\/index$/, '');

            groups[normalizedPath] = {
                title: article.data.title,
                order: article.data.order || 999,
                routes: []
            };
        }
    }

    // 第二步：将其他文档分配到对应的组中
    for (const article of articles) {
        const [docLocale, ...restPath] = article.id.split('/');
        if (docLocale !== locale) continue;

        // 跳过 folder 文档，它们已经在上面处理过了
        if (article.data.folder) continue;

        const pathWithoutExtension = article.id.replace(/\.mdx$/, '');
        const docPath = `/${locale}/${pathWithoutExtension.substring(docLocale.length + 1)}`;
        const url = createUrl(docPath);

        // 确保我们正确获取 order 值，默认为 999
        const docOrder = typeof article.data.order === 'number' ? article.data.order : 999;

        // 查找最匹配的组
        let bestMatch = '';
        let bestMatchLength = 0;

        for (const groupPath in groups) {
            // 如果文档路径以组路径开头，且这是目前找到的最长匹配
            if (docPath.startsWith(groupPath) && groupPath.length > bestMatchLength) {
                bestMatch = groupPath;
                bestMatchLength = groupPath.length;
            }
        }

        // 如果找到匹配的组，将文档添加到该组
        if (bestMatch) {
            groups[bestMatch].routes.push({
                path: url,
                title: article.data.title,
                order: docOrder // 使用正确获取的 order 值
            });
        } else {
            // 如果没有找到匹配的组，创建一个"指南"组
            const uncategorizedGroup = `/${locale}`;
            if (!groups[uncategorizedGroup]) {
                groups[uncategorizedGroup] = {
                    title: '指南',
                    order: 0,
                    routes: []
                };
            }

            groups[uncategorizedGroup].routes.push({
                path: url,
                title: article.data.title,
                order: docOrder // 使用正确获取的 order 值
            });
        }
    }

    // 第三步：对每个组内的路由进行排序，并将组转换为数组格式
    const result = Object.entries(groups).map(([path, { title, order, routes }]) => ({
        group: title,
        order,
        routes: routes.sort((a, b) => {
            // 首先按 order 排序（值小的排前面）
            if (a.order !== b.order) {
                return a.order - b.order;
            }

            // 调试输出，帮助排查问题
            console.log(`Same order for: ${a.title}(${a.order}) and ${b.title}(${b.order})`);

            // order 相同时，按路径中斜杠的数量排序
            const slashCountA = (a.path.match(/\//g) || []).length;
            const slashCountB = (b.path.match(/\//g) || []).length;

            if (slashCountA !== slashCountB) {
                return slashCountA - slashCountB; // 斜杠少的排前面
            }

            // 最后按标题字母顺序排序
            return a.title.localeCompare(b.title);
        })
    }))
        // 对组进行排序（值小的排前面）
        .sort((a, b) => a.order - b.order);

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
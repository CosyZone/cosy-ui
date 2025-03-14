import { getBaseUrl } from './utils';

export interface Route {
    path: string;
    title: string;
    group?: string;
}

export const routes = {
    // 基础页面
    home: { path: '/', title: '介绍' },
    installation: { path: '/installation', title: '安装' },

    // 组件
    components: {
        alert: { path: '/components/alert', title: 'Alert 提示', group: '组件' },
        button: { path: '/components/button', title: 'Button 按钮', group: '组件' },
        input: { path: '/components/input', title: 'Input 输入框', group: '组件' },
        select: { path: '/components/select', title: 'Select 选择器', group: '组件' },
        table: { path: '/components/table', title: 'Table 表格', group: '组件' },
        code: { path: '/components/code', title: 'Code 代码', group: '组件' },
        article: { path: '/components/article', title: 'Article 文章', group: '组件' },
    },
} as const;

// 获取所有路由
export const getAllRoutes = (): Route[] => {
    const flatRoutes: Route[] = [];

    // 添加基础页面
    Object.entries(routes)
        .filter(([key]) => key !== 'components')
        .forEach(([_, route]) => {
            flatRoutes.push(route as Route);
        });

    // 添加组件页面
    Object.values(routes.components).forEach(route => {
        flatRoutes.push(route as Route);
    });

    return flatRoutes;
};

// 获取分组后的路由
export const getGroupedRoutes = () => {
    const groups: Record<string, Route[]> = {
        '开始': [],
        '组件': [],
    };

    getAllRoutes().forEach(route => {
        if (route.group) {
            groups[route.group].push(route);
        } else {
            groups['开始'].push(route);
        }
    });

    return groups;
};

// 生成带基础路径的完整 URL
export const createUrl = (path: string): string => {
    const baseUrl = getBaseUrl();
    return `${baseUrl}${path}`;
}; 
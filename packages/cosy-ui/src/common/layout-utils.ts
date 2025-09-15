/**
 * 布局工具函数
 * 包含应用布局相关的计算函数
 */

// 头部高度类型
export type HeaderHeight = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * 动态计算Container最小高度
 * @param headerHeight 头部高度
 * @returns CSS 类名字符串
 */
export function getContainerMinHeightClass(headerHeight: HeaderHeight = 'md'): string {
    const heightValueMap = {
        '3xs': 'cosy:min-h-[calc(100vh-1rem)]',
        '2xs': 'cosy:min-h-[calc(100vh-1.5rem)]',
        xs: 'cosy:min-h-[calc(100vh-2rem)]',
        sm: 'cosy:min-h-[calc(100vh-2.5rem)]',
        md: 'cosy:min-h-[calc(100vh-3rem)]',
        lg: 'cosy:min-h-[calc(100vh-4rem)]',
        xl: 'cosy:min-h-[calc(100vh-5rem)]',
    };
    return (
        heightValueMap[headerHeight] ||
        'cosy:min-h-[calc(100vh-3rem)]'
    );
}

/**
 * 计算Sidebar的top值
 * @param headerHeight 头部高度
 * @returns CSS 类名字符串
 */
export function getSidebarTopClass(headerHeight: HeaderHeight = 'md'): string {
    const topMap = {
        '3xs': 'cosy:top-4',
        '2xs': 'cosy:top-6',
        xs: 'cosy:top-8',
        sm: 'cosy:top-10',
        md: 'cosy:top-12',
        lg: 'cosy:top-16',
        xl: 'cosy:top-20',
    };
    return topMap[headerHeight] || 'cosy:top-12';
}

/**
 * 计算Sidebar的高度值
 * @param headerHeight 头部高度
 * @returns CSS 类名字符串
 */
export function getSidebarHeightClass(headerHeight: HeaderHeight = 'md'): string {
    const heightValueMap = {
        '3xs': 'cosy:h-[calc(100vh-1rem)]',
        '2xs': 'cosy:h-[calc(100vh-1.5rem)]',
        xs: 'cosy:h-[calc(100vh-2rem)]',
        sm: 'cosy:h-[calc(100vh-2.5rem)]',
        md: 'cosy:h-[calc(100vh-3rem)]',
        lg: 'cosy:h-[calc(100vh-4rem)]',
        xl: 'cosy:h-[calc(100vh-5rem)]',
    };
    return (
        heightValueMap[headerHeight] ||
        'cosy:h-[calc(100vh-3rem)]'
    );
}

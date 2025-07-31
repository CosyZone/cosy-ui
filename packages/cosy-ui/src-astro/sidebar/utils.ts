/**
 * 侧边栏工具函数
 */

const MARGIN_CLASSES = {
    none: 'cosy:mt-0',
    xs: 'cosy:mt-1',
    sm: 'cosy:mt-2',
    md: 'cosy:mt-4',
    lg: 'cosy:mt-6',
    xl: 'cosy:mt-8',
    '2xl': 'cosy:mt-10',
    '3xl': 'cosy:mt-12',
    '4xl': 'cosy:mt-16',
    '5xl': 'cosy:mt-20',
} as const;

const MARGIN_BOTTOM_CLASSES = {
    none: 'cosy:mb-0',
    xs: 'cosy:mb-1',
    sm: 'cosy:mb-2',
    md: 'cosy:mb-4',
    lg: 'cosy:mb-6',
    xl: 'cosy:mb-8',
    '2xl': 'cosy:mb-10',
    '3xl': 'cosy:mb-12',
    '4xl': 'cosy:mb-16',
    '5xl': 'cosy:mb-20',
} as const;

/**
 * 获取顶部外边距类名
 */
export function getMarginTopClass(marginTop: string): string {
    return MARGIN_CLASSES[marginTop as keyof typeof MARGIN_CLASSES] || '';
}

/**
 * 获取底部外边距类名
 */
export function getMarginBottomClass(marginBottom: string): string {
    return MARGIN_BOTTOM_CLASSES[marginBottom as keyof typeof MARGIN_BOTTOM_CLASSES] || '';
}

/**
 * 保存滚动位置到 localStorage
 */
export function saveScrollPosition(container: Element, key: string): void {
    if (container) {
        localStorage.setItem(key, container.scrollTop.toString());
    }
}

/**
 * 从 localStorage 恢复滚动位置
 */
export function restoreScrollPosition(container: Element, key: string): void {
    if (container) {
        const savedPosition = localStorage.getItem(key);
        if (savedPosition) {
            container.scrollTop = parseInt(savedPosition, 10);
        }
    }
} 

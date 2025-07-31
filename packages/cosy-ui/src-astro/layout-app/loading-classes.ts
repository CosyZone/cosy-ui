/**
 * Loading 类名工具函数
 * 用于根据 loading 类型和尺寸生成对应的 CSS 类名
 */

export type LoadingType = 'ring' | 'dots' | 'spinner' | 'bars' | 'infinity';
export type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * 根据 loading 类型和尺寸获取对应的 CSS 类名
 * @param type loading 类型
 * @param size loading 尺寸
 * @returns CSS 类名字符串
 */
export function getLoadingClass(type: LoadingType, size: LoadingSize): string {
    const classMap: Record<LoadingType, Record<LoadingSize, string>> = {
        ring: {
            xs: 'cosy:loading cosy:loading-ring cosy:loading-xs',
            sm: 'cosy:loading cosy:loading-ring cosy:loading-sm',
            md: 'cosy:loading cosy:loading-ring cosy:loading-md',
            lg: 'cosy:loading cosy:loading-ring cosy:loading-lg',
            xl: 'cosy:loading cosy:loading-ring cosy:loading-xl',
        },
        dots: {
            xs: 'cosy:loading cosy:loading-dots cosy:loading-xs',
            sm: 'cosy:loading cosy:loading-dots cosy:loading-sm',
            md: 'cosy:loading cosy:loading-dots cosy:loading-md',
            lg: 'cosy:loading cosy:loading-dots cosy:loading-lg',
            xl: 'cosy:loading cosy:loading-dots cosy:loading-xl',
        },
        spinner: {
            xs: 'cosy:loading cosy:loading-spinner cosy:loading-xs',
            sm: 'cosy:loading cosy:loading-spinner cosy:loading-sm',
            md: 'cosy:loading cosy:loading-spinner cosy:loading-md',
            lg: 'cosy:loading cosy:loading-spinner cosy:loading-lg',
            xl: 'cosy:loading cosy:loading-spinner cosy:loading-xl',
        },
        bars: {
            xs: 'cosy:loading cosy:loading-bars cosy:loading-xs',
            sm: 'cosy:loading cosy:loading-bars cosy:loading-sm',
            md: 'cosy:loading cosy:loading-bars cosy:loading-md',
            lg: 'cosy:loading cosy:loading-bars cosy:loading-lg',
            xl: 'cosy:loading cosy:loading-bars cosy:loading-xl',
        },
        infinity: {
            xs: 'cosy:loading cosy:loading-infinity cosy:loading-xs',
            sm: 'cosy:loading cosy:loading-infinity cosy:loading-sm',
            md: 'cosy:loading cosy:loading-infinity cosy:loading-md',
            lg: 'cosy:loading cosy:loading-infinity cosy:loading-lg',
            xl: 'cosy:loading cosy:loading-infinity cosy:loading-xl',
        },
    };

    return classMap[type][size];
} 

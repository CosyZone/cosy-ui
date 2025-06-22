/**
 * Toast 组件的类型定义
 */

/**
 * Toast 类型
 */
export type ToastType = 'info' | 'success' | 'warning' | 'error';

/**
 * Toast 配置接口
 */
export interface ToastConfig {
    message: string;
    type?: ToastType;
    duration?: number; // 毫秒，默认 3000
    id?: string; // 如果不提供会自动生成
}

/**
 * Toast 项接口
 */
export interface ToastItem extends Required<ToastConfig> {
    id: string;
    createdAt: number;
}

/**
 * Toast 样式映射
 */
export const toastStyleMap: Record<ToastType, { bg: string; icon: string; border: string }> = {
    info: {
        bg: 'cosy:bg-info cosy:text-info-content',
        icon: 'info',
        border: 'cosy:border-info'
    },
    success: {
        bg: 'cosy:bg-success cosy:text-success-content',
        icon: 'check',
        border: 'cosy:border-success'
    },
    warning: {
        bg: 'cosy:bg-warning cosy:text-warning-content',
        icon: 'warning',
        border: 'cosy:border-warning'
    },
    error: {
        bg: 'cosy:bg-error cosy:text-error-content',
        icon: 'error',
        border: 'cosy:border-error'
    }
};

/**
 * 获取 Toast 样式
 * @param type Toast 类型
 * @returns 对应的样式配置
 */
export function getToastStyle(type: ToastType) {
    return toastStyleMap[type];
}

/**
 * 默认 Toast 配置
 */
export const DEFAULT_TOAST_CONFIG = {
    type: 'info' as ToastType,
    duration: 3000,
};

// 声明全局 Toast 函数
declare global {
    interface Window {
        showToast: (config: ToastConfig | string) => string;
        closeToast: (id: string) => void;
        clearAllToasts: () => void;
    }
} 
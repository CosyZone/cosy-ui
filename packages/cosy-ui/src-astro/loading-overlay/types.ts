export interface LoadingOverlayProps {
    /** 加载文本 */
    text?: string;
    /** 自定义 CSS 类名 */
    class?: string;
    /** 是否显示加载动画 */
    showSpinner?: boolean;
    /** 加载动画类型 */
    spinnerType?: 'dots' | 'spinner' | 'pulse';
}

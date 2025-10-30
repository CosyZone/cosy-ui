/**
 * Avatar 组件的共用工具函数
 */

/**
 * 尺寸映射类型
 */
export const avatarSizeClasses = {
    sm: "cosy:w-8 cosy:h-8 cosy:text-sm",
    md: "cosy:w-12 cosy:h-12 cosy:text-lg",
    lg: "cosy:w-16 cosy:h-16 cosy:text-xl",
    xl: "cosy:w-20 cosy:h-20 cosy:text-2xl",
} as const;

/**
 * 头像背景色数组
 */
export const avatarColors = [
    "cosy:bg-primary",
    "cosy:bg-secondary",
    "cosy:bg-accent",
    "cosy:bg-info",
    "cosy:bg-success",
    "cosy:bg-warning",
    "cosy:bg-error",
] as const;

/**
 * 生成头像背景色
 * @param userName 用户名称
 * @returns 背景色类名
 */
export const getAvatarColor = (userName?: string): string => {
    if (!userName) return avatarColors[0]; // 默认使用第一个颜色
    const index = userName.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
};

/**
 * 获取用户名首字母（大写）
 * @param userName 用户名称
 * @returns 首字母或默认占位符
 */
export const getAvatarInitial = (userName?: string): string => {
    return userName ? userName.charAt(0).toUpperCase() : "?";
};

/**
 * 获取尺寸类名
 * @param size 尺寸
 * @returns 尺寸类名
 */
export const getAvatarSizeClass = (
    size: keyof typeof avatarSizeClasses = "md",
): string => {
    return avatarSizeClasses[size];
};

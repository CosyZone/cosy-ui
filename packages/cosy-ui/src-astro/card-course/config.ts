/**
 * 图标尺寸配置
 * 预设的几种图标尺寸类名
 */
export const iconSizeConfig: Record<string, string> = {
    sm: 'cosy:w-16 cosy:h-16',
    md: 'cosy:w-24 cosy:h-24',
    lg: 'cosy:w-32 cosy:h-32',
    xl: 'cosy:w-40 cosy:h-40',
};

/**
 * 获取图标尺寸类名
 * @param size 图标尺寸
 * @returns 对应的CSS类名
 */
export function getIconSizeClasses(size: "sm" | "md" | "lg" | "xl" = "md"): string {
    return iconSizeConfig[size] || iconSizeConfig.md;
}

/**
 * 标准化课程名称
 * 将课程名称转换为小写并用下划线替换特殊字符
 */
export function normalizeName(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '_');
}

/**
 * 格式化课程显示名称
 * 将下划线替换为空格并首字母大写
 * @param courseName 课程名称
 * @returns 格式化后的显示名称
 */
export function formatDisplayName(courseName: string): string {
    return courseName
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
} 

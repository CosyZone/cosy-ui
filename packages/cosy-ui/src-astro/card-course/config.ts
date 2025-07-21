/**
 * 通用渐变色配置
 * key 为描述性名称，value 为渐变色 class
 */
export const gradientPresets: Record<string, string> = {
    bluePurple: 'cosy:bg-gradient-to-br cosy:from-blue-500 cosy:to-purple-600',
    indigoBlue: 'cosy:bg-gradient-to-br cosy:from-indigo-500 cosy:to-blue-600',
    purplePink: 'cosy:bg-gradient-to-br cosy:from-purple-500 cosy:to-pink-600',
    greenTeal: 'cosy:bg-gradient-to-br cosy:from-green-500 cosy:to-teal-600',
    redOrange: 'cosy:bg-gradient-to-br cosy:from-red-500 cosy:to-orange-600',
    yellowOrange: 'cosy:bg-gradient-to-br cosy:from-yellow-500 cosy:to-orange-600',
    pinkRed: 'cosy:bg-gradient-to-br cosy:from-pink-500 cosy:to-red-600',
    emeraldCyan: 'cosy:bg-gradient-to-br cosy:from-blue-400 cosy:to-cyan-600',
    orangeRed: 'cosy:bg-gradient-to-br cosy:from-orange-400 cosy:to-red-600',
    gray: 'cosy:bg-gradient-to-br cosy:from-gray-500 cosy:to-gray-600',
    purplePinkDark: 'cosy:bg-gradient-to-br cosy:from-purple-500 cosy:to-pink-700',
    greenEmerald: 'cosy:bg-gradient-to-br cosy:from-green-500 cosy:to-emerald-700',
    blueIndigo: 'cosy:bg-gradient-to-br cosy:from-blue-500 cosy:to-indigo-700',
    primarySecondary: 'cosy:bg-gradient-to-br cosy:from-primary/50 cosy:to-secondary/50',
};

/**
 * 渐变色 key 列表，保证顺序稳定
 */
export const gradientKeys = Object.keys(gradientPresets);

/**
 * 根据字符串生成稳定 hash
 */
function stringToStableIndex(str: string, mod: number): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // 转为32位整数
    }
    return Math.abs(hash) % mod;
}

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
 * 根据课程名称获取对应的背景渐变类名（稳定分配，所有 courseName 都有）
 * @param courseName 课程名称
 * @returns 渐变背景类名
 */
export function getCourseGradient(courseName: string): string {
    const normalizedName = normalizeName(courseName);
    // 稳定 hash 到渐变色 key
    const idx = stringToStableIndex(normalizedName, gradientKeys.length);
    const key = gradientKeys[idx];
    return gradientPresets[key] || gradientPresets.gray;
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

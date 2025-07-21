import WebsiteIcon from '../icons/WebsiteIcon.astro';
import AstroIcon from '../icons/AstroIcon.astro';
import GolangIcon from '../icons/CodeIcon.astro';
import JavaIcon from '../icons/CodeIcon.astro';
import PhpIcon from '../icons/CodeIcon.astro';
import VueIcon from '../icons/CodeIcon.astro';
import SwiftIcon from '../icons/CodeIcon.astro';
import BookIcon from '../icons/DocumentIcon.astro';

/**
 * 课程图标映射配置
 * 根据课程名称返回对应的图标组件
 */
export const courseIconMap: Record<string, any> = {
    computer_networks: BookIcon,
    computer_organization: BookIcon,
    operating_systems: BookIcon,
    data_structures: BookIcon,
    higher_mathematics: BookIcon,
    linear_algebra: BookIcon,
    probability_and_statistics: BookIcon,
    vue: VueIcon,
    php: PhpIcon,
    javascript: BookIcon,
    java: JavaIcon,
    golang: GolangIcon,
    swift_ui: SwiftIcon,
    flutter: BookIcon,
    astro: GolangIcon,
    caddy: BookIcon,
    kong: BookIcon,
    website: WebsiteIcon,
    default: BookIcon,
};

/**
 * 课程背景渐变映射配置
 * 根据课程名称返回对应的渐变背景类名
 */
export const courseGradientMap: Record<string, string> = {
    computer_networks: 'cosy:bg-gradient-to-br cosy:from-blue-500 cosy:to-purple-600',
    computer_organization: 'cosy:bg-gradient-to-br cosy:from-indigo-500 cosy:to-blue-600',
    operating_systems: 'cosy:bg-gradient-to-br cosy:from-purple-500 cosy:to-pink-600',
    data_structures: 'cosy:bg-gradient-to-br cosy:from-green-500 cosy:to-teal-600',
    higher_mathematics: 'cosy:bg-gradient-to-br cosy:from-red-500 cosy:to-orange-600',
    linear_algebra: 'cosy:bg-gradient-to-br cosy:from-yellow-500 cosy:to-orange-600',
    probability_and_statistics: 'cosy:bg-gradient-to-br cosy:from-pink-500 cosy:to-red-600',
    vue: 'cosy:bg-gradient-to-br cosy:from-green-400 cosy:to-emerald-600',
    php: 'cosy:bg-gradient-to-br cosy:from-purple-400 cosy:to-indigo-600',
    javascript: 'cosy:bg-gradient-to-br cosy:from-yellow-400 cosy:to-orange-600',
    java: 'cosy:bg-gradient-to-br cosy:from-red-400 cosy:to-orange-600',
    golang: 'cosy:bg-gradient-to-br cosy:from-blue-400 cosy:to-cyan-600',
    swift_ui: 'cosy:bg-gradient-to-br cosy:from-orange-400 cosy:to-red-600',
    flutter: 'cosy:bg-gradient-to-br cosy:from-primary/50 cosy:to-secondary/50',
    astro: 'cosy:bg-gradient-to-br cosy:from-purple-500 cosy:to-pink-600',
    caddy: 'cosy:bg-gradient-to-br cosy:from-green-500 cosy:to-emerald-700',
    kong: 'cosy:bg-gradient-to-br cosy:from-blue-500 cosy:to-indigo-700',
    website: 'cosy:bg-gradient-to-br cosy:from-purple-500 cosy:to-pink-700',
    default: 'cosy:bg-gradient-to-br cosy:from-gray-500 cosy:to-gray-600',
};

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
 * 根据课程名称获取对应的图标组件
 * @param courseName 课程名称
 * @returns 图标组件或默认图标
 */
export function getCourseIcon(courseName: string): any {
    const normalizedName = normalizeName(courseName);

    // 直接匹配
    let IconComponent = courseIconMap[normalizedName];
    if (IconComponent) return IconComponent;

    // 模糊匹配
    for (const key in courseIconMap) {
        if (key !== 'default' && normalizedName.includes(key)) {
            IconComponent = courseIconMap[key];
            break;
        }
    }

    // 返回默认图标
    return IconComponent || courseIconMap.default;
}

/**
 * 根据课程名称获取对应的背景渐变类名
 * @param courseName 课程名称
 * @returns 渐变背景类名或默认渐变
 */
export function getCourseGradient(courseName: string): string {
    const normalizedName = normalizeName(courseName);

    // 直接匹配
    let gradient = courseGradientMap[normalizedName];
    if (gradient) return gradient;

    // 模糊匹配
    for (const key in courseGradientMap) {
        if (key !== 'default' && normalizedName.includes(key)) {
            gradient = courseGradientMap[key];
            break;
        }
    }

    // 返回默认渐变
    return gradient || courseGradientMap.default;
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

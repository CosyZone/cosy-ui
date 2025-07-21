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
    default: BookIcon,
};

/**
 * 课程背景渐变映射配置
 * 根据课程名称返回对应的渐变背景类名
 */
export const courseGradientMap: Record<string, string> = {
    computer_networks: 'cosy:from-primary/50 cosy:to-secondary/50',
    computer_organization: 'cosy:from-primary/50 cosy:to-accent/50',
    operating_systems: 'cosy:from-secondary/50 cosy:to-accent/50',
    data_structures: 'cosy:from-accent/50 cosy:to-primary/50',
    higher_mathematics: 'cosy:from-success/50 cosy:to-info/50',
    linear_algebra: 'cosy:from-info/50 cosy:to-success/50',
    probability_and_statistics: 'cosy:from-success/50 cosy:to-accent/50',
    vue: 'cosy:from-success/50 cosy:to-primary/50',
    php: 'cosy:from-secondary/50 cosy:to-accent/50',
    javascript: 'cosy:from-warning/50 cosy:to-error/50',
    java: 'cosy:from-error/50 cosy:to-warning/50',
    golang: 'cosy:from-info/50 cosy:to-primary/50',
    swift_ui: 'cosy:from-warning/50 cosy:to-error/50',
    flutter: 'cosy:from-primary/50 cosy:to-secondary/50',
    astro: 'cosy:from-secondary/50 cosy:to-accent/50',
    caddy: 'cosy:from-success/50 cosy:to-primary/50',
    kong: 'cosy:from-accent/50 cosy:to-secondary/50',
    default: 'cosy:from-neutral cosy:to-base-content',
};

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

import { headingSizeClasses } from "../../common/textSizes";

/**
 * 计算 Heading 组件的尺寸相关类名
 * @param level 标题级别
 * @returns 尺寸相关的类名
 */
export function getHeadingSizeClass(level: 1 | 2 | 3 | 4 | 5 | 6 = 2): string {
	return headingSizeClasses[level] || headingSizeClasses[2];
}

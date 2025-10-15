import type { BackgroundColor } from "../../../src/common/backgrounds";
import type { TextWeight } from "../../../src/common/textWeights";
import type { TextAlign } from "../../../src/common/textAlign";
import type { TextColor } from "../../../src/common/textColors";

/**
 * Heading 组件的基础属性接口（与框架无关）
 */
export interface IHeadingPropsBase {
	/**
	 * 文本对齐方式
	 * @default "left"
	 */
	align?: Exclude<TextAlign, "justify">;

	/**
	 * 是否显示锚点链接图标
	 * @default false
	 */
	anchor?: boolean;

	/**
	 * 背景色类型，支持所有预设背景色和透明度变体
	 */
	background?: BackgroundColor;

	/**
	 * 标题颜色
	 * @default "default"
	 */
	color?:
		| "default"
		| "primary"
		| "secondary"
		| "accent"
		| "muted"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "base-content"
		| "neutral-content";

	/**
	 * 自定义 CSS 类名
	 */
	class?: string;

	/**
	 * 是否为外部链接，影响链接的打开方式
	 * @default false
	 */
	external?: boolean;

	/**
	 * 链接地址，传入后标题会变成可点击的链接
	 */
	href?: string;

	/**
	 * 标题的 ID，用于锚点链接
	 */
	id?: string;

	/**
	 * 标题级别，对应 h1-h6 标签
	 * @default 2
	 */
	level?: 1 | 2 | 3 | 4 | 5 | 6;

	/**
	 * 上下外边距大小
	 * @default "md"
	 */
	margin?: "none" | "sm" | "md" | "lg" | "xl";

	/**
	 * 内边距大小（仅在设置背景色时生效）
	 * @default "none"
	 */
	padding?: "none" | "sm" | "md" | "lg" | "xl";

	/**
	 * 是否显示下划线
	 * @default false
	 */
	underline?: boolean;

	/**
	 * 字体粗细，不指定时根据标题级别使用默认粗细（h1: bold, h2-h3: semibold, h4-h6: medium）
	 */
	weight?: TextWeight;
}

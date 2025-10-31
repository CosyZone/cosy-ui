/**
 * TransformBuilder - 变换和过渡相关的类名构建
 *
 * 负责构建 transform、transition、translate、scale、rotate 等相关的类名
 */

// Transform 类名映射表
const transformMap = {
	"": "cosy:transform",
	gpu: "cosy:transform-gpu",
	none: "cosy:transform-none",
} as const;

// Transition 类名映射表
const transitionMap = {
	none: "cosy:transition-none",
	all: "cosy:transition-all",
	"": "cosy:transition",
	colors: "cosy:transition-colors",
	opacity: "cosy:transition-opacity",
	shadow: "cosy:transition-shadow",
	transform: "cosy:transition-transform",
} as const;

// Duration 类名映射表
const durationMap = {
	75: "cosy:duration-75",
	100: "cosy:duration-100",
	150: "cosy:duration-150",
	200: "cosy:duration-200",
	300: "cosy:duration-300",
	500: "cosy:duration-500",
	700: "cosy:duration-700",
	1000: "cosy:duration-1000",
} as const;

// Ease 类名映射表
const easeMap = {
	linear: "cosy:ease-linear",
	in: "cosy:ease-in",
	out: "cosy:ease-out",
	"in-out": "cosy:ease-in-out",
} as const;

// Translate X 类名映射表
const translateXMap = {
	0: "cosy:translate-x-0",
	1: "cosy:translate-x-1",
	2: "cosy:translate-x-2",
	3: "cosy:translate-x-3",
	4: "cosy:translate-x-4",
	6: "cosy:translate-x-6",
	8: "cosy:translate-x-8",
	12: "cosy:translate-x-12",
	16: "cosy:translate-x-16",
	full: "cosy:translate-x-full",
	"-full": "cosy:-translate-x-full",
	"1/2": "cosy:translate-x-1/2",
	"-1/2": "cosy:-translate-x-1/2",
} as const;

// Translate Y 类名映射表
const translateYMap = {
	0: "cosy:translate-y-0",
	1: "cosy:translate-y-1",
	2: "cosy:translate-y-2",
	3: "cosy:translate-y-3",
	4: "cosy:translate-y-4",
	6: "cosy:translate-y-6",
	8: "cosy:translate-y-8",
	12: "cosy:translate-y-12",
	16: "cosy:translate-y-16",
	full: "cosy:translate-y-full",
	"-full": "cosy:-translate-y-full",
	"1/2": "cosy:translate-y-1/2",
	"-1/2": "cosy:-translate-y-1/2",
} as const;

// 导出类型定义
export type TransformType = keyof typeof transformMap;
export type TransitionType = keyof typeof transitionMap;
export type DurationValue = keyof typeof durationMap;
export type EaseType = keyof typeof easeMap;
export type TranslateXValue = keyof typeof translateXMap;
export type TranslateYValue = keyof typeof translateYMap;

export class TransformBuilder {
	private classes: string[] = [];

	/**
	 * 设置 transform
	 * @param type transform 类型，不传参数则使用默认 transform
	 */
	transform(type?: TransformType): this {
		const typeKey = type ?? "";
		this.classes.push(transformMap[typeKey]);
		return this;
	}

	/**
	 * 设置 transition
	 * @param type transition 类型，不传参数则使用默认 transition
	 */
	transition(type?: TransitionType): this {
		const typeKey = type ?? "";
		this.classes.push(transitionMap[typeKey]);
		return this;
	}

	/**
	 * 设置 transition-all
	 */
	transitionAll(): this {
		this.classes.push(transitionMap.all);
		return this;
	}

	/**
	 * 设置动画持续时间
	 * @param value 持续时间值（毫秒）
	 */
	duration(value: DurationValue): this {
		this.classes.push(durationMap[value]);
		return this;
	}

	/**
	 * 设置缓动函数
	 * @param type 缓动类型
	 */
	ease(type: EaseType): this {
		this.classes.push(easeMap[type]);
		return this;
	}

	/**
	 * 设置 ease-in-out
	 */
	easeInOut(): this {
		this.classes.push(easeMap["in-out"]);
		return this;
	}

	/**
	 * 设置 X 轴平移
	 * @param value 平移值
	 */
	translateX(value: TranslateXValue): this {
		this.classes.push(translateXMap[value]);
		return this;
	}

	/**
	 * 设置 Y 轴平移
	 * @param value 平移值
	 */
	translateY(value: TranslateYValue): this {
		this.classes.push(translateYMap[value]);
		return this;
	}

	/**
	 * 获取构建的类名数组
	 */
	getClasses(): string[] {
		return this.classes;
	}

	/**
	 * 清空类名
	 */
	clear(): void {
		this.classes = [];
	}
}

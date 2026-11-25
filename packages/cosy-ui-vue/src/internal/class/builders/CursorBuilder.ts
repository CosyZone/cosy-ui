/**
 * CursorBuilder - 鼠标样式相关的类名构建
 *
 * 负责构建 cursor 相关的类名
 */

// Cursor 类名映射表
const cursorMap = {
	auto: "cosy:cursor-auto",
	default: "cosy:cursor-default",
	pointer: "cosy:cursor-pointer",
	wait: "cosy:cursor-wait",
	text: "cosy:cursor-text",
	move: "cosy:cursor-move",
	"not-allowed": "cosy:cursor-not-allowed",
	"zoom-in": "cosy:cursor-zoom-in",
	"zoom-out": "cosy:cursor-zoom-out",
	grab: "cosy:cursor-grab",
	grabbing: "cosy:cursor-grabbing",
} as const;

// 导出类型定义
export type CursorType = keyof typeof cursorMap;

export class CursorBuilder {
	private classes: string[] = [];

	/**
	 * 设置鼠标样式
	 * @param type 鼠标样式类型
	 */
	cursor(type: CursorType): this {
		this.classes.push(cursorMap[type]);
		return this;
	}

	/**
	 * 设置鼠标样式为指针
	 */
	cursorPointer(): this {
		this.classes.push(cursorMap.pointer);
		return this;
	}

	/**
	 * 设置鼠标样式为放大镜
	 */
	cursorZoomIn(): this {
		this.classes.push(cursorMap["zoom-in"]);
		return this;
	}

	/**
	 * 设置鼠标样式为抓取
	 */
	cursorGrab(): this {
		this.classes.push(cursorMap.grab);
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

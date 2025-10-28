/**
 * PositionBuilder - 定位相关的类名构建
 *
 * 负责构建定位、对齐等相关的类名
 */
export class PositionBuilder {
	private classes: string[] = [];

	/**
	 * 设置 margin-left: auto（常用于右对齐）
	 */
	auto(): this {
		this.classes.push("cosy:ml-auto");
		return this;
	}

	/**
	 * 设置 margin-right: auto（常用于左对齐）
	 */
	autoRight(): this {
		this.classes.push("cosy:mr-auto");
		return this;
	}

	/**
	 * 设置 margin: auto（常用于居中）
	 */
	autoCenter(): this {
		this.classes.push("cosy:mx-auto");
		return this;
	}

	/**
	 * 设置相对定位
	 */
	relative(): this {
		this.classes.push("cosy:relative");
		return this;
	}

	/**
	 * 设置绝对定位
	 */
	absolute(): this {
		this.classes.push("cosy:absolute");
		return this;
	}

	/**
	 * 设置固定定位
	 */
	fixed(): this {
		this.classes.push("cosy:fixed");
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

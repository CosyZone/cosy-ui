/**
 * PropsBuilder - 通用的 Props 构建器基类
 *
 * 提供链式调用的方式来构建组件 props，使组件使用更加优雅和类型安全。
 *
 * @example
 * ```typescript
 * class MyComponentPropsBuilder extends PropsBuilder<IMyComponentProps> {
 *   primary(): this {
 *     return this.set('variant', 'primary');
 *   }
 *
 *   size(value: 'sm' | 'md' | 'lg'): this {
 *     return this.set('size', value);
 *   }
 * }
 *
 * const props = new MyComponentPropsBuilder()
 *   .primary()
 *   .size('lg')
 *   .build();
 * ```
 */
export class PropsBuilder<T extends Record<string, any>> {
	private props: Partial<T> = {};

	/**
	 * 设置单个属性值
	 * @param key 属性键
	 * @param value 属性值
	 * @returns this 支持链式调用
	 */
	protected set<K extends keyof T>(key: K, value: T[K]): this {
		this.props[key] = value;
		return this;
	}

	/**
	 * 合并多个属性
	 * @param props 要合并的属性对象
	 * @returns this 支持链式调用
	 */
	merge(props: Partial<T>): this {
		Object.assign(this.props, props);
		return this;
	}

	/**
	 * 构建最终的 props 对象
	 * @returns 完整的 props 对象
	 */
	build(): Partial<T> {
		return { ...this.props };
	}
}

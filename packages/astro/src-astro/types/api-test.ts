export interface IApiEndpoint {
	/**
	 * API端点名称
	 */
	name: string;

	/**
	 * HTTP请求方法
	 */
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

	/**
	 * API端点路径
	 */
	path: string;

	/**
	 * API端点描述
	 */
	description?: string;

	/**
	 * 请求参数配置
	 */
	params?: IApiParam[];

	/**
	 * 快速测试配置
	 */
	quickTests?: IQuickTest[];
}

export interface IApiParam {
	/**
	 * 参数名称
	 */
	name: string;

	/**
	 * 参数占位符文本
	 */
	placeholder: string;

	/**
	 * 参数类型
	 * @default "text"
	 */
	type?: "text" | "number" | "select" | "textarea" | "checkbox" | "radio";

	/**
	 * 选择器选项（当type为select或radio时使用）
	 */
	options?: string[];

	/**
	 * 是否为必填参数
	 * @default false
	 */
	required?: boolean;

	/**
	 * 参数默认值
	 */
	defaultValue?: string | number | boolean;

	/**
	 * 参数验证规则
	 */
	validation?: {
		min?: number;
		max?: number;
		pattern?: string;
		message?: string;
	};
}

export interface IQuickTest {
	/**
	 * 快速测试标签
	 */
	label: string;

	/**
	 * 快速测试参数值
	 */
	values: Record<string, string | number | boolean>;

	/**
	 * 快速测试描述
	 */
	description?: string;
}

export interface IApiTesterProps {
	/**
	 * API端点配置列表
	 */
	endpoints: IApiEndpoint[];

	/**
	 * 组件标题
	 * @default "API 测试"
	 */
	title?: string;

	/**
	 * 组件描述
	 */
	description?: string;

	/**
	 * 是否显示请求头配置
	 * @default false
	 */
	showHeaders?: boolean;

	/**
	 * 默认请求头
	 */
	defaultHeaders?: Record<string, string>;

	/**
	 * 是否显示响应时间
	 * @default true
	 */
	showResponseTime?: boolean;

	/**
	 * 是否显示请求详情
	 * @default false
	 */
	showRequestDetails?: boolean;

	/**
	 * 自定义CSS类名
	 */
	class?: string;
}

/**
 * 错误页面组件的基础属性接口（与框架无关）
 */
export interface IErrorPropsBase {
	/**
	 * 调试信息键值对，用于开发和调试
	 */
	debugKVs?: Record<string, string>;
}

/**
 * Error403 组件的属性接口
 */
export interface IError403Props extends IErrorPropsBase {
	/**
	 * 登录页面URL，如果提供将显示登录按钮
	 */
	loginUrl?: string;

	/**
	 * 联系我们页面URL，如果提供将显示联系按钮
	 */
	contactUrl?: string;
}

/**
 * Error404 组件的属性接口
 */
export interface IError404Props extends IErrorPropsBase {}

/**
 * Error500 组件的属性接口
 */
export interface IError500Props extends IErrorPropsBase {
	/**
	 * 技术支持页面URL
	 */
	supportUrl?: string;

	/**
	 * 系统状态页面URL
	 */
	statusPageUrl?: string;
}

/**
 * Error503 组件的属性接口
 */
export interface IError503Props extends IErrorPropsBase {
	/**
	 * 是否为维护模式
	 * @default false
	 */
	maintenanceMode?: boolean;

	/**
	 * 预期恢复时间
	 */
	estimatedRecovery?: string;

	/**
	 * 系统状态页面URL
	 */
	statusPageUrl?: string;

	/**
	 * 通知订阅页面URL
	 */
	notificationUrl?: string;
}

/**
 * ErrorPage 组件的属性接口
 */
export interface IErrorPageProps {
	/**
	 * HTTP错误状态码 (404, 403, 500, 503 等)
	 */
	errorCode: number;

	/**
	 * 调试信息键值对
	 */
	debugKVs?: Record<string, string>;

	/**
	 * 登录页面URL (用于403错误)
	 */
	loginUrl?: string;

	/**
	 * 联系页面URL
	 */
	contactUrl?: string;

	/**
	 * 技术支持页面URL (用于500错误)
	 */
	supportUrl?: string;

	/**
	 * 系统状态页面URL (用于503错误)
	 */
	statusPageUrl?: string;

	/**
	 * 通知订阅页面URL (用于503错误)
	 */
	notificationUrl?: string;

	/**
	 * 是否为维护模式 (用于503错误)
	 * @default false
	 */
	maintenanceMode?: boolean;

	/**
	 * 预期恢复时间 (用于503错误)
	 */
	estimatedRecovery?: string;
}

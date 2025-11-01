/**
 * Login 组件的基础属性接口（与框架无关）
 */
export interface ILoginPropsBase {
	/**
	 * 登录页标题
	 * @default "登录"
	 */
	title?: string;

	/**
	 * 登录页副标题
	 */
	subtitle?: string;

	/**
	 * 登录页Logo图片路径
	 */
	logo?: string;

	/**
	 * 社交登录方式列表
	 */
	socialLogins?: ("github" | "google" | "wechat")[];

	/**
	 * 是否显示"记住我"选项
	 * @default false
	 */
	showRememberMe?: boolean;

	/**
	 * 是否显示"忘记密码"链接
	 * @default false
	 */
	showForgotPassword?: boolean;

	/**
	 * 自定义CSS类名
	 */
	customClass?: string;

	/**
	 * 登录按钮文本
	 * @default "登录"
	 */
	loginButtonText?: string;

	/**
	 * 用户名输入框标签
	 * @default "用户名"
	 */
	usernameLabel?: string;

	/**
	 * 密码输入框标签
	 * @default "密码"
	 */
	passwordLabel?: string;

	/**
	 * 忘记密码链接文本
	 * @default "忘记密码？"
	 */
	forgotPasswordText?: string;

	/**
	 * 记住我选项文本
	 * @default "记住我"
	 */
	rememberMeText?: string;

	/**
	 * 社交登录分隔符文本
	 * @default "或"
	 */
	dividerText?: string;
}

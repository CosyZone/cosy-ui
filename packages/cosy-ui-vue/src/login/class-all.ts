import type { ILoginPropsBase } from "./loginPropsBase";

/**
 * 获取 Login 的类名
 */
export function getLoginClasses(_props: ILoginPropsBase = {}) {
	const containerClass =
		"cosy:min-h-screen cosy:flex cosy:items-center cosy:justify-center cosy:bg-base-200 cosy:py-12 cosy:px-4 cosy:sm:px-6 cosy:lg:px-8";

	const cardClass =
		"cosy:max-w-md cosy:w-full cosy:space-y-8 cosy:bg-base-100 cosy:p-8 cosy:rounded-lg cosy:shadow-xl";

	const headerClass = "cosy:text-center";

	const logoClass = "cosy:mx-auto cosy:h-12 cosy:w-auto";

	const titleClass =
		"cosy:mt-6 cosy:text-3xl cosy:font-extrabold cosy:text-base-content";

	const subtitleClass = "cosy:mt-2 cosy:text-sm cosy:text-base-content/60";

	const formClass = "cosy:mt-8 cosy:space-y-6";

	const inputGroupClass =
		"cosy:rounded-md cosy:shadow-sm cosy:-space-y-px";

	const usernameInputClass =
		"cosy:appearance-none cosy:rounded-none cosy:rounded-t-md cosy:relative cosy:block cosy:w-full cosy:px-3 cosy:py-2 cosy:border cosy:border-base-300 cosy:placeholder-base-content/40 cosy:text-base-content cosy:focus:z-10 cosy:focus:border-primary cosy:focus:outline-none cosy:focus:ring-1 cosy:focus:ring-primary";

	const passwordInputClass =
		"cosy:appearance-none cosy:rounded-none cosy:rounded-b-md cosy:relative cosy:block cosy:w-full cosy:px-3 cosy:py-2 cosy:border cosy:border-base-300 cosy:placeholder-base-content/40 cosy:text-base-content cosy:focus:z-10 cosy:focus:border-primary cosy:focus:outline-none cosy:focus:ring-1 cosy:focus:ring-primary";

	const optionsClass =
		"cosy:flex cosy:items-center cosy:justify-between";

	const rememberMeClass = "cosy:flex cosy:items-center";

	const checkboxClass =
		"cosy:h-4 cosy:w-4 cosy:text-primary cosy:focus:ring-primary cosy:border cosy:border-base-300 cosy:rounded";

	const rememberMeLabelClass =
		"cosy:ml-2 cosy:block cosy:text-sm cosy:text-base-content";

	const forgotPasswordClass = "cosy:text-sm";

	const forgotPasswordLinkClass =
		"cosy:font-medium cosy:text-primary cosy:hover:text-primary";

	const submitButtonClass =
		"cosy:group cosy:relative cosy:w-full cosy:flex cosy:justify-center cosy:py-2 cosy:px-4 cosy:border cosy:border-transparent cosy:text-sm cosy:font-medium cosy:rounded-md cosy:text-white cosy:bg-primary cosy:focus:outline-none cosy:focus:ring-2 cosy:focus:ring-offset-2 cosy:focus:ring-primary";

	const socialSectionClass = "cosy:mt-6";

	const dividerClass = "cosy:relative";

	const dividerLineClass =
		"cosy:absolute cosy:inset-0 cosy:flex cosy:items-center";

	const dividerBorderClass =
		"cosy:w-full cosy:border-t cosy:border cosy:border-base-300";

	const dividerTextContainerClass =
		"cosy:relative cosy:flex cosy:justify-center cosy:text-sm";

	const dividerTextClass =
		"cosy:px-2 cosy:bg-base-100 cosy:text-base-content/60";

	const socialButtonsClass = "cosy:mt-6 cosy:grid cosy:gap-3";

	return {
		container: containerClass,
		card: cardClass,
		header: headerClass,
		logo: logoClass,
		title: titleClass,
		subtitle: subtitleClass,
		form: formClass,
		inputGroup: inputGroupClass,
		usernameInput: usernameInputClass,
		passwordInput: passwordInputClass,
		options: optionsClass,
		rememberMe: rememberMeClass,
		checkbox: checkboxClass,
		rememberMeLabel: rememberMeLabelClass,
		forgotPassword: forgotPasswordClass,
		forgotPasswordLink: forgotPasswordLinkClass,
		submitButton: submitButtonClass,
		socialSection: socialSectionClass,
		divider: dividerClass,
		dividerLine: dividerLineClass,
		dividerBorder: dividerBorderClass,
		dividerTextContainer: dividerTextContainerClass,
		dividerText: dividerTextClass,
		socialButtons: socialButtonsClass,
	};
}

/**
 * 获取社交登录按钮样式
 */
export function getSocialButtonClass(
	provider: "github" | "google" | "wechat",
): string {
	const baseClass =
		"cosy:w-full cosy:inline-flex cosy:justify-center cosy:py-2 cosy:px-4 cosy:rounded-md cosy:shadow-sm cosy:text-sm cosy:font-medium cosy:text-white";

	const providerClasses: Record<"github" | "google" | "wechat", string> = {
		github: "cosy:bg-gray-800 cosy:hover:bg-gray-900",
		google: "cosy:bg-red-500 cosy:hover:bg-red-600",
		wechat: "cosy:bg-green-500 cosy:hover:bg-green-600",
	};

	return `${baseClass} ${providerClasses[provider]}`;
}
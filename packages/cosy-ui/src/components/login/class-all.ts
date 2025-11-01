import { cn } from "../../class/classBuilder";
import type { ILoginPropsBase } from "./loginPropsBase";

/**
 * 获取 Login 的类名
 */
export function getLoginClasses(_props: ILoginPropsBase = {}) {
	const containerClass = cn()
		.add("cosy:min-h-screen")
		.flex()
		.items("center")
		.justify("center")
		.bg("base-200")
		.py(12)
		.px(4)
		.add("cosy:sm:px-6 cosy:lg:px-8")
		.build();

	const cardClass = cn()
		.add("cosy:max-w-md")
		.w("full")
		.spaceY(8)
		.bg("base-100")
		.p(8)
		.rounded("lg")
		.add("cosy:shadow-xl")
		.build();

	const headerClass = cn().align("center").build();

	const logoClass = cn().mx("auto").h(12).add("cosy:w-auto").build();

	const titleClass = cn()
		.mt(6)
		.text("3xl")
		.weight("extrabold")
		.add("cosy:text-base-content")
		.build();

	const subtitleClass = cn()
		.mt(2)
		.text("sm")
		.add("cosy:text-base-content/60")
		.build();

	const formClass = cn().mt(8).spaceY(6).build();

	const inputGroupClass = cn()
		.rounded("md")
		.add("cosy:shadow-sm cosy:-space-y-px")
		.build();

	const usernameInputClass = cn()
		.add(
			"cosy:appearance-none cosy:rounded-none cosy:rounded-t-md cosy:relative cosy:block cosy:w-full",
		)
		.px(3)
		.py(2)
		.border()
		.borderColor("base-300")
		.add(
			"cosy:placeholder-base-content/40 cosy:text-base-content focus:cosy:z-10 focus:cosy:border-primary focus:cosy:outline-none focus:cosy:ring-1 focus:cosy:ring-primary",
		)
		.build();

	const passwordInputClass = cn()
		.add(
			"cosy:appearance-none cosy:rounded-none cosy:rounded-b-md cosy:relative cosy:block cosy:w-full",
		)
		.px(3)
		.py(2)
		.border()
		.borderColor("base-300")
		.add(
			"cosy:placeholder-base-content/40 cosy:text-base-content focus:cosy:z-10 focus:cosy:border-primary focus:cosy:outline-none focus:cosy:ring-1 focus:cosy:ring-primary",
		)
		.build();

	const optionsClass = cn().flex().items("center").justify("between").build();

	const rememberMeClass = cn().flex().items("center").build();

	const checkboxClass = cn()
		.h(4)
		.w(4)
		.color("primary")
		.add("cosy:focus:ring-primary")
		.border()
		.borderColor("base-300")
		.rounded()
		.build();

	const rememberMeLabelClass = cn()
		.ml(2)
		.block()
		.text("sm")
		.add("cosy:text-base-content")
		.build();

	const forgotPasswordClass = cn().text("sm").build();

	const forgotPasswordLinkClass = cn()
		.weight("medium")
		.color("primary")
		.add("cosy:hover:text-primary-focus")
		.build();

	const submitButtonClass = cn()
		.add("cosy:group cosy:relative cosy:w-full")
		.flex()
		.justify("center")
		.py(2)
		.px(4)
		.border()
		.borderColor("transparent")
		.text("sm")
		.weight("medium")
		.rounded("md")
		.add("cosy:text-white")
		.bg("primary")
		.add(
			"cosy:hover:bg-primary-focus focus:cosy:outline-none focus:cosy:ring-2 focus:cosy:ring-offset-2 focus:cosy:ring-primary",
		)
		.build();

	const socialSectionClass = cn().mt(6).build();

	const dividerClass = cn().relative().build();

	const dividerLineClass = cn()
		.add("cosy:absolute cosy:inset-0")
		.flex()
		.items("center")
		.build();

	const dividerBorderClass = cn()
		.w("full")
		.add("cosy:border-t")
		.border()
		.borderColor("base-300")
		.build();

	const dividerTextContainerClass = cn()
		.relative()
		.flex()
		.justify("center")
		.text("sm")
		.build();

	const dividerTextClass = cn()
		.px(2)
		.bg("base-100")
		.add("cosy:text-base-content/60")
		.build();

	const socialButtonsClass = cn().mt(6).add("cosy:grid cosy:gap-3").build();

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
	const baseClass = cn()
		.w("full")
		.add("cosy:inline-flex")
		.justify("center")
		.py(2)
		.px(4)
		.rounded("md")
		.add("cosy:shadow-sm")
		.text("sm")
		.weight("medium")
		.add("cosy:text-white")
		.build();

	const providerClasses: Record<"github" | "google" | "wechat", string> = {
		github: "cosy:bg-gray-800 cosy:hover:bg-gray-900",
		google: "cosy:bg-red-500 cosy:hover:bg-red-600",
		wechat: "cosy:bg-green-500 cosy:hover:bg-green-600",
	};

	return `${baseClass} ${providerClasses[provider]}`;
}

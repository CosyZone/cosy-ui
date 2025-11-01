import { cn } from "../../class/classBuilder";
import type {
	IError403Props,
	IError404Props,
	IError500Props,
	IError503Props,
} from "./errorPropsBase";

/**
 * 错误代码颜色类型
 */
type ErrorCodeColor = "primary" | "warning" | "error" | "info";

/**
 * 获取错误页面的共用类名
 */
export function getErrorPageClasses(color: ErrorCodeColor = "primary"): {
	container: string;
	content: string;
	errorCodeContainer: string;
	errorCodeTitle: string;
	errorCodeLine: string;
	errorMessageContainer: string;
	errorMessageTitle: string;
	errorMessageText: string;
	pathInfo: string;
	debugInfo: string;
	debugInfoSummary: string;
	debugInfoContent: string;
	debugInfoItem: string;
	debugInfoKey: string;
	debugInfoValue: string;
	actions: string;
	helpText: string;
} {
	const container = cn()
		.add("cosy:min-h-screen")
		.flex("col")
		.items("center")
		.justify("center")
		.bg("base-100")
		.p(4)
		.build();

	const content = cn()
		.add("cosy:max-w-md")
		.w("full")
		.align("center")
		.spaceY(6)
		.build();

	const errorCodeContainer = cn().mb(8).build();

	const errorCodeTitle = cn()
		.add("cosy:text-9xl")
		.bold()
		.color(color)
		.leading("none")
		.build();

	const errorCodeLine = cn()
		.w(24)
		.h(1)
		.bg(color)
		.mx("auto")
		.mt(4)
		.rounded("full")
		.build();

	const errorMessageContainer = cn().spaceY(4).build();

	const errorMessageTitle = cn()
		.text("2xl")
		.weight("semibold")
		.add("cosy:text-base-content")
		.build();

	const errorMessageText = cn()
		.add("cosy:text-base-content/70")
		.text("lg")
		.build();

	const pathInfo = cn()
		.bg("base-200")
		.rounded("lg")
		.p(4)
		.text("sm")
		.add("cosy:text-base-content/60")
		.build();

	const debugInfo = cn()
		.bg("base-200")
		.rounded("lg")
		.p(4)
		.align("left")
		.build();

	const debugInfoSummary = cn()
		.cursor("pointer")
		.weight("medium")
		.add("cosy:text-base-content")
		.build();

	const debugInfoContent = cn().mt(3).spaceY(2).build();

	const debugInfoItem = cn().text("sm").build();

	const debugInfoKey = cn()
		.weight("medium")
		.add("cosy:text-base-content")
		.build();

	const debugInfoValue = cn().add("cosy:text-base-content/70").ml(2).build();

	const actions = cn().spaceY(3).build();

	const helpText = cn()
		.text("sm")
		.add("cosy:text-base-content/50")
		.mt(8)
		.build();

	return {
		container,
		content,
		errorCodeContainer,
		errorCodeTitle,
		errorCodeLine,
		errorMessageContainer,
		errorMessageTitle,
		errorMessageText,
		pathInfo,
		debugInfo,
		debugInfoSummary,
		debugInfoContent,
		debugInfoItem,
		debugInfoKey,
		debugInfoValue,
		actions,
		helpText,
	};
}

/**
 * 获取 Error403 的类名
 */
export function getError403Classes(_props: IError403Props = {}) {
	return getErrorPageClasses("warning");
}

/**
 * 获取 Error404 的类名
 */
export function getError404Classes(_props: IError404Props = {}) {
	return getErrorPageClasses("primary");
}

/**
 * 获取 Error500 的类名
 */
export function getError500Classes(_props: IError500Props = {}) {
	const baseClasses = getErrorPageClasses("error");

	const suggestion = cn()
		.add("cosy:bg-info/10 cosy:border cosy:border-info/20")
		.rounded("lg")
		.p(4)
		.build();

	const suggestionTitle = cn()
		.weight("medium")
		.add("cosy:text-base-content")
		.mb(2)
		.build();

	const suggestionList = cn()
		.text("sm")
		.add("cosy:text-base-content/70")
		.spaceY(1)
		.align("left")
		.build();

	return {
		...baseClasses,
		suggestion,
		suggestionTitle,
		suggestionList,
	};
}

/**
 * 获取 Error503 的类名
 */
export function getError503Classes(_props: IError503Props = {}) {
	const baseClasses = getErrorPageClasses("info");

	const recoveryTime = cn()
		.add("cosy:bg-success/10 cosy:border cosy:border-success/20")
		.rounded("lg")
		.p(4)
		.build();

	const recoveryTimeTitle = cn()
		.weight("medium")
		.add("cosy:text-base-content")
		.mb(1)
		.build();

	const recoveryTimeText = cn().color("success").add("cosy:font-mono").build();

	const suggestion = cn()
		.add("cosy:bg-warning/10 cosy:border cosy:border-warning/20")
		.rounded("lg")
		.p(4)
		.build();

	const suggestionTitle = cn()
		.weight("medium")
		.add("cosy:text-base-content")
		.mb(2)
		.build();

	const suggestionList = cn()
		.text("sm")
		.add("cosy:text-base-content/70")
		.spaceY(1)
		.align("left")
		.build();

	return {
		...baseClasses,
		recoveryTime,
		recoveryTimeTitle,
		recoveryTimeText,
		suggestion,
		suggestionTitle,
		suggestionList,
	};
}

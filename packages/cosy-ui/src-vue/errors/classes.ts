/** Local styling contracts for the Vue error pages. */
type ErrorCodeColor = "primary" | "warning" | "error" | "info";

function getErrorPageClasses(color: ErrorCodeColor = "primary") {
	return {
		container: "cosy:min-h-screen cosy:flex cosy:flex-col cosy:items-center cosy:justify-center cosy:bg-base-100 cosy:p-4",
		content: "cosy:max-w-md cosy:w-full cosy:text-center cosy:space-y-6",
		errorCodeContainer: "cosy:mb-8",
		errorCodeTitle: `cosy:text-9xl cosy:font-bold cosy:text-${color} cosy:leading-none`,
		errorCodeLine: `cosy:w-24 cosy:h-1 cosy:bg-${color} cosy:mx-auto cosy:mt-4 cosy:rounded-full`,
		errorMessageContainer: "cosy:space-y-4",
		errorMessageTitle: "cosy:text-2xl cosy:font-semibold cosy:text-base-content",
		errorMessageText: "cosy:text-lg cosy:text-base-content/70",
		pathInfo: "cosy:bg-base-200 cosy:rounded-lg cosy:p-4 cosy:text-sm cosy:text-base-content/60",
		debugInfo: "cosy:bg-base-200 cosy:rounded-lg cosy:p-4 cosy:text-left",
		debugInfoSummary: "cosy:cursor-pointer cosy:font-medium cosy:text-base-content",
		debugInfoContent: "cosy:mt-3 cosy:space-y-2",
		debugInfoItem: "cosy:text-sm",
		debugInfoKey: "cosy:font-medium cosy:text-base-content",
		debugInfoValue: "cosy:text-base-content/70 cosy:ml-2",
		actions: "cosy:space-y-3",
		helpText: "cosy:text-sm cosy:text-base-content/50 cosy:mt-8",
	};
}

function getError403Classes() {
	return getErrorPageClasses("warning");
}

function getError404Classes() {
	return getErrorPageClasses("primary");
}

function getError500Classes() {
	return {
		...getErrorPageClasses("error"),
		suggestion: "cosy:bg-info/10 cosy:border cosy:border-info/20 cosy:rounded-lg cosy:p-4",
		suggestionTitle: "cosy:font-medium cosy:text-base-content cosy:mb-2",
		suggestionList: "cosy:text-sm cosy:text-base-content/70 cosy:space-y-1 cosy:text-left",
	};
}

function getError503Classes() {
	return {
		...getErrorPageClasses("info"),
		recoveryTime: "cosy:bg-success/10 cosy:border cosy:border-success/20 cosy:rounded-lg cosy:p-4",
		recoveryTimeTitle: "cosy:font-medium cosy:text-base-content cosy:mb-1",
		recoveryTimeText: "cosy:text-success cosy:font-mono",
		suggestion: "cosy:bg-warning/10 cosy:border cosy:border-warning/20 cosy:rounded-lg cosy:p-4",
		suggestionTitle: "cosy:font-medium cosy:text-base-content cosy:mb-2",
		suggestionList: "cosy:text-sm cosy:text-base-content/70 cosy:space-y-1 cosy:text-left",
	};
}

export const ErrorPageFacade = {
	getError403Classes,
	getError404Classes,
	getError500Classes,
	getError503Classes,
} as const;

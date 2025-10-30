import { validatePaddingConflict } from "./validate-padding";
import { validateSizing } from "./validate-sizing";

/**
 * 校验 Container 组件配置
 * @param props - Container 组件的原始属性
 * @returns 所有校验失败的错误消息数组
 */
export function validateContainer(props: Record<string, unknown>): string[] {
	const messages: string[] = [];

	// 1. 内边距校验
	const paddingResult = validatePaddingConflict(
		props.px as string,
		props.pl as string,
		props.pr as string,
		props.py as string,
		props.pt as string,
		props.pb as string,
	);

	if (paddingResult.hasConflict) {
		messages.push(paddingResult.message!);
	}

	// 2. 尺寸相关校验
	messages.push(...validateSizing(props));

	return messages;
}

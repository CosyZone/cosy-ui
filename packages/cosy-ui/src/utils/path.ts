import { cosyLogger } from "../../src-astro/cosy";

/**
 * 判断当前路径是否匹配目标路径
 * @param currentPath 当前路径
 * @param targetPath 目标路径
 * @returns 是否匹配
 */
export function isPathMatch(currentPath: string, targetPath: string): boolean {
	const debug = false;

	if (debug) {
		cosyLogger.info(`判断 ${currentPath} 是否匹配 ${targetPath}`);
	}

	// 如果完全匹配，直接返回
	if (currentPath === targetPath) {
		if (debug) {
			cosyLogger.info(`${currentPath} 完全匹配 ${targetPath}`);
		}
		return true;
	}

	// 标准化路径，移除最后的斜杠
	const normalizedCurrentPath = currentPath.endsWith("/")
		? currentPath.slice(0, -1)
		: currentPath;

	const normalizedTargetPath = targetPath.endsWith("/")
		? targetPath.slice(0, -1)
		: targetPath;

	// 直接比较完整路径
	if (normalizedCurrentPath === normalizedTargetPath) {
		return true;
	}

	// 检查当前路径是否以目标路径开头（前缀匹配）
	// 例如：当前路径 /zh-cn/manuals/components/alert 应该匹配目标路径 /zh-cn/manuals/components
	if (normalizedCurrentPath.startsWith(`${normalizedTargetPath}/`)) {
		if (debug) {
			cosyLogger.info(`${currentPath} 以 ${targetPath} 开头（前缀匹配）`);
		}
		return true;
	}

	// 提取路径段进行比较
	const currentPathSegments = normalizedCurrentPath.split("/").filter(Boolean);
	const targetPathSegments = normalizedTargetPath.split("/").filter(Boolean);

	// 如果目标路径长度大于当前路径，不可能匹配
	if (targetPathSegments.length > currentPathSegments.length) {
		return false;
	}

	// 从前往后比较路径段（前缀匹配）
	for (let i = 0; i < targetPathSegments.length; i++) {
		if (currentPathSegments[i] !== targetPathSegments[i]) {
			return false;
		}
	}

	return true;
}

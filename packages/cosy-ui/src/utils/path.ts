import { cosyLogger } from '../../src-astro/cosy';

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
  const normalizedCurrentPath = currentPath.endsWith('/')
    ? currentPath.slice(0, -1)
    : currentPath;

  const normalizedTargetPath = targetPath.endsWith('/')
    ? targetPath.slice(0, -1)
    : targetPath;

  // 直接比较完整路径
  if (normalizedCurrentPath === normalizedTargetPath) {
    return true;
  }

  // 提取不带基础路径的部分进行比较
  // 例如把 /cosy-ui/zh-cn/components/button 中提取 /zh-cn/components/button
  const currentPathSegments = normalizedCurrentPath.split('/').filter(Boolean);
  const targetPathSegments = normalizedTargetPath.split('/').filter(Boolean);

  // 如果目标路径长度大于当前路径，不可能匹配
  if (targetPathSegments.length > currentPathSegments.length) {
    return false;
  }

  // 从后向前比较路径段
  for (let i = 1; i <= targetPathSegments.length; i++) {
    if (
      currentPathSegments[currentPathSegments.length - i] !==
      targetPathSegments[targetPathSegments.length - i]
    ) {
      return false;
    }
  }

  return true;
}

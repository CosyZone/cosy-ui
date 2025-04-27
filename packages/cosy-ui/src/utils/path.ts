/**
 * 判断当前路径是否匹配目标路径
 * @param currentPath 当前路径
 * @param targetPath 目标路径
 * @returns 是否匹配
 */
export function isPathMatch(currentPath: string, targetPath: string): boolean {
    return currentPath === targetPath ||
        currentPath.endsWith(targetPath) ||
        currentPath + "/" === targetPath ||
        ("/" + currentPath).endsWith(targetPath);
} 
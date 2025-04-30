/**
 * 判断提供的URL是否是GitHub仓库
 * @param url 需要判断的URL
 * @returns 是否是GitHub仓库
 */
export function isGitHubRepo(url: string): boolean {
    return url.includes('github.com');
}

/**
 * 判断提供的URL是否是GitLab仓库
 * @param url 需要判断的URL
 * @returns 是否是GitLab仓库
 */
export function isGitLabRepo(url: string): boolean {
    return url.includes('gitlab.com');
}

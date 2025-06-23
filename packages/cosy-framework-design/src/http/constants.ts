/**
 * HTTP 方法枚举
 */
export const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS'
} as const;

export type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];

/**
 * Cookie SameSite 选项
 */
export const SameSite = {
    Strict: 'Strict',
    Lax: 'Lax',
    None: 'None'
} as const;

export type SameSite = typeof SameSite[keyof typeof SameSite];

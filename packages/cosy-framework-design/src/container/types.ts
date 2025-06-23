/**
 * 服务标识符类型
 */
export type ServiceToken = string | symbol | Constructor;

/**
 * 构造函数类型
 */
export type Constructor<T = any> = new (...args: any[]) => T;
import { IContainer } from './interfaces';

/**
 * 服务标识符类型
 */
export type ServiceIdentifier = string | symbol | Constructor<any>;

/**
 * 构造函数类型
 */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 * 工厂函数类型
 */
export type Factory<T = any> = (container: any) => T;

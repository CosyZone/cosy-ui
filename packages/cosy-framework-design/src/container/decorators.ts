import { ServiceScope } from './constants';
import { ServiceIdentifier } from './types';

/**
 * Injectable 装饰器选项
 */
export interface IInjectableOptions {
    /**
     * 服务作用域
     */
    scope?: ServiceScope;
}

/**
 * Injectable 装饰器类型
 */
export type InjectableDecorator = (options?: IInjectableOptions) => ClassDecorator;

/**
 * Inject 装饰器选项
 */
export interface IInjectOptions {
    /**
     * 服务标识符
     */
    id?: ServiceIdentifier;
}

/**
 * Inject 装饰器类型
 */
export type InjectDecorator = (options?: IInjectOptions) => ParameterDecorator;

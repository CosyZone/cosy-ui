import { LifecycleEnum } from "./constants";
import { ServiceToken } from "./types";

/**
 * 服务注入选项
 */
export interface IInjectableOptions {
    /**
     * 服务生命周期
     */
    lifecycle?: LifecycleEnum;
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
    token?: ServiceToken;
}

/**
 * 参数注入装饰器类型
 */
export type InjectDecorator = (options?: IInjectOptions) => ParameterDecorator;
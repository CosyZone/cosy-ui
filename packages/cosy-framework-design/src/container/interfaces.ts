import { LifecycleEnum } from './constants';
import { ServiceToken, Constructor } from './types';

/**
 * 服务容器接口
 * @interface IContainer
 */
export interface IContainer {
    /**
     * 注册服务
     * @param token 服务标识符
     * @param provider 服务提供者
     */
    register(token: ServiceToken, provider: IServiceProvider): void;

    /**
     * 解析服务
     * @param token 服务标识符
     */
    resolve<T>(token: ServiceToken): T;
}

/**
 * 服务提供者配置
 */
export interface IServiceProvider<T = any> {
    /**
     * 使用类作为提供者
     */
    useClass?: Constructor<T>;

    /**
     * 使用工厂函数作为提供者
     */
    useFactory?: (...args: any[]) => T;

    /**
     * 使用值作为提供者
     */
    useValue?: T;

    /**
     * 服务生命周期
     */
    lifecycle?: LifecycleEnum;
}

/**
 * 依赖项元数据
 */
export interface IDependencyMetadata {
    /**
     * 参数索引
     */
    index: number;

    /**
     * 服务标识符
     */
    token: ServiceToken;
}

/**
 * 服务元数据
 */
export interface IServiceMetadata {
    /**
     * 生命周期
     */
    lifecycle: LifecycleEnum;

    /**
     * 依赖项列表
     */
    dependencies: IDependencyMetadata[];
}
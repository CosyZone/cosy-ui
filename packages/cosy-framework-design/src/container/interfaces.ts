import { ServiceIdentifier, Constructor, Factory } from './types';
import { ServiceScope } from './constants';

/**
 * 服务容器接口
 */
export interface IContainer {
    /**
     * 注册服务
     * @param id 服务标识符
     * @param provider 服务提供者
     */
    register(id: ServiceIdentifier, provider: IServiceProvider): void;

    /**
     * 解析服务
     * @param id 服务标识符
     */
    resolve<T>(id: ServiceIdentifier): T;

    /**
     * 检查服务是否已注册
     * @param id 服务标识符
     */
    has(id: ServiceIdentifier): boolean;
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
    useFactory?: Factory<T>;

    /**
     * 使用值作为提供者
     */
    useValue?: T;

    /**
     * 服务作用域
     */
    scope?: ServiceScope;
}

/**
 * 服务依赖项
 */
export interface IServiceDependency {
    /**
     * 参数索引
     */
    index: number;

    /**
     * 服务标识符
     */
    id: ServiceIdentifier;
}
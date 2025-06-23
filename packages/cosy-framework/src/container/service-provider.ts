import { ServiceProvider, Container } from '../types'

export abstract class BaseServiceProvider implements ServiceProvider {
    /**
     * 注册服务到容器
     */
    abstract register(container: Container): void

    /**
     * 启动服务（可选）
     */
    boot?(container: Container): void
} 

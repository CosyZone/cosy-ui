import { ServiceContainer } from './service-container'

// 默认容器实例
export const container = new ServiceContainer()

// 导出 ServiceContainer 类
export { ServiceContainer }

// 导出装饰器
export { Injectable, Inject, AutoInject } from './decorators'

// 导出服务提供者
export { BaseServiceProvider } from './service-provider'

// 导出类型和常量
export type { Container, ServiceBinding, Constructor, ServiceProvider } from '../types'
export { INJECTABLE_TOKEN, INJECT_TOKEN, DEPENDENCIES_TOKEN } from '../types'

// 容器模块 - 稍后实现
export const CONTAINER_MODULE = 'container' 

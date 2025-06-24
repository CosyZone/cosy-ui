export * from './types'
export * from './decorators'
export * from './container'
export * from './provider'

// 默认容器实例
import { ServiceContainer } from './container'
export const container = new ServiceContainer() 

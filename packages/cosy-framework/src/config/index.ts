// 配置模块 - 稍后实现
export const CONFIG_MODULE = 'config'

// 核心类
export { Configuration } from './manager'
export { Environment } from './environment'

// 配置源
export {
    EnvironmentSource,
    JsonFileSource,
    ObjectSource,
    MultiSource
} from './sources'

// 验证器
export {
    DefaultConfigValidator,
    required,
    optional,
    string,
    number,
    boolean,
    array,
    object
} from './validator'

// 类型
export type {
    ConfigManager,
    ConfigSource,
    ConfigValidator,
    ConfigRule,
    ConfigValidationResult,
    EnvironmentConfig
} from '../types' 

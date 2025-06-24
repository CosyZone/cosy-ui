import { ApplicationFactory } from '../factory'
import { ApplicationConfig } from '../types'
import { ApplicationDependencies } from '../application'
import { CliApplication } from './application'

/**
 * 命令行应用程序工厂类
 */
export class CliApplicationFactory extends ApplicationFactory {
    /**
     * 创建命令行应用程序
     * 
     * @example
     * ```typescript
     * const app = CliApplicationFactory.create({
     *   name: 'My CLI App'
     * });
     * 
     * app.registerCommand(new MyCommand());
     * app.start();
     * ```
     * 
     * @param config 应用程序配置
     * @param customDependencies 自定义依赖
     * @returns CLI Application 实例
     */
    static createCliApp(
        config: ApplicationConfig = {},
        customDependencies: Partial<ApplicationDependencies> = {}
    ): CliApplication {
        // 合并默认依赖和自定义依赖
        const dependencies = {
            ...ApplicationFactory.createDefaultDependencies(),
            ...customDependencies
        }

        return new CliApplication({
            ...config,
            name: config.name || 'CLI Application'
        }, dependencies)
    }
} 

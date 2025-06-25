import { ConfigSource } from './types.js'
import { readFile } from 'fs/promises'
import { existsSync, watch } from 'fs'

/**
 * 环境变量配置源
 */
export class EnvironmentSource implements ConfigSource {
    name = 'environment'
    private prefix: string

    constructor(prefix = '') {
        this.prefix = prefix
    }

    async load(): Promise<Record<string, any>> {
        const config: Record<string, any> = {}

        for (const [key, value] of Object.entries(process.env)) {
            if (this.prefix && !key.startsWith(this.prefix)) {
                continue
            }

            const configKey = this.prefix
                ? key.substring(this.prefix.length).toLowerCase()
                : key.toLowerCase()

            // 转换环境变量值
            config[configKey] = this.transformValue(value || '')
        }

        return config
    }

    private transformValue(value: string): any {
        // 尝试解析为 JSON
        if (value.startsWith('{') || value.startsWith('[')) {
            try {
                return JSON.parse(value)
            } catch {
                return value
            }
        }

        // 布尔值
        if (value.toLowerCase() === 'true') return true
        if (value.toLowerCase() === 'false') return false

        // 数字
        if (/^\d+$/.test(value)) return parseInt(value, 10)
        if (/^\d+\.\d+$/.test(value)) return parseFloat(value)

        return value
    }
}

/**
 * JSON 文件配置源
 */
export class JsonFileSource implements ConfigSource {
    name: string
    private filePath: string

    constructor(filePath: string) {
        this.filePath = filePath
        this.name = `json:${filePath}`
    }

    async load(): Promise<Record<string, any>> {
        if (!existsSync(this.filePath)) {
            return {}
        }

        const content = await readFile(this.filePath, 'utf-8')
        return JSON.parse(content)
    }

    watch(callback: (config: Record<string, any>) => void): void {
        watch(this.filePath, async () => {
            try {
                const config = await this.load()
                callback(config)
            } catch (error) {
                console.error(`Error watching ${this.filePath}:`, error)
            }
        })
    }
}

/**
 * 对象配置源
 */
export class ObjectSource implements ConfigSource {
    name = 'object'
    private config: Record<string, any>

    constructor(config: Record<string, any>) {
        this.config = config
    }

    async load(): Promise<Record<string, any>> {
        return { ...this.config }
    }
}

/**
 * 多配置源
 */
export class MultiSource implements ConfigSource {
    name = 'multi'
    private sources: ConfigSource[]

    constructor(sources: ConfigSource[]) {
        this.sources = sources
    }

    async load(): Promise<Record<string, any>> {
        const config: Record<string, any> = {}

        for (const source of this.sources) {
            const sourceConfig = await source.load()
            Object.assign(config, sourceConfig)
        }

        return config
    }

    watch(callback: (config: Record<string, any>) => void): void {
        for (const source of this.sources) {
            if (source.watch) {
                source.watch(callback)
            }
        }
    }
} 

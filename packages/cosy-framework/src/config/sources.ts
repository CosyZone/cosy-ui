import { ConfigSource } from '../types'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { watch } from 'fs'

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
    private watchCallback?: (config: Record<string, any>) => void

    constructor(filePath: string) {
        this.filePath = filePath
        this.name = `json:${filePath}`
    }

    async load(): Promise<Record<string, any>> {
        if (!existsSync(this.filePath)) {
            throw new Error(`Config file not found: ${this.filePath}`)
        }

        try {
            const content = await readFile(this.filePath, 'utf-8')
            return JSON.parse(content)
        } catch (error) {
            throw new Error(`Failed to parse JSON config: ${(error as Error).message}`)
        }
    }

    watch(callback: (config: Record<string, any>) => void): void {
        this.watchCallback = callback

        watch(this.filePath, async (eventType) => {
            if (eventType === 'change') {
                try {
                    const config = await this.load()
                    callback(config)
                } catch (error) {
                    console.error('Failed to reload config:', error)
                }
            }
        })
    }
}

/**
 * 对象配置源
 */
export class ObjectSource implements ConfigSource {
    name: string
    private config: Record<string, any>

    constructor(config: Record<string, any>, name = 'object') {
        this.config = config
        this.name = name
    }

    async load(): Promise<Record<string, any>> {
        return { ...this.config }
    }
}

/**
 * 多源配置源（按优先级合并）
 */
export class MultiSource implements ConfigSource {
    name = 'multi'
    private sources: ConfigSource[]

    constructor(sources: ConfigSource[]) {
        this.sources = sources
    }

    async load(): Promise<Record<string, any>> {
        let merged = {}

        for (const source of this.sources) {
            try {
                const config = await source.load()
                merged = this.deepMerge(merged, config)
            } catch (error) {
                console.warn(`Failed to load from ${source.name}:`, error)
            }
        }

        return merged
    }

    watch(callback: (config: Record<string, any>) => void): void {
        this.sources.forEach(source => {
            if (source.watch) {
                source.watch(async () => {
                    const config = await this.load()
                    callback(config)
                })
            }
        })
    }

    private deepMerge(target: any, source: any): any {
        const result = { ...target }

        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key])
            } else {
                result[key] = source[key]
            }
        }

        return result
    }
} 

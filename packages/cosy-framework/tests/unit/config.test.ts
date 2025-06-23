import { describe, it, expect, beforeEach } from 'vitest'
import {
    Configuration,
    Environment,
    EnvironmentSource,
    ObjectSource,
    DefaultConfigValidator,
    required,
    optional,
    string,
    number
} from '../../src/config'

describe('Configuration System', () => {
    let config: Configuration

    beforeEach(() => {
        config = new Configuration()
    })

    describe('Configuration Manager', () => {
        it('should set and get config values', () => {
            config.set('app.name', 'Test App')
            config.set('app.version', '1.0.0')

            expect(config.get('app.name')).toBe('Test App')
            expect(config.get('app.version')).toBe('1.0.0')
        })

        it('should handle nested config keys', () => {
            config.set('database.mysql.host', 'localhost')
            config.set('database.mysql.port', 3306)

            expect(config.get('database.mysql.host')).toBe('localhost')
            expect(config.get('database.mysql.port')).toBe(3306)
            expect(config.get('database.mysql')).toEqual({
                host: 'localhost',
                port: 3306
            })
        })

        it('should return default values for missing keys', () => {
            expect(config.get('missing.key', 'default')).toBe('default')
            expect(config.get('missing.key')).toBeUndefined()
        })

        it('should check if keys exist', () => {
            config.set('existing.key', 'value')

            expect(config.has('existing.key')).toBe(true)
            expect(config.has('missing.key')).toBe(false)
        })

        it('should merge configurations', () => {
            config.set('app.name', 'Original')
            config.set('app.debug', true)

            config.merge({
                app: {
                    name: 'Updated',
                    version: '2.0.0'
                },
                database: {
                    host: 'localhost'
                }
            })

            expect(config.get('app.name')).toBe('Updated')
            expect(config.get('app.debug')).toBe(true)
            expect(config.get('app.version')).toBe('2.0.0')
            expect(config.get('database.host')).toBe('localhost')
        })
    })

    describe('Configuration Sources', () => {
        it('should load from environment variables', async () => {
            // 设置环境变量
            process.env.TEST_APP_NAME = 'Test App'
            process.env.TEST_APP_PORT = '3000'
            process.env.TEST_APP_DEBUG = 'true'

            const source = new EnvironmentSource('TEST_')
            await config.load(source)

            expect(config.get('app_name')).toBe('Test App')
            expect(config.get('app_port')).toBe(3000)
            expect(config.get('app_debug')).toBe(true)

            // 清理环境变量
            delete process.env.TEST_APP_NAME
            delete process.env.TEST_APP_PORT
            delete process.env.TEST_APP_DEBUG
        })

        it('should load from object source', async () => {
            const source = new ObjectSource({
                app: {
                    name: 'Object App',
                    version: '1.0.0'
                },
                database: {
                    host: 'localhost',
                    port: 5432
                }
            })

            await config.load(source)

            expect(config.get('app.name')).toBe('Object App')
            expect(config.get('database.port')).toBe(5432)
        })
    })

    describe('Configuration Validation', () => {
        it('should validate required fields', () => {
            const validator = new DefaultConfigValidator({
                'app.name': required('string'),
                'app.port': required('number'),
                'app.debug': optional('boolean', false)
            })

            config.setValidator(validator)

            // 缺少必需字段
            config.merge({
                app: {
                    name: 'Test App'
                    // 缺少 port
                }
            })

            expect(config.validate()).toBe(false)
            expect(config.getErrors()).toContain("Required config key 'app.port' is missing")
        })

        it('should validate field types', () => {
            const validator = new DefaultConfigValidator({
                'app.name': string(true),
                'app.port': number(true),
                'app.debug': optional('boolean', false)
            })

            config.setValidator(validator)

            config.merge({
                app: {
                    name: 123, // 应该是字符串
                    port: '3000', // 应该是数字
                    debug: false
                }
            })

            expect(config.validate()).toBe(false)
            const errors = config.getErrors()
            expect(errors.some(e => e.includes('app.name'))).toBe(true)
            expect(errors.some(e => e.includes('app.port'))).toBe(true)
        })

        it('should pass validation with correct config', () => {
            const validator = new DefaultConfigValidator({
                'app.name': string(true),
                'app.port': number(true, 3000, 1000, 9999),
                'app.debug': optional('boolean', false)
            })

            config.setValidator(validator)

            config.merge({
                app: {
                    name: 'Test App',
                    port: 3000,
                    debug: true
                }
            })

            expect(config.validate()).toBe(true)
            expect(config.getErrors()).toHaveLength(0)
        })
    })

    describe('Environment Management', () => {
        it('should manage environments', () => {
            expect(Environment.getCurrent()).toBeDefined()

            Environment.setCurrent('test')
            expect(Environment.getCurrent()).toBe('test')
            expect(Environment.isTesting()).toBe(true)
            expect(Environment.isProduction()).toBe(false)
        })

        it('should register custom environments', () => {
            Environment.register('staging', {
                name: 'staging',
                debug: true,
                apiUrl: 'https://api-staging.example.com'
            })

            const config = Environment.getConfig('staging')
            expect(config?.name).toBe('staging')
            expect(config?.debug).toBe(true)
        })
    })
}) 

import { describe, it, expect, beforeEach } from 'vitest'
import { ServiceContainer, Injectable, Inject } from '../../src/container'

describe('Service Container', () => {
    let container: ServiceContainer

    beforeEach(() => {
        container = new ServiceContainer()
    })

    describe('Basic Binding and Resolution', () => {
        it('should bind and resolve a service', () => {
            class TestService {
                getValue() {
                    return 'test-value'
                }
            }

            container.bind('test-service', TestService)
            const service = container.resolve<TestService>('test-service')

            expect(service).toBeInstanceOf(TestService)
            expect(service.getValue()).toBe('test-value')
        })

        it('should resolve singleton services', () => {
            class SingletonService {
                private static instanceCount = 0
                public readonly id: number

                constructor() {
                    this.id = ++SingletonService.instanceCount
                }
            }

            container.singleton('singleton-service', SingletonService)

            const instance1 = container.resolve<SingletonService>('singleton-service')
            const instance2 = container.resolve<SingletonService>('singleton-service')

            expect(instance1).toBe(instance2)
            expect(instance1.id).toBe(1)
        })

        it('should resolve transient services', () => {
            class TransientService {
                private static instanceCount = 0
                public readonly id: number

                constructor() {
                    this.id = ++TransientService.instanceCount
                }
            }

            container.bind('transient-service', TransientService, false)

            const instance1 = container.resolve<TransientService>('transient-service')
            const instance2 = container.resolve<TransientService>('transient-service')

            expect(instance1).not.toBe(instance2)
            expect(instance1.id).toBe(1)
            expect(instance2.id).toBe(2)
        })
    })

    describe('Dependency Injection', () => {
        it('should inject dependencies automatically', () => {
            @Injectable
            class DatabaseService {
                connect() {
                    return 'connected'
                }
            }

            @Injectable
            class UserService {
                constructor(@Inject('DatabaseService') private db: DatabaseService) { }

                getUsers() {
                    return this.db.connect() + ' - users'
                }
            }

            container.bind('DatabaseService', DatabaseService)
            container.bind('UserService', UserService)

            const userService = container.resolve<UserService>('UserService')
            expect(userService.getUsers()).toBe('connected - users')
        })

        it('should inject with explicit tokens', () => {
            interface Logger {
                log(message: string): string
            }

            @Injectable
            class FileLogger implements Logger {
                log(message: string) {
                    return `[FILE] ${message}`
                }
            }

            @Injectable
            class UserController {
                constructor(@Inject('Logger') private logger: Logger) { }

                createUser() {
                    return this.logger.log('User created')
                }
            }

            container.bind('Logger', FileLogger)
            container.bind('UserController', UserController)

            const controller = container.resolve<UserController>('UserController')
            expect(controller.createUser()).toBe('[FILE] User created')
        })
    })

    describe('Container Methods', () => {
        it('should check if service exists', () => {
            class TestService { }

            expect(container.has('test')).toBe(false)

            container.bind('test', TestService)
            expect(container.has('test')).toBe(true)
        })

        it('should set instances directly', () => {
            const instance = { value: 'direct-instance' }

            container.instance('direct', instance)
            const resolved = container.resolve('direct')

            expect(resolved).toBe(instance)
        })

        it('should throw error for unbound services', () => {
            expect(() => {
                container.resolve('non-existent')
            }).toThrow('Service not found: non-existent')
        })
    })
}) 

// 基础类型定义
export type Constructor<T = {}> = new (...args: any[]) => T

// 装饰器类型
export interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void
}

export interface MethodDecorator {
    <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void
}

export interface ParameterDecorator {
    (target: any, propertyKey: string | symbol | undefined, parameterIndex: number): void
}

// 服务容器类型
export interface ServiceBinding<T = any> {
    token: string | symbol
    implementation: Constructor<T>
    singleton: boolean
    instance?: T
}

// HTTP 类型
export type RouteHandler = (...args: any[]) => any
export type NextFunction = (request?: any) => Promise<any>

// 通用工具类型
export type Awaitable<T> = T | Promise<T>
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

// 服务容器扩展类型
export interface Container {
    bind<T>(token: string | symbol, implementation: Constructor<T>, singleton?: boolean): void
    singleton<T>(token: string | symbol, implementation: Constructor<T>): void
    resolve<T>(token: string | symbol): T
    make<T>(implementation: Constructor<T>): T
    has(token: string | symbol): boolean
    instance<T>(token: string | symbol, instance: T): void
}

export interface ServiceProvider {
    register(container: Container): void
    boot?(container: Container): void
}

// 装饰器元数据
export const INJECTABLE_TOKEN = Symbol('injectable')
export const INJECT_TOKEN = Symbol('inject')
export const DEPENDENCIES_TOKEN = Symbol('dependencies')

// HTTP 扩展类型
export interface RequestInterface {
    method: string
    url: string
    path: string
    query: Record<string, any>
    params: Record<string, any>
    headers: Record<string, string>
    body: any
    cookies: Record<string, string>
    files: Record<string, FileUpload[]>
    ip: string
    userAgent: string
    get(key: string): any
    has(key: string): boolean
    input(key?: string, defaultValue?: any): any
    cookie(name: string, defaultValue?: string): string
    header(name: string, defaultValue?: string): string
    file(name: string): FileUpload | FileUpload[] | undefined
    isAjax(): boolean
    isJson(): boolean
    isForm(): boolean
    fullUrl(): string
    queryString(): string
}

export interface ResponseInterface {
    status(code: number): ResponseInterface
    json(data: any): ResponseInterface
    html(content: string): ResponseInterface
    redirect(url: string, status?: number): ResponseInterface
    cookie(name: string, value: string, options?: CookieOptions): ResponseInterface
    clearCookie(name: string): ResponseInterface
    header(name: string, value: string): ResponseInterface
    send(content?: any): ResponseInterface
    download(filePath: string, filename?: string): ResponseInterface
    attachment(filename?: string): ResponseInterface
    getStatus(): number
    getHeaders(): Record<string, string>
    getCookies(): Array<{ name: string; value: string; options: CookieOptions | undefined }>
    getContent(): any
    hasResponded(): boolean
    getSetCookieHeaders(): string[]
}

export interface FileUpload {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    size: number
    destination?: string
    filename?: string
    path?: string
    buffer?: Buffer
}

export interface CookieOptions {
    maxAge?: number
    expires?: Date
    httpOnly?: boolean
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
    domain?: string
    path?: string
}

export interface HttpContextInterface {
    request: RequestInterface
    response: ResponseInterface
}

// HTTP 状态码
export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503
}

// HTTP 方法
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS'
}

// 路由相关类型
export interface RouteInterface {
    method: string | string[]
    path: string
    handler: RouteHandler
    name?: string
    middleware?: MiddlewareHandler[]
    domain?: string
    matchesMethod(method: string): boolean
}

export interface RouterInterface {
    get(path: string, handler: RouteHandler): RouteInterface
    post(path: string, handler: RouteHandler): RouteInterface
    put(path: string, handler: RouteHandler): RouteInterface
    patch(path: string, handler: RouteHandler): RouteInterface
    delete(path: string, handler: RouteHandler): RouteInterface
    options(path: string, handler: RouteHandler): RouteInterface
    head(path: string, handler: RouteHandler): RouteInterface
    any(path: string, handler: RouteHandler): RouteInterface
    match(methods: string[], path: string, handler: RouteHandler): RouteInterface
    group(prefix: string, callback: (router: RouterInterface) => void): void
    group(options: RouteGroupOptions, callback: (router: RouterInterface) => void): void
    middleware(middleware: MiddlewareHandler | MiddlewareHandler[]): RouterInterface
    name(name: string): RouterInterface
    domain(domain: string): RouterInterface
    resolve(method: string, path: string): RouteMatch | null
    getRoutes(): RouteInterface[]
}

export interface RouteMatch {
    route: RouteInterface
    params: Record<string, string>
    middleware?: MiddlewareHandler | MiddlewareHandler[]
    name?: string
    domain?: string
    namespace?: string
}

export interface RouteGroupOptions {
    prefix?: string
    middleware?: MiddlewareHandler | MiddlewareHandler[]
    name?: string
    domain?: string
    namespace?: string
}

export interface RouteCompiler {
    compile(path: string): CompiledRoute
    match(compiledRoute: CompiledRoute, path: string): RouteMatchResult | null
}

export interface CompiledRoute {
    pattern: RegExp
    paramNames: string[]
    path: string
}

export interface RouteMatchResult {
    params: Record<string, string>
}

// 中间件扩展类型
export interface MiddlewarePipeline {
    pipe(middleware: MiddlewareHandler): MiddlewarePipeline
    through(middlewares: MiddlewareHandler[]): MiddlewarePipeline
    then(finalHandler: RouteHandler): Promise<any>
    execute(context: HttpContextInterface): Promise<any>
    count(): number
}

export interface MiddlewareManager {
    register(name: string, middleware: MiddlewareHandler): void
    resolve(name: string): MiddlewareHandler | undefined
    group(name: string, middlewares: (string | MiddlewareHandler)[]): void
    getGroup(name: string): MiddlewareHandler[]
    global(middleware: MiddlewareHandler): void
    getGlobal(): MiddlewareHandler[]
}

export interface ConditionalMiddleware {
    when(condition: (context: HttpContextInterface) => boolean): MiddlewareHandler
    unless(condition: (context: HttpContextInterface) => boolean): MiddlewareHandler
}

export interface MiddlewareOptions {
    except?: string[]
    only?: string[]
    domain?: string
    methods?: string[]
}

// 中间件上下文
export interface MiddlewareContext extends HttpContextInterface {
    state: Record<string, any>
    skipRemaining(): void
    shouldSkip: boolean
}

// 中间件类型
export type MiddlewareHandler = (context: HttpContextInterface, next: NextFunction) => Awaitable<any>

// 配置相关类型
export interface ConfigManager {
    get<T = any>(key: string, defaultValue?: T): T
    set(key: string, value: any): void
    has(key: string): boolean
    all(): Record<string, any>
    load(source: ConfigSource): Promise<void>
    merge(config: Record<string, any>): void
    validate(): boolean
    getErrors(): string[]
}

export interface ConfigSource {
    name: string
    load(): Promise<Record<string, any>>
    watch?(callback: (config: Record<string, any>) => void): void
}

export interface ConfigValidator {
    rules: Record<string, ConfigRule>
    validate(config: Record<string, any>): ConfigValidationResult
}

export interface ConfigRule {
    required?: boolean
    type?: 'string' | 'number' | 'boolean' | 'array' | 'object'
    default?: any
    validator?: ((value: any) => boolean | string) | undefined
    transform?: (value: any) => any
}

export interface ConfigValidationResult {
    valid: boolean
    errors: string[]
    warnings: string[]
}

export interface EnvironmentConfig {
    name: string
    debug?: boolean
    [key: string]: any
}

// 应用程序相关类型
export interface ApplicationInterface {
    // 生命周期
    boot(): Promise<void>
    start(port?: number): Promise<void>
    stop(): Promise<void>

    // 配置
    configure(callback: (app: ApplicationInterface) => void): ApplicationInterface
    config(key: string, value?: any): any

    // 服务管理
    register(provider: ServiceProvider): ApplicationInterface
    resolve<T>(token: string | symbol): T
    singleton<T>(token: string | symbol, implementation: Constructor<T>): ApplicationInterface
    bind<T>(token: string | symbol, implementation: Constructor<T>): ApplicationInterface

    // 路由
    get(path: string, handler: RouteHandler): RouteInterface
    post(path: string, handler: RouteHandler): RouteInterface
    put(path: string, handler: RouteHandler): RouteInterface
    patch(path: string, handler: RouteHandler): RouteInterface
    delete(path: string, handler: RouteHandler): RouteInterface
    group(prefix: string | RouteGroupOptions, callback: (router: RouterInterface) => void): void

    // 中间件
    use(middleware: MiddlewareHandler): ApplicationInterface
    useGlobal(middleware: MiddlewareHandler): ApplicationInterface

    // 请求处理
    handle(request: RequestInterface): Promise<ResponseInterface>
    handleHttp(req: any, res: any): Promise<void>

    // 状态
    isRunning(): boolean
    getPort(): number | undefined
}

export interface ApplicationConfig {
    name?: string
    debug?: boolean
    port?: number
    host?: string
    timezone?: string
    locale?: string
    providers?: Constructor<ServiceProvider>[]
    middleware?: MiddlewareHandler[]
}

export interface ApplicationLifecycleHooks {
    beforeBoot?: () => Awaitable<void>
    afterBoot?: () => Awaitable<void>
    beforeStart?: () => Awaitable<void>
    afterStart?: () => Awaitable<void>
    beforeStop?: () => Awaitable<void>
    afterStop?: () => Awaitable<void>
}

export interface BootstrapOptions {
    config?: ApplicationConfig
    configPath?: string
    providers?: Constructor<ServiceProvider>[]
    hooks?: ApplicationLifecycleHooks
}

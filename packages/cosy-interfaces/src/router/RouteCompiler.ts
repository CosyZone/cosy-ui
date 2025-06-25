/**
 * 路由编译器接口
 */
export interface RouteCompiler {
    compile(path: string): CompiledRoute
    match(compiledRoute: CompiledRoute, path: string): RouteMatchResult | null
}

/**
 * 编译后的路由
 */
export interface CompiledRoute {
    pattern: RegExp
    paramNames: string[]
    path: string
}

/**
 * 路由匹配结果
 */
export interface RouteMatchResult {
    params: Record<string, string>
} 

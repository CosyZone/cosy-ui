import { RouteCompiler, CompiledRoute, RouteMatchResult } from '../types'
import { pathToRegexp, match, Key } from 'path-to-regexp'

export class DefaultRouteCompiler implements RouteCompiler {
    /**
     * 编译路由路径
     */
    compile(path: string): CompiledRoute {
        const keys: Key[] = []
        const pattern = pathToRegexp(path, keys)
        return {
            pattern,
            paramNames: keys.map(k => k.name.toString()),
            path
        }
    }

    /**
     * 匹配路径并提取参数
     */
    match(compiledRoute: CompiledRoute, path: string): RouteMatchResult | null {
        const matcher = match(compiledRoute.path, { decode: decodeURIComponent })
        const result = matcher(path)

        if (!result) {
            return null
        }

        return {
            params: result.params as Record<string, string>
        }
    }
} 

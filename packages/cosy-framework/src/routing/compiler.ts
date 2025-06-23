import { RouteCompiler, CompiledRoute, RouteMatchResult } from '../types'
import { pathToRegexp, match, Key } from 'path-to-regexp'

export class DefaultRouteCompiler implements RouteCompiler {
    /**
     * 编译路由路径
     */
    compile(path: string): CompiledRoute {
        const keys: Key[] = []
        const pattern = pathToRegexp(path.replace(/{([^}]+)}/g, ':$1'), keys)
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
        const result = compiledRoute.pattern.exec(path)

        if (!result) {
            return null
        }

        const params: Record<string, string> = {}
        for (let i = 1; i < result.length; i++) {
            const paramName = compiledRoute.paramNames[i - 1]
            if (paramName) {
                params[paramName] = result[i] || ''
            }
        }

        return { params }
    }
} 

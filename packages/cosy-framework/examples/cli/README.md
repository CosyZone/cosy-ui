# Cosy Framework CLI Example

这个示例展示了如何使用 Cosy Framework 的命令行功能来创建命令行应用程序。

## 功能特点

1. 命令注册和管理
2. 命令行参数解析
3. 帮助信息生成
4. 错误处理
5. 优雅关闭

## 项目结构

```
cli/
  ├── commands/           # 命令目录
  │   └── serve.ts       # 服务器启动命令
  ├── main.ts            # 入口文件
  └── README.md          # 说明文档
```

## 使用方法

1. 启动服务器：

```bash
# 默认端口 (3000)
$ ts-node main.ts serve

# 指定端口
$ ts-node main.ts serve 8080
```

2. 显示帮助信息：

```bash
# 显示所有可用命令
$ ts-node main.ts --help

# 显示特定命令的帮助信息
$ ts-node main.ts serve --help
```

## 创建新命令

1. 在 `commands` 目录下创建新的命令文件
2. 继承 `BaseCommand` 类并实现必要的方法
3. 在 `main.ts` 中注册新命令

示例：

```typescript
import { BaseCommand } from '../../../src/cli/interfaces'

export class MyCommand extends BaseCommand {
    constructor() {
        super('my-command', 'My command description')
    }

    async execute(args: string[]): Promise<void> {
        // 实现命令逻辑
        console.log('Executing my command...')
    }
}
```

## 最佳实践

1. 每个命令都应该是单一职责的
2. 使用适当的错误处理
3. 提供清晰的帮助信息
4. 支持 `--help` 选项
5. 实现优雅关闭 

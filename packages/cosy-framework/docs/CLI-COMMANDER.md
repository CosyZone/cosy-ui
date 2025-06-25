# Cosy Framework CLI (Commander.js)

一个基于 Commander.js 构建的现代化命令行界面，为 Cosy Framework 提供强大的开发工具。

## 🚀 快速开始

### 安装
```bash
npm install @coffic/cosy-framework
# 或
pnpm add @coffic/cosy-framework
# 或  
yarn add @coffic/cosy-framework
```

### 基本使用

#### 方式一：直接使用 npx
```bash
npx @coffic/cosy-framework --help
npx @coffic/cosy-framework serve
npx @coffic/cosy-framework env
```

#### 方式二：通过项目脚本 (推荐)
在你的 `package.json` 中添加脚本：
```json
{
  "scripts": {
    "cosy": "npx @coffic/cosy-framework"
  }
}
```

然后使用：
```bash
pnpm cosy --help
pnpm cosy serve
pnpm cosy env
```

## 📋 可用命令

### 🌐 serve - 启动开发服务器
启动一个开发 HTTP 服务器，支持热重载和调试功能。

```bash
# 基本用法
pnpm cosy serve                    # 默认端口 3000
pnpm cosy serve 8080              # 指定端口
pnpm cosy serve 3000 --host 0.0.0.0  # 绑定所有网络接口

# 选项
--host <host>    指定主机名 (默认: localhost)
--debug          启用调试模式
```

#### 示例
```bash
pnpm cosy serve                      # http://localhost:3000
pnpm cosy serve 8080                 # http://localhost:8080
pnpm cosy serve 3000 -h 0.0.0.0     # 所有网络接口
```

### 📊 env - 环境信息
显示系统和项目环境的详细信息，用于故障排查和配置验证。

```bash
# 基本用法
pnpm cosy env                      # 显示完整信息
pnpm cosy env --simple            # 显示简化信息
pnpm cosy env --json              # JSON 格式输出

# 选项
-s, --simple     显示简化输出
-j, --json       以 JSON 格式输出
```

#### 显示信息包括
- 🖥️ 系统信息（OS、CPU、内存）
- 🟢 Node.js 版本和配置
- 🚀 框架版本和设置
- 📦 包管理器类型
- 🔧 重要环境变量
- 💾 内存使用情况

### 📁 project - 项目信息
分析当前项目并显示有用的开发信息。

```bash
# 基本用法
pnpm cosy project                  # 显示基本信息
pnpm cosy project --stats         # 显示详细统计
pnpm cosy project --json          # JSON 格式输出

# 选项
-s, --stats      显示详细统计信息
-j, --json       以 JSON 格式输出
```

#### 显示信息包括
- 🏷️ 项目基本信息（名称、版本、描述）
- 📦 依赖分析（生产依赖、开发依赖数量）
- 📊 文件统计（总数、大小、类型分布）
- 🔧 配置检查

### 👋 hello - 示例命令
一个演示自定义命令开发的示例，支持多语言问候。

```bash
# 基本用法
pnpm cosy hello Alice              # 英语问候
pnpm cosy hello Bob --language zh # 中文问候
pnpm cosy hello Charlie --uppercase --language es  # 大写西班牙语

# 参数和选项
<name>                必需参数：要问候的姓名
-l, --language <lang> 问候语言 (en|zh|es|fr|de)
--uppercase           使用大写字母
```

#### 支持的语言
- `en` - English (默认)
- `zh` - 中文
- `es` - Español
- `fr` - Français
- `de` - Deutsch

## 🛠️ 开发指南

### 创建自定义命令

1. **创建命令文件**
```typescript
// src/commands/my-command.ts
import { Command } from 'commander'

export function configureMyCommand(program: Command): void {
    program
        .command('my-cmd')
        .description('My custom command')
        .argument('<input>', 'input parameter')
        .option('-o, --output <file>', 'output file')
        .action(async (input: string, options: { output?: string }) => {
            console.log(`Processing ${input}...`)
            if (options.output) {
                console.log(`Output to: ${options.output}`)
            }
        })
}
```

2. **注册命令**
```typescript
// src/core/cli/bin.ts
import { configureMyCommand } from '../../commands/my-command.js'

// 在 main 函数中添加
configureMyCommand(app.getProgram())
```

3. **重新构建并测试**
```bash
pnpm build
pnpm cosy my-cmd --help
```

### 命令开发最佳实践

#### 1. 参数验证
```typescript
.action(async (input: string, options: any) => {
    // 验证必需参数
    if (!input || input.trim() === '') {
        console.error('❌ 错误: 输入参数不能为空')
        process.exit(1)
    }
    
    // 验证选项
    if (options.format && !['json', 'yaml'].includes(options.format)) {
        console.error('❌ 错误: 格式必须是 json 或 yaml')
        process.exit(1)
    }
})
```

#### 2. 错误处理
```typescript
.action(async (input: string, options: any) => {
    try {
        // 命令逻辑
        await processInput(input)
        console.log('✅ 处理完成')
    } catch (error) {
        console.error('❌ 处理失败:', error.message)
        process.exit(1)
    }
})
```

#### 3. 帮助文档
```typescript
.addHelpText('after', `
💡 示例:
   cosy my-cmd input.txt                处理 input.txt
   cosy my-cmd input.txt -o output.txt  输出到 output.txt

📝 说明:
   此命令用于处理文件内容，支持多种输出格式。

🎯 用途:
   • 文件转换
   • 内容处理
   • 格式化输出
`)
```

#### 4. 日志记录
```typescript
// 在命令中获取日志记录器
const logger = app.getLogger()

.action(async (input: string, options: any) => {
    logger.debug('Command started', { input, options })
    
    try {
        // 处理逻辑
        logger.info('Processing completed successfully')
    } catch (error) {
        logger.error('Command failed', { error: error.message })
        throw error
    }
})
```

## 🎨 用户界面特性

### 美观的帮助信息
- 🎨 ASCII 艺术横幅
- 📖 结构化的帮助布局
- 💡 实用的示例
- 🔗 文档链接

### 智能错误处理
- ❌ 清晰的错误信息
- 💡 修复建议
- 🔍 调试信息（开启 --debug 时）

### 多语言支持
- 🌍 中英文界面
- 🎯 本地化的错误信息
- 📚 多语言示例

## 🔧 配置选项

### 全局选项
```bash
--debug          启用调试模式，显示详细日志
--silent         静默模式，只显示错误信息
-V, --version    显示版本信息
-h, --help       显示帮助信息
```

### 环境变量
```bash
NODE_ENV=development    # 运行环境
DEBUG=true             # 启用调试模式
LOG_LEVEL=debug        # 日志级别
```

## 🚀 高级用法

### 在 CI/CD 中使用
```yaml
# .github/workflows/deploy.yml
- name: Check environment
  run: npx @coffic/cosy-framework env --json

- name: Start development server
  run: npx @coffic/cosy-framework serve 3000 &
```

### 与其他工具集成
```bash
# 与 package.json scripts 集成
{
  "scripts": {
    "dev": "pnpm cosy serve",
    "info": "pnpm cosy env",
    "analyze": "pnpm cosy project --stats"
  }
}
```

## 🤝 贡献指南

欢迎贡献新命令和功能！请参考现有命令的结构：

1. 在 `src/commands/` 中创建命令文件
2. 遵循命名约定：`命令名-commander.ts`
3. 导出配置函数：`configure命令名Command`
4. 在 `bin.ts` 中注册命令
5. 添加完整的文档和示例

## 📚 参考资源

- [Commander.js 官方文档](https://github.com/tj/commander.js)
- [Node.js CLI 最佳实践](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)
- [Cosy Framework 文档](https://github.com/coffic/cosy-ui)

---

💡 **提示**: 这个 CLI 基于 Commander.js 构建，提供了类型安全、易于扩展的命令行界面。你可以轻松添加自定义命令来满足项目需求。 

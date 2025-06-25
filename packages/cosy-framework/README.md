# @coffic/cosy-framework

<div align="center">

![Cosy Framework](https://img.shields.io/badge/Cosy-Framework-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Commander.js](https://img.shields.io/badge/Commander.js-0000FF?style=for-the-badge)

**一个 Laravel 风格的 TypeScript 框架，具有 Astro 和 Cosy-UI 集成**

[安装](#-安装) • [快速开始](#-快速开始) • [文档](#-文档) • [CLI 工具](#-cli-工具) • [贡献](#-贡献)

</div>

## 🎯 特性

- 🚀 **Laravel 风格的架构** - 熟悉的 MVC 模式和依赖注入
- ⚡ **TypeScript 优先** - 完整的类型安全和现代化开发体验
- 🌐 **Web 应用支持** - 内置 HTTP 服务器、路由和中间件系统
- 🔧 **强大的 CLI** - 基于 Commander.js 的现代化命令行工具
- 📦 **模块化设计** - 灵活的包结构，按需使用
- 🎨 **Astro 集成** - 无缝的前端框架支持
- 🧩 **组件库整合** - 与 Cosy-UI 完美配合

## 📦 安装

```bash
# 使用 npm
npm install @coffic/cosy-framework

# 使用 pnpm (推荐)
pnpm add @coffic/cosy-framework

# 使用 yarn
yarn add @coffic/cosy-framework
```

## 🚀 快速开始

### 1. 创建 Web 应用

```typescript
import { ApplicationFactory } from '@coffic/cosy-framework'

// 创建应用实例
const app = ApplicationFactory.createWebApp({
  name: 'My Cosy App',
  port: 3000
})

// 定义路由
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Cosy Framework!' })
})

app.post('/api/users', (req, res) => {
  // 处理用户创建
  res.json({ success: true })
})

// 启动服务器
await app.start()
console.log('🚀 服务器已启动在 http://localhost:3000')
```

### 2. 使用 CLI 工具

```bash
# 启动开发服务器
npx @coffic/cosy-framework serve

# 查看环境信息
npx @coffic/cosy-framework env

# 显示项目信息
npx @coffic/cosy-framework project --stats

# 获取帮助
npx @coffic/cosy-framework --help
```

### 3. 高级配置

```typescript
import { 
  ApplicationFactory, 
  configureServeCommand,
  configureEnvCommand 
} from '@coffic/cosy-framework'

// 创建自定义 CLI 应用
const cli = ApplicationFactory.createCliApp({
  name: 'my-app',
  description: 'My awesome application',
  version: '1.0.0'
})

// 注册内置命令
configureServeCommand(cli.getProgram())
configureEnvCommand(cli.getProgram())

// 添加自定义命令
cli.command('deploy')
   .description('Deploy the application')
   .action(async () => {
     console.log('🚀 Deploying application...')
   })

// 解析命令行参数
await cli.parse()
```

## 🛠️ CLI 工具

Cosy Framework 提供了强大的命令行工具，基于 Commander.js 构建：

### 核心命令

| 命令 | 描述 | 示例 |
|------|------|------|
| `serve` | 启动开发服务器 | `npx @coffic/cosy-framework serve 3000` |
| `env` | 显示环境信息 | `npx @coffic/cosy-framework env --simple` |
| `project` | 分析项目信息 | `npx @coffic/cosy-framework project --stats` |

### 在项目中使用

在你的 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "cosy": "npx @coffic/cosy-framework",
    "dev": "npx @coffic/cosy-framework serve",
    "info": "npx @coffic/cosy-framework env"
  }
}
```

然后使用：

```bash
pnpm cosy serve
pnpm dev
pnpm info
```

## 🏗️ 架构概览

```
@coffic/cosy-framework/
├── core/
│   ├── web/           # Web 应用核心
│   │   ├── web-app.ts
│   │   ├── bootstrap.ts
│   │   └── decorators.ts
│   ├── cli/           # CLI 核心
│   │   ├── commander-app.ts
│   │   └── bin.ts
│   └── base/          # 基础类
│       └── application.ts
├── commands/          # CLI 命令
│   ├── serve-commander.ts
│   ├── env-commander.ts
│   └── example-custom-command.ts
├── factory.ts         # 应用工厂
└── types.ts          # 类型定义
```

## 🧩 依赖包

Cosy Framework 建立在一系列精心设计的包之上：

- **@coffic/cosy-interfaces** - 核心接口定义
- **@coffic/cosy-container** - 依赖注入容器
- **@coffic/cosy-router** - 路由系统
- **@coffic/cosy-middleware** - 中间件管道
- **@coffic/cosy-http** - HTTP 处理
- **@coffic/cosy-config** - 配置管理
- **@coffic/cosy-logger** - 日志系统

## 🔧 配置选项

### Web 应用配置

```typescript
const app = ApplicationFactory.createWebApp({
  name: 'My App',           // 应用名称
  port: 3000,              // 端口号
  env: 'development',      // 环境
  debug: true             // 调试模式
})
```

### CLI 应用配置

```typescript
const cli = ApplicationFactory.createCliApp({
  name: 'my-cli',          // CLI 名称
  description: 'My CLI',   // 描述
  version: '1.0.0'        // 版本
})
```

## 📖 示例项目

### 基础 Web API

```typescript
import { ApplicationFactory } from '@coffic/cosy-framework'

const app = ApplicationFactory.createWebApp({
  name: 'Todo API',
  port: 3000
})

// 中间件
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// 路由
app.get('/api/todos', (req, res) => {
  res.json([
    { id: 1, title: 'Learn Cosy Framework', completed: false },
    { id: 2, title: 'Build awesome app', completed: false }
  ])
})

app.post('/api/todos', (req, res) => {
  const todo = { id: Date.now(), ...req.body, completed: false }
  res.status(201).json(todo)
})

await app.start()
```

### 自定义 CLI 工具

```typescript
import { ApplicationFactory } from '@coffic/cosy-framework'

const cli = ApplicationFactory.createCliApp({
  name: 'mytool',
  description: 'My custom development tool',
  version: '1.0.0'
})

cli.command('build')
   .description('Build the project')
   .option('-w, --watch', 'watch mode')
   .action(async (options) => {
     console.log('🔨 Building project...')
     if (options.watch) {
       console.log('👀 Watching for changes...')
     }
   })

cli.command('test')
   .description('Run tests')
   .option('-c, --coverage', 'generate coverage report')
   .action(async (options) => {
     console.log('🧪 Running tests...')
     if (options.coverage) {
       console.log('📊 Generating coverage report...')
     }
   })

await cli.parse()
```

## 🔄 中间件系统

```typescript
// 全局中间件
app.use((req, res, next) => {
  // 日志中间件
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
  next()
})

// 路由特定中间件
app.use('/api', (req, res, next) => {
  // API 认证中间件
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
})

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})
```

## 🧪 测试

```bash
# 运行测试
pnpm test

# 监听模式
pnpm test:watch

# 覆盖率报告
pnpm test:coverage
```

## 📚 文档

- [CLI 工具完整指南](./docs/CLI-COMMANDER.md) - 详细的 CLI 使用文档
- [API 参考](./docs/api.md) - 完整的 API 文档
- [开发指南](./docs/development.md) - 开发和贡献指南

## 🤝 贡献

欢迎贡献代码！请查看我们的贡献指南：

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/coffic/cosy-ui.git
cd cosy-ui

# 安装依赖
pnpm install

# 构建框架
pnpm build:framework

# 运行测试
pnpm --filter @coffic/cosy-framework test
```

## 📝 更新日志

### v0.1.0 (当前版本)

- ✨ 初始发布
- 🚀 Laravel 风格的架构设计
- ⚡ TypeScript 完整支持
- 🌐 Web 应用和 CLI 工具
- 🔧 基于 Commander.js 的现代化 CLI
- 📦 模块化包结构
- 🎨 Astro 和 Cosy-UI 集成

## 📄 许可证

MIT License - 查看 [LICENSE](../../LICENSE) 文件了解详情。

## 🔗 相关链接

- [Cosy UI 组件库](https://github.com/coffic/cosy-ui)
- [Commander.js](https://github.com/tj/commander.js/)
- [TypeScript](https://www.typescriptlang.org/)
- [Astro](https://astro.build/)

---

<div align="center">

**使用 Cosy Framework 构建下一代 TypeScript 应用** 💜

[⭐ 给我们一个 Star](https://github.com/coffic/cosy-ui) • [🐛 报告问题](https://github.com/coffic/cosy-ui/issues) • [💬 讨论](https://github.com/coffic/cosy-ui/discussions)

</div> 

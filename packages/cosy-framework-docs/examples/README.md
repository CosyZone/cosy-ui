# Cosy Framework 示例代码

这个目录包含了 Cosy Framework 的各种示例代码，帮助你理解框架的核心概念和使用方法。

## 📋 示例列表

### reflect-metadata 相关示例

| 文件 | 描述 | 难度 | 对应文档 |
|------|------|------|----------|
| `reflect-metadata-simple.ts` | 简化版演示，专注于核心概念 | 🟢 入门 | [01.1-reflect-metadata详解.md](../schedule/01.1-reflect-metadata详解.md) |
| `reflect-metadata-demo.ts` | 基础版演示，包含基本用法 | 🟡 中级 | [01.1-reflect-metadata详解.md](../schedule/01.1-reflect-metadata详解.md) |
| `reflect-metadata-tutorial.ts` | 完整教程，包含装饰器语法 | 🔴 高级 | [01.1-reflect-metadata详解.md](../schedule/01.1-reflect-metadata详解.md) |

## 🚀 运行示例

### 方法 1：使用 npm 脚本（推荐）

```bash
# 进入文档项目目录
cd packages/cosy-framework-docs

# 安装依赖（首次运行）
pnpm install

# 查看所有可用示例
npm run examples

# 运行特定示例
npm run example:reflect-simple
npm run example:reflect-demo
npm run example:reflect-tutorial
```

### 方法 2：直接使用 tsx

```bash
# 进入文档项目目录
cd packages/cosy-framework-docs

# 运行示例
npx tsx examples/reflect-metadata-simple.ts
npx tsx examples/reflect-metadata-demo.ts
npx tsx examples/reflect-metadata-tutorial.ts
```

## 📚 学习路径

建议按以下顺序学习示例：

1. **第一步**：阅读 [01-project-setup.md](../schedule/01-project-setup.md)
2. **第二步**：阅读 [01.1-reflect-metadata详解.md](../schedule/01.1-reflect-metadata详解.md)
3. **第三步**：运行 `reflect-metadata-simple.ts` - 理解基础概念
4. **第四步**：运行 `reflect-metadata-demo.ts` - 学习基本用法
5. **第五步**：运行 `reflect-metadata-tutorial.ts` - 掌握高级特性

## 🛠️ 环境要求

- Node.js 18+
- TypeScript 5.3+
- pnpm（推荐）或 npm

## 🔧 故障排除

### 问题：`tsx` 命令找不到
```bash
# 解决方案：安装 tsx
npm install -g tsx
# 或者使用 npx
npx tsx examples/xxx.ts
```

### 问题：`reflect-metadata` 相关错误
```bash
# 解决方案：确保安装了依赖
pnpm install
```

### 问题：TypeScript 编译错误
```bash
# 解决方案：检查 TypeScript 版本
tsc --version
# 需要 5.3 或更高版本
```

## 📝 贡献指南

如果你想添加新的示例：

1. 在对应的步骤目录中创建示例文件
2. 使用清晰的注释解释每个概念
3. 在此 README 中添加示例说明
4. 在 package.json 中添加对应的脚本
5. 确保示例可以独立运行

## 🎯 目录结构

```
examples/
├── README.md                      # 本文档
├── reflect-metadata-simple.ts     # reflect-metadata 简化演示
├── reflect-metadata-demo.ts       # reflect-metadata 基础演示
├── reflect-metadata-tutorial.ts   # reflect-metadata 完整教程
└── ... (更多示例将在后续步骤中添加)
```

## 📖 相关文档

- [开发计划总览](../schedule/README.md)
- [项目基础设置](../schedule/01-project-setup.md)
- [reflect-metadata 详解](../schedule/01.1-reflect-metadata详解.md)
- [命名规则](../schedule/00-命名规则.md) 

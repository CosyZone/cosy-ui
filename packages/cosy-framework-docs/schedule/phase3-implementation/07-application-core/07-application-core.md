# 步骤 007：应用程序核心概述

## 目标
整合所有组件，创建完整的应用程序核心，实现应用生命周期管理。

## 子步骤
本章节分为以下几个子步骤：

1. [类型定义](./07.1-application-types.md)
   - 定义应用程序接口
   - 定义配置类型
   - 定义生命周期钩子类型

2. [核心实现](./07.2-application-core.md)
   - 实现应用程序类
   - 实现生命周期管理
   - 实现 HTTP 服务器集成

3. [启动器实现](./07.3-application-bootstrap.md)
   - 实现启动器类
   - 实现配置文件加载
   - 实现服务提供者注册

4. [装饰器实现](./07.4-application-decorators.md)
   - 实现应用程序装饰器
   - 实现自动注册装饰器
   - 实现生命周期装饰器

5. [测试实现](./07.5-application-testing.md)
   - 创建单元测试
   - 创建集成测试
   - 创建手动测试脚本

## 依赖
首先需要安装以下依赖：

```bash
npm install fastify @fastify/cors
```

## 代码组织
项目的核心代码按以下结构组织：

```
src/core/
├── application.ts     # 应用程序核心实现
├── bootstrap.ts       # 应用程序启动器
├── decorators.ts      # 应用程序装饰器
├── helpers.ts         # 工具函数
└── index.ts          # 模块导出
```

## 完成标志
- [ ] 所有子步骤完成
- [ ] 所有测试通过
- [ ] 代码组织清晰
- [ ] 文档完整
- [ ] TypeScript 类型检查无错误

## 下一步
请按顺序完成每个子步骤，从 [07.1-application-types.md](./07.1-application-types.md) 开始。 

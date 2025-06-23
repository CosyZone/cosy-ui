# 步骤 002：服务容器概述

## 目标
实现一个功能完整的服务容器，支持依赖注入、服务提供者和装饰器。

## 子步骤
本章节分为以下几个子步骤：

1. [类型定义](./02.1-container-types.md)
   - 定义容器接口
   - 定义服务提供者接口
   - 定义装饰器类型

2. [容器实现](./02.2-container-implementation.md)
   - 实现服务容器类
   - 实现依赖注入
   - 实现服务解析

3. [装饰器实现](./02.3-decorators.md)
   - 实现注入装饰器
   - 实现服务装饰器
   - 实现生命周期装饰器

4. [服务提供者](./02.4-service-provider.md)
   - 实现服务提供者基类
   - 实现服务注册机制
   - 实现启动和关闭钩子

5. [测试实现](./02.5-testing.md)
   - 创建单元测试
   - 创建集成测试
   - 创建手动测试脚本

## 依赖
首先需要安装以下依赖：

```bash
npm install reflect-metadata
```

## 代码组织
项目的核心代码按以下结构组织：

```
src/container/
├── container.ts      # 服务容器实现
├── decorators.ts     # 装饰器实现
├── provider.ts       # 服务提供者实现
├── types.ts          # 类型定义
└── index.ts          # 模块导出
```

## 完成标志
- [ ] 所有子步骤完成
- [ ] 所有测试通过
- [ ] 代码组织清晰
- [ ] 文档完整
- [ ] TypeScript 类型检查无错误

## 下一步
请按顺序完成每个子步骤，从 [02.1-container-types.md](./02.1-container-types.md) 开始。 
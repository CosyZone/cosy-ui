# 步骤 008：基础示例项目

## 目标
创建一个完整的示例项目，展示框架的基本功能和使用方法。

## 子步骤
本章节分为以下几个子步骤：

1. [项目结构和最佳实践](./08.1-project-structure.md)
   - 创建项目结构
   - 定义最佳实践
   - 设置开发环境

2. [应用核心实现](./08.2-application-setup.md)
   - 实现应用入口文件
   - 实现服务器启动文件
   - 配置应用实例

3. [API实现](./08.3-api-implementation.md)
   - 实现用户管理API
   - 实现帖子管理API
   - 添加认证中间件

4. [服务层实现](./08.4-services.md)
   - 实现用户服务
   - 实现帖子服务
   - 定义数据类型

5. [测试和文档](./08.5-testing-docs.md)
   - 创建API测试
   - 编写使用文档
   - 添加示例说明

## 依赖
首先需要安装以下依赖：

```bash
pnpm add @coffic/cosy-framework@workspace:*
pnpm add -D typescript @types/node tsx vitest
```

## 代码组织
项目的代码按以下结构组织：

```
src/
├── controllers/     # 控制器
├── services/       # 业务逻辑服务
├── middleware/     # 自定义中间件
├── types/         # TypeScript 类型定义
├── app.ts         # 应用配置和路由定义
└── server.ts      # 服务器启动入口
```

## 完成标志
- [x] 所有子步骤完成
- [x] 示例项目结构完整
- [x] 所有API端点正常工作
- [x] 中间件功能正确
- [x] 配置系统正常
- [x] 测试通过
- [x] 文档完整

## 下一步
请按顺序完成每个子步骤，从 [08.1-project-structure.md](./08.1-project-structure.md) 开始。

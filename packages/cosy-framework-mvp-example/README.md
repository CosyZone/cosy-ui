# Todo API Example

这是一个使用 Cosy Framework MVP 版本构建的简单 Todo API 示例。

## 功能

- 创建 Todo
- 获取所有 Todo
- 获取单个 Todo
- 更新 Todo
- 删除 Todo
- API 密钥认证

## 安装

```bash
# 安装依赖
pnpm install
```

## 运行

```bash
# 开发模式
pnpm dev

# 或者构建后运行
pnpm build
pnpm start
```

## API 端点

所有请求都需要在请求头中包含 `X-API-Key: test-key`。

### 获取所有 Todo

```bash
curl http://localhost:3000/api/todos \
  -H "X-API-Key: test-key"
```

### 获取单个 Todo

```bash
curl http://localhost:3000/api/todos/1 \
  -H "X-API-Key: test-key"
```

### 创建 Todo

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test-key" \
  -d '{"title": "Learn Cosy Framework"}'
```

### 更新 Todo

```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test-key" \
  -d '{"completed": true}'
```

### 删除 Todo

```bash
curl -X DELETE http://localhost:3000/api/todos/1 \
  -H "X-API-Key: test-key"
```

## 项目结构

```
src/
├── controllers/     # 控制器
│   └── todo-controller.ts
├── services/       # 服务
│   └── todo-service.ts
├── middleware/     # 中间件
│   └── auth-middleware.ts
└── app.ts         # 应用入口
```

## 技术特性

- TypeScript
- 装饰器
- 依赖注入
- 中间件
- 路由参数
- 错误处理 

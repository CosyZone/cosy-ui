# Cosy Framework Example

这是一个使用 Cosy Framework 构建的基础 API 示例项目，展示了框架的核心功能。

## 功能特性

- 🚀 基于 TypeScript 的现代框架
- 🔧 依赖注入容器
- 🛣️ 灵活的路由系统
- 🔒 中间件支持
- ⚙️ 配置管理
- 📝 RESTful API 设计
- 🧪 完整的测试覆盖

## 项目结构

```
src/
├── controllers/     # 控制器（装饰器风格）
├── services/        # 业务逻辑服务
├── middleware/      # 自定义中间件
├── types/          # TypeScript 类型定义
├── app.ts          # 应用配置
└── server.ts       # 服务器启动

config/             # 配置文件
├── app.json        # 基础配置
├── development.json # 开发环境配置
└── production.json  # 生产环境配置

tests/              # 测试文件
```

## 安装和运行

### 1. 安装依赖

```bash
pnpm install
```

### 2. 复制环境变量

```bash
cp .env.example .env
```

### 3. 开发模式运行

```bash
pnpm dev
```

### 4. 构建和生产运行

```bash
pnpm build
pnpm start
```

## API 文档

### 健康检查

```http
GET /health
```

返回应用健康状态。

### 用户 API

#### 获取所有用户

```http
GET /api/v1/users
```

#### 获取单个用户

```http
GET /api/v1/users/{id}
```

#### 创建用户

```http
POST /api/v1/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### 更新用户

```http
PUT /api/v1/users/{id}
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

#### 删除用户

```http
DELETE /api/v1/users/{id}
```

### 文章 API（需要认证）

所有文章 API 需要在请求头中包含认证令牌：

```
Authorization: Bearer valid-token
```

#### 获取所有文章

```http
GET /api/v1/posts
Authorization: Bearer valid-token
```

#### 创建文章

```http
POST /api/v1/posts
Authorization: Bearer valid-token
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my first post."
}
```

## 测试

### 运行单元测试

```bash
pnpm test
```

### 运行 API 集成测试

```bash
pnpm test:api
```

## 示例请求

### 使用 curl

```bash
# 健康检查
curl http://localhost:3000/health

# 获取用户列表
curl http://localhost:3000/api/v1/users

# 创建用户
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# 获取文章（需要认证）
curl http://localhost:3000/api/v1/posts \
  -H "Authorization: Bearer valid-token"

# 创建文章（需要认证）
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer valid-token" \
  -d '{"title":"Hello World","content":"This is my first post"}'
```

## 配置

应用配置通过以下方式管理：

1. **配置文件**: `config/` 目录下的 JSON 文件
2. **环境变量**: 通过 `.env` 文件或系统环境变量
3. **运行时配置**: 通过代码动态设置

### 环境变量优先级

环境变量 > 环境特定配置文件 > 基础配置文件 > 默认值

## 许可证

MIT License 

# 步骤 008：基础示例项目

## 目标
创建一个完整的示例项目，展示框架的基本功能和使用方法。

## 任务清单
- [ ] 创建示例项目结构
- [ ] 实现用户管理 API
- [ ] 添加中间件示例
- [ ] 创建配置文件
- [ ] 编写启动脚本
- [ ] 添加文档说明

## 执行步骤

### 1. 创建示例项目结构

在项目根目录创建示例项目：

```bash
mkdir -p examples/basic-api/{src,config,public}
mkdir -p examples/basic-api/src/{controllers,services,middleware,types}
```

### 2. 创建应用入口文件

**创建文件**: `examples/basic-api/src/app.ts`

```typescript
import { Application, gracefulShutdown, setupErrorHandling } from '@coffic/cosy-framework'
import { cors, logger, errorHandler } from '@coffic/cosy-framework/middleware'
import { UserController } from './controllers/user-controller'
import { PostController } from './controllers/post-controller'
import { AuthMiddleware } from './middleware/auth-middleware'
import { UserService } from './services/user-service'
import { PostService } from './services/post-service'

// 创建应用实例
export const app = Application.create({
  name: 'Basic API Example',
  debug: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT || '3000')
})

// 注册服务
app.bind('UserService', UserService)
app.bind('PostService', PostService)

// 注册中间件
app.middleware('auth', AuthMiddleware)

// 全局中间件
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}))

app.use(logger({
  skip: (context) => context.request.path === '/health'
}))

app.use(errorHandler({
  showStack: app.config('app.debug')
}))

// 健康检查路由
app.get('/health', () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
  uptime: process.uptime()
}))

// API 路由
app.group('/api/v1', (api) => {
  // 用户路由
  api.group('/users', (users) => {
    users.get('/', (context) => {
      const userService = app.resolve<UserService>('UserService')
      return userService.getUsers()
    })

    users.get('/{id}', (context) => {
      const userService = app.resolve<UserService>('UserService')
      const id = parseInt(context.request.params.id)
      return userService.getUserById(id)
    })

    users.post('/', (context) => {
      const userService = app.resolve<UserService>('UserService')
      const userData = context.request.body
      return userService.createUser(userData)
    })

    users.put('/{id}', (context) => {
      const userService = app.resolve<UserService>('UserService')
      const id = parseInt(context.request.params.id)
      const userData = context.request.body
      return userService.updateUser(id, userData)
    })

    users.delete('/{id}', (context) => {
      const userService = app.resolve<UserService>('UserService')
      const id = parseInt(context.request.params.id)
      return userService.deleteUser(id)
    })
  })

  // 需要认证的路由
  api.group({ prefix: '/posts', middleware: AuthMiddleware }, (posts) => {
    posts.get('/', (context) => {
      const postService = app.resolve<PostService>('PostService')
      return postService.getPosts()
    })

    posts.post('/', (context) => {
      const postService = app.resolve<PostService>('PostService')
      const postData = context.request.body
      const userId = (context as any).user?.id
      return postService.createPost(postData, userId)
    })
  })
})

// 错误处理
setupErrorHandling(app)

// 优雅关闭
gracefulShutdown(app)

// 启动应用
if (require.main === module) {
  app.boot().then(() => {
    return app.start()
  }).catch(error => {
    console.error('Failed to start application:', error)
    process.exit(1)
  })
}
```

### 3. 创建服务层

**创建文件**: `examples/basic-api/src/services/user-service.ts`

```typescript
import { Injectable } from '@coffic/cosy-framework'
import { User, CreateUserData, UpdateUserData } from '../types/user'

@Injectable
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date('2024-01-01') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date('2024-01-02') }
  ]

  private nextId = 3

  /**
   * 获取所有用户
   */
  getUsers(): { users: User[]; total: number } {
    return {
      users: this.users,
      total: this.users.length
    }
  }

  /**
   * 根据 ID 获取用户
   */
  getUserById(id: number): { user: User | null } {
    const user = this.users.find(u => u.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return { user }
  }

  /**
   * 创建用户
   */
  createUser(userData: CreateUserData): { user: User; message: string } {
    // 验证邮箱是否已存在
    if (this.users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists')
    }

    const user: User = {
      id: this.nextId++,
      name: userData.name,
      email: userData.email,
      createdAt: new Date()
    }

    this.users.push(user)

    return {
      user,
      message: 'User created successfully'
    }
  }

  /**
   * 更新用户
   */
  updateUser(id: number, userData: UpdateUserData): { user: User; message: string } {
    const userIndex = this.users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    // 检查邮箱是否被其他用户使用
    if (userData.email && this.users.some(u => u.id !== id && u.email === userData.email)) {
      throw new Error('Email already exists')
    }

    const user = this.users[userIndex]
    this.users[userIndex] = {
      ...user,
      ...userData,
      id: user.id, // 保持 ID 不变
      createdAt: user.createdAt // 保持创建时间不变
    }

    return {
      user: this.users[userIndex],
      message: 'User updated successfully'
    }
  }

  /**
   * 删除用户
   */
  deleteUser(id: number): { message: string } {
    const userIndex = this.users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.users.splice(userIndex, 1)

    return {
      message: 'User deleted successfully'
    }
  }

  /**
   * 根据邮箱获取用户（用于认证）
   */
  getUserByEmail(email: string): User | null {
    return this.users.find(u => u.email === email) || null
  }
}
```

**创建文件**: `examples/basic-api/src/services/post-service.ts`

```typescript
import { Injectable } from '@coffic/cosy-framework'
import { Post, CreatePostData } from '../types/post'

@Injectable
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'Welcome to Cosy Framework',
      content: 'This is a sample post using the Cosy Framework.',
      authorId: 1,
      createdAt: new Date('2024-01-01')
    }
  ]

  private nextId = 2

  /**
   * 获取所有文章
   */
  getPosts(): { posts: Post[]; total: number } {
    return {
      posts: this.posts,
      total: this.posts.length
    }
  }

  /**
   * 根据 ID 获取文章
   */
  getPostById(id: number): { post: Post | null } {
    const post = this.posts.find(p => p.id === id)
    if (!post) {
      throw new Error('Post not found')
    }
    return { post }
  }

  /**
   * 创建文章
   */
  createPost(postData: CreatePostData, authorId: number): { post: Post; message: string } {
    const post: Post = {
      id: this.nextId++,
      title: postData.title,
      content: postData.content,
      authorId,
      createdAt: new Date()
    }

    this.posts.push(post)

    return {
      post,
      message: 'Post created successfully'
    }
  }

  /**
   * 获取用户的文章
   */
  getPostsByUserId(userId: number): { posts: Post[]; total: number } {
    const userPosts = this.posts.filter(p => p.authorId === userId)
    return {
      posts: userPosts,
      total: userPosts.length
    }
  }
}
```

### 4. 创建类型定义

**创建文件**: `examples/basic-api/src/types/user.ts`

```typescript
export interface User {
  id: number
  name: string
  email: string
  createdAt: Date
}

export interface CreateUserData {
  name: string
  email: string
}

export interface UpdateUserData {
  name?: string
  email?: string
}
```

**创建文件**: `examples/basic-api/src/types/post.ts`

```typescript
export interface Post {
  id: number
  title: string
  content: string
  authorId: number
  createdAt: Date
}

export interface CreatePostData {
  title: string
  content: string
}
```

### 5. 创建中间件

**创建文件**: `examples/basic-api/src/middleware/auth-middleware.ts`

```typescript
import { MiddlewareHandler, HttpStatus } from '@coffic/cosy-framework'

export const AuthMiddleware: MiddlewareHandler = async (context, next) => {
  const authHeader = context.request.header('authorization')
  
  if (!authHeader) {
    return context.response.status(HttpStatus.UNAUTHORIZED).json({
      error: 'Authorization header required'
    })
  }

  // 简单的令牌验证（实际应用中应该使用 JWT 或其他安全机制）
  if (!authHeader.startsWith('Bearer ')) {
    return context.response.status(HttpStatus.UNAUTHORIZED).json({
      error: 'Invalid authorization format. Use: Bearer <token>'
    })
  }

  const token = authHeader.substring(7)
  
  // 模拟令牌验证
  if (token !== 'valid-token') {
    return context.response.status(HttpStatus.UNAUTHORIZED).json({
      error: 'Invalid token'
    })
  }

  // 模拟用户信息（实际应用中应该从令牌中解析）
  ;(context as any).user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  }

  return next()
}
```

### 6. 创建控制器（装饰器风格）

**创建文件**: `examples/basic-api/src/controllers/user-controller.ts`

```typescript
import { Controller, Get, Post, Put, Delete, Inject } from '@coffic/cosy-framework'
import { UserService } from '../services/user-service'

@Controller('/api/v1/users')
export class UserController {
  constructor(@Inject('UserService') private userService: UserService) {}

  @Get('/')
  async index() {
    return this.userService.getUsers()
  }

  @Get('/{id}')
  async show(context: any) {
    const id = parseInt(context.request.params.id)
    return this.userService.getUserById(id)
  }

  @Post('/')
  async create(context: any) {
    const userData = context.request.body
    return this.userService.createUser(userData)
  }

  @Put('/{id}')
  async update(context: any) {
    const id = parseInt(context.request.params.id)
    const userData = context.request.body
    return this.userService.updateUser(id, userData)
  }

  @Delete('/{id}')
  async destroy(context: any) {
    const id = parseInt(context.request.params.id)
    return this.userService.deleteUser(id)
  }
}
```

**创建文件**: `examples/basic-api/src/controllers/post-controller.ts`

```typescript
import { Controller, Get, Post as PostRoute, UseMiddleware, Inject } from '@coffic/cosy-framework'
import { PostService } from '../services/post-service'
import { AuthMiddleware } from '../middleware/auth-middleware'

@Controller('/api/v1/posts')
@UseMiddleware(AuthMiddleware)
export class PostController {
  constructor(@Inject('PostService') private postService: PostService) {}

  @Get('/')
  async index() {
    return this.postService.getPosts()
  }

  @PostRoute('/')
  async create(context: any) {
    const postData = context.request.body
    const userId = context.user?.id
    return this.postService.createPost(postData, userId)
  }
}
```

### 7. 创建配置文件

**创建文件**: `examples/basic-api/config/app.json`

```json
{
  "app": {
    "name": "Basic API Example",
    "version": "1.0.0",
    "debug": false,
    "port": 3000,
    "host": "0.0.0.0"
  },
  "cors": {
    "origin": "*",
    "credentials": true,
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allowedHeaders": ["Content-Type", "Authorization"]
  },
  "logging": {
    "level": "info",
    "format": "combined"
  }
}
```

**创建文件**: `examples/basic-api/config/development.json`

```json
{
  "app": {
    "debug": true,
    "port": 3000
  },
  "logging": {
    "level": "debug"
  }
}
```

**创建文件**: `examples/basic-api/config/production.json`

```json
{
  "app": {
    "debug": false,
    "port": 8080
  },
  "cors": {
    "origin": ["https://yourdomain.com"],
    "credentials": true
  },
  "logging": {
    "level": "warn"
  }
}
```

### 8. 创建启动脚本

**创建文件**: `examples/basic-api/src/server.ts`

```typescript
import { Bootstrap } from '@coffic/cosy-framework'
import { UserService } from './services/user-service'
import { PostService } from './services/post-service'

async function startServer() {
  const bootstrap = Bootstrap.create({
    configPath: './config',
    hooks: {
      beforeStart: () => {
        console.log('🔄 正在启动服务器...')
      },
      afterStart: () => {
        console.log('✅ 服务器启动成功!')
        console.log('📚 API 文档: http://localhost:3000/docs')
        console.log('🏥 健康检查: http://localhost:3000/health')
      }
    }
  })

  try {
    const app = await bootstrap.start()

    // 注册服务
    app.bind('UserService', UserService)
    app.bind('PostService', PostService)

    // 返回应用实例以便测试
    return app
  } catch (error) {
    console.error('❌ 服务器启动失败:', error)
    process.exit(1)
  }
}

// 如果直接运行此文件，启动服务器
if (require.main === module) {
  startServer()
}

export { startServer }
```

### 9. 创建包配置

**创建文件**: `examples/basic-api/package.json`

```json
{
  "name": "cosy-framework-basic-api",
  "version": "1.0.0",
  "description": "Basic API example using Cosy Framework",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "tsx watch src/server.ts",
    "test": "vitest",
    "test:api": "tsx tests/api.test.ts"
  },
  "dependencies": {
    "@coffic/cosy-framework": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tsx": "^4.0.0",
    "vitest": "^1.0.0",
    "@types/node": "^20.0.0"
  }
}
```

**创建文件**: `examples/basic-api/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "tests"
  ]
}
```

### 10. 创建环境变量文件

**创建文件**: `examples/basic-api/.env.example`

```env
# 应用配置
NODE_ENV=development
PORT=3000
APP_NAME="Basic API Example"
APP_DEBUG=true

# CORS 配置
CORS_ORIGIN=*

# 认证配置
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=24h

# 数据库配置（示例）
DATABASE_URL=postgres://localhost:5432/cosy_app
REDIS_URL=redis://localhost:6379
```

### 11. 创建 API 测试

**创建文件**: `examples/basic-api/tests/api.test.ts`

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { startServer } from '../src/server'
import { Application } from '@coffic/cosy-framework'
import { HttpContext, HttpStatus } from '@coffic/cosy-framework/http'

describe('Basic API Integration Tests', () => {
  let app: Application

  beforeAll(async () => {
    app = await startServer()
  })

  afterAll(async () => {
    if (app.isRunning()) {
      await app.stop()
    }
  })

  describe('Health Check', () => {
    it('should return health status', async () => {
      const context = HttpContext.create({ method: 'GET', url: '/health' })
      const response = await app.handle(context.request)

      expect(response.getStatus()).toBe(HttpStatus.OK)
      
      const body = JSON.parse(response.getContent())
      expect(body).toMatchObject({
        status: 'ok',
        timestamp: expect.any(String),
        uptime: expect.any(Number)
      })
    })
  })

  describe('User API', () => {
    it('should get all users', async () => {
      const context = HttpContext.create({ method: 'GET', url: '/api/v1/users' })
      const response = await app.handle(context.request)

      expect(response.getStatus()).toBe(HttpStatus.OK)
      
      const body = JSON.parse(response.getContent())
      expect(body).toMatchObject({
        users: expect.any(Array),
        total: expect.any(Number)
      })
      expect(body.users.length).toBeGreaterThan(0)
    })

    it('should get user by id', async () => {
      const context = HttpContext.create({ method: 'GET', url: '/api/v1/users/1' })
      const response = await app.handle(context.request)

      expect(response.getStatus()).toBe(HttpStatus.OK)
      
      const body = JSON.parse(response.getContent())
      expect(body).toMatchObject({
        user: {
          id: 1,
          name: expect.any(String),
          email: expect.any(String),
          createdAt: expect.any(String)
        }
      })
    })

    it('should return 404 for non-existent user', async () => {
      const context = HttpContext.create({ method: 'GET', url: '/api/v1/users/999' })
      const response = await app.handle(context.request)

      expect(response.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
      
      const body = JSON.parse(response.getContent())
      expect(body.error).toContain('User not found')
    })

    it('should create new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com'
      }

      const context = HttpContext.create({
        method: 'POST',
        url: '/api/v1/users',
        body: userData
      })
      const response = await app.handle(context.request)

      expect(response.getStatus()).toBe(HttpStatus.OK)
      
      const body = JSON.parse(response.getContent())
      expect(body).toMatchObject({
        user: {
          id: expect.any(Number),
          name: userData.name,
          email: userData.email,
          createdAt: expect.any(String)
        },
        message: 'User created successfully'
      })
    })
  })

  describe('Post API (Authenticated)', () => {
    it('should require authentication', async () => {
      const context = HttpContext.create({ method: 'GET', url: '/api/v1/posts' })
      const response = await app.handle(context.request)

      expect(response.getStatus()).toBe(HttpStatus.UNAUTHORIZED)
      
      const body = JSON.parse(response.getContent())
      expect(body.error).toContain('Authorization header required')
    })

    it('should get posts with valid token', async () => {
      const context = HttpContext.create({
        method: 'GET',
        url: '/api/v1/posts',
        headers: {
          authorization: 'Bearer valid-token'
        }
      })
      const response = await app.handle(context.request)

      expect(response.getStatus()).toBe(HttpStatus.OK)
      
      const body = JSON.parse(response.getContent())
      expect(body).toMatchObject({
        posts: expect.any(Array),
        total: expect.any(Number)
      })
    })

    it('should create post with valid token', async () => {
      const postData = {
        title: 'Test Post',
        content: 'This is a test post content.'
      }

      const context = HttpContext.create({
        method: 'POST',
        url: '/api/v1/posts',
        headers: {
          authorization: 'Bearer valid-token'
        },
        body: postData
      })
      const response = await app.handle(context.request)

      expect(response.getStatus()).toBe(HttpStatus.OK)
      
      const body = JSON.parse(response.getContent())
      expect(body).toMatchObject({
        post: {
          id: expect.any(Number),
          title: postData.title,
          content: postData.content,
          authorId: expect.any(Number),
          createdAt: expect.any(String)
        },
        message: 'Post created successfully'
      })
    })
  })
})
```

### 12. 创建文档

**创建文件**: `examples/basic-api/README.md`

```markdown
# Basic API Example

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
npm install
```

### 2. 复制环境变量

```bash
cp .env.example .env
```

### 3. 开发模式运行

```bash
npm run dev
```

### 4. 构建和生产运行

```bash
npm run build
npm start
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
npm test
```

### 运行 API 集成测试

```bash
npm run test:api
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

## 扩展功能

这个示例展示了 Cosy Framework 的基础功能。你可以基于此示例添加：

- 数据库集成（PostgreSQL、MySQL、MongoDB）
- 认证和授权（JWT、OAuth）
- 文件上传处理
- 缓存（Redis）
- 任务队列
- WebSocket 支持
- 静态文件服务
- API 文档生成
- 日志管理
- 监控和指标

## 许可证

MIT License
```

### 13. 创建启动脚本文件

**创建文件**: `examples/basic-api/scripts/start.sh`

```bash
#!/bin/bash

# Basic API Example 启动脚本

echo "🚀 启动 Cosy Framework Basic API Example"

# 检查 Node.js 版本
NODE_VERSION=$(node -v)
echo "Node.js 版本: $NODE_VERSION"

# 设置环境变量
export NODE_ENV=${NODE_ENV:-development}
echo "环境: $NODE_ENV"

# 构建项目
echo "📦 构建项目..."
npm run build

# 启动应用
echo "🌟 启动应用..."
npm start
```

**创建文件**: `examples/basic-api/scripts/dev.sh`

```bash
#!/bin/bash

# 开发模式启动脚本

echo "🔧 启动开发模式"

# 设置开发环境
export NODE_ENV=development
export APP_DEBUG=true

# 启动开发服务器
npm run dev
```

使脚本可执行：
```bash
chmod +x examples/basic-api/scripts/*.sh
```

## 验证步骤

### 1. 构建框架
```bash
cd packages/cosy-framework
npm run build
```

### 2. 安装示例项目依赖
```bash
cd examples/basic-api
npm install
```

### 3. 运行示例项目
```bash
npm run dev
```

### 4. 测试 API 端点

在另一个终端中测试：

```bash
# 健康检查
curl http://localhost:3000/health

# 用户 API
curl http://localhost:3000/api/v1/users

# 创建用户
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# 认证测试
curl http://localhost:3000/api/v1/posts \
  -H "Authorization: Bearer valid-token"
```

### 5. 运行测试
```bash
npm test
```

## 完成标志

- [ ] 示例项目结构完整
- [ ] 所有 API 端点正常工作
- [ ] 中间件功能正确
- [ ] 配置系统正常
- [ ] 测试通过
- [ ] 文档完整

## 下一步

完成此步骤后，基础的 Cosy Framework 就已经完成了！你可以：

1. 继续添加更多功能（数据库、认证、文件上传等）
2. 优化性能和错误处理
3. 添加更多中间件和工具
4. 创建更多示例项目
5. 编写详细的使用文档

这个基础示例展示了框架的核心功能，为后续扩展奠定了坚实的基础。 

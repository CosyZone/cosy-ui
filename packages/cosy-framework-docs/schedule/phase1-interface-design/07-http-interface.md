# HTTP 基础接口设计

## 设计目标

HTTP 基础模块提供了对 HTTP 请求和响应的抽象，以及中间件系统的基础设施。设计目标包括：

1. 提供统一的请求/响应抽象
2. 实现可扩展的中间件系统
3. 支持请求上下文管理
4. 提供类型安全的 API
5. 支持现代 Web 功能

## 核心接口

### 1. 请求接口

```typescript
interface RequestInterface {
  // 基本属性
  method: HttpMethod;
  url: string;
  path: string;
  query: Record<string, string>;
  params: Record<string, string>;
  headers: Record<string, string>;
  body: any;
  
  // 请求信息
  protocol(): string;
  host(): string;
  ip(): string;
  secure(): boolean;
  
  // 请求检查
  is(type: string): boolean;
  accepts(types: string[]): string | false;
  
  // 数据访问
  get(field: string): string | undefined;
  header(name: string): string | undefined;
  
  // 扩展数据
  context: Context;
  raw: any;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
```

### 2. 响应接口

```typescript
interface ResponseInterface {
  // 状态控制
  status(code: number): this;
  getStatus(): number;
  
  // 头部控制
  header(name: string, value: string): this;
  getHeader(name: string): string | undefined;
  removeHeader(name: string): this;
  
  // 响应数据
  send(data: any): this;
  json(data: any): this;
  html(content: string): this;
  
  // 响应控制
  redirect(url: string, code?: number): this;
  download(path: string, filename?: string): this;
  
  // 响应检查
  sent(): boolean;
  finished(): boolean;
  
  // 扩展数据
  context: Context;
  raw: any;
}
```

### 3. 上下文接口

```typescript
interface Context {
  // 请求/响应
  request: RequestInterface;
  response: ResponseInterface;
  
  // 状态数据
  state: Map<string, any>;
  
  // 工具方法
  get(key: string): any;
  set(key: string, value: any): this;
  
  // 请求处理
  next(): Promise<void>;
  throw(status: number, message?: string): void;
}
```

### 4. 中间件接口

```typescript
interface MiddlewareInterface {
  handle(context: Context, next: Next): Promise<void>;
}

type Next = () => Promise<void>;

// 中间件处理器类型
type MiddlewareHandler = (context: Context, next: Next) => Promise<void>;
```

## 扩展接口

### 1. 文件上传

```typescript
interface UploadedFile {
  // 文件信息
  filename: string;
  mimetype: string;
  size: number;
  
  // 文件操作
  buffer(): Promise<Buffer>;
  stream(): ReadStream;
  save(path: string): Promise<void>;
}

interface FileUploadInterface {
  // 文件访问
  file(field: string): UploadedFile | undefined;
  files(field: string): UploadedFile[];
  
  // 上传控制
  maxSize(size: number): this;
  allowTypes(types: string[]): this;
}
```

### 2. Cookie 管理

```typescript
interface CookieInterface {
  // Cookie 读写
  get(name: string): string | undefined;
  set(name: string, value: string, options?: CookieOptions): this;
  remove(name: string): this;
  
  // Cookie 选项
  signed(): boolean;
  secure(): boolean;
}

interface CookieOptions {
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  maxAge?: number;
  expires?: Date;
  signed?: boolean;
}
```

### 3. Session 管理

```typescript
interface SessionInterface {
  // 会话数据
  id: string;
  data: Record<string, any>;
  
  // 数据操作
  get<T>(key: string): T | undefined;
  set<T>(key: string, value: T): this;
  remove(key: string): this;
  
  // 会话控制
  regenerate(): Promise<void>;
  destroy(): Promise<void>;
  touch(): Promise<void>;
}
```

## 工厂接口

### 1. 请求工厂

```typescript
interface RequestFactory {
  // 创建请求
  create(options: RequestOptions): RequestInterface;
  createFromNode(req: IncomingMessage): RequestInterface;
  createFromFetch(req: Request): RequestInterface;
}

interface RequestOptions {
  method?: HttpMethod;
  url?: string;
  headers?: Record<string, string>;
  body?: any;
  query?: Record<string, string>;
}
```

### 2. 响应工厂

```typescript
interface ResponseFactory {
  // 创建响应
  create(): ResponseInterface;
  createFromNode(res: ServerResponse): ResponseInterface;
  createFromFetch(res: Response): ResponseInterface;
}
```

## 错误处理

```typescript
class HttpError extends Error {
  constructor(
    public status: number,
    message?: string,
    public details?: any
  ) {
    super(message);
  }
}

interface ErrorHandlerInterface {
  // 错误处理
  handle(error: Error, context: Context): Promise<void>;
  
  // 错误转换
  toHttpError(error: Error): HttpError;
  
  // 错误响应
  sendError(error: HttpError, context: Context): Promise<void>;
}
```

## 使用示例

### 1. 基本请求处理

```typescript
app.use(async (context, next) => {
  const { request, response } = context;
  
  // 请求信息
  console.log(`${request.method} ${request.path}`);
  
  // 处理请求
  if (request.is('application/json')) {
    const data = request.body;
    // 处理 JSON 数据
  }
  
  // 设置响应
  response
    .status(200)
    .header('Content-Type', 'application/json')
    .json({ success: true });
});
```

### 2. 文件上传处理

```typescript
app.use(async (context, next) => {
  const file = context.request.file('avatar');
  
  if (file) {
    // 验证文件
    if (!file.mimetype.startsWith('image/')) {
      throw new HttpError(400, 'Only images are allowed');
    }
    
    // 保存文件
    await file.save('/uploads/' + file.filename);
    
    // 响应
    context.response.json({
      filename: file.filename,
      size: file.size
    });
  }
});
```

### 3. 会话管理

```typescript
app.use(async (context, next) => {
  const session = context.request.session;
  
  // 读取会话数据
  const userId = session.get<string>('userId');
  
  if (userId) {
    // 更新最后访问时间
    session.set('lastAccess', new Date());
    await session.touch();
  } else {
    // 创建新会话
    session.set('userId', generateId());
    await session.regenerate();
  }
});
```

## 注意事项

1. **类型安全**
   - 使用 TypeScript 类型
   - 避免 any 类型
   - 提供类型推导

2. **性能优化**
   - 流式处理
   - 内存管理
   - 缓存策略

3. **安全考虑**
   - 输入验证
   - XSS 防护
   - CSRF 保护

## 下一步

理解了 HTTP 基础接口后，我们将：

1. 学习路由系统接口
2. 了解中间件系统接口
3. 掌握配置系统接口

请继续阅读 [02.3-routing.md](./02.3-routing.md) 了解路由系统接口设计。 

---
title: HTTP 基础接口设计
---

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
  context: IHttpContext;
  raw: any;
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS'
}
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
  context: IHttpContext;
  raw: any;
}
```

### 3. HTTP 上下文接口

```typescript
interface IHttpContext {
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
  handle(context: IHttpContext, next: Next): Promise<void>;
}

type Next = () => Promise<void>;
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
  sameSite?: SameSite;
  maxAge?: number;
  expires?: Date;
  signed?: boolean;
}

enum SameSite {
  Strict = 'Strict',
  Lax = 'Lax',
  None = 'None'
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

## 导出模块

在 `src/http/index.ts` 中导出所有类型：

```typescript
export * from './interfaces';
export * from './types';
export * from './constants';
```

## 下一步

完成本节后，你应该已经：
1. 在 cosy-framework-design 项目中创建了完整的 HTTP 接口设计
2. 理解了 HTTP 模块的核心概念和实现方式
3. 掌握了请求处理和中间件的设计原则

继续阅读 [07-routing-interface.md](./07-routing-interface.md) 来学习路由接口的设计。 

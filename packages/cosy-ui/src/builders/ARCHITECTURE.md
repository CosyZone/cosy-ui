# Props Builder 架构文档

## 概述

Props Builder 是 CosyUI 的内部工具，提供链式调用的方式来构建组件 props。本文档详细说明其内部架构设计。

## 架构设计

### 1. 核心层次结构

```
PropsBuilder (基类)
    ↓ 继承
AlertPropsBuilder (Alert 专用)
ButtonPropsBuilder (Button 专用)
CardPropsBuilder (Card 专用)
... (其他组件)
```

### 2. PropsBuilder 基类

**文件**: `src/builders/PropsBuilder.ts`

```typescript
export class PropsBuilder<T extends Record<string, any>> {
  private props: Partial<T> = {};
  
  protected set<K extends keyof T>(key: K, value: T[K]): this {
    this.props[key] = value;
    return this;
  }
  
  merge(props: Partial<T>): this {
    Object.assign(this.props, props);
    return this;
  }
  
  build(): Partial<T> {
    return { ...this.props };
  }
}
```

**职责**:

- 维护内部 props 对象
- 提供 `set()` 方法用于子类设置属性
- 提供 `merge()` 方法用于批量合并属性
- 提供 `build()` 方法返回最终 props 对象

**设计原则**:

- **泛型设计**: 使用 TypeScript 泛型 `<T>` 确保类型安全
- **protected set**: `set()` 方法为 `protected`，只允许子类使用
- **不可变性**: `build()` 返回 props 的浅拷贝，避免外部修改

### 3. 专用 Props Builder

以 `AlertPropsBuilder` 为例：

**文件**: `src/builders/AlertPropsBuilder.ts`

```typescript
export class AlertPropsBuilder extends PropsBuilder<IAlertPropsBase> {
  // 属性方法
  type(value: "info" | "success" | "warning" | "error"): this {
    return this.set('type', value);
  }
  
  // 快捷方法
  info(): this { return this.type('info'); }
  success(): this { return this.type('success'); }
  warning(): this { return this.type('warning'); }
  error(): this { return this.type('error'); }
  
  // 其他属性方法...
}
```

**设计模式**:

#### 3.1 属性方法模式

每个 props 属性都有对应的方法：

```typescript
// prop: title
title(value: string): this {
  return this.set('title', value);
}
```

**命名规则**: 方法名与 prop 名称完全一致

#### 3.2 快捷方法模式

为常用值提供无参数快捷方法：

```typescript
// 快捷方法：无参数，直接设置常用值
info(): this { return this.type('info'); }

// 等价于
// alertProps().type('info')
```

**优势**:

- 减少样板代码
- 提高可读性
- 编辑器自动补全更友好

### 4. 工厂函数

每个 Props Builder 都提供工厂函数：

```typescript
export function alertProps(): AlertPropsBuilder {
  return new AlertPropsBuilder();
}
```

**为什么使用工厂函数而不是直接 new**:

- ✅ 使用更简洁: `alertProps()` vs `new AlertPropsBuilder()`
- ✅ 可以挂载静态快捷方法
- ✅ 未来可以扩展（如对象池、缓存等）

### 5. 静态快捷方法

为工厂函数添加静态快捷方法：

```typescript
alertProps.info = () => alertProps().info();
alertProps.success = () => alertProps().success();
alertProps.warning = () => alertProps().warning();
alertProps.error = () => alertProps().error();
```

**使用示例**:

```typescript
// 使用静态快捷方法
alertProps.error().title("错误").build()

// 等价于
alertProps().error().title("错误").build()
```

**优势**:

- 代码更简洁（省略一对括号）
- 常用场景更便捷

## 类型安全

### 1. 基于 TypeScript 泛型

```typescript
class PropsBuilder<T extends Record<string, any>> {
  private props: Partial<T> = {};
}
```

- `T`: 组件 props 接口类型
- `Partial<T>`: 所有属性都是可选的
- `Record<string, any>`: 确保 T 是对象类型

### 2. 严格的类型约束

```typescript
type(value: "info" | "success" | "warning" | "error"): this {
  return this.set('type', value);
}
```

- 参数类型严格限制为联合类型
- 编译时检查，防止传入错误值
- 编辑器自动补全所有可能值

### 3. 类型推断

```typescript
const props = alertProps()
  .success()
  .title("成功")
  .build();

// TypeScript 推断 props 类型为:
// Partial<IAlertPropsBase>
// 包含: { type?: "success", title?: "成功", ... }
```

## 设计模式

### 1. Builder 模式

经典的 Builder 设计模式：

```typescript
alertProps()      // 创建 builder
  .success()      // 配置属性 1
  .title("成功")  // 配置属性 2
  .build()        // 构建最终对象
```

**优势**:

- 分步构建复杂对象
- 链式调用提高可读性
- 可选属性处理更优雅

### 2. 模板方法模式

基类定义框架，子类实现具体方法：

```typescript
// 基类提供 set() 和 build()
class PropsBuilder<T> {
  protected set(key, value) { ... }
  build() { ... }
}

// 子类实现具体的属性方法
class AlertPropsBuilder extends PropsBuilder<IAlertPropsBase> {
  title(value: string) {
    return this.set('title', value);
  }
}
```

### 3. Fluent Interface（流式接口）

所有方法返回 `this` 支持链式调用：

```typescript
title(value: string): this {
  return this.set('title', value);
}
```

## 扩展性

### 1. 添加新的组件 Props Builder

在对应组件目录下创建新文件 `src/components/button/ButtonPropsBuilder.ts`:

```typescript
import { PropsBuilder } from '../../builders/PropsBuilder';
import type { IButtonProps } from './buttonPropsBase';

export class ButtonPropsBuilder extends PropsBuilder<IButtonProps> {
  variant(value: 'primary' | 'secondary'): this {
    return this.set('variant', value);
  }
  
  primary(): this { return this.variant('primary'); }
  secondary(): this { return this.variant('secondary'); }
}

export function buttonProps(): ButtonPropsBuilder {
  return new ButtonPropsBuilder();
}

buttonProps.primary = () => buttonProps().primary();
```

### 2. 添加通用方法

如果需要所有 Props Builder 共享某些方法，在基类中添加：

```typescript
class PropsBuilder<T> {
  // 已有方法...
  
  // 新增通用方法
  if(condition: boolean, callback: (builder: this) => this): this {
    return condition ? callback(this) : this;
  }
}

// 使用
alertProps()
  .success()
  .if(showTitle, (builder) => builder.title("标题"))
  .build()
```

## 性能考虑

### 1. 对象创建

每次调用工厂函数都创建新实例：

```typescript
alertProps() // 创建新的 AlertPropsBuilder 实例
```

**优化点**:

- 实例轻量，创建成本低
- 无状态共享，避免副作用
- 可考虑对象池（如有性能瓶颈）

### 2. build() 方法

返回 props 的浅拷贝：

```typescript
build(): Partial<T> {
  return { ...this.props };
}
```

**设计理由**:

- 防止外部修改内部 props
- 浅拷贝成本低
- props 值通常是基本类型或不可变对象

## 与 ClassBuilder 的对比

| 特性 | ClassBuilder | PropsBuilder |
|------|-------------|-------------|
| **目的** | 构建 CSS 类名字符串 | 构建组件 props 对象 |
| **输出** | `string` | `Partial<T>` |
| **组合方式** | 多个子 Builder | 继承基类 |
| **使用场景** | class 属性 | 组件所有 props |
| **示例** | `cn().flex().gap(4).build()` | `alertProps().success().title("成功").build()` |

**共同点**:

- 都是内部工具
- 链式调用
- 类型安全
- Builder 模式

## 文件组织

```
src/
├── builders/
│   ├── PropsBuilder.ts          # 通用基类
│   ├── index.ts                 # 统一导出（重新导出各组件的 Builder）
│   ├── README.md                # 使用文档
│   └── ARCHITECTURE.md          # 本文档
│
└── components/
    ├── alert/
    │   ├── AlertPropsBuilder.ts # Alert 专用 Builder
    │   ├── alertPropsBase.ts    # Alert props 接口
    │   ├── class-all.ts         # Alert class 辅助
    │   └── ...
    │
    ├── button/
    │   ├── ButtonPropsBuilder.ts # Button 专用 Builder（未来）
    │   └── ...
    │
    └── card/
        ├── CardPropsBuilder.ts   # Card 专用 Builder（未来）
        └── ...
```

**设计理念**:

- `builders/` 目录：只保留通用基类和统一导出
- 各组件专用 Builder：放在对应组件目录下
- 符合关注点分离原则：Alert 相关的所有文件都在 `components/alert/` 中

## 总结

Props Builder 采用经典的 Builder 设计模式，通过 TypeScript 泛型提供类型安全的链式 API。核心设计原则：

1. **单一职责**: 每个 Builder 只负责一个组件的 props
2. **开闭原则**: 基类稳定，通过继承扩展新组件
3. **类型安全**: 充分利用 TypeScript 类型系统
4. **易用性**: 提供快捷方法和静态方法
5. **可维护性**: 清晰的文件组织和文档

这种设计使得 Props Builder 既灵活又易于扩展，为 CosyUI 组件开发提供了强大的内部工具支持。

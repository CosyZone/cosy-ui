# Props Builders

## 概述

Props Builders 是 CosyUI 的**内部工具**，提供链式调用的方式来构建组件 props，使组件使用更加优雅、类型安全且易于维护。

> **注意**: Props Builders 是 CosyUI 内部开发工具，仅供组件库开发者使用，不对外部用户暴露。

## 设计理念

### 问题

传统的 props 传递方式在处理多个属性时会显得冗长：

```astro
<Alert 
  type="success"
  title="操作成功"
  description="您的更改已保存"
  closable={false}
  showIcon={true}
  variant="solid"
/>
```

### 解决方案

使用 Props Builder 提供链式调用的方式：

```astro
<Alert {...alertProps()
  .success()
  .title("操作成功")
  .description("您的更改已保存")
  .closable(false)
  .build()}>
  详细信息
</Alert>
```

### 优势

- ✅ **类型安全**: TypeScript 提供完整的类型检查和自动补全
- ✅ **链式调用**: 类似 SwiftUI 的流式 API，代码更加优雅
- ✅ **可读性强**: 方法名清晰表达意图
- ✅ **易于维护**: 集中管理 props 构建逻辑
- ✅ **快捷方法**: 提供常用场景的快捷方法（如 `.info()`, `.success()`）

## 使用指南

### Alert Props Builder

```astro
---
import { Alert, alertProps } from '@coffic/cosy-ui';
---

<!-- 基础用法 -->
<Alert {...alertProps().info().build()}>
  这是一条信息提示
</Alert>

<!-- 链式调用多个属性 -->
<Alert {...alertProps()
  .success()
  .title("操作成功")
  .description("您的更改已成功保存")
  .closable(false)
  .showIcon(true)
  .build()}>
  详细信息
</Alert>

<!-- 使用快捷静态方法 -->
<Alert {...alertProps.error()
  .title("提交失败")
  .description("请检查表单并重新提交")
  .build()}>
  错误详情
</Alert>

<!-- 使用 merge() 合并已有 props -->
<Alert {...alertProps()
  .warning()
  .merge({ class: 'custom-alert' })
  .build()}>
  警告信息
</Alert>
```

### 可用方法

#### 类型方法

- `type(value)` - 设置提示类型
- `info()` - 快捷方法：设置为信息类型
- `success()` - 快捷方法：设置为成功类型
- `warning()` - 快捷方法：设置为警告类型
- `error()` - 快捷方法：设置为错误类型

#### 内容方法

- `title(value)` - 设置标题
- `description(value)` - 设置描述文本

#### 样式方法

- `variant(value)` - 设置样式变体（solid/outline/dash/soft）
- `class(value)` - 设置自定义 CSS 类名
- `marginY(value)` - 设置垂直外边距

#### 行为方法

- `closable(value)` - 设置是否可关闭
- `showIcon(value)` - 设置是否显示图标

#### 通用方法

- `merge(props)` - 合并多个属性
- `build()` - 构建最终的 props 对象

## 架构设计

### 基类：PropsBuilder

通用的 Props 构建器基类，提供核心功能：

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

### 专用 Builder

每个组件都可以创建自己的 Props Builder，继承 `PropsBuilder` 基类：

```typescript
export class AlertPropsBuilder extends PropsBuilder<IAlertPropsBase> {
  info(): this {
    return this.set('type', 'info');
  }
  
  title(value: string): this {
    return this.set('title', value);
  }
  
  // ... 其他方法
}
```

### 工厂函数

提供工厂函数和快捷静态方法：

```typescript
export function alertProps(): AlertPropsBuilder {
  return new AlertPropsBuilder();
}

// 快捷静态方法
alertProps.info = () => alertProps().info();
alertProps.success = () => alertProps().success();
// ...
```

## 为其他组件创建 Props Builder

### 步骤

1. **创建 Builder 类文件**

在对应的组件目录下创建 Builder 文件：

```typescript
// src/components/button/ButtonPropsBuilder.ts
import { PropsBuilder } from '../../builders/PropsBuilder';
import type { IButtonProps } from './buttonPropsBase';

export class ButtonPropsBuilder extends PropsBuilder<IButtonProps> {
  // 为每个 prop 添加对应方法
  variant(value: 'primary' | 'secondary' | 'outline'): this {
    return this.set('variant', value);
  }
  
  // 添加快捷方法
  primary(): this {
    return this.variant('primary');
  }
  
  size(value: 'sm' | 'md' | 'lg'): this {
    return this.set('size', value);
  }
  
  disabled(value: boolean): this {
    return this.set('disabled', value);
  }
}

// 工厂函数
export function buttonProps(): ButtonPropsBuilder {
  return new ButtonPropsBuilder();
}

// 快捷静态方法
buttonProps.primary = () => buttonProps().primary();
buttonProps.secondary = () => buttonProps().secondary();
```

2. **在 builders/index.ts 中重新导出**

```typescript
export { ButtonPropsBuilder, buttonProps } from '../components/button/ButtonPropsBuilder';
```

3. **在 index-astro.ts 中导出（内部工具）**

```typescript
export { buttonProps } from './src/builders';
```

### 命名规范

- **Builder 类**: `{ComponentName}PropsBuilder`（如 `AlertPropsBuilder`）
- **工厂函数**: `{componentName}Props`（如 `alertProps`）
- **文件名**: `{ComponentName}PropsBuilder.ts`（如 `AlertPropsBuilder.ts`）
- **文件位置**: `src/components/{component}/{ComponentName}PropsBuilder.ts`

### 方法设计原则

1. **为每个 prop 创建对应方法**: 方法名与 prop 名称一致
2. **提供快捷方法**: 为常用值提供无参数的快捷方法（如 `.info()`, `.primary()`）
3. **保持链式调用**: 所有方法都返回 `this`
4. **类型安全**: 充分利用 TypeScript 的类型系统

## 最佳实践

### 1. 使用快捷方法

```typescript
// ✅ 好
alertProps().success()

// ❌ 不推荐
alertProps().type('success')
```

### 2. 合理使用 merge()

```typescript
// 当需要批量设置或合并已有 props 时使用
const baseProps = { class: 'my-alert', showIcon: false };
alertProps().info().merge(baseProps).build()
```

### 3. 保持链式调用的可读性

```typescript
// ✅ 好：每个方法单独一行
const props = alertProps()
  .success()
  .title("操作成功")
  .description("您的更改已保存")
  .closable(false)
  .build();

// ❌ 不推荐：过长的单行
const props = alertProps().success().title("操作成功").description("您的更改已保存").closable(false).build();
```

## 与 ClassBuilder 的关系

Props Builders 和 [ClassBuilder](../class/README.md) 是互补的内部工具：

- **ClassBuilder**: 用于构建 CSS 类名字符串
- **PropsBuilder**: 用于构建组件 props 对象

它们可以配合使用：

```astro
<Alert {...alertProps()
  .success()
  .class(cn().flex('row').gap(4).build())
  .build()}>
  组合使用示例
</Alert>
```

## 注意事项

⚠️ **内部工具**: Props Builders 仅供 CosyUI 内部开发使用，不对外部用户暴露

⚠️ **不要滥用**: 只在需要设置多个 props 或需要快捷方法时使用，简单场景直接传递 props 即可

⚠️ **保持同步**: 当组件 props 接口更新时，记得同步更新对应的 PropsBuilder

# ClassBuilder - 内部类名构建工具

## ⚠️ 重要说明

**ClassBuilder 仅供 Cosy UI 组件库内部使用，不对外暴露给用户。**

用户使用 Cosy UI 时，直接使用组件的 props 来配置样式，无需使用 ClassBuilder。

## 内部用途

ClassBuilder 用于在组件内部统一管理和构建 CSS 类名，采用关注点分离的架构设计。

### 在组件中使用

```astro
---
// 仅在组件内部导入
import { cn } from '../../src/class';

// 构建类名
const containerClass = cn()
  .flex('row')
  .items('center')
  .gap(4)
  .w('full')
  .build();
---

<div class={containerClass}>
  <slot />
</div>
```

## 架构设计

ClassBuilder 内部将不同类型的CSS类名构建逻辑拆分到独立的 Builder 中：

- **LayoutBuilder**: 负责布局 (flex, items, justify)
- **SpacingBuilder**: 负责间距 (gap, padding, margin)
- **SizeBuilder**: 负责尺寸 (w, h, min*, max*)
- **TextBuilder**: 负责文本 (text, bold, color, align, weight)
- **OpacityBuilder**: 负责透明度 (opacity, bgOpacity, textOpacity)
- **PositionBuilder**: 负责定位 (auto, relative, absolute, fixed)

这些专门的 Builder 都是内部实现细节，统一通过 `cn()` 函数使用。

## API 文档

### cn() - 创建 ClassBuilder 实例

所有方法都支持链式调用，最后调用 `.build()` 生成类名字符串。

#### 布局方法

- `flex(direction?)` - 添加 flex 布局
- `inline()` - 添加 inline-flex
- `items(align)` - flex 项目垂直对齐
- `justify(align)` - flex 项目水平对齐

#### 间距方法

- `gap(size)` - 设置间距
- `padding(size)` - 设置内边距
- `margin(size)` - 设置外边距

#### 尺寸方法

- `w(size)` - 设置宽度
- `h(size)` - 设置高度
- `minW(size)` - 设置最小宽度
- `minH(size)` - 设置最小高度
- `maxW(size)` - 设置最大宽度
- `maxH(size)` - 设置最大高度

#### 文本方法

- `text(size)` - 设置文本大小
- `bold()` - 设置文本加粗
- `color(color)` - 设置文本颜色
- `align(align)` - 设置文本对齐
- `weight(weight)` - 设置字体粗细

#### 透明度方法

- `opacity(value)` - 设置元素透明度
- `bgOpacity(value)` - 设置背景透明度
- `textOpacity(value)` - 设置文本透明度

#### 定位方法

- `auto()` - margin-left: auto (右对齐)
- `autoRight()` - margin-right: auto (左对齐)
- `autoCenter()` - margin: auto (居中)
- `relative()` - position: relative
- `absolute()` - position: absolute
- `fixed()` - position: fixed

#### 通用方法

- `add(...classNames)` - 添加自定义类名
- `build()` - 构建最终的类名字符串

## 使用示例

### 示例 1：Alert 组件

```astro
---
import { cn } from '../../src/class';

const containerClass = cn()
  .flex('row')
  .items('center')
  .gap(4)
  .justify('between')
  .w('full')
  .build();

const iconBtnClass = cn()
  .add('cosy:btn', 'cosy:btn-ghost', 'cosy:btn-circle', 'cosy:btn-sm')
  .build();
---

<div class={containerClass}>
  <button class={iconBtnClass}>图标</button>
</div>
```

### 示例 2：动态构建

```typescript
const builder = cn().flex('col');

if (isCenter) {
  builder.items('center');
}

if (hasGap) {
  builder.gap(4);
}

const className = builder.build();
```

### 示例 3：复杂组合

```typescript
const className = cn()
  .flex('row')
  .items('center')
  .gap(4)
  .padding(8)
  .w('full')
  .build();
```

## 设计原则

1. **内部工具**: 仅供组件库内部使用
2. **关注点分离**: 内部使用多个专门的 Builder 实现
3. **链式调用**: 提供流畅的 API 体验
4. **类型安全**: 完整的 TypeScript 类型支持
5. **统一管理**: 集中管理所有类名构建逻辑

## Tailwind CSS 兼容性

ClassBuilder 使用**类名映射表**而非动态拼接，确保 Tailwind CSS 可以正确扫描到所有类名。

所有支持的值都在映射表中预定义，这样：

- ✅ Tailwind 能正确生成CSS
- ✅ TypeScript 提供完整的类型检查
- ✅ IDE 有完整的自动补全
- ✅ 强制使用标准值（最佳实践）

详见 [TAILWIND-COMPATIBILITY.md](./TAILWIND-COMPATIBILITY.md)

## 架构文档

详细架构说明请参考 [ARCHITECTURE.md](./ARCHITECTURE.md)

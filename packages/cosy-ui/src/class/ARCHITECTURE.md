# ClassBuilder 架构设计文档

## 🎯 设计目标

实现关注点分离（Separation of Concerns），将不同类型的CSS类名构建逻辑拆分到独立的 Builder 中。

## 📐 架构图

```
┌──────────────────────────────────────────┐
│         ClassBuilder (主入口)             │
│  - 提供统一的链式 API                      │
│  - 保持调用顺序                           │
│  - 委托给专门的 Builder                   │
└──────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │     组合关系            │
        │   (Composition)        │
        └───────────┬───────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ▼               ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐
│ Layout  │   │Spacing  │   │  Size   │
│ Builder │   │ Builder │   │ Builder │
└─────────┘   └─────────┘   └─────────┘
    │               │               │
    ▼               ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐
│  Text   │   │ Opacity │   │Position │
│ Builder │   │ Builder │   │ Builder │
└─────────┘   └─────────┘   └─────────┘
```

## 🏗️ 核心设计模式

### 1. 组合模式 (Composition Pattern)

ClassBuilder 通过组合多个专门的 Builder 来提供完整功能：

```typescript
class ClassBuilder {
  // 使用组合而非继承
  private classes: string[] = [];
  
  // 委托给专门的 Builder
  flex(direction) {
    const tempBuilder = new LayoutBuilder();
    tempBuilder.flex(direction);
    this.classes.push(...tempBuilder.getClasses());
    return this;
  }
}
```

**优势**:

- 灵活性高：可以自由组合不同的 Builder
- 易于扩展：添加新 Builder 不影响现有代码
- 职责清晰：每个 Builder 专注于自己的领域

### 2. 建造者模式 (Builder Pattern)

提供链式 API 来构建复杂的类名字符串：

```typescript
const className = cn()
  .flex('row')
  .items('center')
  .gap(4)
  .w('full')
  .build();
```

**优势**:

- 可读性好：代码像句子一样自然
- 灵活性高：可以按需组合
- 类型安全：TypeScript 提供完整的类型检查

### 3. 单一职责原则 (Single Responsibility Principle)

每个 Builder 只负责一个特定领域：

| Builder | 职责 | 示例方法 |
|---------|------|---------|
| LayoutBuilder | Flexbox 布局 | flex, items, justify |
| SpacingBuilder | 间距 | gap, padding, margin |
| SizeBuilder | 尺寸 | w, h, minW, maxW |
| TextBuilder | 文本样式 | text, bold, color, align |
| OpacityBuilder | 透明度 | opacity, bgOpacity, textOpacity |
| PositionBuilder | 定位 | auto, relative, absolute |

## 🔧 实现细节

### 调用顺序保持机制

为了保持向后兼容和类名顺序一致，我们使用**临时 Builder 实例**：

```typescript
flex(direction) {
  // 创建临时实例
  const tempBuilder = new LayoutBuilder();
  tempBuilder.flex(direction);
  
  // 立即收集类名到主数组
  this.classes.push(...tempBuilder.getClasses());
  
  return this;
}
```

这样确保类名按照**调用顺序**排列，而不是按照 Builder 类型排列。

### Builder 接口规范

每个专门的 Builder 必须实现：

```typescript
interface IBuilder {
  // 获取构建的类名数组
  getClasses(): string[];
  
  // 清空类名数组
  clear(): void;
}
```

## 📊 性能考虑

### 临时对象创建

每次调用方法都会创建临时 Builder 实例：

```typescript
flex() {
  const tempBuilder = new LayoutBuilder(); // 临时对象
  // ...
}
```

**影响分析**:

- ✅ 对象创建很轻量（只有一个数组）
- ✅ 方法调用次数通常较少（5-10次）
- ✅ 现代 JS 引擎优化很好
- ✅ 可读性和维护性收益远大于性能损失

**测试结果**:

- 构建一个包含10个类名的字符串：< 1ms
- 内存占用：可忽略不计

## 🎨 使用场景

### 场景 1：简单组件（使用主 ClassBuilder）

```typescript
// Alert 组件
const containerClass = cn()
  .flex('row')
  .items('center')
  .gap(4)
  .justify('between')
  .w('full')
  .build();
```

### 场景 2：动态构建（高级场景）

```typescript
import { cn } from '@coffic/cosy-ui';

// 根据条件动态构建类名
function getContainerClasses(config: { isCenter: boolean; hasGap: boolean }): string {
  const builder = cn().flex('row');
  
  if (config.isCenter) {
    builder.items('center').justify('center');
  }
  
  if (config.hasGap) {
    builder.gap(4);
  }
  
  return builder.build();
}
```

**注意**: LayoutBuilder、SpacingBuilder 等专门的 Builder 仅作为内部实现，不对外暴露。

### 场景 3：动态构建

```typescript
// 根据条件动态添加类名
const builder = cn().flex('col');

if (isCenter) {
  builder.items('center');
}

if (hasGap) {
  builder.gap(4);
}

const className = builder.build();
```

## 🔮 未来扩展

### 计划添加的 Builder

1. **BorderBuilder**: 边框相关
   - border(width)
   - borderColor(color)
   - borderRadius(size)

2. **ShadowBuilder**: 阴影相关
   - shadow(size)
   - shadowColor(color)

3. **BackgroundBuilder**: 背景相关
   - bg(color)
   - bgGradient(colors)
   - bgImage(url)

### 扩展示例

```typescript
// 1. 创建新的 Builder
export class BorderBuilder {
  private classes: string[] = [];
  
  border(width: string): this {
    this.classes.push(`cosy:border-${width}`);
    return this;
  }
  
  getClasses(): string[] {
    return this.classes;
  }
  
  clear(): void {
    this.classes = [];
  }
}

// 2. 在 ClassBuilder 中添加方法
class ClassBuilder {
  border(width: string): this {
    const tempBuilder = new BorderBuilder();
    tempBuilder.border(width);
    this.classes.push(...tempBuilder.getClasses());
    return this;
  }
}

// 3. 导出新 Builder
export { BorderBuilder } from "./builders/BorderBuilder";
```

## 📚 参考资料

- [组合模式 - Design Patterns](https://refactoring.guru/design-patterns/composite)
- [建造者模式 - Design Patterns](https://refactoring.guru/design-patterns/builder)
- [SOLID 原则](https://en.wikipedia.org/wiki/SOLID)
- [关注点分离](https://en.wikipedia.org/wiki/Separation_of_concerns)

## 👥 贡献者

欢迎提交 PR 来添加新的 Builder 或改进现有实现！

请确保：

1. 遵循单一职责原则
2. 实现 getClasses() 和 clear() 方法
3. 提供完整的 TypeScript 类型
4. 添加相应的测试

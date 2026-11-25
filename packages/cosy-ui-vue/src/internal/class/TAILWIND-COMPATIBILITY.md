# Tailwind CSS 兼容性说明

## 问题

Tailwind CSS 通过**静态扫描**源代码来生成 CSS。动态拼接的类名无法被识别：

```typescript
// ❌ 错误：Tailwind 扫描不到
this.classes.push(`cosy:gap-${size}`);  
this.classes.push(`cosy:flex-${direction}`);
```

## 解决方案

使用**完整类名映射表**，避免字符串拼接：

```typescript
// ✅ 正确：Tailwind 可以扫描到
const gapMap = {
  4: 'cosy:gap-4',
  8: 'cosy:gap-8',
  // ... 所有可能的值
} as const;

gap(size: keyof typeof gapMap): this {
  this.classes.push(gapMap[size]);
  return this;
}
```

## 实施细节

### 1. LayoutBuilder

映射表：

- `flexDirectionMap` - flex 方向
- `itemsAlignMap` - 垂直对齐
- `justifyAlignMap` - 水平对齐

### 2. SpacingBuilder

映射表：

- `gapMap` - 间距（0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16）
- `paddingMap` - 内边距（0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16）
- `marginMap` - 外边距（0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16）

### 3. SizeBuilder

映射表：

- `widthMap` - 宽度（auto, full, fit, 0-64）
- `heightMap` - 高度（auto, full, fit, 0-64）
- `minWidthMap` - 最小宽度
- `maxWidthMap` - 最大宽度
- `minHeightMap` - 最小高度
- `maxHeightMap` - 最大高度

### 4. TextBuilder

映射表：

- `textSizeMap` - 文本大小（xs, sm, md, lg, xl, 2xl, 3xl）
- `textColorMap` - 文本颜色（primary, secondary, accent, etc.）
- `textAlignMap` - 文本对齐（left, center, right, justify）
- `fontWeightMap` - 字体粗细（thin ~ black）

### 5. OpacityBuilder

映射表：

- `opacityMap` - 透明度（0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100）
- `bgOpacityMap` - 背景透明度
- `textOpacityMap` - 文本透明度

### 6. PositionBuilder

无需映射表（都是固定类名）：

- `auto()` → `'cosy:ml-auto'`
- `relative()` → `'cosy:relative'`
- `absolute()` → `'cosy:absolute'`
- etc.

## 优势

### ✅ Tailwind 兼容

所有类名都是完整的字符串字面量，Tailwind 可以正确扫描

### ✅ 类型安全

TypeScript 限制只能使用映射表中定义的值：

```typescript
cn().gap(4)    // ✅ OK
cn().gap(7)    // ❌ 类型错误：7 不在映射表中
cn().gap(999)  // ❌ 类型错误：999 不在映射表中
```

### ✅ 最佳实践

强制使用标准的间距值（Tailwind 的设计哲学）

### ✅ 可维护性

所有可用值集中在映射表中，易于查看和修改

### ✅ 性能优化

- 无运行时字符串拼接
- 更小的 CSS 文件（只包含实际使用的类）
- 更快的开发体验（IDE 自动补全）

## 添加新值

如需添加新的类名，在对应的映射表中添加即可：

```typescript
// 例如：添加新的 gap 值
const gapMap = {
  // ... 现有值
  20: 'cosy:gap-20',  // 新增
  24: 'cosy:gap-24',  // 新增
} as const;
```

## 验证

所有类名都经过验证，确保：

1. ✅ Tailwind 可以正确扫描
2. ✅ 类型系统正常工作
3. ✅ 生成的类名正确
4. ✅ 与重构前行为一致

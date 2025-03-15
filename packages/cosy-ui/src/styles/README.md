# Cosy UI 样式系统

这个文件夹包含了 Cosy UI 组件库的样式系统。样式系统的设计理念是：

1. **与 Tailwind CSS 命名一致**：所有变量命名与 Tailwind CSS 保持一致，降低学习成本
2. **关注点分离**：将样式与组件逻辑分离，使代码更易于维护
3. **可定制性**：提供语义化变量，方便主题定制
4. **暗黑模式支持**：自动适应系统的暗黑模式设置
5. **兼具原子化与组件化**：结合 Tailwind CSS 的原子化类和 DaisyUI 的组件类的优势

## 两种样式方案的结合

Cosy UI 的样式系统结合了两种流行的 CSS 方案的优势：

### 原子化类（类似 Tailwind CSS）

提供了大量的原子化类，如 `px-4`、`mt-2`、`text-lg` 等，用于精细调整组件样式：

```html
<div class="px-4 py-2 mt-4 text-lg font-bold text-primary">精细控制的内容</div>
```

### 组件类（类似 DaisyUI）

同时提供了高级组件类，如 `card`、`btn`、`alert` 等，用于快速构建常见 UI 组件：

```html
<div class="card">
  <div class="card-body">
    <h2 class="card-title">卡片标题</h2>
    <p>卡片内容</p>
    <button class="btn btn-primary">按钮</button>
  </div>
</div>
```

### 组合使用的优势

这种组合方式让开发者能够：

1. **快速构建** - 使用组件类（如 `card`、`btn`）快速搭建基础 UI
2. **精细调整** - 使用原子类（如 `px-4`、`mt-2`）进行细节调整
3. **保持一致性** - 组件类确保设计一致性
4. **灵活定制** - 原子类提供灵活的定制能力

例如：

```html
<!-- 基础卡片 + 原子类微调 -->
<div class="card shadow-lg hover:shadow-xl mt-8 mx-auto max-w-md">
  <div class="card-body px-8">
    <h2 class="card-title text-primary mb-4">卡片标题</h2>
    <p class="text-sm text-gray-600">卡片内容</p>
    <button class="btn btn-primary mt-6 w-full">按钮</button>
  </div>
</div>
```

## 文件结构

```
styles/
├── base/               # 基础样式变量
│   ├── colors.css      # 颜色变量
│   ├── spacing.css     # 间距变量
│   └── typography.css  # 排版变量
├── components/         # 组件特定样式
│   ├── article.css     # Article 组件样式
│   └── ...             # 其他组件样式
├── themes/             # 主题相关样式
│   └── dark.css        # 暗黑模式样式
└── index.css           # 主样式文件，导入所有基础样式
```

## 使用方法

### 在组件中使用样式系统

1. 导入基础样式和组件特定样式：

```astro
---
// 导入基础样式
import '../styles/index.css';
// 导入组件特定样式
import '../styles/components/article.css';
---
```

2. 使用 CSS 变量：

```css
.my-component {
  color: var(--color-text-primary);
  margin: var(--spacing-4);
  font-size: var(--text-lg);
}
```

### 颜色系统

颜色系统包含两层：

1. **基础颜色**：与 Tailwind CSS 颜色命名一致，如 `--slate-500`、`--blue-600` 等
2. **语义化颜色**：基于基础颜色定义的语义化变量，如 `--color-text-primary`、`--color-primary` 等

示例：

```css
.my-component {
  /* 使用语义化颜色（推荐） */
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);

  /* 或直接使用基础颜色 */
  border-color: var(--slate-200);
}
```

### 间距系统

间距系统也包含两层：

1. **基础间距**：与 Tailwind CSS 间距命名一致，如 `--spacing-4`（1rem）、`--spacing-8`（2rem）等
2. **语义化间距**：基于基础间距定义的语义化变量，如 `--space-md`、`--space-lg` 等

示例：

```css
.my-component {
  /* 使用语义化间距（推荐） */
  margin: var(--space-md);

  /* 或直接使用基础间距 */
  padding: var(--spacing-4);
}
```

### 排版系统

排版系统包含字体、字重、行高等变量：

```css
.my-component {
  font-family: var(--font-family-base);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  line-height: var(--leading-relaxed);
}
```

## 暗黑模式

暗黑模式通过 CSS 媒体查询自动适应系统设置：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: var(--slate-100);
    /* 其他暗黑模式变量... */
  }
}
```

组件无需额外处理，只要使用语义化颜色变量，就会自动适应暗黑模式。

## 扩展和定制

如果需要添加新的组件样式，请遵循以下步骤：

1. 在 `components/` 文件夹中创建新的 CSS 文件
2. 使用已定义的 CSS 变量，确保样式一致性
3. 在组件中导入该样式文件

如果需要添加新的基础变量，请在相应的基础样式文件中添加，并保持与 Tailwind CSS 命名一致。

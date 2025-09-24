# 修饰器模式（Props 构建器）实施规范

目的：为 Astro 组件提供链式/修饰器写法的 Props 构建器，保证一致的目录、命名、注释与导出方式，便于在其他组件复用同一模式。

## 目录与命名

- 文件位置：组件目录内维护 `types.ts`（类型）与 `props.ts`（构建器）
- 接口命名：接口以大写 `I` 开头，使用 PascalCase（例如：`IMainContentProps`）
- 构建器命名：函数 `create<Component>Props`，别名常量 `<Component>Props`
- 单一职责：`types.ts` 仅定义类型；`props.ts` 仅实现构建器

## API 设计

- 返回链式 API：每个方法只设置一个 props 字段并返回构建器自身
- 提供 `build()` 方法返回最终 Props 对象
- 方法命名与类型字段名一致（如 `layout(value)` 对应 `layout` 字段）
- 默认值策略：在 `create<Component>Props` 内集中定义默认值，方法仅覆盖

## 注释规范（JSDoc）

- 所有对外方法需添加 JSDoc，多行格式，第一行描述、第二行 `@default`
- 与类型文档一致（默认值、含义、可选项在类型里而非注释硬编码）
- 参考示例：

```ts
/**
 * 是否为文章布局
 * @default false
 */
isArticle(value?: boolean): IMainPropsBuilder;
```

## 类型与 common 复用

- 优先使用 `@coffic/cosy-ui/src/common` 中的类型与类名映射
- 禁止在组件中重复定义通用类型（例如：`PaddingSize`、`paddingYClasses`）
- 不完整时优先增强 common，而不是组件内重复造轮子

## 导出与依赖

- 组件内导出：在 `index.ts` 中导出 `create<Component>Props` 与 `<Component>Props`
- 包根聚合导出 `index-astro.ts` 按需导出组件目录（一般无需直接导出 `types/*`）
- 移动/重命名类型后，统一修正内部导入路径，删除旧文件避免重复

## 校验清单（提交前）

- [ ] `props.ts` 仅包含构建器逻辑，`types.ts` 仅包含类型定义
- [ ] JSDoc 采用多行，`@default` 位于第二行
- [ ] 默认值与类型文档一致
- [ ] 复用 common 类型/映射，无重复定义
- [ ] `index.ts` 正确导出构建器与类型
- [ ] 相关引用文件的 import 路径已更新
- [ ] Lint 通过

## 最小模板（可复制使用）

```ts
// props.ts
import type { I<Component>Props } from './types';

export interface I<Component>PropsBuilder {
  /**
   * 某字段描述
   * @default <默认值>
   */
  someField(value: NonNullable<I<Component>Props['someField']>): I<Component>PropsBuilder;
  // ... 其他字段方法
  /** 构建并返回完整 Props */
  build(): I<Component>Props;
}

export function create<Component>Props(initial: Partial<I<Component>Props> = {}): I<Component>PropsBuilder {
  let props: I<Component>Props = {
    // 统一默认值定义位置
    // someField: <默认值>,
    ...initial,
  } as I<Component>Props;

  const api: I<Component>PropsBuilder = {
    someField(value) { props = { ...props, someField: value }; return api; },
    // ... 其他字段方法
    build() { return props; },
  };

  return api;
}

export const <Component>Props = create<Component>Props;
```

## 文档联动（参考 .cursor/commands/format_doc.md）

- 在组件文档中为“修饰器写法”增加独立标签页（`titles` 中包含“修饰器写法”）
- 每个标签页仅渲染一个核心示例组件，标签页 `div` 必须带 `id="tab-N"`
- 示例仅聚焦单一 props 的展示，不混入无关变体
- 中英文件的内容与顺序保持一致，`order` 严格遵循字母序规则

## 常见问题

- 忘记在 `index.ts` 导出构建器或类型
- `@default` 未置于多行注释的第二行
- 在组件内重复定义 common 类型/映射
- 移动类型文件后未清理旧路径导致重复定义

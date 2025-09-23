# 组件文档编写清单（Astro/Vue）

## 概述
用于编写与评审组件文档（MDX）的清单，确保内容符合项目规范、命名一致、示例聚焦与中英文同步。

## 适用范围
- Vue 组件文档（需 badge: 'Vue'，文件名采用 `*-vue.mdx` 或明确说明为 Vue 版本）
- Astro 组件文档（不带 `-vue` 后缀）

## 基础规范
- [ ] 使用正确的包导入：例如 `import { ApplePhoneVuePackage } from '@/components/apple-phone-vue/index.ts'`
- [ ] 文档 `badge` 必须为 `'Vue'`（Vue 版本）且 `tags` 包含 `Vue`
- [ ] 组件对外名称与文档一致（如 `ApplePhone`），避免使用组件内部实现名（如 `iPhoneWindow`）
- [ ] 案例区块提供一个快速示例（Examples/案例）
- [ ] 禁止猜测组件属性/默认值，必要时查阅源码确认

## Props（按字母 A-Z 排序）
- [ ] 标题与 prop 名严格一致，如 `### backgroundColor`
- [ ] 每个 prop 下方必须跟随一个对应的 CodeContainer 示例，聚焦单一 prop 的展示（如无现成容器，必须新增最小容器示例，不得省略）
- [ ] 仅使用为排版必要的最小辅助 props，不混入与该 prop 无关的变体
- [ ] 示例容器命名与导入遵循项目规范（见下文“示例容器规范”）
- [ ] 删除表格式 props 汇总，改为分节式逐项展示

示例（ApplePhone）：
- [ ] `backgroundColor`：内容区背景色（可说明与内部 Container 背景一致、支持语义色与透明度）
- [ ] `height`：预设尺寸（sm/md/lg/xl/2xl/3xl/4xl/5xl）
- [ ] `showFrame`：是否显示外框
- [ ] `title`：状态栏标题
- [ ] `withShadow`：阴影
- [ ] 仅在存在对应示例容器时记录：`statusBarButtons`、`debug`（若无容器则暂不在文档中呈现）

## 示例容器规范（CodeContainer）
- [ ] 使用 `CodeContainer`，源码用 `?raw` 导入
- [ ] 每个标签页 `div` 必须有 `id="tab-N"`
- [ ] 每个标签页仅渲染一次核心示例组件
- [ ] `titles` 与示例内容一一对应，覆盖该 prop 的主要取值或场景
- [ ] 若某个 prop 暂无示例容器，需新增一个最小示例容器文件来满足上述要求，不得留空

## 命名与导入
- [ ] 文档层：导入 `*Package`（如 `ApplePhoneVuePackage`），并通过 `.<ContainerName />` 引用
- [ ] 组件层：对外导出名与文档一致（如 `export { ApplePhone }`）
- [ ] 源码命名：示例源码变量以 `SourceCode` 结尾（适用于 Astro 示例源码）

## 文档排序（order）
- [ ] 按照“首字母→序号”的规则设置，例如：A=1.x，B=2.x，C=3.x
- [ ] 同首字母按小数位递增（如 1.1、1.2、1.7）
- [ ] 中英文文档的 `order` 必须一致

## 中英文同步
- [ ] 中文与英文文档结构一致（章节、顺序、示例）
- [ ] Prop 描述语义一致
- [ ] 案例与容器调用一致
- [ ] `order` 值一致

## Slots
- [ ] 使用二级标题 `### default` 描述默认插槽
- [ ] 提供示例容器（若有）：如 `<ApplePhoneVuePackage.Slots />`

## 常见错误自查
- [ ] 用了组件内部实现名（如 `iPhoneWindow`）而非导出名（`ApplePhone`）
- [ ] Props 未按字母排序或在同一章节混合多个 props 的示例
- [ ] `CodeContainer` 缺少 `id="tab-N"` 或一个标签页渲染多个核心组件
- [ ] 未按规范导入对应的 `*Package`
- [ ] 中英文内容不同步或 `order` 不一致

## 快速检查清单
- [ ] 标题、导入、badge/tags、order 全部正确
- [ ] Props 分节按 A-Z 排序，示例聚焦、容器正确（每个 prop 均有 CodeContainer）
- [ ] 组件导出名与文档一致（ApplePhone）
- [ ] 中英文两个文件完全对齐
- [ ] 无冗余或猜测性描述，已对照源码核对

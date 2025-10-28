/**
 * ClassBuilder - 内部类名构建工具
 *
 * ⚠️ 仅供 Cosy UI 组件库内部使用，不对外暴露给用户
 *
 * 用于在组件内部统一管理和构建 CSS 类名
 */

// 组件内部使用的接口
export { cn } from "./classBuilder";

// 内部实现细节（不导出）：
// - ClassBuilder（通过 cn() 创建）
// - LayoutBuilder, SpacingBuilder, SizeBuilder, TextBuilder, OpacityBuilder, PositionBuilder
// - layouts, buttons 等预设组合（在 presets.ts 中，但不导出）

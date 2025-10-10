---
globs: *.vue
alwaysApply: false
---
# Vue 组件规范

如果这个规则被应用，则在输出中说明：!! 我注意到了项目的Vue 组件规范

## Vue 组件文件结构

- **script 部分必须写在 template 上方**
- 使用 `<script setup lang="ts">` 语法
- 类型定义和逻辑放在 script 部分的最上方
- **组件文档注释放在 script 部分的开头**

## Vue 组件导入规范

- **禁止使用绝对路径导入**
- 如需导入同仓库其他Vue组件，必须使用相对路径导入
- 禁止从 `@coffic/cosy-ui` 导入组件（该包提供的是 Astro 组件）
- 遇到模块解析问题时，应停止并让用户查看解决

## Vue 组件文档规范

### Vue 组件文档标识

- **所有 Vue 组件的文档必须添加 badge 和 tags**
- badge 值必须为 `'Vue'`
- tags 必须包含 `Vue` 标签
- 文档文件名必须以 `-vue.mdx` 结尾
- 例如：`heading-vue.mdx`, `button-vue.mdx`, `alert-vue.mdx`

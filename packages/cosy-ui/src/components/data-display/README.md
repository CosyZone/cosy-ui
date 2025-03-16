# 数据展示组件 (Data Display Components)

这个目录包含了专门用于数据展示的组件，主要用于展示结构化的数据内容。

## 设计原则

1. **数据优先**：以数据的展示和可读性为首要考虑
2. **结构清晰**：保持数据结构的清晰和层次感
3. **交互友好**：提供必要的数据交互功能

## 包含的组件

- `TeamMember.astro`: 团队成员展示组件
- `TeamMembers.astro`: 团队成员列表组件
- `Blog.astro`: 博客文章展示组件

## 使用指南

数据展示组件通常需要传入结构化的数据：

```astro
<TeamMembers>
  <TeamMember
    name="张三"
    role="开发者"
    avatar="/avatars/zhangsan.jpg"
  />
</TeamMembers>

<Blog
  title="文章标题"
  author="作者"
  date="2024-03-16"
>
  文章内容
</Blog>
``` 
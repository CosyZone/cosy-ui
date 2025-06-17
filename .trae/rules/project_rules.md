# 关于这个项目

这是一个工作空间，它分成以下部分：

- packages
  - cosy-ui：一个astro组件库
    - src: 组件源代码
    - docs: 文档

将来还会增加更多项目到packages目录中。

## 和用户交流时

- 使用中文
- 如果用户的要求不合理或不符合该技术的最佳实践，应指出

## Code Style

- 遵循关注点分离原则
- 每个文件指处理单一的一件事
- 单个文件不要过大，适当拆分代码到多个文件中

## cosy-ui 组件库

- 使用 Typescript
- 优先使用 daisyUI 的类，并辅以 Tailwind CSS，在顶部导入 [app.css](mdc:packages/cosy-ui/src/app.css)
- 使用 TailwindCSS 时要加前缀，如：cosy:mx-auto, cosy:dark:bg-red-500，因为 [app.css](mdc:packages/cosy-ui/src/app.css) 中定义了前缀
- 注意：lg:cosy:mx-auto 这种写法是错误的，应该是 cosy:log:mx-auto
- 不要忘记 frontmatter
- 考虑到组件可能非常多，应该进行良好的分类，如：
  - components 目录存放普通组件
  - layouts 目录存放页面布局组件
  - 根据情况，可自行创建其他文件夹
- 不要忘记在 Docs 中为组件增加使用文档，参考 [alert.mdx](mdc:packages/cosy-ui/docs/content/zh-cn/components/alert.mdx)
- 不要忘了在 main.ts 导出组件
- 不要忘记了像其他组件那样在顶部写清楚文档
- Types 目录在 src/types
- 图标统一放入 icons 来管理，像 @AlertTriangle.astro 那样
- 注意 Tailwind 的 class 的名字不能动态生成，这样 Tailwind 扫描不到
- 组件中的导入必须使用相对路径

## CSS

- 当用户要求检查CSS或检查样式时，要做的事：
  - 确保顶部导入了 [app.css](mdc:packages/cosy-ui/src/app.css)
  - 优先使用 daisyUI 的类，并辅以 Tailwind CSS
  - 使用 TailwindCSS 时要加前缀(not-prose除外)，如：cosy:mx-auto, cosy:dark:bg-red-500，因为 [app.css](mdc:packages/cosy-ui/src/app.css) 中定义了前缀
  - 注意：lg:cosy:mx-auto 这种写法是错误的，应该是 cosy:log:mx-auto
  - 注意 Tailwind 的 class 的名字不能动态生成，这样 Tailwind 扫描不到

## 包管理

使用 PNPM

## 提醒用户

如果这个规则被应用，则在输出中说明：🍋 我注意到了项目的基本信息

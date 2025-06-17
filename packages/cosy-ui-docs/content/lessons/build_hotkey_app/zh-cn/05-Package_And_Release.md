---
title: 打包发布
---

在本章节中，我们将学习如何将 Flutter 桌面应用打包并发布到 macOS 应用商店。我们将介绍签名、配置和发布过程中的关键步骤。

## 准备工作

### 1. 注册 Apple 开发者账号

在发布 macOS 应用之前，你需要：

1. 注册 Apple 开发者账号（每年 99 美元）
2. 在 Apple Developer Portal 创建应用 ID
3. 创建相关的证书和配置文件

### 2. 配置应用信息

在 macos/Runner/Info.plist 文件中配置应用信息：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>快捷键应用</string>
    <key>CFBundleDisplayName</key>
    <string>快捷键应用</string>
    <key>CFBundleIdentifier</key>
    <string>com.example.hotkeyapp</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.11</string>
    <key>LSApplicationCategoryType</key>
    <string>public.app-category.utilities</string>
</dict>
</plist>
```

### 3. 配置签名设置

在 Xcode 中配置签名设置：

1. 打开 macOS 项目：
   ```bash
   open macos/Runner.xcworkspace
   ```

2. 在 Xcode 中：
   - 选择 Runner 项目
   - 选择 Runner target
   - 在 Signing & Capabilities 标签页中：
     - 选择你的开发者账号
     - 设置 Bundle Identifier
     - 启用自动签名

## 打包应用

### 1. 构建发布版本

```bash
# 构建发布版本
flutter build macos --release
```

### 2. 创建 DMG 安装包

1. 安装 create-dmg 工具：
   ```bash
   brew install create-dmg
   ```

2. 创建 DMG 文件：
   ```bash
   create-dmg \
     --volname "快捷键应用" \
     --window-pos 200 120 \
     --window-size 800 400 \
     --icon-size 100 \
     --app-drop-link 600 185 \
     "快捷键应用.dmg" \
     "build/macos/Build/Products/Release/快捷键应用.app"
   ```

## 发布到 App Store

### 1. 准备应用商店信息

在 App Store Connect 中：

1. 创建新应用
2. 填写应用信息：
   - 名称和描述
   - 截图和预览
   - 关键词和分类
   - 隐私政策

### 2. 上传应用

1. 使用 Xcode 上传：
   - 选择 Product > Archive
   - 在 Archives 窗口中选择最新的归档
   - 点击 Distribute App
   - 选择 App Store Connect
   - 按照向导完成上传

2. 或使用命令行上传：
   ```bash
   xcrun altool --upload-app --type macos --file "path/to/app.pkg" \
     --username "your@email.com" --password "app-specific-password"
   ```

### 3. 提交审核

1. 在 App Store Connect 中：
   - 确保所有必需信息已填写完整
   - 添加构建版本到新版本
   - 提交审核

## 自动化发布

### 1. 使用 Fastlane

1. 安装 Fastlane：
   ```bash
   brew install fastlane
   ```

2. 初始化 Fastlane：
   ```bash
   cd macos
   fastlane init
   ```

3. 配置 Fastfile：
   ```ruby
   default_platform(:mac)

   platform :mac do
     desc "发布到 App Store"
     lane :release do
       build_mac_app(
         workspace: "Runner.xcworkspace",
         scheme: "Runner",
         export_method: "app-store"
       )
       upload_to_app_store(
         skip_metadata: true,
         skip_screenshots: true
       )
     end
   end
   ```

4. 运行发布流程：
   ```bash
   fastlane release
   ```

## 常见问题

1. **签名错误**
   - 检查开发者账号状态
   - 更新证书和配置文件
   - 清理 Xcode 缓存：
     ```bash
     rm -rf ~/Library/Developer/Xcode/DerivedData
     ```

2. **上传失败**
   - 确保应用版本号唯一
   - 检查网络连接
   - 验证 Apple ID 和密码

3. **审核被拒**
   - 仔细阅读拒绝原因
   - 确保应用符合指南要求
   - 完善隐私政策和文档

## 练习

1. 创建一个完整的发布检查清单，包括所有必需的配置和资源。
2. 使用 Fastlane 自动化发布流程，包括版本号管理和变更日志生成。
3. 实现应用内自动更新功能。

## 总结

在本教程系列中，我们已经完成了一个完整的 Flutter 桌面应用的开发，包括：

1. 项目创建和基础配置
2. 窗口管理功能
3. 全局快捷键实现
4. 状态管理
5. 打包和发布

通过这个项目，你已经掌握了使用 Flutter 开发 macOS 桌面应用的主要技能。希望这些知识能帮助你开发出更多优秀的桌面应用。
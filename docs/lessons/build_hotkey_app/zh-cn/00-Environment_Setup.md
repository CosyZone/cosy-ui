---
title: 环境配置
---

在开始开发我们的快捷键应用之前，需要先配置好开发环境。本章将指导你完成所有必要的环境配置。

## 安装 Flutter SDK

1. 访问 Flutter 官方网站下载最新的 SDK：
   https://flutter.dev/docs/get-started/install/macos

2. 解压下载的文件到你想要的位置，例如：
   ```bash
   cd ~/development
   unzip ~/Downloads/flutter_macos_arm64_3.x.x-stable.zip
   ```

3. 将 Flutter 添加到环境变量，编辑 `~/.zshrc` 或 `~/.bash_profile`：
   ```bash
   export PATH="$PATH:~/development/flutter/bin"
   ```

4. 运行以下命令验证安装：
   ```bash
   flutter doctor
   ```

## 安装 Xcode

由于我们要开发 macOS 应用，需要安装 Xcode：

1. 从 Mac App Store 安装 Xcode

2. 安装完成后，运行以下命令接受许可协议：
   ```bash
   sudo xcodebuild -license accept
   ```

3. 安装 Xcode 命令行工具：
   ```bash
   sudo xcode-select --install
   ```

## 配置 VS Code

1. 安装 VS Code：
   https://code.visualstudio.com/

2. 安装必要的扩展：
   - Flutter
   - Dart

## 启用 macOS 桌面支持

1. 启用 macOS 桌面支持：
   ```bash
   flutter config --enable-macos-desktop
   ```

2. 验证 macOS 是否在支持的平台列表中：
   ```bash
   flutter devices
   ```

## 验证环境

运行以下命令检查环境是否配置正确：

```bash
flutter doctor
```

确保所有检查项都显示为 ✓。如果有任何问题，按照提示解决即可。

## 常见问题

1. Flutter SDK 下载速度慢
   - 可以使用国内镜像源
   - 或者使用代理下载

2. Xcode 安装失败
   - 确保 Mac App Store 登录正常
   - 检查网络连接
   - 确保有足够的磁盘空间

3. VS Code 插件安装失败
   - 检查网络连接
   - 尝试使用代理

## 下一步

环境配置完成后，我们就可以开始[创建项目](./01-Create_Project.md)了。
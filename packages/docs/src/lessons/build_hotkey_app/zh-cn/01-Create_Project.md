---
title: 创建项目
---

在完成环境配置后，我们可以开始创建我们的快捷键应用项目了。本章将指导你完成项目的创建和基本配置。

## 创建 Flutter 项目

1. 打开终端，进入你想要创建项目的目录，执行以下命令：
   ```bash
   flutter create hotkey_app
   cd hotkey_app
   ```

2. 启用 macOS 支持：
   ```bash
   flutter create . --platforms=macos
   ```

## 配置项目

1. 打开 `pubspec.yaml` 文件，添加必要的依赖：
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     window_manager: ^0.3.7
     hotkey_manager: ^0.1.8
     shared_preferences: ^2.2.2
   ```

2. 安装依赖：
   ```bash
   flutter pub get
   ```

## 配置 macOS 权限

1. 打开 `macos/Runner/DebugProfile.entitlements` 文件，添加以下权限：
   ```xml
   <dict>
     <!-- 其他现有配置 -->
     <key>com.apple.security.temporary-exception.apple-events</key>
     <string>com.apple.systemevents</string>
   </dict>
   ```

2. 同样在 `macos/Runner/Release.entitlements` 中添加相同的配置。

## 清理默认代码

1. 打开 `lib/main.dart`，删除默认的计数器示例代码。

2. 创建基本的应用结构：
   ```dart
   import 'package:flutter/material.dart';
   import 'package:window_manager/window_manager.dart';
   import 'package:hotkey_manager/hotkey_manager.dart';

   void main() async {
     WidgetsFlutterBinding.ensureInitialized();
     
     // 初始化窗口管理器
     await windowManager.ensureInitialized();
     
     // 初始化热键管理器
     await hotKeyManager.unregisterAll();
     
     runApp(const MyApp());
   }

   class MyApp extends StatelessWidget {
     const MyApp({super.key});

     @override
     Widget build(BuildContext context) {
       return MaterialApp(
         title: 'Hotkey App',
         theme: ThemeData(
           primarySwatch: Colors.blue,
           useMaterial3: true,
         ),
         home: const MyHomePage(),
       );
     }
   }

   class MyHomePage extends StatefulWidget {
     const MyHomePage({super.key});

     @override
     State<MyHomePage> createState() => _MyHomePageState();
   }

   class _MyHomePageState extends State<MyHomePage> {
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         appBar: AppBar(
           title: const Text('Hotkey App'),
         ),
         body: const Center(
           child: Text('欢迎使用快捷键应用！'),
         ),
       );
     }
   }
   ```

## 运行项目

1. 确保 macOS 平台已启用：
   ```bash
   flutter devices
   ```

2. 运行项目：
   ```bash
   flutter run -d macos
   ```

## 常见问题

1. 依赖安装失败
   - 检查网络连接
   - 确保 Flutter SDK 版本兼容
   - 尝试使用镜像源

2. macOS 权限问题
   - 确保正确配置了 entitlements 文件
   - 检查 Xcode 项目设置

3. 运行时错误
   - 检查 Flutter 和 Dart SDK 版本
   - 确保所有依赖都正确安装
   - 查看控制台错误信息

## 下一步

现在我们已经创建了基本的项目结构，接下来我们将在[窗口管理](./02-Window_Management.md)章节中学习如何控制应用窗口的行为。
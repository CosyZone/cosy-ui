---
title: 窗口管理
---

在本章中，我们将学习如何使用 window_manager 包来控制应用窗口的行为，包括窗口大小、位置、样式等。

## 配置窗口管理器

1. 在 `main.dart` 中初始化窗口管理器后，添加以下配置：

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // 初始化窗口管理器
  await windowManager.ensureInitialized();

  // 配置窗口属性
  WindowOptions windowOptions = const WindowOptions(
    size: Size(400, 600),
    center: true,
    backgroundColor: Colors.transparent,
    skipTaskbar: false,
    titleBarStyle: TitleBarStyle.hidden,
  );
  
  await windowManager.waitUntilReadyToShow(windowOptions, () async {
    await windowManager.show();
    await windowManager.focus();
  });

  runApp(const MyApp());
}
```

## 实现窗口拖动

由于我们隐藏了标题栏，需要自定义一个可拖动区域：

```dart
class DraggableHeader extends StatelessWidget {
  const DraggableHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.translucent,
      onPanStart: (details) {
        windowManager.startDragging();
      },
      child: Container(
        height: 32,
        color: Colors.transparent,
        child: Row(
          children: [
            const SizedBox(width: 16),
            const Text('Hotkey App'),
            const Spacer(),
            IconButton(
              icon: const Icon(Icons.close),
              onPressed: () {
                windowManager.hide();
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

## 更新主页面

使用新创建的 DraggableHeader 组件：

```dart
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        children: [
          const DraggableHeader(),
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(16),
              child: const Center(
                child: Text('欢迎使用快捷键应用！'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

## 窗口事件监听

实现 WindowListener 来处理窗口事件：

```dart
class _MyHomePageState extends State<MyHomePage> with WindowListener {
  @override
  void initState() {
    windowManager.addListener(this);
    super.initState();
  }

  @override
  void dispose() {
    windowManager.removeListener(this);
    super.dispose();
  }

  @override
  void onWindowEvent(String eventName) {
    print('[WindowManager] $eventName');
  }

  @override
  void onWindowClose() {
    windowManager.hide();
  }

  @override
  void onWindowFocus() {
    setState(() {});
  }

  @override
  void onWindowBlur() {
    setState(() {});
  }
}
```

## 窗口样式优化

为了使应用看起来更原生，我们可以添加一些样式：

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hotkey App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
        brightness: Brightness.light,
      ),
      darkTheme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
        brightness: Brightness.dark,
      ),
      home: const MyHomePage(),
    );
  }
}
```

## 常见问题

1. 窗口无法拖动
   - 确保 GestureDetector 的 behavior 设置正确
   - 检查是否正确调用了 windowManager.startDragging()

2. 窗口大小不正确
   - 检查 WindowOptions 中的 size 配置
   - 确保在显示窗口前等待初始化完成

3. 窗口样式异常
   - 验证 titleBarStyle 设置
   - 检查背景色透明度设置

## 下一步

现在我们已经完成了窗口管理的配置，接下来我们将在[快捷键设置](./03-Hotkey_Settings.md)章节中学习如何实现全局快捷键功能。
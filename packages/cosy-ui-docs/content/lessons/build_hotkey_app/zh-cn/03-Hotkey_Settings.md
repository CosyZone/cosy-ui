---
title: 快捷键设置
---

在本章节中，我们将学习如何使用 hotkey_manager 包来实现全局快捷键功能，让用户可以通过自定义的快捷键组合来唤出应用窗口。

## 添加依赖

首先，我们需要在 pubspec.yaml 文件中添加 hotkey_manager 依赖：

```yaml
dependencies:
  hotkey_manager: ^0.1.8
```

运行以下命令安装依赖：

```bash
flutter pub get
```

## 初始化配置

在 main.dart 文件中，我们需要在应用启动时初始化 hotkey_manager：

```dart
import 'package:hotkey_manager/hotkey_manager.dart';

void main() async {
  // 确保 Flutter 绑定初始化
  WidgetsFlutterBinding.ensureInitialized();
  
  // 初始化 hotkey_manager
  await hotKeyManager.initialize();

  // 其他初始化代码...
  
  runApp(const MyApp());
}
```

## 注册快捷键

### 1. 创建热键

```dart
// 创建热键
final hotKey = HotKey(
  // 定义快捷键：Command + Shift + Space
  key: LogicalKeyboardKey.space,
  modifiers: [HotKeyModifier.meta, HotKeyModifier.shift],
  // 定义范围：全局
  scope: HotKeyScope.system,
);
```

### 2. 注册热键

```dart
// 注册热键
await hotKeyManager.register(
  hotKey,
  keyDownHandler: (hotKey) {
    // 快捷键按下时的处理逻辑
    print('热键被触发：${hotKey.toJson()}');
    // 例如：显示窗口
    windowManager.show();
    windowManager.focus();
  },
);
```

### 3. 完整示例

```dart
class HotKeyManager extends StatefulWidget {
  @override
  _HotKeyManagerState createState() => _HotKeyManagerState();
}

class _HotKeyManagerState extends State<HotKeyManager> {
  HotKey? _hotKey;

  @override
  void initState() {
    super.initState();
    _registerHotKey();
  }

  @override
  void dispose() {
    _unregisterHotKey();
    super.dispose();
  }

  Future<void> _registerHotKey() async {
    _hotKey = HotKey(
      key: LogicalKeyboardKey.space,
      modifiers: [HotKeyModifier.meta, HotKeyModifier.shift],
      scope: HotKeyScope.system,
    );

    await hotKeyManager.register(
      _hotKey!,
      keyDownHandler: (hotKey) {
        _handleHotKey();
      },
    );
  }

  Future<void> _unregisterHotKey() async {
    if (_hotKey != null) {
      await hotKeyManager.unregister(_hotKey!);
    }
  }

  void _handleHotKey() {
    // 处理快捷键触发事件
    windowManager.show();
    windowManager.focus();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('快捷键管理'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '当前快捷键：Command + Shift + Space',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                await _unregisterHotKey();
                setState(() {
                  _hotKey = null;
                });
              },
              child: Text('禁用快捷键'),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: _hotKey == null ? _registerHotKey : null,
              child: Text('启用快捷键'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## 自定义快捷键

### 1. 创建快捷键配置界面

```dart
class HotKeySettingsPage extends StatefulWidget {
  @override
  _HotKeySettingsPageState createState() => _HotKeySettingsPageState();
}

class _HotKeySettingsPageState extends State<HotKeySettingsPage> {
  HotKey? _currentHotKey;
  bool _isRecording = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('快捷键设置'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '当前快捷键：${_currentHotKey?.toJson() ?? "未设置"}',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _isRecording = true;
                });
              },
              child: Text('设置新快捷键'),
            ),
            if (_isRecording)
              KeyboardListener(
                focusNode: FocusNode(),
                onKeyEvent: (keyEvent) {
                  if (keyEvent is KeyDownEvent) {
                    // 处理按键事件
                    _handleKeyPress(keyEvent);
                  }
                },
                child: Container(
                  padding: EdgeInsets.all(16),
                  margin: EdgeInsets.only(top: 20),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.blue),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text('按下新的快捷键组合...'),
                ),
              ),
          ],
        ),
      ),
    );
  }

  void _handleKeyPress(KeyEvent event) {
    // 处理按键事件，更新快捷键设置
    setState(() {
      _isRecording = false;
      // 更新快捷键配置
      // ...
    });
  }
}
```

## 常见问题

1. **为什么快捷键在某些应用中不生效？**
   - 某些应用可能会拦截系统级快捷键
   - 检查是否有其他应用注册了相同的快捷键
   - 确保应用有适当的系统权限

2. **如何处理快捷键冲突？**
   ```dart
   try {
     await hotKeyManager.register(hotKey);
   } catch (e) {
     print('快捷键注册失败：$e');
     // 提示用户选择其他快捷键组合
   }
   ```

3. **如何保存快捷键设置？**
   - 使用 shared_preferences 或其他本地存储方案保存配置
   - 在应用启动时加载保存的配置

## 练习

1. 实现一个完整的快捷键配置界面，支持添加、修改和删除快捷键。
2. 添加快捷键冲突检测功能，当用户设置的快捷键已被其他应用使用时给出提示。
3. 实现快捷键配置的导入/导出功能。

## 下一步

现在我们已经实现了全局快捷键功能，接下来我们将在[状态管理](./04-State_Management.md)章节中学习如何使用 Provider 来管理应用的状态。
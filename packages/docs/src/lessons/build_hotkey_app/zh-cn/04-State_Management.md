---
title: 状态管理
---

在本章节中，我们将学习如何使用 Provider 包来管理应用的状态，包括主题切换、快捷键配置等功能。这将帮助我们更好地组织和管理应用的数据流。

## 添加依赖

首先，我们需要在 pubspec.yaml 文件中添加 provider 依赖：

```yaml
dependencies:
  provider: ^6.0.5
```

运行以下命令安装依赖：

```bash
flutter pub get
```

## 创建状态模型

### 1. 应用设置模型

```dart
import 'package:flutter/material.dart';
import 'package:shared_preferences.dart';

class AppSettings extends ChangeNotifier {
  bool _isDarkMode = false;
  HotKey? _globalHotKey;
  bool _startAtLogin = false;

  bool get isDarkMode => _isDarkMode;
  HotKey? get globalHotKey => _globalHotKey;
  bool get startAtLogin => _startAtLogin;

  // 初始化设置
  Future<void> loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    _isDarkMode = prefs.getBool('isDarkMode') ?? false;
    _startAtLogin = prefs.getBool('startAtLogin') ?? false;
    
    // 加载快捷键设置
    final hotKeyJson = prefs.getString('globalHotKey');
    if (hotKeyJson != null) {
      _globalHotKey = HotKey.fromJson(jsonDecode(hotKeyJson));
    }
    
    notifyListeners();
  }

  // 切换主题
  Future<void> toggleTheme() async {
    _isDarkMode = !_isDarkMode;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('isDarkMode', _isDarkMode);
    notifyListeners();
  }

  // 更新快捷键
  Future<void> updateHotKey(HotKey newHotKey) async {
    _globalHotKey = newHotKey;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('globalHotKey', jsonEncode(newHotKey.toJson()));
    notifyListeners();
  }

  // 设置开机启动
  Future<void> setStartAtLogin(bool value) async {
    _startAtLogin = value;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('startAtLogin', value);
    notifyListeners();
  }
}
```

## 配置 Provider

### 1. 在应用入口配置 Provider

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 初始化设置
  final settings = AppSettings();
  await settings.loadSettings();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => settings),
      ],
      child: const MyApp(),
    ),
  );
}
```

### 2. 在应用中使用 Provider

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer<AppSettings>(
      builder: (context, settings, child) {
        return MaterialApp(
          title: '快捷键应用',
          theme: settings.isDarkMode ? ThemeData.dark() : ThemeData.light(),
          home: const HomePage(),
        );
      },
    );
  }
}
```

## 使用状态

### 1. 在设置页面中使用

```dart
class SettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('设置'),
      ),
      body: Consumer<AppSettings>(
        builder: (context, settings, child) {
          return ListView(
            children: [
              SwitchListTile(
                title: Text('深色模式'),
                value: settings.isDarkMode,
                onChanged: (value) {
                  settings.toggleTheme();
                },
              ),
              SwitchListTile(
                title: Text('开机启动'),
                value: settings.startAtLogin,
                onChanged: (value) {
                  settings.setStartAtLogin(value);
                },
              ),
              ListTile(
                title: Text('全局快捷键'),
                subtitle: Text(
                  settings.globalHotKey?.toString() ?? '未设置',
                ),
                trailing: Icon(Icons.keyboard_arrow_right),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => HotKeySettingsPage(),
                    ),
                  );
                },
              ),
            ],
          );
        },
      ),
    );
  }
}
```

### 2. 在快捷键设置页面中使用

```dart
class HotKeySettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('快捷键设置'),
      ),
      body: Consumer<AppSettings>(
        builder: (context, settings, child) {
          return Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '当前快捷键：${settings.globalHotKey?.toString() ?? "未设置"}',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    // 显示快捷键录制界面
                    final newHotKey = await showDialog<HotKey>(
                      context: context,
                      builder: (context) => HotKeyRecordDialog(),
                    );

                    if (newHotKey != null) {
                      settings.updateHotKey(newHotKey);
                    }
                  },
                  child: Text('设置新快捷键'),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
```

## 最佳实践

1. **状态分离**
   - 将不同类型的状态分离到不同的 Provider 中
   - 避免创建过大的状态对象

```dart
// 分离主题设置
class ThemeSettings extends ChangeNotifier {
  bool _isDarkMode = false;
  bool get isDarkMode => _isDarkMode;

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    notifyListeners();
  }
}

// 分离快捷键设置
class HotKeySettings extends ChangeNotifier {
  HotKey? _globalHotKey;
  HotKey? get globalHotKey => _globalHotKey;

  void updateHotKey(HotKey newHotKey) {
    _globalHotKey = newHotKey;
    notifyListeners();
  }
}
```

2. **状态持久化**
   - 使用 shared_preferences 保存设置
   - 在应用启动时加载保存的设置

3. **状态更新**
   - 只在必要时调用 notifyListeners()
   - 避免频繁更新状态

## 常见问题

1. **如何处理异步状态更新？**
   ```dart
   Future<void> loadSettings() async {
     try {
       final prefs = await SharedPreferences.getInstance();
       _isDarkMode = prefs.getBool('isDarkMode') ?? false;
       notifyListeners();
     } catch (e) {
       print('加载设置失败：$e');
     }
   }
   ```

2. **如何避免不必要的重建？**
   ```dart
   // 使用 Selector 只监听特定的状态变化
   Selector<AppSettings, bool>(
     selector: (_, settings) => settings.isDarkMode,
     builder: (context, isDarkMode, child) {
       return Icon(isDarkMode ? Icons.dark_mode : Icons.light_mode);
     },
   )
   ```

3. **如何在多个页面间共享状态？**
   - 将 Provider 放在widget树的顶层
   - 使用 context.read() 获取Provider实例

## 练习

1. 实现一个主题切换功能，包括自定义主题颜色。
2. 添加多个快捷键配置的支持，允许用户设置多组快捷键。
3. 实现设置的导入/导出功能。

## 下一步

现在我们已经完成了应用的核心功能开发，接下来我们将在[打包发布](./05-Package_And_Release.md)章节中学习如何将应用打包并发布到应用商店。
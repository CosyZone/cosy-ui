---
title: State Management
---

In this chapter, we will learn how to use the Provider package to manage the application's state, including theme switching and hotkey configuration. This will help us better organize and manage the application's data flow.

## Add Dependencies

First, we need to add the provider dependency in the pubspec.yaml file:

```yaml
dependencies:
  provider: ^6.0.5
```

Run the following command to install the dependency:

```bash
flutter pub get
```

## Create State Models

### 1. App Settings Model

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

  // Initialize settings
  Future<void> loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    _isDarkMode = prefs.getBool('isDarkMode') ?? false;
    _startAtLogin = prefs.getBool('startAtLogin') ?? false;
    
    // Load hotkey settings
    final hotKeyJson = prefs.getString('globalHotKey');
    if (hotKeyJson != null) {
      _globalHotKey = HotKey.fromJson(jsonDecode(hotKeyJson));
    }
    
    notifyListeners();
  }

  // Toggle theme
  Future<void> toggleTheme() async {
    _isDarkMode = !_isDarkMode;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('isDarkMode', _isDarkMode);
    notifyListeners();
  }

  // Update hotkey
  Future<void> updateHotKey(HotKey newHotKey) async {
    _globalHotKey = newHotKey;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('globalHotKey', jsonEncode(newHotKey.toJson()));
    notifyListeners();
  }

  // Set start at login
  Future<void> setStartAtLogin(bool value) async {
    _startAtLogin = value;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('startAtLogin', value);
    notifyListeners();
  }
}
```

## Configure Provider

### 1. Configure Provider at App Entry

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize settings
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

### 2. Use Provider in Widgets

```dart
class SettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<AppSettings>(
      builder: (context, settings, child) {
        return Scaffold(
          body: ListView(
            children: [
              SwitchListTile(
                title: Text('Dark Mode'),
                value: settings.isDarkMode,
                onChanged: (value) => settings.toggleTheme(),
              ),
              SwitchListTile(
                title: Text('Start at Login'),
                value: settings.startAtLogin,
                onChanged: (value) => settings.setStartAtLogin(value),
              ),
              ListTile(
                title: Text('Global Hotkey'),
                subtitle: Text(settings.globalHotKey?.toString() ?? 'Not set'),
                onTap: () {
                  // Show hotkey configuration dialog
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
```

## Common Issues

1. **State not updating**
   - Ensure you call notifyListeners() after state changes
   - Check if the widget is wrapped in a Provider
   - Verify the correct use of Consumer or context.watch()

2. **State lost after app restart**
   - Make sure to properly save state to persistent storage
   - Handle loading state during app initialization

3. **Multiple Provider instances**
   - Use MultiProvider to organize multiple providers
   - Keep provider hierarchy clean and logical

## Next Step

Now that we have implemented state management, we will learn how to package and release the application in the [Package and Release](./05-Package_And_Release.md) chapter.
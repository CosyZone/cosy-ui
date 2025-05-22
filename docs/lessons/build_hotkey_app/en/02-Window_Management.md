---
title: Window Management
---

In this chapter, we will learn how to use the window_manager package to control the application window behavior, including window size, position, and style.

## Configure Window Manager

1. After initializing the window manager in `main.dart`, add the following configuration:

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize window manager
  await windowManager.ensureInitialized();

  // Configure window options
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

## Implement Window Dragging

Since we've hidden the title bar, we need to create a custom draggable area:

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

## Update Main Page

Use the newly created DraggableHeader component:

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
                child: Text('Welcome to Hotkey App!'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

## Window Event Listening

Implement WindowListener to handle window events:

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

## Window Style Optimization

To make the application look more native, we can add some styling:

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

## Common Issues

1. Window Not Draggable
   - Ensure GestureDetector behavior is set correctly
   - Verify windowManager.startDragging() is called properly

2. Incorrect Window Size
   - Check size configuration in WindowOptions
   - Ensure initialization is complete before showing window

3. Window Style Issues
   - Verify titleBarStyle settings
   - Check background color transparency settings

## Next Step

Now that we have completed the window management configuration, we will learn how to implement global hotkey functionality in the [Hotkey Settings](./03-Hotkey_Settings.md) chapter.
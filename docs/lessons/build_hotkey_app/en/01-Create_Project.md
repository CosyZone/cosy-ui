---
title: Create Project
---

After completing the environment setup, we can start creating our hotkey application project. This chapter will guide you through the project creation and basic configuration.

## Create Flutter Project

1. Open terminal, navigate to your desired project directory, and execute the following commands:
   ```bash
   flutter create hotkey_app
   cd hotkey_app
   ```

2. Enable macOS support:
   ```bash
   flutter create . --platforms=macos
   ```

## Configure Project

1. Open `pubspec.yaml` file and add necessary dependencies:
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     window_manager: ^0.3.7
     hotkey_manager: ^0.1.8
     shared_preferences: ^2.2.2
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

## Configure macOS Permissions

1. Open `macos/Runner/DebugProfile.entitlements` file and add the following permissions:
   ```xml
   <dict>
     <!-- Other existing configurations -->
     <key>com.apple.security.temporary-exception.apple-events</key>
     <string>com.apple.systemevents</string>
   </dict>
   ```

2. Add the same configuration to `macos/Runner/Release.entitlements`.

## Clean Default Code

1. Open `lib/main.dart` and remove the default counter example code.

2. Create the basic application structure:
   ```dart
   import 'package:flutter/material.dart';
   import 'package:window_manager/window_manager.dart';
   import 'package:hotkey_manager/hotkey_manager.dart';

   void main() async {
     WidgetsFlutterBinding.ensureInitialized();
     
     // Initialize window manager
     await windowManager.ensureInitialized();
     
     // Initialize hotkey manager
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
           child: Text('Welcome to Hotkey App!'),
         ),
       );
     }
   }
   ```

## Run Project

1. Ensure macOS platform is enabled:
   ```bash
   flutter devices
   ```

2. Run the project:
   ```bash
   flutter run -d macos
   ```

## Common Issues

1. Dependency Installation Failure
   - Check network connection
   - Ensure Flutter SDK version compatibility
   - Try using mirror sources

2. macOS Permission Issues
   - Ensure entitlements files are correctly configured
   - Check Xcode project settings

3. Runtime Errors
   - Check Flutter and Dart SDK versions
   - Ensure all dependencies are properly installed
   - Review console error messages

## Next Step

Now that we have created the basic project structure, we will learn how to control the application window behavior in the [Window Management](./02-Window_Management.md) chapter.
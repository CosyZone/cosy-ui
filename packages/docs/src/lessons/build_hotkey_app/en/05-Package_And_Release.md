---
title: Package and Release
---

# Package and Release

In this chapter, we will learn how to package and publish your Flutter desktop application to the macOS App Store. We will cover the key steps in the signing, configuration, and publishing process.

## Preparation

### 1. Register Apple Developer Account

Before publishing a macOS application, you need to:

1. Register an Apple Developer account ($99/year)
2. Create an App ID in the Apple Developer Portal
3. Create necessary certificates and provisioning profiles

### 2. Configure App Information

Configure app information in the macos/Runner/Info.plist file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>Hotkey App</string>
    <key>CFBundleDisplayName</key>
    <string>Hotkey App</string>
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

### 3. Configure Signing Settings

Configure signing settings in Xcode:

1. Open the macOS project:
   ```bash
   open macos/Runner.xcworkspace
   ```

2. In Xcode:
   - Select the Runner project
   - Select the Runner target
   - In the Signing & Capabilities tab:
     - Select your developer account
     - Set the Bundle Identifier
     - Enable automatic signing

## Package the Application

### 1. Build Release Version

```bash
# Build release version
flutter build macos --release
```

### 2. Create DMG Installer

1. Install create-dmg tool:
   ```bash
   brew install create-dmg
   ```

2. Create DMG file:
   ```bash
   create-dmg \
     --volname "Hotkey App" \
     --window-pos 200 120 \
     --window-size 800 400 \
     --icon-size 100 \
     --app-drop-link 600 185 \
     "Hotkey App.dmg" \
     "build/macos/Build/Products/Release/Hotkey App.app"
   ```

## Publish to App Store

### 1. Prepare App Store Information

In App Store Connect:

1. Create a new application
2. Fill in app information:
   - Name and description
   - Screenshots and previews
   - Keywords and categories
   - Privacy policy

### 2. Upload Application

1. Archive the application in Xcode:
   - Select Product > Archive
   - In the Archives window, click "Distribute App"
   - Choose "App Store Connect"
   - Follow the distribution wizard

2. Submit for review:
   - In App Store Connect, select your application
   - Click "Submit for Review"
   - Answer the review questions
   - Submit the application

## Common Issues

1. **Code Signing Issues**
   - Ensure certificates are valid
   - Check provisioning profile settings
   - Verify bundle identifier matches

2. **App Store Rejection**
   - Follow App Store guidelines
   - Provide clear privacy policy
   - Test thoroughly before submission

3. **DMG Creation Errors**
   - Check file paths and permissions
   - Ensure app is properly signed
   - Verify DMG settings

## Summary

In this tutorial series, we have completed the development of a full-featured Flutter desktop application, including:

1. Project creation and basic configuration
2. Window management functionality
3. Global hotkey implementation
4. State management
5. Packaging and publishing

Through this project, you have mastered the key skills needed to develop macOS desktop applications using Flutter. We hope this knowledge will help you create more excellent desktop applications.
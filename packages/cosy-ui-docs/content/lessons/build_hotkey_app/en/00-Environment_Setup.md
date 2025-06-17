---
title: Environment Setup
---

Before we start developing our hotkey application, we need to set up the development environment. This chapter will guide you through all the necessary configurations.

## Install Flutter SDK

1. Visit the Flutter official website to download the latest SDK:
   https://flutter.dev/docs/get-started/install/macos

2. Extract the downloaded file to your preferred location, for example:
   ```bash
   cd ~/development
   unzip ~/Downloads/flutter_macos_arm64_3.x.x-stable.zip
   ```

3. Add Flutter to your environment variables by editing `~/.zshrc` or `~/.bash_profile`:
   ```bash
   export PATH="$PATH:~/development/flutter/bin"
   ```

4. Run the following command to verify the installation:
   ```bash
   flutter doctor
   ```

## Install Xcode

Since we're developing a macOS application, we need to install Xcode:

1. Install Xcode from the Mac App Store

2. After installation, run the following command to accept the license agreement:
   ```bash
   sudo xcodebuild -license accept
   ```

3. Install Xcode command-line tools:
   ```bash
   sudo xcode-select --install
   ```

## Configure VS Code

1. Install VS Code:
   https://code.visualstudio.com/

2. Install necessary extensions:
   - Flutter
   - Dart

## Enable macOS Desktop Support

1. Enable macOS desktop support:
   ```bash
   flutter config --enable-macos-desktop
   ```

2. Verify that macOS is in the list of supported platforms:
   ```bash
   flutter devices
   ```

## Verify Environment

Run the following command to check if the environment is configured correctly:

```bash
flutter doctor
```

Ensure all check items show ✓. If there are any issues, follow the prompts to resolve them.

## Common Issues

1. Slow Flutter SDK Download
   - Use a mirror site
   - Or use a proxy for downloading

2. Xcode Installation Failure
   - Ensure Mac App Store login is working
   - Check network connection
   - Ensure sufficient disk space

3. VS Code Plugin Installation Failure
   - Check network connection
   - Try using a proxy

## Next Step

Once the environment setup is complete, we can proceed to [Create Project](./01-Create_Project.md).
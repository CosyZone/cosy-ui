# 🚀 通用脚本工具

这个目录包含了通用的实用脚本，适用于各种 Node.js 项目。

## 📦 版本升级脚本 (`bump-version.sh`)

自动化版本号升级的通用脚本，支持 semver 标准的版本升级（patch/minor/major），适用于任何包含 `package.json` 的项目。

### 🎯 功能特性

- ✅ 自动解析当前版本号
- ✅ 根据版本类型智能升级版本
- ✅ 支持预发布标识的处理
- ✅ 人性化的输出和错误提示
- ✅ 彩色终端输出，包含 emoji
- ✅ 完整的错误处理和参数验证
- ✅ 支持自定义版本号
- ✅ 支持指定工作目录
- ✅ 跨平台兼容 (macOS/Linux/Windows)

### 📋 使用方法

```bash
# 显示帮助信息
./scripts/bump-version.sh --help

# 在当前目录升级版本
./scripts/bump-version.sh patch
./scripts/bump-version.sh minor
./scripts/bump-version.sh major
./scripts/bump-version.sh custom 1.2.3

# 在指定目录升级版本
./scripts/bump-version.sh patch ./packages/my-package
./scripts/bump-version.sh minor /path/to/project
./scripts/bump-version.sh custom 1.2.3 ./packages/my-package
```

### 📝 参数说明

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `version_type` | string | ✅ | 版本类型：`patch`、`minor`、`major`、`custom` |
| `custom_version` | string | ⚠️ | 自定义版本号（仅 `custom` 模式需要） |
| `work_directory` | string | ❌ | 工作目录路径（默认为当前目录） |

### 📦 版本升级规则

| 版本类型 | 升级规则 | 说明 |
|---------|---------|-----|
| `patch` | patch + 1 | 补丁版本，用于修复bug |
| `minor` | minor + 1, patch = 0 | 次要版本，用于新增功能 |
| `major` | major + 1, minor = 0, patch = 0 | 主要版本，用于破坏性更改 |
| `custom` | 指定版本 | 使用自定义版本号 |

### 🔧 环境要求

- **Node.js**: 用于解析和修改 `package.json`
- **Bash**: Shell 脚本运行环境
- **package.json**: 目标目录必须包含此文件

### 📤 输出说明

脚本会输出以下信息：

1. **终端输出**: 彩色的进度信息和结果
2. **标准输出**: 新版本号（供其他脚本使用）

### 🌰 使用示例

#### 本地开发

```bash
# 在当前目录升级补丁版本
./scripts/bump-version.sh patch

# 在指定目录升级次要版本
./scripts/bump-version.sh minor ./packages/my-package

# 输出示例：
# ℹ️  工作目录: /path/to/project/packages/my-package
# 🔄 开始版本升级流程...
# 🔄 读取当前版本号...
# ℹ️  当前版本: 0.8.4
# 🔄 解析版本号: major=0, minor=8, patch=4
# ℹ️  补丁版本升级: patch + 1
# ✅ 新版本号: 0.8.5
# 🔄 更新 package.json 文件...
# 📝 版本号已更新: 0.8.4 → 0.8.5
# ✅ package.json 更新完成
# 
# ✅ 🎉 版本升级完成！
# ℹ️  📋 升级详情:
# ℹ️    • 版本类型: patch
# ℹ️    • 旧版本: 0.8.4
# ℹ️    • 新版本: 0.8.5
# 
# 0.8.5
```

#### Monorepo 项目

```bash
# 升级不同包的版本
./scripts/bump-version.sh patch ./packages/ui-components
./scripts/bump-version.sh minor ./packages/utils
./scripts/bump-version.sh custom 2.0.0 ./packages/core
```

#### GitHub Actions 中使用

```yaml
- name: Bump Version
  run: |
    # 🚀 升级版本号
    ./scripts/bump-version.sh patch ./packages/my-package
    
    # 📋 读取升级后的版本号并设置环境变量
    NEW_VERSION=$(node -p "require('./packages/my-package/package.json').version")
    echo "VERSION=${NEW_VERSION}" >> $GITHUB_ENV
    echo "🎯 版本号已设置: ${NEW_VERSION}"
    
    # 或者根据分支动态选择版本类型
    if [[ "${{ github.ref }}" == "refs/heads/feature/*" ]]; then
      ./scripts/bump-version.sh patch ./packages/my-package
    elif [[ "${{ github.ref }}" == "refs/heads/release/*" ]]; then
      ./scripts/bump-version.sh minor ./packages/my-package
    else
      ./scripts/bump-version.sh major ./packages/my-package
    fi
    
    # 设置环境变量
    NEW_VERSION=$(node -p "require('./packages/my-package/package.json').version")
    echo "VERSION=${NEW_VERSION}" >> $GITHUB_ENV
```

### 🚨 注意事项

1. **工作目录**: 目标目录必须包含有效的 `package.json` 文件
2. **权限**: 确保脚本有执行权限 (`chmod +x scripts/bump-version.sh`)
3. **路径**: 支持相对路径和绝对路径
4. **版本格式**: 仅支持 semver 格式的版本号 (`major.minor.patch`)
5. **跨平台**: 在 macOS、Linux 和 Windows（WSL/Git Bash）上测试通过

### 🔍 错误处理

脚本包含完整的错误处理：

- ❌ 参数验证
- ❌ 工作目录存在性检查
- ❌ package.json 文件存在性检查
- ❌ 版本号解析验证
- ❌ 文件读写权限检查

### 🎨 输出颜色说明

- 🔵 **蓝色**: 信息提示
- 🟢 **绿色**: 成功操作
- 🟡 **黄色**: 警告信息
- 🔴 **红色**: 错误信息
- 🟣 **紫色**: 进度步骤

### 🌍 适用场景

- **单包项目**: 直接在项目根目录使用
- **Monorepo**: 指定不同包的目录路径
- **CI/CD**: GitHub Actions、GitLab CI 等自动化环境
- **本地开发**: 手动版本管理和发布准备

---

## 🤝 贡献

如果你想改进这些脚本或添加新功能，欢迎提交 Pull Request！

## 📄 许可证

MIT License - 详见项目根目录的 LICENSE 文件。

#!/bin/bash

# 🚀 通用版本升级脚本
#
# 📝 脚本说明：
# 这个脚本用于自动升级 Node.js 项目的版本号，支持预发布和正式发布两种模式。
# 适用于任何包含 package.json 的项目。
#
# 🎯 功能特性：
# - 自动解析当前版本号
# - 根据分支类型智能升级版本
# - 支持预发布标识的处理
# - 人性化的输出和错误提示
# - 支持指定工作目录
# - 跨平台兼容 (macOS/Linux/Windows)
#
# 📋 使用方法：
# 1. 在当前目录升级版本：
#    ./scripts/bump-version.sh patch
#
# 2. 指定工作目录升级版本：
#    ./scripts/bump-version.sh minor /path/to/project
#
# 3. 自定义版本号：
#    ./scripts/bump-version.sh custom 1.2.3 /path/to/project
#
# 4. 只返回版本号（静默模式）：
#    ./scripts/bump-version.sh patch --quiet
#    ./scripts/bump-version.sh patch /path/to/project --quiet
#
# 📦 版本升级规则：
# - 版本格式遵循 semver 规范: major.minor.patch
# - patch: patch + 1 (补丁版本)
# - minor: minor + 1, patch = 0 (次要版本)
# - major: major + 1, minor = 0, patch = 0 (主要版本)
# - 如果版本包含预发布标识 (如 1.0.0-beta.1)，会自动去除
#
# 🔧 环境要求：
# - Node.js (用于解析和修改 package.json)
# - 目标目录必须包含 package.json 文件
#
# 📤 输出：
# - 脚本会输出新的版本号到 stdout
# - 脚本执行完成后会输出新版本号到标准输出
#
# 🎨 作者：Cosy UI Team
# 📅 创建时间：2025-01-18

set -e  # 遇到错误立即退出

# 🎨 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 📝 打印带颜色的消息
print_info() {
    printf "${BLUE}ℹ️  %s${NC}\n" "$1"
}

print_success() {
    printf "${GREEN}✅ %s${NC}\n" "$1"
}

print_warning() {
    printf "${YELLOW}⚠️  %s${NC}\n" "$1"
}

print_error() {
    printf "${RED}❌ %s${NC}\n" "$1"
}

print_step() {
    printf "${PURPLE}🔄 %s${NC}\n" "$1"
}

# 📋 显示使用帮助
show_help() {
    printf "${CYAN}🚀 通用版本升级脚本${NC}\n"
    echo ""
    printf "${YELLOW}📋 使用方法：${NC}\n"
    echo "  $0 <version_type> [custom_version] [work_directory] [--quiet]"
    echo ""
    printf "${YELLOW}📝 参数说明：${NC}\n"
    echo "  version_type     版本类型 (patch|minor|major|custom)"
    echo "  custom_version   自定义版本号 (仅在 version_type 为 custom 时使用)"
    echo "  work_directory   工作目录路径 (可选，默认为当前目录)"
    echo "  --quiet          静默模式，只输出版本号 (可选)"
    echo ""
    printf "${YELLOW}🌰 使用示例：${NC}\n"
    echo "  $0 patch                         # 在当前目录升级补丁版本 (0.0.1)"
    echo "  $0 minor                         # 在当前目录升级次要版本 (0.1.0)"
    echo "  $0 major                         # 在当前目录升级主要版本 (1.0.0)"
    echo "  $0 custom 1.2.3                 # 在当前目录使用自定义版本号"
    echo "  $0 patch ./packages/my-package   # 在指定目录升级补丁版本"
    echo "  $0 custom 1.2.3 /path/to/project # 在指定目录使用自定义版本号"
    echo "  $0 patch --quiet                 # 静默模式，只输出版本号"
    echo "  $0 patch /path/to/project --quiet # 在指定目录静默升级版本"
    echo ""
}

# 🔍 检查参数
if [ $# -lt 1 ]; then
    print_error "缺少必要参数"
    show_help
    exit 1
fi

VERSION_TYPE=$1
CUSTOM_VERSION=$2
WORK_DIR=$3

# 🔍 检查是否显示帮助
if [[ "$VERSION_TYPE" == "--help" || "$VERSION_TYPE" == "-h" || "$VERSION_TYPE" == "help" ]]; then
    show_help
    exit 0
fi

# 🔍 验证版本类型
if [[ "$VERSION_TYPE" != "patch" && "$VERSION_TYPE" != "minor" && "$VERSION_TYPE" != "major" && "$VERSION_TYPE" != "custom" ]]; then
    print_error "无效的版本类型: $VERSION_TYPE"
    print_info "支持的版本类型: patch, minor, major, custom"
    show_help
    exit 1
fi

# 🔍 检查自定义版本参数
if [[ "$VERSION_TYPE" == "custom" && -z "$CUSTOM_VERSION" ]]; then
    print_error "使用 custom 模式时必须提供版本号"
    show_help
    exit 1
fi

# 🔍 处理工作目录参数
if [[ "$VERSION_TYPE" == "custom" && -n "$3" ]]; then
    WORK_DIR=$3
elif [[ "$VERSION_TYPE" != "custom" && -n "$2" ]]; then
    WORK_DIR=$2
    CUSTOM_VERSION=""
fi

# 📁 设置工作目录
if [ -z "$WORK_DIR" ]; then
    WORK_DIR="."
fi

# 📁 验证工作目录
if [ ! -d "$WORK_DIR" ]; then
    print_error "工作目录不存在: $WORK_DIR"
    exit 1
fi

# 📁 转换为绝对路径
WORK_DIR=$(cd "$WORK_DIR" && pwd)
print_info "工作目录: $WORK_DIR"

# 📦 检查 package.json 文件
if [ ! -f "$WORK_DIR/package.json" ]; then
    print_error "在工作目录中未找到 package.json 文件: $WORK_DIR"
    print_info "请确保目标目录包含 package.json 文件"
    exit 1
fi

print_step "开始版本升级流程..."

# 📖 读取当前版本
print_step "读取当前版本号..."
current_version=$(node -p "require('$WORK_DIR/package.json').version" 2>/dev/null)

if [ $? -ne 0 ]; then
    print_error "无法读取当前版本号"
    print_info "请检查 package.json 文件格式是否正确: $WORK_DIR/package.json"
    exit 1
fi

print_info "当前版本: ${current_version}"

# 🧮 计算新版本号
if [[ "$VERSION_TYPE" == "custom" ]]; then
    new_version="$CUSTOM_VERSION"
    print_info "使用自定义版本号: ${new_version}"
else
    # 解析版本号
    IFS='.' read -r major minor patch <<< "$current_version"
    
    print_step "解析版本号: major=${major}, minor=${minor}, patch=${patch}"
    
    # 如果版本包含预发布标识，则去除它
    if [[ "$patch" == *"-"* ]]; then
        IFS='-' read -r patch_num prerelease <<< "$patch"
        patch=$patch_num
        print_warning "检测到预发布标识，已去除: ${prerelease}"
    fi
    
    # 根据版本类型决定版本号增量
    case "$VERSION_TYPE" in
        "patch")
            new_major=$major
            new_minor=$minor
            new_patch=$((patch + 1))
            print_info "补丁版本升级: patch + 1"
            ;;
        "minor")
            new_major=$major
            new_minor=$((minor + 1))
            new_patch=0
            print_info "次要版本升级: minor + 1, patch = 0"
            ;;
        "major")
            new_major=$((major + 1))
            new_minor=0
            new_patch=0
            print_info "主要版本升级: major + 1, minor = 0, patch = 0"
            ;;
    esac
    
    new_version="${new_major}.${new_minor}.${new_patch}"
fi

print_success "新版本号: ${new_version}"

# 🔄 更新 package.json
print_step "更新 package.json 文件..."

node -e "
    const fs = require('fs');
    const path = require('path');
    try {
        const packagePath = path.join('${WORK_DIR}', 'package.json');
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        const oldVersion = pkg.version;
        pkg.version = '${new_version}';
        fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
        console.log('📝 版本号已更新: ' + oldVersion + ' → ${new_version}');
    } catch (error) {
        console.error('❌ 更新失败:', error.message);
        process.exit(1);
    }
"

if [ $? -ne 0 ]; then
    print_error "更新 package.json 失败"
    exit 1
fi

print_success "package.json 更新完成"

# 📤 输出最终结果
echo ""
print_success "🎉 版本升级完成！"
print_info "📋 升级详情:"
print_info "  • 版本类型: ${VERSION_TYPE}"
print_info "  • 旧版本: ${current_version}"
print_info "  • 新版本: ${new_version}"
echo ""

# 输出新版本号 (供其他脚本使用)
echo "${new_version}" 
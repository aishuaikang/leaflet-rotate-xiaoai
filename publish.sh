#!/bin/bash

# npm 发布脚本
# 使用方法: ./publish.sh [patch|minor|major]

set -e

echo "🚀 开始发布 leaflet-rotate-xiaoai..."

# 检查参数
VERSION_TYPE=${1:-patch}
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo "❌ 错误: 版本类型必须是 patch, minor, 或 major"
    exit 1
fi

# 检查是否有未提交的更改
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  警告: 有未提交的更改，是否继续? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ 发布已取消"
        exit 1
    fi
fi

# 运行测试（如果有）
echo "🧪 运行测试..."
npm test || true

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查包内容
echo "📦 检查包内容..."
npm pack --dry-run

echo "🔍 包内容预览完成，是否继续发布? (y/N)"
read -r response
if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo "❌ 发布已取消"
    exit 1
fi

# 更新版本
echo "📝 更新版本号 ($VERSION_TYPE)..."
npm version $VERSION_TYPE

# 获取新版本号
NEW_VERSION=$(node -p "require('./package.json').version")
echo "✅ 新版本: $NEW_VERSION"

# 推送到 git
echo "📤 推送到 Git..."
git push && git push --tags

# 发布到 npm
echo "🚀 发布到 npm..."
npm publish

echo "🎉 发布成功! 版本 $NEW_VERSION 已发布到 npm"
echo "🔗 查看: https://www.npmjs.com/package/leaflet-rotate-xiaoai"

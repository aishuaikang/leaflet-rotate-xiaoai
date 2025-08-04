# 发布到 NPM 指南

本文档说明如何将 `leaflet-rotate-xiaoai` 发布到 npm。

## 🚀 发布步骤

### 1. 准备工作

确保您已经：

-   拥有 npm 账户
-   已登录 npm (`npm login`)
-   项目已构建完成

### 2. 登录 npm

```bash
npm login
```

输入您的 npm 用户名、密码和邮箱。

### 3. 检查包内容

```bash
npm pack --dry-run
```

这将显示将要发布的文件列表，确保包含：

-   `dist/` - 构建输出文件
-   `src/` - 源代码
-   `types/` - TypeScript 类型定义
-   `README.md` - 说明文档
-   `LICENSE` - 许可证
-   `package.json` - 包配置

### 4. 更新版本号

根据更改类型更新版本：

```bash
# 补丁版本 (0.2.8 -> 0.2.9)
npm version patch

# 小版本 (0.2.8 -> 0.3.0)
npm version minor

# 大版本 (0.2.8 -> 1.0.0)
npm version major
```

### 5. 构建项目

```bash
npm run build
```

确保构建成功，检查：

-   `dist/leaflet-rotate-xiaoai.js` - 压缩版本
-   `dist/leaflet-rotate-xiaoai-src.js` - 源码版本
-   `types/index.d.ts` - TypeScript 类型定义

### 6. 发布到 npm

```bash
npm publish
```

如果这是第一次发布，使用：

```bash
npm publish --access public
```

### 7. 验证发布

发布成功后，可以通过以下方式验证：

```bash
# 检查包信息
npm view leaflet-rotate-xiaoai

# 安装测试
npm install leaflet-rotate-xiaoai
```

## 📋 发布检查清单

在发布前，请确认：

-   [ ] 所有功能都已测试
-   [ ] README.md 已更新
-   [ ] CHANGELOG.md 已更新（如果有）
-   [ ] 版本号正确
-   [ ] TypeScript 类型定义完整
-   [ ] 构建文件存在且正确
-   [ ] 许可证信息正确

## 🛠️ 自动化发布

您也可以使用 GitHub Actions 进行自动化发布：

1. 创建 `.github/workflows/publish.yml`
2. 配置 npm token
3. 推送标签时自动发布

## 📦 包信息

-   **包名**: `leaflet-rotate-xiaoai`
-   **主文件**: `dist/leaflet-rotate-xiaoai.js`
-   **类型定义**: `types/index.d.ts`
-   **源码**: `src/index.js`

## 🔧 故障排除

### 发布失败

1. 检查是否已登录 npm
2. 确认包名没有被占用
3. 检查网络连接
4. 确认包大小不超过限制

### 版本冲突

如果版本号已存在，更新版本号：

```bash
npm version patch
npm publish
```

### 权限问题

确保您有发布权限：

```bash
npm owner ls leaflet-rotate-xiaoai
```

## 📚 相关资源

-   [npm 发布指南](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
-   [语义化版本](https://semver.org/lang/zh-CN/)
-   [npm CLI 文档](https://docs.npmjs.com/cli/v8/commands/npm-publish)

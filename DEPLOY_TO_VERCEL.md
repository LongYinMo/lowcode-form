# 问卷系统 - Vercel部署指南

本指南将帮助您将问卷系统项目成功部署到Vercel平台。

## 前置条件

1. 已安装Git和Node.js
2. 已注册Vercel账号
3. 已在GitHub/GitLab/Bitbucket等平台上创建了项目仓库

## 部署步骤

### 1. 准备项目代码

确保您的项目代码已经包含以下文件和配置：

- `vercel.json`：Vercel部署配置文件（已创建）
- 更新后的`src/services/ajax.ts`：包含环境感知的API配置（已更新）
- 有效的`.gitignore`文件（已存在）

### 2. 将项目推送到代码托管平台

如果您的项目还没有推送到代码托管平台，请使用以下命令：

```bash
# 初始化Git仓库（如果尚未初始化）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 关联远程仓库
git remote add origin <您的仓库URL>

# 推送代码
git push -u origin main
```

### 3. 在Vercel上部署项目

**步骤1：** 登录Vercel账号

访问 [Vercel官网](https://vercel.com/)，使用您的账号登录。

**步骤2：** 导入项目

- 点击"New Project"按钮
- 选择"Import Project"
- 选择您的代码托管平台（GitHub/GitLab/Bitbucket）
- 授权Vercel访问您的仓库
- 选择要部署的问卷系统项目仓库

**步骤3：** 配置项目

- 项目名称：可自定义，也可使用默认名称
- Framework Preset：选择 "Create React App"
- Root Directory：保持默认
- Build Command：保持默认 (`npm run build`)
- Output Directory：保持默认 (`build`)
- Install Command：保持默认 (`npm install`)
- Environment Variables：无需额外配置

**步骤4：** 部署项目

点击"Deploy"按钮，Vercel将开始构建和部署您的项目。

### 4. 部署Mock服务

问卷系统需要Mock服务来提供API支持。您需要单独部署questionnaire-mock项目：

1. 在Vercel上创建一个新的项目
2. 导入questionnaire-mock仓库
3. 选择Framework Preset为 "Other"
4. 设置Build Command为 `npm install`
5. 设置Output Directory为空
6. 设置Development Command为 `npm run dev`
7. 部署项目

### 5. 更新API地址配置

如果您的Mock服务部署在不同于默认地址的URL上，需要更新`src/services/ajax.ts`中的BASE_URL配置：

```typescript
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-mock-service.vercel.app' // 替换为您的Mock服务URL
  : ''
```

更新后，重新部署问卷系统项目。

## 验证部署

1. 部署完成后，Vercel会提供一个访问URL
2. 访问该URL，检查项目是否正常运行
3. 尝试登录、注册、创建问卷等功能，验证API连接是否正常

## 常见问题与解决方案

### 1. 页面刷新后出现404错误

这个问题是由于单页应用（SPA）的路由特性导致的。我们已经在`vercel.json`中配置了解决方案：

```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "build/index.html"
    }
  ]
}
```

如果问题仍然存在，请确保Vercel正确应用了此配置。

### 2. API请求失败

- 检查Mock服务是否已经成功部署
- 确认`ajax.ts`中的BASE_URL配置是否正确
- 使用浏览器的开发者工具检查网络请求和错误信息

### 3. 构建失败

- 确保您的项目能够在本地成功构建：`npm install && npm run build`
- 检查package.json中的依赖和脚本配置
- 查看Vercel的构建日志，查找具体的错误信息

## 项目结构说明

- **前端项目**：questionnaire-system-main（React应用）
- **Mock服务**：questionnaire-mock-main（Node.js Koa应用）
- **C端项目**：questionnaire-client（Next.js应用，本指南未涉及）

## 额外提示

1. 建议为项目设置自定义域名，以提供更好的用户体验
2. 考虑在生产环境使用真实的后端服务，而不是Mock服务
3. 定期更新项目依赖，以确保安全性和性能
4. 使用Vercel的环境变量功能来管理不同环境的配置
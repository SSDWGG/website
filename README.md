# Vue 3 个人主页前端暗黑主题

**描述：** ✨引人注目的个人主页Vue 3前端模板，专为那些喜欢暗黑风格的个人网站或在线简历而设计。它融合了Vue 3的现代前端开发技术和Tailwind CSS的强大样式框架，为用户提供了一个灵活且易于定制的平台，以展示个人信息、项目作品和技能。

**技术栈：**
- **Vue 3：** 使用Vue 3，一款流行的JavaScript框架，提供了组件化开发、响应式数据绑定和路由管理等功能。
- **Tailwind CSS：** 借助Tailwind CSS，一个高度可定制的CSS框架，实现了快速构建现代、响应式和美观的用户界面。

**特点和功能：**
- **暗黑主题：** 突出的暗黑色调，为个人主页带来独特的现代感。
- **响应式设计：** 页面在不同屏幕尺寸上保持良好的响应性，确保在移动设备和桌面上都能提供出色的用户体验。
- **个人资料：** 可以轻松添加个人信息、简历、社交媒体链接和联系信息。
- **项目展示：** 用于展示个人项目作品的精美卡片，包括标题、描述和链接。
- **技能展示：** 显示您的技能标签，突出您的专业领域和能力。

## 新增目录

- `profile/`：参考 `homepage/` 的左右分栏、玻璃拟态卡片、背景与主题切换结构，新增的个人简介展示页。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Deploys to cloud server
Create `.env.deploy.local` with the SSH target config, then run:
```
npm run deploy
```

Required keys:
```
DEPLOY_SSH_HOST=
DEPLOY_SSH_USER=
DEPLOY_SSH_PORT=
DEPLOY_SSH_KEY=
DEPLOY_REMOTE_DIR=
```

Optional dry run:
```
npm run deploy:dry-run
```

### Lints and fixes files
```
npm run lint
```




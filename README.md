# macOS 风格主页

一个 macOS 桌面体验的交互式网站，基于 React 构建。包含 Dock 栏、多窗口管理系统，以及音乐播放器、相册、终端等多个虚拟应用。

![Portfolio Preview](./public/preview.png)

## 功能特性

- **macOS 桌面体验** - 还原 macOS 窗口控制、Dock 栏与动画效果
- **多窗口管理** - 支持拖拽、最小化、最大化等操作
- **虚拟应用**：
  - 音乐播放器（支持播放列表）
  - 瀑布流相册
  - 个人简历
  - 项目展示
  - 联系方式
  - 文章浏览器（Safari）
  - 在线 VS Code 编辑器
  - 技术栈终端
  - 文件管理器（Finder）
  - 小游戏
- **流畅动画** - 基于 GSAP 的过渡与交互效果
- **响应式设计** - 适配桌面端与移动端

## 快速开始

### 环境要求

- Node.js 18 或更高版本
- npm 或 yarn 包管理器

### 安装

1. 克隆项目
```bash
git clone https://github.com/xmbsm/macos-home-page.git
cd your-repo-name
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 浏览器访问 http://localhost:5173

## 构建

```bash
npm run build
```

构建产物将输出至 dist 目录。

## 技术栈

| 技术 | 用途 |
|------|------|
| React 19 | 前端框架 |
| Vite 8 | 构建工具 |
| Tailwind CSS 4 | 样式框架 |
| GSAP + Draggable | 动画引擎 |
| Zustand 5 + Immer | 状态管理（支持不可变更新） |
| Lucide React | 图标库 |
| dayjs | 日期格式化 |
| clsx | 条件类名合并 |
| react-hook-form | 表单处理 |
| react-tooltip | 提示气泡 |
| @web3forms/react | 表单提交服务 |
| Google Fonts（中科大镜像） | 字体（Georama、Roboto Mono） |

## 项目结构

```
src/
├── components/          # 可复用 UI 组件
│   ├── Clock.jsx        # 时钟组件
│   ├── ControlPanel.jsx # 控制面板
│   ├── Dock.jsx         # macOS Dock 栏
│   ├── Home.jsx         # 桌面主页（含文件夹图标）
│   ├── MobileWindow.jsx # 移动端窗口
│   ├── NavBar.jsx       # 顶部菜单栏
│   ├── NavLink.jsx      # 导航链接
│   ├── Welcome.jsx      # 欢迎/加载动画
│   └── WindowControls.jsx # 窗口控制按钮（红黄绿）
├── constants/           # 静态数据与配置
│   └── index.js         # Dock 应用列表、窗口配置等
├── hoc/                 # 高阶组件
│   └── WindowWrapper.jsx # 窗口外壳封装（拖拽、缩放等）
├── store/               # Zustand 状态管理
│   ├── audio.js         # 音频播放状态
│   ├── location.js      # 当前位置（Finder 导航）
│   ├── settings.js      # 系统设置
│   ├── theme.js         # 主题配置
│   └── window.js        # 窗口状态（打开、关闭、层级等）
├── windows/             # 各虚拟窗口组件
│   ├── About.jsx        # 关于
│   ├── Finder.jsx       # 文件管理器
│   ├── Game.jsx         # 小游戏
│   ├── Image.jsx        # 图片查看器
│   ├── Music.jsx        # 音乐播放器
│   ├── Ner.jsx          # Ner 页面
│   ├── Photos.jsx       # 相册
│   ├── Portfolio.jsx    # 作品集
│   ├── Resume.jsx       # 简历
│   ├── Safari.jsx       # Safari 浏览器
│   ├── Sucai.jsx        # 素材站
│   ├── Terminal.jsx     # 终端
│   ├── Text.jsx         # 文本编辑器
│   ├── Trash.jsx        # 回收站
│   ├── VSCode.jsx       # VS Code 编辑器
│   └── Wallpaper.jsx    # 壁纸设置
├── App.jsx              # 主应用入口（窗口调度、预加载）
├── index.css            # 全局样式
└── main.jsx             # React 挂载入口
```

## 常用命令

| 命令 | 说明 |
|------|------|
| npm run dev | 启动开发服务器 |
| npm run build | 生产环境构建 |
| npm run preview | 预览生产构建 |
| npm run lint | 代码规范检查 |

## 自定义配置

### 添加音乐

编辑 src/constants/songs.js

### 添加相册图片

将图片放入 public/images 目录，并更新 src/constants/photos.js

### 更换壁纸

在 src/App.css 中修改壁纸路径

### 新增虚拟窗口

1. 在 src/windows 下创建新组件
2. 使用 WindowWrapper 高阶组件包裹
3. 在 Zustand store 中添加窗口状态
4. 在 Dock 栏中添加对应图标和点击事件

## 部署

支持部署到以下平台：
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [腾讯 EdgeOne](https://edgeone.ai)
- [阿里云 ESA](https://www.aliyun.com/product/esa)
- 任意静态托管服务

### 腾讯 EdgeOne 部署

1. 先执行构建：`npm run build`
2. 将 `dist` 目录上传至 EdgeOne Pages
3. 或通过 GitHub 仓库关联自动构建部署

### 阿里云 ESA 部署

1. 先执行构建：`npm run build`
2. 在阿里云控制台创建 ESA 站点
3. 将 `dist` 目录上传至站点根目录
4. 配置 CDN 加速与 HTTPS 证书

> 如部署到子目录，请配置 `vite.config.js` 中的 `base` 路径。

## 作者

**乔同学**
- 站点：酷设计 https://kusheji.com

## 致谢

- 本项目基于开源项目 [Portfolio-macOS](https://github.com/SwastikSharma15/Portfolio-macOS) 二次开发
- 图标来自 [Lucide](https://lucide.dev)
- 字体通过 [Google Fonts 中科大镜像](https://fonts.loli.net) 加载

---

如果喜欢这个项目，欢迎在 GitHub 上点个 Star！

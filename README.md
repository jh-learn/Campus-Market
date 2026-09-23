# Campus Market

> 面向校园用户的二手商品浏览、发布与管理平台。

[![Build](https://img.shields.io/badge/build-Vite-646CFF.svg)](https://vite.dev/)
[![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)](package.json)
[![License](https://img.shields.io/badge/license-not%20specified-lightgrey.svg)](#许可证)

## 1. 项目名称与简介

- **项目名称**：Campus Market
- **一句话描述**：帮助校园用户发现、发布和管理二手商品，支持搜索、分类筛选、登录和商品信息维护。
- **项目状态**：前端原型与本地演示版本，开发环境使用 MSW 模拟后端接口。

## 2. 功能特性

### 主要功能

- 商品首页浏览、关键词搜索和分类筛选
- 商品详情及卖家信息查看
- 用户登录与退出
- 登录用户发布商品
- 编辑、删除和管理自己的商品
- 商品状态管理：在售、已售
- 表单校验、加载状态和异常状态展示
- 支持教材书籍、电子数码、生活用品、运动器材、服饰鞋包等分类

### 解决的问题与适用场景

Campus Market 适用于校园内的教材、数码产品、生活用品和运动用品等闲置物品流转场景，降低信息发布和查找成本，方便学生进行本地化二手交易。

## 3. 详细技术栈说明

### 核心运行环境

| 技术       | 版本      | 项目中的职责                                           |
| ---------- | --------- | ------------------------------------------------------ |
| Node.js    | 20+       | 提供前端开发、依赖安装和构建所需的 JavaScript 运行环境 |
| TypeScript | `~6.0.2`  | 为组件、API、表单和业务数据提供静态类型检查            |
| Vite       | `^8.3.0`  | 提供开发服务器、HMR 热更新和生产构建能力               |
| React      | `^19.2.8` | 构建页面和可复用 UI 组件                               |
| React DOM  | `^19.2.8` | 将 React 应用挂载到浏览器 DOM                          |

### 前端框架与页面组织

- **React 19**：页面采用函数组件和 Hooks 组织，入口位于 `src/main.tsx`，应用根组件位于 `src/App.tsx`。
- **React Router DOM 7**：负责客户端路由和页面切换，公开页面与登录后页面通过 `RequireAuth` 进行权限分流。
- **CSS Modules**：组件样式使用 `*.module.css` 文件进行局部作用域隔离，避免不同页面和组件之间的样式冲突。

### 状态管理与数据流

- **Zustand `^5.0.15`**：管理认证状态和商品相关的共享状态，避免不必要的全局 Context 嵌套。
- `src/store/authStore.ts`：维护当前用户、登录加载状态、登录、退出和当前用户恢复逻辑。
- `src/store/listingStore.ts`：维护商品相关的客户端状态。
- 页面通过 features 下的 hooks 读取 API 数据，再将加载、成功和错误状态传递给界面组件。

典型数据流如下：

```text
页面组件
	-> feature hooks / Zustand store
	-> Axios API client
	-> /api 接口
	-> 真实后端或开发环境 MSW handlers
```

### 网络请求与错误处理

- **Axios `^1.20.0`**：在 `src/api/client.ts` 中创建统一 API 客户端，基础路径为 `/api`，请求超时时间为 10 秒。
- 请求拦截器自动从 `localStorage` 读取 `token`，并以 `Bearer` 形式写入 `Authorization` 请求头。
- 响应拦截器统一记录接口错误，`getErrorMessage` 用于将未知错误转换为可展示的错误信息。
- `src/api/auth.ts`、`src/api/listings.ts` 和 `src/api/users.ts` 按业务领域封装接口调用，页面不直接拼接 Axios 请求。

### 表单与数据校验

- **React Hook Form `^7.88.0`**：管理登录表单和商品发布、编辑表单的字段状态、提交状态及错误状态。
- **Zod `^4.6.5`**：定义商品表单的数据规则，校验标题、价格、分类、成色等字段。
- **@hookform/resolvers `^5.9.1`**：连接 React Hook Form 与 Zod，使 schema 校验结果可以直接显示在表单中。

### 本地接口模拟与测试支持

- **MSW `^2.15.0`**：在开发环境拦截 `/api` 请求，模拟登录、商品查询、创建、更新和删除等后端行为。
- `src/mocks/handlers.ts`：定义请求处理器和 HTTP 状态码。
- `src/mocks/data.ts`：提供演示用户和商品种子数据。
- `src/mocks/store.ts`：提供当前运行实例中的内存数据操作。
- `public/mockServiceWorker.js`：浏览器端 Service Worker 文件，仅用于开发环境。
- **Vitest `^5.0.1`、Testing Library**：提供单元测试和组件测试依赖，便于后续补充自动化测试。

### 工程质量与构建工具

- **ESLint `^10.10.0`**：检查 JavaScript、TypeScript 和 React 代码规范。
- **typescript-eslint `^8.69.0`**：让 ESLint 支持 TypeScript 语法和类型相关规则。
- **eslint-plugin-react-hooks `^7.1.1`**：检查 React Hooks 的使用方式。
- **eslint-plugin-react-refresh `^0.5.6`**：检查 React Fast Refresh 相关约束。
- **@vitejs/plugin-react `^6.1.1`**：为 Vite 提供 React 文件转换支持。
- `npm run build` 会先执行 `tsc -b` 完成 TypeScript 项目检查，再执行 `vite build` 生成生产资源。

### 路径别名与代码分层

- `@/` 指向 `src/`，用于缩短跨目录导入路径，例如 `@/types`、`@/components/...`。
- `components/` 放置可复用界面组件，`pages/` 放置路由页面，`features/` 放置业务功能模块。
- `api/` 负责远程数据访问，`schemas/` 负责校验规则，`types/` 负责领域类型，`utils/` 负责通用常量和格式化。

## 4. 安装指南

### 环境依赖

- Windows、macOS 或 Linux
- Node.js 20 或更高版本
- npm 10 或更高版本
- 支持现代 JavaScript 的浏览器

### 安装步骤

```bash
git clone <repository-url>
cd campus-market
npm install
```

## 5. 快速开始 / 使用示例

### 启动开发环境

```bash
npm run dev
```

启动后访问终端输出的地址，默认通常为 `http://localhost:5173`。

### 生产构建与预览

```bash
npm run build
npm run preview
```

### 最简使用流程

1. 打开首页浏览商品。
2. 使用搜索框或分类筛选查找商品。
3. 进入 `/login`，使用演示账号登录。
4. 进入 `/create` 发布商品，或进入 `/my-listings` 管理自己的商品。

### 演示账号

| 用户名 | 密码     | 校区   |
| ------ | -------- | ------ |
| `cai`  | `123456` | 东校区 |
| `jin`  | `123456` | 西校区 |
| `hao`  | `123456` | 南校区 |

### 常用命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 类型检查并构建生产版本
npm run preview  # 预览生产构建
npm run lint     # 执行 ESLint 检查
```

## 6. 许可证

当前仓库尚未声明 MIT、Apache 2.0 等开源协议，也未包含 `LICENSE` 文件。使用、分发或修改本项目时，请先取得项目维护者授权。

## 7. 项目结构

```text
src/
├── api/                    # Axios API 封装
├── components/             # 可复用 UI 组件
│   ├── Auth/               # 登录鉴权组件
│   ├── CategoryFilter/     # 分类筛选
│   ├── EmptyState/         # 空状态
│   ├── Layout/             # 页面布局
│   ├── ListingCard/        # 商品卡片
│   ├── Loading/            # 加载状态
│   └── SearchBar/          # 搜索框
├── features/
│   ├── auth/               # 用户认证相关逻辑
│   └── listings/           # 商品列表、商品表单及相关 hooks
├── hooks/                  # 通用 React hooks
├── mocks/                  # MSW worker、handlers、模拟数据和内存 store
├── pages/                  # 路由页面
├── routes/                 # 路由配置和全局样式
├── schemas/                # 表单及数据校验 schema
├── store/                  # Zustand 状态仓库
├── types/                  # TypeScript 类型定义
└── utils/                  # 常量和格式化工具
```

## 8. 配置说明

### 环境变量

当前项目没有必需的环境变量，也没有 `.env` 配置文件。开发环境的接口地址由 `src/api/client.ts` 配置，MSW 仅在 Vite 开发模式下启用。

### 配置文件

- `package.json`：依赖和 npm scripts
- `vite.config.ts`：Vite 构建配置
- `tsconfig*.json`：TypeScript 编译配置
- `eslint.config.js`：ESLint 配置

## 9. API 文档

接口统一使用 `/api` 前缀，开发环境由 MSW 拦截处理。

| 方法     | 路径                | 参数                               | 返回值 / 说明            |
| -------- | ------------------- | ---------------------------------- | ------------------------ |
| `GET`    | `/api/listings`     | `category`、`keyword`、`sellerId`  | 商品列表                 |
| `GET`    | `/api/listings/:id` | 路径参数 `id`                      | 商品详情及卖家信息       |
| `POST`   | `/api/listings`     | 商品标题、价格、分类、成色、图片等 | 新建商品                 |
| `PUT`    | `/api/listings/:id` | 路径参数 `id`、待更新字段          | 更新商品                 |
| `DELETE` | `/api/listings/:id` | 路径参数 `id`                      | 删除商品，成功返回 `204` |
| `POST`   | `/api/login`        | `username`、`password`             | 登录用户及 token         |
| `POST`   | `/api/logout`       | 无                                 | 退出登录                 |
| `GET`    | `/api/me`           | Authorization token                | 当前用户信息             |

示例：查询电子数码商品。

```bash
curl "http://localhost:5173/api/listings?category=electronics"
```

## 10. 贡献指南

1. Fork 项目并创建功能分支。
2. 遵循现有 TypeScript、React 和 CSS Modules 代码风格。
3. 提交改动前执行 `npm run lint` 和 `npm run build`。
4. 创建 Pull Request，说明改动内容、测试方式和可能影响。
5. Bug 或功能建议可通过 Issue 提交，并附上复现步骤、预期行为和实际行为。

## 11. 常见问题（FAQ）

### Q1：为什么刷新页面后新增商品消失了？

当前后端由 MSW 和内存 store 模拟，增删改数据只在当前运行实例中保存，刷新页面或重启开发服务器后会恢复为初始种子数据。

### Q2：为什么生产构建没有模拟接口？

MSW 只在 `import.meta.env.DEV` 为真时启动。生产环境需要接入真实后端 API。

### Q3：登录后使用哪个账号？

可以使用 `cai`、`jin` 或 `hao`，三个账号的密码均为 `123456`。

### Q4：如何检查代码是否可以发布？

依次执行 `npm run lint` 和 `npm run build`，确保代码检查和生产构建均通过。

## 12. 更新日志

当前版本：`0.0.0`

- 初始版本：完成商品浏览、搜索筛选、详情查看、登录、发布、编辑和我的商品管理功能。
- 初始版本：接入 MSW 本地模拟接口和内存种子数据。

后续版本记录将在本文件或新增的 `CHANGELOG.md` 中维护。

## 13. 联系方式

当前仓库尚未提供公开作者、邮箱、社区群或讨论区信息。问题反馈请通过项目托管平台的 Issue 提交。

## 可选内容

### 路线图（Roadmap）

- 接入真实后端 API 和数据库
- 增加图片上传与对象存储
- 增加校内私信、收藏和交易沟通功能
- 增加更完善的权限校验和 token 刷新机制
- 增加自动化单元测试、组件测试和端到端测试
- 增加分页、排序及商品下架流程

### 数据说明

- 商品和用户种子数据位于 `src/mocks/data.ts`。
- 模拟请求处理器位于 `src/mocks/handlers.ts`。
- `public/mockServiceWorker.js` 用于开发环境注册 MSW Service Worker。

## 附录：页面路由

| 路径                 | 页面     | 权限   |
| -------------------- | -------- | ------ |
| `/`                  | 商品首页 | 公开   |
| `/listings/:id`      | 商品详情 | 公开   |
| `/login`             | 登录页   | 公开   |
| `/create`            | 发布商品 | 需登录 |
| `/listings/:id/edit` | 编辑商品 | 需登录 |
| `/my-listings`       | 我的商品 | 需登录 |
| 其他路径             | 404 页面 | 公开   |

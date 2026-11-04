# Palazzo 时令餐厅与酒窖

深色亚麻、胡桃木餐桌与时令料理构成的双语餐厅网站。十一页覆盖首页、菜单、餐厅、私人宴请、礼品卡、预约、使用指南及四个法律说明页面。

主要交互包含八道菜自动转桌与指针惯性、菜单横向拖拽及旋转、配酒价格联动、擦雾与水滴、座位布局、3D 礼品卡、FAQ 和预约日历。预约、询问和礼卡均为本地演示校验。

## 运行

Node 精确版本见 `.nvmrc`，包管理器为 pnpm 9.15.4。使用已有工具链运行以下命令。

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

默认地址为 `http://localhost:3066`，中文路径为 `/`，英文路径为 `/en`。`PORT` 可覆盖端口。前台运行时按 Ctrl+C 停止，仅关闭自己启动的进程。

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm build
corepack pnpm start
```

依赖安装、编译和构建使用本地 Linux 文件系统。运行素材全部本地托管，不需要服务端密钥。环境合同见 `.tpl/contracts/env.schema.json`，示例文件为 `.env.example`。

## 修改

固定首读 `.tpl/README.md`、`.tpl/template.json`、`.tpl/project.json`。详细架构、修改入口、验收方法与许可记录在 `.tpl/docs/`。品牌、内容、主题、组件和页面分别维护，动态加载的路由元数据位于 `meta.ts`。

通用应用通过 `palazzo-template/template` 与 `palazzo-template/host` 导出。消费方可注入品牌、Logo、附加入口及页脚内容。通用源码不保存消费方专属资料。

## 限制与权利

本模板提供演示数据。预订、礼卡和询问不会提交至第三方，也不会保存个人信息。使用指南与政策已与这些实际能力对齐。

参考站为 https://palazzo.framer.website/ 。照片公开可访问，不代表已获再分发或商业授权。源码、照片和字体的权利分别见 `.tpl/docs/LICENSE.md` 与 `ASSETS.md`。模板默认 `listed=false`。

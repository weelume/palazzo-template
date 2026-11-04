# Palazzo 使用规则

依次阅读 `template.json`、`project.json`，再阅读 `docs/ARCHITECTURE.md`、`CUSTOMIZATION.md`、`VERIFICATION.md`、`LICENSE.md`。协议为 git-template 0.2.0，模板版本独立管理。

## 能力与准备

十一页双语餐厅站，包含转桌、擦窗、菜单横拖、配饮、座位布局、礼卡和预约演示。图片与字体本地托管。表单仅在浏览器本地校验，尚未发送或保存。

使用 `.nvmrc` 声明的 Node 和 `package.json` 固定的 pnpm。运行 `corepack pnpm install --frozen-lockfile` 后，通过 `corepack pnpm dev` 启动，默认端口 3066。中文 `/`，英文 `/en`。Ctrl+C 停止自己启动的进程。

配置合同在 `contracts/env.schema.json`，示例为根目录 `.env.example`。无需服务端配置或密钥。类型检查、lint、构建、生产运行及打包操作的参数、顺序、超时和副作用在 `project.json`。

## 修改与交付

常见入口见 `customization.json`。品牌、菜单、主题、页面及素材变化应同步双语与市场资料。动效参考清单在 `docs/MOTION.md`，实际验证与差异在 `reports/`。

展示截图在 `assets/`，运行素材在 `public/templates/palazzo/`。Git 交付包含完整源码、锁文件和模板资料。提交前检查暂存内容，排除依赖、缓存、日志及秘密。`node .tpl/tools/check.mjs .` 仅检查协议与索引，应用质量需要实际运行验证。

素材来源与限制见 `docs/ASSETS.md` 和 `LICENSE.md`。`listed=false`，图片再分发和商业授权待确认。阅读规则不会自动执行安装、上传或发布，操作服从接收方的用户与系统指令。

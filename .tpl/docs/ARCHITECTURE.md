# 架构

应用采用 Next.js App Router、React、TypeScript strict 和已有 framer-motion。业务源码在 `src/features/site-templates/catalog/palazzo/`。

| 入口 | 职责 |
| --- | --- |
| config.ts | 品牌、联系资料、价格和素材路径 |
| content/ | 菜品、过敏原、葡萄酒、故事与法律文案 |
| theme.css | 字体、主题令牌、卡片、滚动条、布局与断点 |
| components/ | 转桌、擦雾、菜单、礼卡、座位、预约与公共外壳 |
| pages/ | 页面区块组合 |
| meta.ts | 十一页、双语及市场注册 |
| host.tsx | 可选消费方品牌与附加内容注入 |
| src/app/[[...slug]]/page.tsx | 独立站路由与 404 |

静态页面与本地交互共用一份模板注册。预约在客户端生成当前日期，避免静态产物跨日失效。无数据库、外部服务、异步任务或发送 API。表单状态仅存在当前组件内。

页面样式由 `.palazzo` 隔离，整页滚动条通过 `html[data-palazzo=true]` 限定，组件卸载时清理。移动菜单锁定背景并将正文及页脚设为 inert，关闭后恢复。局部菜单轨道保留独立滚动。

# 修改指南

1. 在 `config.ts` 调整品牌、联系资料和价格。消费方覆盖品牌时使用 `PalazzoHostProvider`，通用模块保持独立。
2. 在 `content/courses.ts` 编辑八道菜、照片、配酒及过敏原。同步中英文与真实餐厅过敏说明。
3. 在 `content/story.ts` 编辑年份、供应商、私人菜单和 FAQ。在 `content/legal.ts` 更新与实际接入服务一致的政策。
4. 在 `theme.css` 修改用途明确的主题变量。分别检查 1440、834、390 和 320 宽度，尤其是长标题、卡面、表单和导航。
5. 在 `components/` 调整交互，先阅读 `MOTION.md`，检查初态、运行、结束、离屏与恢复。减少动态效果时关闭自动与指针运动。
6. 页面增删同步 `pages/`、`meta.ts`、`.tpl/template.json` 和展示截图。
7. 素材替换同步 `public/templates/palazzo/sources.json`、`ASSETS.md` 和许可记录，保留真实来源。

实际运行检查入口在 `project.json`。源码 ZIP 和运行快照应对应已经验证的同一 Git 提交，不把构建缓存或真实环境配置纳入交付。

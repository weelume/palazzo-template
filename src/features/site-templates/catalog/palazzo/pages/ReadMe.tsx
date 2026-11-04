"use client";
import type { SiteTemplatePageProps } from "../../../types";
import { Layout, Title } from "../components/Layout";
export default function ReadMe({
  locale = "zh",
  basePath,
}: SiteTemplatePageProps) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en);
  const steps = [
    [
      label("名称与标志", "Name and logo"),
      label(
        "在 config.ts 修改品牌，在宿主 Provider 注入标志。导航与页脚统一更新。",
        "Edit the brand in config.ts and provide a logo through the host Provider. Navigation and footer update together.",
      ),
    ],
    [
      label("颜色", "Colours"),
      label(
        "在 theme.css 修改 Ink、Bone、Dust、Brass 与 Line 等主题变量。",
        "Edit the Ink, Bone, Dust, Brass and Line tokens in theme.css.",
      ),
    ],
    [
      label("照片", "Photos"),
      label(
        "在 public/templates/palazzo 替换照片，并同步素材来源记录。俯拍且盘子居中的照片最适合餐桌。",
        "Replace photos in public/templates/palazzo and update asset provenance. Centred overhead dish photos work best for the table.",
      ),
    ],
    [
      label("菜单", "Menu"),
      label(
        "菜品、配酒与过敏原位于 content/courses.ts，价格位于 config.ts。首页与菜单页共用同一内容。",
        "Courses, pairings and allergens live in content/courses.ts. Prices live in config.ts. Home and Menu use the same data.",
      ),
    ],
    [
      label("预约", "Bookings"),
      label(
        "当前为本地演示。接入真实平台时，显式配置服务与隐私说明，保留成功及失败反馈。",
        "Booking is currently a local demo. Configure a real provider and privacy statement explicitly, preserving success and failure feedback.",
      ),
    ],
    [
      label("交付", "Delivery"),
      label(
        "先运行类型检查、lint、构建与页面验证。正式发布前确认图片与品牌素材授权。",
        "Run type checking, lint, build and page verification. Confirm image and brand rights before a public release.",
      ),
    ],
  ];
  return (
    <Layout locale={locale} basePath={basePath}>
      <section className="pz-readme pz-container">
        <Title as="h1">{label("使用指南", "Read me")}</Title>
        <p>
          {label(
            "把这间餐厅变成你的故事 从品牌、菜单到每个交互细节",
            "Everything you need to make Palazzo yours, from the brand and menu to each interaction.",
          )}
        </p>
        {steps.map(([title, body], index) => (
          <article className="pz-guide-step" key={title}>
            <span>{index + 1}</span>
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          </article>
        ))}
        <h2>{label("转桌首屏的最佳效果", "Lazy Susan hero: best results")}</h2>
        <p>
          {label(
            "使用 6 至 10 张光线一致的方形俯拍照片。盘子居中，四周留出完整盘沿。减少动态效果设置会关闭自动旋转。",
            "Use 6 to 10 square overhead photos with consistent lighting. Centre each plate and leave its rim visible. Reduced motion disables automatic rotation.",
          )}
        </p>
        <h2>{label("雾气玻璃的最佳效果", "Fogged window: best results")}</h2>
        <p>
          {label(
            "选择温暖且有生活气息的室内照片。指针或手指可擦开雾气，擦痕会逐渐恢复。也可通过按钮直接查看室内。",
            "Choose a warm, busy interior photo. A pointer or finger wipes away the fog, which gradually returns. The button also provides direct access to the clear view.",
          )}
        </p>
      </section>
    </Layout>
  );
}

"use client";
import Link from "next/link";
import type { SiteTemplatePageProps } from "../../../types";
import { text } from "../config";
import { legalPages } from "../content/legal";
import { Layout, Reveal, Title } from "../components/Layout";
function Legal({
  locale = "zh",
  basePath,
  id,
}: SiteTemplatePageProps & { id: keyof typeof legalPages }) {
  const page = legalPages[id];
  return (
    <Layout locale={locale} basePath={basePath}>
      <section className="pz-legal pz-container">
        <aside>
          <small>{locale === "zh" ? "法律说明" : "Legal"}</small>
          {Object.entries(legalPages).map(([slug, item]) => (
            <Link
              key={slug}
              href={`${basePath}/legal/${slug}`}
              aria-current={slug === id ? "page" : undefined}
            >
              {text(item.title, locale)}
            </Link>
          ))}
        </aside>
        <article>
          <Title as="h1">{text(page.title, locale)}</Title>
          <small>
            {locale === "zh"
              ? "更新于 2026 年 11 月 4 日 · 模板演示说明"
              : "Updated 4 November 2026 · Template demonstration"}
          </small>
          {page.sections.map((section) => (
            <Reveal key={section.title.en}>
              <h2>{text(section.title, locale)}</h2>
              <p>{text(section.body, locale)}</p>
            </Reveal>
          ))}
        </article>
      </section>
    </Layout>
  );
}
export function Privacy(props: SiteTemplatePageProps) {
  return <Legal {...props} id="privacy" />;
}
export function Terms(props: SiteTemplatePageProps) {
  return <Legal {...props} id="terms-of-booking" />;
}
export function Allergens(props: SiteTemplatePageProps) {
  return <Legal {...props} id="allergens" />;
}
export function Cookies(props: SiteTemplatePageProps) {
  return <Legal {...props} id="cookies" />;
}

import { notFound } from "next/navigation";
import { palazzoTemplate as template } from "../../features/site-templates/catalog/palazzo/meta";
export function generateStaticParams() {
  return template.surfaces[0].pages.flatMap((page) =>
    ["zh", "en"].map((locale) => ({
      slug: [
        ...(locale === "en" ? ["en"] : []),
        ...page.slug.split("/").filter(Boolean),
      ],
    })),
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const segments = (await params).slug ?? [];
  const locale = segments[0] === "en" ? "en" : "zh";
  const slug = (locale === "en" ? segments.slice(1) : segments).join("/");
  const page = template.surfaces[0].pages.find((page) => page.slug === slug);
  if (!page) notFound();
  const { default: View } = await page.load();
  return <View locale={locale} basePath={locale === "en" ? "/en" : ""} />;
}

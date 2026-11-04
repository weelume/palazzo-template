import type { ComponentType } from "react";
export type TemplateLocale = "zh" | "en";
export interface SiteTemplatePageProps {
  locale?: TemplateLocale;
  basePath: string;
}
export interface SiteTemplatePage {
  slug: string;
  title: string;
  localizedTitles?: { en?: string };
  load: () => Promise<{ default: ComponentType<SiteTemplatePageProps> }>;
}
export interface SiteTemplate {
  id: string;
  name: string;
  localizedNames?: { en?: string };
  gitUrl?: string;
  sceneId: string;
  listed: boolean;
  tags: string[];
  summary: string;
  accentColor: string;
  cover: string;
  screenshots: [
    {
      src: string;
      alt: string;
      device?: "desktop" | "tablet" | "mobile";
      width?: number;
      height?: number;
    },
    ...{
      src: string;
      alt: string;
      device?: "desktop" | "tablet" | "mobile";
      width?: number;
      height?: number;
    }[],
  ];
  surfaces: {
    id: string;
    name: string;
    platform: "pc";
    locales: readonly TemplateLocale[];
    pages: SiteTemplatePage[];
  }[];
}

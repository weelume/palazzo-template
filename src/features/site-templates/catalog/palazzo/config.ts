import type { TemplateLocale } from "../../types";
export type Copy = { zh: string; en: string };
export const copy = (zh: string, en: string): Copy => ({ zh, en });
export const text = (value: Copy, locale: TemplateLocale) => value[locale];
export const brand = {
  name: copy("帕拉佐", "Palazzo"),
  email: "hello@palazzo.restaurant",
  eventsEmail: "events@palazzo.restaurant",
  address: copy("法国巴黎 布列塔尼街 14 号", "14 Rue de Bretagne, 75003 Paris"),
  tagline: copy("一席八道 品味四季", "Kitchen and wine room, Paris."),
  year: 2026,
};
export const asset = (name: string) => `/templates/palazzo/${name}`;
export const navigation = [
  { slug: "menu", label: copy("时令菜单", "Menu") },
  { slug: "the-room", label: copy("我们的餐厅", "The room") },
  { slug: "private-dining", label: copy("私人宴请", "Private dining") },
  { slug: "gift-cards", label: copy("礼品卡", "Gift cards") },
];
export const pricing = {
  tasting: 145,
  wine: 95,
  alcoholFree: 65,
  postage: 6,
  gift: 480,
  minimumDinner: 1800,
};

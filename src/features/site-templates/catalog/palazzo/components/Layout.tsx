"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { SiteTemplatePageProps, TemplateLocale } from "../../../types";
import { asset, brand, navigation, text } from "../config";
import { usePalazzoHost } from "../host";
import { PairingProvider } from "./PairingContext";
import "../theme.css";

export function Layout({
  locale = "zh",
  basePath,
  children,
  hero = false,
}: SiteTemplatePageProps & { children: ReactNode; hero?: boolean }) {
  const host = usePalazzoHost();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en);
  const href = (slug = "") => `${basePath}/${slug}`.replace(/\/$/, "") || "/";
  const root = basePath.replace(/\/en$/, "");
  const slug = pathname.slice(basePath.length).replace(/^\//, "");
  const translated = locale === "zh" ? `${root}/en/${slug}` : `${root}/${slug}`;
  useEffect(() => {
    const previous = document.documentElement.dataset.palazzo;
    const previousScrollBehavior =
      document.documentElement.dataset.scrollBehavior;
    const language = document.documentElement.lang;
    document.documentElement.dataset.palazzo = "true";
    document.documentElement.dataset.scrollBehavior = "smooth";
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    return () => {
      if (previous === undefined)
        delete document.documentElement.dataset.palazzo;
      else document.documentElement.dataset.palazzo = previous;
      if (previousScrollBehavior === undefined)
        delete document.documentElement.dataset.scrollBehavior;
      else
        document.documentElement.dataset.scrollBehavior =
          previousScrollBehavior;
      document.documentElement.lang = language;
    };
  }, [locale]);
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", close);
    };
  }, [open]);
  function switchLanguage(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    router.push(
      (translated.replace(/\/$/, "") || "/") +
        window.location.search +
        window.location.hash,
    );
  }
  return (
    <PairingProvider>
      <MotionConfig reducedMotion="user">
        <div className={`palazzo ${locale} ${hero ? "has-hero" : ""}`}>
          <header className={`pz-nav ${open ? "is-open" : ""}`}>
            <Link
              className="pz-wordmark"
              href={href()}
              aria-label={text(host.brandName ?? brand.name, locale)}
            >
              {host.lightLogo ? (
                <>
                  <img src={host.lightLogo} alt="" />
                  {text(host.brandName ?? brand.name, locale)}
                </>
              ) : (
                text(brand.name, locale)
              )}
            </Link>
            <nav
              className="pz-desktop-nav"
              aria-label={label("主导航", "Main navigation")}
            >
              {navigation.map((item) => (
                <Link
                  key={item.slug}
                  href={href(item.slug)}
                  aria-current={slug === item.slug ? "page" : undefined}
                >
                  {text(item.label, locale)}
                </Link>
              ))}
            </nav>
            <Link
              className="pz-language"
              href={translated || "/"}
              onClick={switchLanguage}
              aria-label={label("Switch to English", "切换为中文")}
            >
              {label("EN", "中")}
            </Link>
            <Link className="pz-button pz-nav-book" href={href("reservations")}>
              {label("预订席位", "Book a table")}
            </Link>
            <button
              className="pz-menu-toggle"
              aria-label={label(
                open ? "关闭菜单" : "打开菜单",
                open ? "Close menu" : "Open menu",
              )}
              aria-expanded={open}
              aria-controls="pz-mobile-menu"
              onClick={() => setOpen(!open)}
            >
              <span />
              <span />
            </button>
          </header>
          <AnimatePresence>
            {open && (
              <motion.nav
                id="pz-mobile-menu"
                className="pz-mobile-menu"
                aria-label={label("移动端导航", "Mobile navigation")}
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {[
                  ...navigation,
                  {
                    slug: "reservations",
                    label: { zh: "预订席位", en: "Reservations" },
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.slug}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 * index }}
                  >
                    <Link onClick={() => setOpen(false)} href={href(item.slug)}>
                      {text(item.label, locale)}
                      {index === 0 && <img src={asset("scallop.jpg")} alt="" />}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  className="pz-button"
                  onClick={() => setOpen(false)}
                  href={href("reservations")}
                >
                  {label("预订席位", "Book a table")}
                </Link>
                <p>
                  {text(brand.address, locale)}
                  <br />
                  {label("晚餐从 18:30 开始", "Dinner from 18:30")}
                </p>
                <div className="pz-mobile-plates">
                  {["agnolotti.jpg", "scallop.jpg", "chocolate.jpg"].map(
                    (image) => (
                      <img key={image} src={asset(image)} alt="" />
                    ),
                  )}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
          <main id="pz-main" inert={open}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
          <footer className="pz-footer pz-container" inert={open}>
            <div className="pz-footer-grid">
              <div>
                <small>{label("到访", "Visit")}</small>
                <p>{text(brand.address, locale)}</p>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </div>
              <div>
                <small>{label("营业时间", "Hours")}</small>
                <p>
                  {label("周二至周六", "Tuesday to Saturday")}
                  <br />
                  {label("晚餐 18:30 起", "Dinner from 18:30")}
                  <br />
                  {label("周五及周六供应午餐", "Lunch Friday and Saturday")}
                </p>
              </div>
              <div>
                <small>{label("页面", "Pages")}</small>
                {navigation.map((item) => (
                  <Link key={item.slug} href={href(item.slug)}>
                    {text(item.label, locale)}
                  </Link>
                ))}
                <Link href={href("reservations")}>
                  {label("预约", "Reservations")}
                </Link>
              </div>
              <div>
                <small>{label("关注", "Follow")}</small>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <a href={`mailto:${brand.email}`}>
                  {label("订阅来信", "Newsletter")}
                </a>
                <Link href={href("read-me")}>
                  {label("模板使用指南", "Read me")}
                </Link>
              </div>
            </div>
            <div className="pz-footer-brand">
              {text(host.brandName ?? brand.name, locale)}
            </div>
            <div className="pz-footer-bottom">
              <p>
                © {brand.year} {text(host.brandName ?? brand.name, locale)}.{" "}
                {text(brand.tagline, locale)}
              </p>
              <div>
                {[
                  ["privacy", label("隐私政策", "Privacy")],
                  ["terms-of-booking", label("预订条款", "Terms")],
                  ["allergens", label("过敏原", "Allergens")],
                  ["cookies", "Cookies"],
                ].map(([path, title]) => (
                  <Link key={path} href={href(`legal/${path}`)}>
                    {title}
                  </Link>
                ))}
              </div>
            </div>
            {host.filing}
          </footer>
          {host.marketplaceHref && (
            <Link
              href={host.marketplaceHref}
              className="pz-market"
              aria-label={text(
                host.marketplaceAriaLabel ?? {
                  zh: "模板市场",
                  en: "Template marketplace",
                },
                locale,
              )}
            >
              {host.lightLogo && <img src={host.lightLogo} alt="" />}
              <span>{text(host.brandName ?? brand.name, locale)}</span>
            </Link>
          )}
        </div>
      </MotionConfig>
    </PairingProvider>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 32, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
/** 按语义行还原原站的模糊上移，行间错峰 150ms，避免将 AX 字符拆分误当逐字动画。 */
export function Title({
  children,
  as = "h2",
  className = "",
}: {
  children: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={`pz-title ${className}`}
      aria-label={children.replaceAll("\n", " ")}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ staggerChildren: 0.15 }}
    >
      {children.split("\n").map((line, index) => (
        <motion.span
          aria-hidden="true"
          className="pz-title-line"
          key={index}
          variants={{
            hidden: { opacity: 0.001, y: 32, filter: "blur(8px)" },
            shown: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ delay: 0.05, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}
export function Photo({
  name,
  alt,
  className = "",
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      className={`pz-photo ${className}`}
      src={asset(name)}
      alt={alt}
      loading="lazy"
    />
  );
}
export function PairSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      className="pz-switch"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
    >
      <span className="pz-switch-track">
        <motion.i
          animate={{ x: checked ? 17 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </span>
      {label}
    </button>
  );
}
export function Intro({
  title,
  description,
  locale = "zh",
  children,
}: {
  title: string;
  description: string;
  locale?: TemplateLocale;
  children?: ReactNode;
}) {
  return (
    <section className={`pz-intro pz-container ${locale}`}>
      <Title as="h1">{title}</Title>
      <div>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}

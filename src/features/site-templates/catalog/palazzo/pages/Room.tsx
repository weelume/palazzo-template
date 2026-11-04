"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { SiteTemplatePageProps } from "../../../types";
import { asset, text } from "../config";
import { growers, timeline } from "../content/story";
import { Layout, Photo, Reveal, Title } from "../components/Layout";
export default function Room({
  locale = "zh",
  basePath,
}: SiteTemplatePageProps) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en);
  return (
    <Layout locale={locale} basePath={basePath} hero>
      <section className="pz-image-hero">
        <motion.img
          src={asset("dining-room.jpg")}
          alt={label(
            "白色桌布与高窗下的暮色餐厅",
            "Palazzo dining room with white tablecloths and tall windows at dusk",
          )}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="pz-container">
          <Title as="h1">{label("我们的餐厅", "The room")}</Title>
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
          >
            {label(
              "十二张餐桌 一道胡桃木吧台 每个座位都能望见厨房",
              "Twelve tables, one walnut counter and a kitchen you can see from every seat.",
            )}
          </motion.p>
        </div>
      </section>
      <section className="pz-room-story pz-container">
        <div>
          <Title as="h2">
            {label(
              "2014 年 从六张餐桌开始\n每天清晨写下当天菜单\n至今依然如此",
              "Marin opened Palazzo in 2014\nwith six tables and a menu\nwritten each morning. It still is.",
            )}
          </Title>
          <p>
            {label(
              "他在里昂与东京研习厨艺，然后回到家乡，与一小群农场、渔船及种植者合作。餐厅变大了，初衷始终如一。",
              "He trained in Lyon and Tokyo, then came home to cook from a small circle of farms, boats and growers. The room has grown; the idea has not.",
            )}
          </p>
          <Link href={`${basePath}/read-me`} className="pz-text-link">
            {label("阅读完整故事", "Read the full story")}
          </Link>
        </div>
        <Reveal>
          <Photo
            name="chef.png"
            alt={label(
              "主厨 Marin Aubert 在出菜台",
              "Chef Marin Aubert at the pass",
            )}
          />
          <h3>Marin Aubert</h3>
          <small>{label("主厨及创始人", "Chef and owner")}</small>
        </Reveal>
      </section>
      <section className="pz-container pz-section">
        <Title>{label("始于 2014", "Since 2014")}</Title>
        <div className="pz-timeline">
          {timeline.map((item, index) => (
            <motion.article
              key={item.year}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.12 }}
            >
              <h3>{item.year}</h3>
              <p>{text(item.title, locale)}</p>
              <Photo name={item.image} alt={text(item.title, locale)} />
            </motion.article>
          ))}
        </div>
      </section>
      <section className="pz-container pz-section">
        <Title>{label("与我们一起烹饪的人", "Who we cook with")}</Title>
        <p>
          {label(
            "十一家农场、渔船和种植者 大多距巴黎一天车程",
            "Eleven farms, boats and growers, most within a day’s drive of Paris.",
          )}
        </p>
        <div className="pz-growers">
          {growers.map((item) => (
            <Reveal key={item.name}>
              <Photo name={item.image} alt={text(item.type, locale)} />
              <small>{text(item.type, locale)}</small>
              <h3>{item.name}</h3>
            </Reveal>
          ))}
        </div>
      </section>
      <section
        className="pz-gallery pz-container"
        aria-label={label("餐厅影像", "Restaurant gallery")}
      >
        {[
          "dining-room.jpg",
          "wine.jpg",
          "cellar.jpg",
          "vegetables.jpg",
          "truffle.jpg",
          "window.jpg",
        ].map((name, index) => (
          <Reveal key={name}>
            <Photo
              name={name}
              alt={
                [
                  label("晚餐前的餐厅", "Dining room set for dinner"),
                  label("杯中的红葡萄酒", "Red wine poured into a glass"),
                  label("烛光下的酒窖", "The candlelit Cellar Room"),
                  label(
                    "来自诺曼底的时令蔬菜",
                    "Seasonal vegetables from Normandy",
                  ),
                  label("现刨黑松露", "Freshly shaved black truffle"),
                  label("夜色中的餐厅", "The dining room glowing at night"),
                ][index]
              }
            />
          </Reveal>
        ))}
      </section>
      <section className="pz-cta pz-container">
        <Title>{label("来看看亮灯的餐厅", "Come and see it lit")}</Title>
        <Link className="pz-button" href={`${basePath}/reservations`}>
          {label("预订席位", "Book a table")}
        </Link>
      </section>
    </Layout>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";
import { RollingPrice } from "../components/RollingPrice";
import type { SiteTemplatePageProps } from "../../../types";
import { brand, pricing, text } from "../config";
import { allergens, wines } from "../content/courses";
import {
  Intro,
  Layout,
  PairSwitch,
  Photo,
  Reveal,
  Title,
} from "../components/Layout";
import { CourseRail } from "../components/CourseRail";
export default function Menu({
  locale = "zh",
  basePath,
}: SiteTemplatePageProps) {
  const [pairing, setPairing] = useState<"wine" | "soft" | "none">("wine");
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en);
  const total =
    pricing.tasting +
    (pairing === "wine"
      ? pricing.wine
      : pairing === "soft"
        ? pricing.alcoholFree
        : 0);
  return (
    <Layout locale={locale} basePath={basePath}>
      <Intro
        locale={locale}
        title={label("时令菜单", "The menu")}
        description={label(
          "八道菜组成一场晚宴，周二至周六 19:00 开席。菜单跟随市场，当天菜品可能有所变化。",
          "One menu of eight courses, served Tuesday to Saturday from 19:00. It follows the market, so a course can change on the day.",
        )}
      >
        <div className="pz-pills">
          {[
            ["courses", label("品鉴菜单", "Tasting menu")],
            ["pairings", label("配饮", "Pairings")],
            ["allergens", label("过敏原", "Allergens")],
            ["wine", label("杯卖酒", "By the glass")],
          ].map(([id, title]) => (
            <a key={id} href={`#${id}`}>
              {title}
            </a>
          ))}
        </div>
      </Intro>
      <CourseRail locale={locale} />
      <p className="pz-container pz-note">
        {label("拖动查看每一道菜", "Drag to see every course")}
      </p>
      <section id="pairings" className="pz-pairings pz-container">
        <Reveal className="pz-glass">
          <h2>{label("品鉴菜单", "Tasting menu")}</h2>
          <div className="pz-price">€{pricing.tasting}</div>
          <p>
            {label(
              "八道菜 自家烘焙坊的面包与黄油 以及餐后小点",
              "Eight courses, bread and butter from our bakery, petits fours.",
            )}
          </p>
          <div className="pz-total">
            <span>{label("含所选配饮", "With your pairing")}</span>
            <RollingPrice value={total} />
          </div>
          <Link className="pz-button" href={`${basePath}/reservations`}>
            {label("预订品鉴菜单", "Book the tasting menu")}
          </Link>
        </Reveal>
        <div className="pz-pairing-options">
          {[
            {
              id: "wine" as const,
              title: label("葡萄酒搭配", "Wine pairing"),
              price: pricing.wine,
              description: label(
                "侍酒师 Léa 精选六杯葡萄酒 随每道菜依次奉上",
                "Six glasses chosen by Léa, our sommelier, poured with each course.",
              ),
            },
            {
              id: "soft" as const,
              title: label("无酒精搭配", "Pairing without alcohol"),
              price: pricing.alcoholFree,
              description: label(
                "厨房自制发酵饮品 茶与鲜榨果汁",
                "Ferments, teas and pressed juices made in the kitchen.",
              ),
            },
          ].map((item) => (
            <div key={item.id}>
              <h3>
                {item.title}
                <span>+ €{item.price}</span>
              </h3>
              <p>{item.description}</p>
              <PairSwitch
                label={
                  item.id === "wine"
                    ? label("葡萄酒搭配", "Wine pairing")
                    : label("无酒精搭配", "No-alcohol pairing")
                }
                checked={pairing === item.id}
                onChange={(checked) => setPairing(checked ? item.id : "none")}
              />
            </div>
          ))}
        </div>
      </section>
      <section id="allergens" className="pz-allergens pz-container">
        <h2>{label("过敏与饮食偏好", "Allergies and diets")}</h2>
        <p>
          {label(
            "请在预订时告知我们。每道菜均可提供素食版本，大多数菜品可去除麸质或乳制品。",
            "Tell us when you book. Every course can be made vegetarian, and most without gluten or dairy.",
          )}
        </p>
        <div className="pz-pills">
          {allergens.map((item) => (
            <span key={item.id}>{text(item.label, locale)}</span>
          ))}
        </div>
      </section>
      <section id="wine" className="pz-wines pz-container">
        <div>
          <Title>{label("杯中风土", "By the glass")}</Title>
          {wines.map(([type, name, price]) => (
            <div className="pz-wine-row" key={name}>
              <small>{text(type, locale)}</small>
              <h3>{name}</h3>
              <span>€{price}</span>
            </div>
          ))}
        </div>
        <Reveal>
          <Photo
            name="wine.jpg"
            alt={label(
              "侍酒师正在倒红葡萄酒",
              "Sommelier pouring red wine into a glass",
            )}
          />
          <blockquote>
            {label(
              "“我寻找能表达风土，也为食物留下余地的酒。”",
              "“I look for wines that taste of a place and leave room for the food.”",
            )}
          </blockquote>
          <div className="pz-chef-credit">
            <Photo name="sommelier.png" alt="Léa Varenne" />
            <p>Léa Varenne · {label("侍酒师", "sommelier")}</p>
          </div>
          <a className="pz-text-link" href={`mailto:${brand.email}`}>
            {label("索取完整酒单", "Ask for the full wine list")}
          </a>
        </Reveal>
      </section>
    </Layout>
  );
}

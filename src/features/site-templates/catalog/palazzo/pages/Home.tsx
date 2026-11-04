"use client";
import Link from "next/link";
import type { SiteTemplatePageProps } from "../../../types";
import { asset } from "../config";
import { Layout, Photo, Reveal, Title } from "../components/Layout";
import { LazySusan } from "../components/LazySusan";
import { CourseList } from "../components/CourseList";
import { FogWindow } from "../components/FogWindow";
import { Booking } from "../components/Booking";
import { GiftCard } from "../components/GiftCard";
import { SpinningPlate } from "../components/SpinningPlate";
export default function Home({
  locale = "zh",
  basePath,
}: SiteTemplatePageProps) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en);
  return (
    <Layout locale={locale} basePath={basePath} hero>
      <LazySusan locale={locale} basePath={basePath} />
      <section className="pz-home-story pz-container">
        <Title as="h2">
          {label("一席八道\n品味四季", "One table,\neight courses")}
        </Title>
        <SpinningPlate
          alt={label("传家番茄与布拉塔", "Heirloom tomato and burrata")}
        />
        <Title>
          {label("时令所至\n滋味随行", "and the season\nas it arrives.")}
        </Title>
        <Photo
          name="truffle.jpg"
          alt={label(
            "黑松露手工意面",
            "Black truffle shaved over handmade pasta",
          )}
          className="pz-story-truffle"
        />
        <Reveal className="pz-chef-credit">
          <Photo name="chef-avatar.jpg" alt="Marin Aubert" />
          <div>
            <h3>Marin Aubert</h3>
            <small>
              {label("主厨及创始人 始于 2014", "Chef and owner since 2014")}
            </small>
          </div>
          <Link href={`${basePath}/the-room`} className="pz-text-link">
            {label("我们的故事", "Our story")}
          </Link>
        </Reveal>
      </section>
      <CourseList locale={locale} basePath={basePath} />
      <section className="pz-kitchen pz-container">
        <Reveal>
          <Photo
            name="kitchen.jpg"
            alt={label(
              "主厨在出菜台完成料理",
              "Chef plating a dish under the pass lamp",
            )}
          />
        </Reveal>
        <div className="pz-kitchen-copy">
          <div>
            <Title as="h3">
              {label(
                "每天清晨的市场\n决定今晚的菜色",
                "We cook what the market\nbrings in that morning.",
              )}
            </Title>
            <p>
              {label(
                "Marin Aubert 与九人厨房团队，在布列塔尼街开放式出菜台后为你烹饪。",
                "Marin Aubert and a kitchen of nine, behind an open pass on Rue de Bretagne.",
              )}
            </p>
            <Link className="pz-button outline" href={`${basePath}/the-room`}>
              {label("认识我们的厨房", "Meet the kitchen")}
            </Link>
          </div>
          <Reveal>
            <Photo
              name="truffle.jpg"
              alt={label(
                "桌边现刨黑松露",
                "Black truffle shaved over pasta at the table",
              )}
            />
            <small>
              {label(
                "黑松露 供应至三月",
                "Black truffle, in season until March",
              )}
            </small>
          </Reveal>
        </div>
      </section>
      <section className="pz-window pz-container">
        <FogWindow locale={locale} />
        <div>
          <p>
            {label(
              "周二至周六 18:30 起供应晚餐。巴黎三区 布列塔尼街 14 号。",
              "Dinner from 18:30, Tuesday to Saturday. 14 Rue de Bretagne, Paris 3e.",
            )}
          </p>
          <Link className="pz-button outline" href={`${basePath}/reservations`}>
            {label("预订今晚的席位", "Book a table for tonight")}
          </Link>
        </div>
      </section>
      <section className="pz-home-offers pz-container">
        <Reveal className="pz-offer">
          <Photo
            name="cellar.jpg"
            alt={label(
              "酒窖私人长桌",
              "The Cellar Room, a long candlelit table beside a wall of wine",
            )}
          />
          <div className="pz-offer-heading">
            <h2>{label("私人宴请", "Private dining")}</h2>
            <Link
              className="pz-button outline"
              href={`${basePath}/private-dining`}
            >
              {label("咨询", "Enquire")}
            </Link>
          </div>
          <p>
            {label(
              "一张胡桃木长桌 容纳至多 14 位宾客。独立菜单与专属侍酒师，让相聚更从容。",
              "The Cellar Room seats up to 14 at one long walnut table, with its own menu and sommelier.",
            )}
          </p>
          <div className="pz-pills">
            <span>{label("6 至 14 位宾客", "6 to 14 guests")}</span>
            <span>{label("专属侍酒师", "Own sommelier")}</span>
            <span>{label("午宴或晚宴", "Lunch or dinner")}</span>
          </div>
        </Reveal>
        <Reveal className="pz-offer">
          <div
            className="pz-gift-scene"
            style={{ backgroundImage: `url(${asset("linen.jpg")})` }}
          >
            <GiftCard locale={locale} />
          </div>
          <div className="pz-offer-heading">
            <h2>{label("赠一场晚宴", "Gift a dinner")}</h2>
            <Link className="pz-button outline" href={`${basePath}/gift-cards`}>
              {label("选购礼品卡", "Buy a gift card")}
            </Link>
          </div>
          <p>
            {label(
              "一分钟内邮件送达，或以棉纸卡片邮寄。有效期十二个月。",
              "Sent by email in a minute, or posted on cotton card. Valid for twelve months.",
            )}
          </p>
          <div className="pz-pills">
            {["€100", "€250", "€480", label("自选金额", "Any amount")].map(
              (amount) => (
                <Link key={amount} href={`${basePath}/gift-cards#build`}>
                  {amount}
                </Link>
              ),
            )}
          </div>
        </Reveal>
      </section>
      <section
        className="pz-home-book pz-container"
        style={{ backgroundImage: `url(${asset("linen.jpg")})` }}
      >
        <div>
          <Title>{label("预订一席\n把今晚留给相聚", "Book a table")}</Title>
          <p>
            {label(
              "每日中午开放未来 60 天的预订。六人及以上请联系我们，安排酒窖私人包间。",
              "Tables open 60 days ahead, at noon. For six or more, write to us and we will set the Cellar Room.",
            )}
          </p>
        </div>
        <Booking locale={locale} basePath={basePath} compact />
      </section>
    </Layout>
  );
}

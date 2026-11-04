"use client";
import type { SiteTemplatePageProps } from "../../../types";
import { brand, text } from "../config";
import { bookingNotes } from "../content/story";
import { Layout, Reveal, Title } from "../components/Layout";
import { Booking } from "../components/Booking";
export default function Reservations({
  locale = "zh",
  basePath,
}: SiteTemplatePageProps) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en);
  return (
    <Layout locale={locale} basePath={basePath}>
      <section className="pz-reservations pz-container">
        <div>
          <Title as="h1">{label("预订一席\n共赴今晚", "Book a\ntable")}</Title>
          <p>
            {label(
              "每日中午开放未来 60 天的预订。每晚另留两个吧台席位，欢迎直接到访。",
              "Tables open 60 days ahead, at noon. We hold two tables each night for walk-ins at the counter.",
            )}
          </p>
        </div>
        <Booking locale={locale} basePath={basePath} />
      </section>
      <section className="pz-container pz-section">
        <Title>{label("到访之前", "Good to know")}</Title>
        <div className="pz-booking-notes">
          {bookingNotes.map((note) => (
            <Reveal key={note.title.en}>
              <h3>{text(note.title, locale)}</h3>
              <p>{text(note.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="pz-find-us pz-container">
        <div
          className="pz-map"
          role="img"
          aria-label={label(
            "巴黎布列塔尼街与夏洛街示意地图",
            "Schematic map of Rue de Bretagne and Rue Charlot in Paris",
          )}
        >
          <div className="pz-park">Square du Temple</div>
          <span className="pz-street horizontal">Rue de Bretagne</span>
          <span className="pz-street vertical">Rue Charlot</span>
          <span className="pz-map-pin">{text(brand.name, locale)}</span>
        </div>
        <div>
          <Title>{label("找到我们", "Find us")}</Title>
          <p>
            {text(brand.address, locale)}.{" "}
            {label(
              "乘地铁至 Filles du Calvaire 或 Temple 站，步行五分钟。",
              "Métro Filles du Calvaire or Temple, five minutes on foot.",
            )}
          </p>
          <dl>
            <div>
              <dt>{label("周二至周四", "Tuesday to Thursday")}</dt>
              <dd>18:30 – 23:00</dd>
            </div>
            <div>
              <dt>{label("周五与周六", "Friday and Saturday")}</dt>
              <dd>
                12:30 – 14:30
                <br />
                18:30 – 23:30
              </dd>
            </div>
            <div>
              <dt>{label("周日与周一", "Sunday and Monday")}</dt>
              <dd>{label("休息", "Closed")}</dd>
            </div>
          </dl>
          <a
            href="https://maps.google.com/?q=14+Rue+de+Bretagne+75003+Paris"
            target="_blank"
            rel="noreferrer"
            className="pz-button outline"
          >
            {label("查看路线", "Get directions")}
          </a>
        </div>
      </section>
    </Layout>
  );
}

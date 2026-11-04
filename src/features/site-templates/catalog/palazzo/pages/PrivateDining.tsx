"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { SiteTemplatePageProps } from "../../../types";
import { asset, brand, pricing, text } from "../config";
import { privateMenus } from "../content/story";
import { Layout, Photo, Reveal, Title } from "../components/Layout";
import { Seating } from "../components/Seating";
export default function PrivateDining({
  locale = "zh",
  basePath,
}: SiteTemplatePageProps) {
  const [status, setStatus] = useState("");
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setStatus(
      label(
        "信息已通过本地校验。这是演示表单，尚未发送或保存。",
        "Your details passed local validation. This is a demo form. Nothing has been sent or saved.",
      ),
    );
    console.debug("[Palazzo] enquiry locally validated", {
      sent: false,
      saved: false,
    });
  }
  return (
    <Layout locale={locale} basePath={basePath} hero>
      <section className="pz-image-hero">
        <motion.img
          src={asset("cellar.jpg")}
          alt={label(
            "葡萄酒墙前的胡桃木长桌",
            "The Cellar Room, a long walnut table beneath a wall of wine",
          )}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="pz-container">
          <Title as="h1">
            {label("酒窖里的\n私人相聚", "The Cellar Room")}
          </Title>
          <p>
            {label(
              "餐厅楼下的私享空间 一张胡桃木长桌 一整面葡萄酒墙",
              "A private room under the restaurant, with one long walnut table and a wall of wine.",
            )}
          </p>
          <a className="pz-button" href="#enquiry">
            {label("咨询一个日期", "Enquire about a date")}
          </a>
        </div>
      </section>
      <section className="pz-stats pz-container">
        {[
          [
            label("6 至 14", "6 to 14"),
            label("一桌宾客", "guests at one table"),
          ],
          [
            `€${pricing.minimumDinner.toLocaleString("en-GB")}`,
            label("晚宴最低消费", "minimum spend for dinner"),
          ],
          [
            label("三种菜单", "3 menus"),
            label("也可为你专门设计", "or one written for you"),
          ],
          [
            label("独立入口", "Own entrance"),
            label("位于夏洛街", "on Rue Charlot"),
          ],
        ].map(([value, title]) => (
          <Reveal key={title}>
            <strong>{value}</strong>
            <p>{title}</p>
          </Reveal>
        ))}
      </section>
      <section className="pz-seating-section pz-container">
        <div>
          <Title>{label("一张长桌\n或两张餐桌", "One table, or two")}</Title>
          <p>
            {label(
              "让所有人坐在一起，或将餐桌分成两组，从葡萄酒墙旁的站立开胃酒会开始。",
              "Seat everyone together, or split the table in two and start with a standing aperitif by the wine wall.",
            )}
          </p>
        </div>
        <Seating locale={locale} />
      </section>
      <section className="pz-container pz-section">
        <Title>{label("三种方式\n共赴一宴", "Three ways to dine")}</Title>
        <div className="pz-private-menus">
          {privateMenus.map((item) => (
            <Reveal key={item.name.en}>
              <Photo name={item.image} alt={text(item.name, locale)} />
              <h3>{text(item.name, locale)}</h3>
              <p className="pz-gold">
                €{item.price} {label("每位", "per guest")}
              </p>
              <p>{text(item.description, locale)}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="enquiry" className="pz-enquiry pz-container">
        <div>
          <Title>
            {label("说说你期待的\n那个夜晚", "Tell us about\nthe evening")}
          </Title>
          <p>
            {label(
              `Camille 负责每场私人晚宴，并在一天内回复。也可邮件联系 ${brand.eventsEmail}。`,
              `Camille plans every private dinner and replies within a day. You can also write to ${brand.eventsEmail}.`,
            )}
          </p>
        </div>
        <form className="pz-form pz-glass" onSubmit={submit}>
          <div className="pz-form-grid">
            <label>
              {label("姓名", "Name")}
              <input
                required
                name="name"
                autoComplete="name"
                placeholder={label("你的姓名", "Your name")}
              />
            </label>
            <label>
              {label("邮箱", "Email")}
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              {label("日期", "Date")}
              <input required name="date" type="date" />
            </label>
            <label>
              {label("人数", "Guests")}
              <input
                required
                name="guests"
                type="number"
                min={6}
                max={24}
                defaultValue={14}
              />
            </label>
          </div>
          <label>
            {label("场合", "Occasion")}
            <select name="occasion">
              {[
                label("生日", "Birthday"),
                label("商务晚宴", "Business dinner"),
                label("婚礼", "Wedding"),
                label("其他场合", "Something else"),
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            {label("留言", "Message")}
            <textarea
              name="message"
              rows={4}
              placeholder={label(
                "过敏情况、时间安排、致辞等任何需要我们了解的事",
                "Anything we should know: allergies, timing, a speech…",
              )}
            />
          </label>
          <p className="pz-note">
            {label(
              "本地演示表单，尚未发送或保存。",
              "Local demo form. Nothing has been sent or saved.",
            )}
          </p>
          <button className="pz-button" type="submit">
            {label("校验咨询信息", "Send enquiry")}
          </button>
          {status && (
            <p className="pz-status" role="status">
              {status}
            </p>
          )}
        </form>
      </section>
    </Layout>
  );
}

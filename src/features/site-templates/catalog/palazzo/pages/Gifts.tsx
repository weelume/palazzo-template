"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { SiteTemplatePageProps } from "../../../types";
import { asset, pricing } from "../config";
import { giftFAQ } from "../content/story";
import { Layout, Reveal, Title } from "../components/Layout";
import { GiftCard } from "../components/GiftCard";
import { FAQ } from "../components/FAQ";
export default function Gifts({
  locale = "zh",
  basePath,
}: SiteTemplatePageProps) {
  const [design, setDesign] = useState("Walnut"),
    [flip, setFlip] = useState(0);
  const [amount, setAmount] = useState(480),
    [custom, setCustom] = useState(false),
    [post, setPost] = useState(false);
  const [recipient, setRecipient] = useState(""),
    [sender, setSender] = useState(""),
    [message, setMessage] = useState(""),
    [status, setStatus] = useState("");
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setStatus(
      label(
        "礼品卡配置已在本地校验，尚未下单、支付、发送或保存。",
        "Gift card options validated locally. No order, payment, email or storage has been made.",
      ),
    );
    console.debug("[Palazzo] gift locally validated", {
      design,
      amount,
      delivery: post ? "post" : "email",
      sent: false,
      saved: false,
    });
  }
  return (
    <Layout locale={locale} basePath={basePath}>
      <section className="pz-gift-hero pz-container">
        <div>
          <Title as="h1">
            {label("赠一场\n值得记住的晚宴", "Gift a\ndinner")}
          </Title>
          <p>
            {label(
              "一张礼品卡，可用于品鉴菜单、配饮或你选择的任意金额。一分钟送达，有效期十二个月。",
              "A Palazzo gift card covers the tasting menu, the pairing or any amount you choose. Sent in a minute, valid for twelve months.",
            )}
          </p>
          <a href="#build" className="pz-button">
            {label("挑选礼品卡", "Choose a gift card")}
          </a>
        </div>
        <div
          className="pz-gift-stack"
          style={{ backgroundImage: `url(${asset("linen.jpg")})` }}
        >
          {["Night", "Linen", "Walnut"].map((item, index) => (
            <motion.div
              key={item}
              className="pz-stack-layer"
              initial={{ y: 60, opacity: 0, rotate: 0 }}
              whileInView={{ y: 0, opacity: 1, rotate: [-18, -8, 6][index] }}
              viewport={{ once: true }}
              transition={{
                duration: 1.4,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <GiftCard design={item} locale={locale} />
            </motion.div>
          ))}
        </div>
      </section>
      <section id="build" className="pz-gift-builder pz-container">
        <div className="pz-gift-preview">
          <GiftCard
            locale={locale}
            design={design}
            amount={Number.isFinite(amount) ? amount : 0}
            recipient={recipient}
            message={message}
            flip={flip}
          />
          <p className="pz-note">
            {label("预览会随你的选择实时更新", "Preview updates as you choose")}
          </p>
        </div>
        <form className="pz-gift-options" onSubmit={submit}>
          <fieldset>
            <legend>
              <b>1</b>
              {label("选择卡面", "Choose a card")}
            </legend>
            <div className="pz-pills">
              {[
                ["Walnut", label("胡桃木", "Walnut")],
                ["Linen", label("亚麻", "Linen")],
                ["Night", label("夜色", "Night")],
              ].map(([value, name]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={design === value}
                  onClick={() => {
                    if (design !== value) {
                      setFlip(flip + 1);
                      setDesign(value);
                    }
                    setStatus("");
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <b>2</b>
              {label("金额", "Amount")}
            </legend>
            <div className="pz-pills">
              {[100, 250, 480].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={!custom && amount === value}
                  onClick={() => {
                    setAmount(value);
                    setCustom(false);
                    setStatus("");
                  }}
                >
                  €{value}
                  {value === 480
                    ? label(" · 双人品鉴", " · Tasting for two")
                    : ""}
                </button>
              ))}
              <button
                type="button"
                aria-pressed={custom}
                onClick={() => setCustom(true)}
              >
                {label("自选金额", "Any amount")}
              </button>
            </div>
            {custom && (
              <label className="pz-custom-amount">
                {label("金额 最低 €20", "Amount, minimum €20")}
                <input
                  type="number"
                  required
                  min={20}
                  step={1}
                  value={amount || ""}
                  onChange={(event) => {
                    setAmount(event.target.valueAsNumber);
                    setStatus("");
                  }}
                />
              </label>
            )}
          </fieldset>
          <fieldset>
            <legend>
              <b>3</b>
              {label("配送", "Delivery")}
            </legend>
            <div className="pz-pills">
              <button
                type="button"
                aria-pressed={!post}
                onClick={() => {
                  setPost(false);
                  setStatus("");
                }}
              >
                {label("电子邮件 即日送达", "Email, today")}
              </button>
              <button
                type="button"
                aria-pressed={post}
                onClick={() => {
                  setPost(true);
                  setStatus("");
                }}
              >
                {label("棉纸卡片邮寄", "Cotton card by post")} · + €
                {pricing.postage}
              </button>
            </div>
          </fieldset>
          <div className="pz-form">
            <label>
              {label("送给", "To")}
              <input
                required
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                placeholder={label("收赠人姓名与邮箱", "Their name and email")}
              />
            </label>
            <label>
              {label("来自", "From")}
              <input
                required
                value={sender}
                onChange={(event) => setSender(event.target.value)}
                placeholder={label("你的姓名", "Your name")}
              />
            </label>
            <label>
              {label("寄语", "Message")}
              <textarea
                rows={3}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={label(
                  "生日快乐 这顿晚餐请你享用",
                  "Happy birthday, Anna. Dinner is on us.",
                )}
              />
            </label>
          </div>
          <div className="pz-total">
            <span>{label("合计", "Total")}</span>
            <motion.strong
              key={`${amount}-${post}`}
              initial={{ filter: "blur(6px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
            >
              €
              {Number.isFinite(amount)
                ? amount + (post ? pricing.postage : 0)
                : 0}
            </motion.strong>
          </div>
          <button className="pz-button" type="submit">
            {label("校验礼品卡", "Buy gift card")}
          </button>
          <p className="pz-note">
            {label(
              "本地演示，尚未下单、支付、发送或保存。",
              "Local demo. No order, payment, email or storage is made.",
            )}
          </p>
          {status && (
            <p role="status" className="pz-status">
              {status}
            </p>
          )}
        </form>
      </section>
      <section className="pz-gift-steps pz-container">
        {[
          [
            label("收到一封邮件", "They get an email"),
            label(
              "邮件内附礼品卡链接与你的寄语",
              "A link to the card and your message, the moment you pay.",
            ),
          ],
          [
            label("预订一张餐桌", "They book a table"),
            label(
              "未来十二个月内 用卡号在线预订任意晚餐",
              "Online with the card code, any evening in the next 12 months.",
            ),
          ],
          [
            label("余下交给我们", "We take care of it"),
            label(
              "金额从账单中扣除 余额继续保留在卡内",
              "The amount comes off the bill. Anything left stays on the card.",
            ),
          ],
        ].map(([title, body]) => (
          <Reveal key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </Reveal>
        ))}
      </section>
      <section className="pz-faq-section pz-container">
        <Title>{label("常见问题", "Questions")}</Title>
        <FAQ items={giftFAQ} locale={locale} />
      </section>
    </Layout>
  );
}

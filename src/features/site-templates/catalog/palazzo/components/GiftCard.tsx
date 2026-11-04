"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { asset, brand, text } from "../config";
import type { TemplateLocale } from "../../../types";
import { usePalazzoHost } from "../host";
export function GiftCard({
  locale = "zh",
  design = "Walnut",
  amount = 480,
  recipient = "",
  message = "",
  flip = 0,
}: {
  locale?: TemplateLocale;
  design?: string;
  amount?: number;
  recipient?: string;
  message?: string;
  flip?: number;
}) {
  const host = usePalazzoHost();
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 120, damping: 18 }),
    rotateY = useSpring(y, { stiffness: 120, damping: 18 });
  const shine = useTransform(y, [-10, 10], ["-30%", "130%"]);
  const description =
    amount >= 480
      ? locale === "zh"
        ? "双人品鉴晚宴"
        : "A tasting dinner for two"
      : amount >= 145
        ? locale === "zh"
          ? "单人品鉴晚宴"
          : "A tasting dinner for one"
        : locale === "zh"
          ? "一份晚餐心意"
          : "A gift towards dinner";
  const pairing =
    amount >= 250
      ? locale === "zh"
        ? "含葡萄酒搭配"
        : "With wine pairing"
      : locale === "zh"
        ? "随季节品尝"
        : "A seasonal tasting";
  return (
    <motion.div
      className="pz-card-perspective"
      onPointerMove={(event) => {
        if (event.pointerType === "touch" || reduced) return;
        const r = event.currentTarget.getBoundingClientRect();
        x.set((-(event.clientY - r.top - r.height / 2) / r.height) * 20);
        y.set(((event.clientX - r.left - r.width / 2) / r.width) * 20);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
    >
      <motion.div
        className={`pz-gift-card ${design.toLowerCase()}`}
        animate={{ rotateY: flip * 180 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={
          design === "Walnut"
            ? { backgroundImage: `url(${asset("table.png")})` }
            : {}
        }
      >
        <div
          className="pz-card-content"
          style={{ transform: flip % 2 ? "rotateY(180deg)" : undefined }}
        >
          <div>
            <strong>{text(host.brandName ?? brand.name, locale)}</strong>
            <small>No. 0142</small>
          </div>
          <div>
            <h3>{recipient || description}</h3>
            <p>{message || pairing}</p>
            <span className="pz-card-amount">€{amount}</span>
          </div>
        </div>
        <motion.div className="pz-card-shine" style={{ left: shine }} />
      </motion.div>
    </motion.div>
  );
}

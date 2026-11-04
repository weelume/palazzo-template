"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { TemplateLocale } from "../../../types";
export function Seating({ locale = "zh" }: { locale?: TemplateLocale }) {
  const [layout, setLayout] = useState(0);
  const labels =
    locale === "zh"
      ? ["一张长桌 · 14 人", "两张餐桌 · 8 + 6 人", "站立酒会 · 24 人"]
      : ["One table · 14", "Two tables · 8 + 6", "Standing · 24"];
  const count = layout === 2 ? 24 : 14;
  return (
    <div className="pz-seating pz-glass">
      <div className="pz-pills">
        {labels.map((label, index) => (
          <button
            key={label}
            aria-pressed={layout === index}
            onClick={() => setLayout(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className="pz-seating-plan"
        role="img"
        aria-label={`${labels[layout]} ${locale === "zh" ? "座位布局" : "seating layout"}`}
      >
        <span className="pz-wine-wall">
          {locale === "zh" ? "葡萄酒墙" : "Wine wall"}
        </span>
        <motion.div
          className="pz-seating-table"
          animate={{
            width: layout === 2 ? "28%" : layout === 1 ? "32%" : "65%",
            height: layout === 2 ? "16%" : "28%",
            x: layout === 1 ? "-45%" : "0%",
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
        {layout === 1 && (
          <motion.div
            className="pz-seating-table second"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
        {Array.from({ length: count }, (_, i) => {
          const half = count / 2;
          const row = i < half ? 0 : 1;
          const position = i % half;
          const x =
            layout === 2
              ? 50 + 34 * Math.cos((i / count) * Math.PI * 2)
              : 20 + (position / (half - 1)) * 60;
          const y =
            layout === 2
              ? 50 + 32 * Math.sin((i / count) * Math.PI * 2)
              : row
                ? 73
                : 30;
          return (
            <motion.i
              className="pz-chair"
              key={i}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, left: `${x}%`, top: `${y}%` }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          );
        })}
        <span className="pz-entrance">
          {locale === "zh" ? "入口 · 夏洛街" : "Entrance · Rue Charlot"}
        </span>
        <span className="pz-pass">
          {locale === "zh" ? "独立出菜台" : "Private pass"}
        </span>
      </div>
    </div>
  );
}

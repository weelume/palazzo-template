"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import type { SiteTemplatePageProps } from "../../../types";
import { asset, pricing, text } from "../config";
import { courses } from "../content/courses";
import { PairSwitch, Title } from "./Layout";
import { usePairing } from "./PairingContext";
export function CourseList({ locale = "zh", basePath }: SiteTemplatePageProps) {
  const { wine, setWine } = usePairing();
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const left = useSpring(x, { stiffness: 90, damping: 20 }),
    top = useSpring(y, { stiffness: 90, damping: 20 });
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en);
  return (
    <section className="pz-tonight pz-container">
      <div className="pz-tonight-intro">
        <Title>{label("今晚的菜单", "Tonight")}</Title>
        <p>
          {label(
            "19:00 开席 一席八道。菜单随每日市场而变化，今晚或有新的惊喜。",
            "Eight courses at one seating, from 19:00. The menu changes with the market, so it may differ on the night.",
          )}
        </p>
        <div className="pz-price">
          €{pricing.tasting}
          <small>{label("每位", "per guest")}</small>
        </div>
        <PairSwitch
          label={label("葡萄酒搭配", "Wine pairing")}
          checked={wine}
          onChange={setWine}
        />
        {wine && <small className="pz-gold">+ €{pricing.wine}</small>}
        <Link className="pz-button outline" href={`${basePath}/reservations`}>
          {label("预订品鉴菜单", "Book the tasting menu")}
        </Link>
      </div>
      <div
        className="pz-course-list"
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return;
          const r = event.currentTarget.getBoundingClientRect();
          x.set(event.clientX - r.left - 130);
          y.set(event.clientY - r.top - 130);
        }}
        onPointerLeave={() => setActive(null)}
      >
        {courses.map((course, index) => (
          <Link
            key={course.id}
            href={`${basePath}/menu#courses`}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setActive(index);
            }}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            className="pz-course-row"
            style={{ opacity: active === null || active === index ? 1 : 0.5 }}
          >
            <span>{course.id}</span>
            <div>
              <h3>{text(course.name, locale)}</h3>
              {wine && (
                <small>
                  {label("搭配", "Paired with")} {course.wine}
                </small>
              )}
            </div>
          </Link>
        ))}
        {active !== null && (
          <motion.img
            className="pz-hover-plate"
            src={asset(courses[active].image)}
            alt=""
            style={{ left, top }}
            initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: -8, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </div>
    </section>
  );
}

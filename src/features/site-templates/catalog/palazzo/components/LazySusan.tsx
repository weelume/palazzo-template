"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useInView,
  animate,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import type { SiteTemplatePageProps, TemplateLocale } from "../../../types";
import { asset, pricing, text } from "../config";
import { courses } from "../content/courses";
import { PairSwitch } from "./Layout";
import { usePairing } from "./PairingContext";

export function LazySusan({ locale = "zh", basePath }: SiteTemplatePageProps) {
  const count = courses.length;
  const initialCourse = Math.min(3, Math.max(0, count - 1));
  const [index, setIndex] = useState(initialCourse);
  const { wine, setWine } = usePairing();
  const [paused, setPaused] = useState(false);
  const angle = useMotionValue((initialCourse * 360) / Math.max(1, count));
  const reduced = useReducedMotion();
  const region = useRef<HTMLDivElement>(null);
  const visible = useInView(region, { amount: 0.2 });
  // 首次测量后创建餐桌，保证小屏首次入场使用自己的运动方向。
  const [size, setSize] = useState({ width: 0, height: 0 });
  const idleUntil = useRef(0);
  const lastAutoTurn = useRef(0);
  const frame = useRef(0);
  const lastStep = useRef(0);
  const drag = useRef<{
    angle: number;
    x: number;
    y: number;
    moved: boolean;
    last: number;
    time: number;
    velocity: number;
  } | null>(null);
  const select = useCallback(
    (next: number) => {
      if (count === 0) return;
      animate(
        angle,
        (next * 360) / count,
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 120, damping: 18 },
      );
    },
    [angle, count, reduced],
  );
  useMotionValueEvent(angle, "change", (value) => {
    if (count > 0)
      setIndex(((Math.round(value / (360 / count)) % count) + count) % count);
  });
  const step = useCallback(
    (direction: number) => {
      const now = performance.now();
      if (now - lastStep.current < 420) return;
      lastStep.current = now;
      idleUntil.current = now + 7000;
      select(Math.round(angle.get() / (360 / Math.max(1, count))) + direction);
    },
    [angle, count, select],
  );
  useEffect(() => {
    const element = region.current;
    if (!element) return;
    function wheel(event: WheelEvent) {
      if (
        !event.shiftKey &&
        Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.2
      )
        return;
      event.preventDefault();
      step((event.deltaX || event.deltaY) > 0 ? 1 : -1);
    }
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, [step]);
  useEffect(() => {
    const el = region.current;
    if (!el) return;
    const observer = new ResizeObserver(() =>
      setSize({ width: el.clientWidth, height: el.clientHeight }),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  useEffect(() => {
    if (paused || reduced || !visible || count < 2) return;
    lastAutoTurn.current = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      if (now > idleUntil.current && now - lastAutoTurn.current >= 4800) {
        select(Math.round(angle.get() / (360 / count)) + 1);
        lastAutoTurn.current = now;
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [paused, reduced, select, angle, count, visible]);
  function pointerAngle(x: number, y: number) {
    const rect = region
      .current!.querySelector(".pz-table")!
      .getBoundingClientRect();
    return (
      (Math.atan2(
        y - rect.top - rect.height / 2,
        x - rect.left - rect.width / 2,
      ) *
        180) /
      Math.PI
    );
  }
  function begin(event: React.PointerEvent<HTMLDivElement>) {
    angle.stop();
    cancelAnimationFrame(frame.current);
    event.currentTarget.setPointerCapture(event.pointerId);
    const a = pointerAngle(event.clientX, event.clientY);
    drag.current = {
      angle: angle.get(),
      x: event.clientX,
      y: event.clientY,
      moved: false,
      last: a,
      time: performance.now(),
      velocity: 0,
    };
    setPaused(true);
  }
  function move(event: React.PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state) return;
    if (Math.hypot(event.clientX - state.x, event.clientY - state.y) > 6)
      state.moved = true;
    const current = pointerAngle(event.clientX, event.clientY);
    const delta = ((current - state.last + 540) % 360) - 180;
    const now = performance.now();
    state.velocity =
      state.velocity * 0.6 +
      (delta / Math.max(8, now - state.time)) * 1000 * 0.4;
    state.angle += delta;
    state.last = current;
    state.time = now;
    angle.set(state.angle);
  }
  function finish(cancelled = false) {
    const state = drag.current;
    if (!state) return;
    drag.current = null;
    setPaused(false);
    idleUntil.current = performance.now() + 7000;
    if (cancelled) {
      select(Math.round(state.angle / (360 / count)));
      return;
    }
    if (!state.moved) {
      step(1);
      return;
    }
    if (reduced) {
      select(Math.round(state.angle / (360 / count)));
      return;
    }
    // 惯性衰减后切换到同一角度网格上的弹簧吸附，逐帧同步当前菜品。
    let velocity = Math.max(-900, Math.min(900, state.velocity)),
      last = performance.now();
    function coast(now: number) {
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;
      velocity *= Math.pow(0.93, dt * 60);
      angle.set(angle.get() + velocity * dt);
      if (Math.abs(velocity) < 25) {
        select(Math.round(angle.get() / (360 / count)));
        return;
      }
      frame.current = requestAnimationFrame(coast);
    }
    frame.current = requestAnimationFrame(coast);
  }
  const mobile = size.width < 1000;
  const unit = Math.min(size.width, size.height * 0.5);
  const diameter = mobile ? 1.96 * unit : 1.4 * size.height;
  const radius = mobile ? 0.646 * unit : 0.4656 * size.height;
  const plate = mobile ? 0.4257 * unit : 0.3064 * size.height;
  const centerX = mobile
    ? size.width / 2
    : Math.max(size.width - 0.1745 * size.height, 660 + radius + 0.65 * plate);
  const centerY = mobile ? size.height - 0.133 * unit : 0.54 * size.height;
  const course = courses[index];
  if (!course) return null;
  return (
    <section
      className="pz-susan"
      aria-label={locale === "zh" ? "今晚的八道菜" : "Tonight’s courses"}
      style={{ backgroundImage: `url(${asset("linen.jpg")})` }}
    >
      <div className="pz-susan-copy">
        <div className="pz-course-count">
          {locale === "zh"
            ? `第 ${index + 1} 道 / 共 ${count} 道`
            : `Course ${index + 1} of ${count}`}
          <div>
            {courses.map((item, i) => (
              <button
                key={item.id}
                aria-label={text(item.name, locale)}
                aria-pressed={index === i}
                onClick={() => {
                  idleUntil.current = performance.now() + 7000;
                  select(Math.round(angle.get() / 360) * count + i);
                }}
              />
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={{ duration: reduced ? 0.3 : 0.9 }}
          >
            <h1>
              {locale === "en"
                ? course.name.en.split(",").map((part, i) => (
                    <span key={i}>
                      {i > 0 ? ", " : ""}
                      {i === 1 ? <em>{part.trim()}</em> : part.trim()}
                    </span>
                  ))
                : course.name.zh}
            </h1>
            <p>{text(course.description, locale)}</p>
          </motion.div>
        </AnimatePresence>
        <div className="pz-susan-actions">
          <PairSwitch
            checked={wine}
            onChange={setWine}
            label={locale === "zh" ? "葡萄酒搭配" : "Wine pairing"}
          />
          <Link className="pz-button outline" href={`${basePath}/reservations`}>
            {locale === "zh" ? "预订品鉴菜单" : "Book the tasting menu"}
          </Link>
          <small>
            €{pricing.tasting} {locale === "zh" ? "每位" : "per guest"}
          </small>
        </div>
      </div>
      <div
        className="pz-table-zone"
        ref={region}
        onPointerDown={begin}
        onPointerMove={move}
        onPointerUp={() => finish()}
        onPointerCancel={() => finish(true)}
        role="group"
        tabIndex={0}
        aria-label={
          locale === "zh"
            ? "拖动餐桌或按左右键切换菜品"
            : "Drag the table or use left and right keys to change course"
        }
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            idleUntil.current = performance.now() + 7000;
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            idleUntil.current = performance.now() + 7000;
            step(-1);
          }
        }}
      >
        {size.width > 0 && (
          <motion.div
            initial={
              reduced
                ? false
                : {
                    x: mobile ? 0 : "22%",
                    y: mobile ? "16%" : 0,
                    rotate: -35,
                    opacity: 0,
                  }
            }
            animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            className="pz-table-position"
            style={{
              width: diameter,
              height: diameter,
              left: centerX - diameter / 2,
              top: centerY - diameter / 2,
            }}
          >
            <motion.div className="pz-table" style={{ rotate: angle }}>
              <img
                className="pz-table-wood"
                src={asset("table.png")}
                alt={locale === "zh" ? "圆形胡桃木餐桌" : "Round walnut table"}
                draggable={false}
              />
              {courses.map((item, i) => (
                <div
                  key={item.id}
                  className="pz-table-place"
                  style={{
                    transform: `rotate(${(mobile ? 270 : 180) - (i * 360) / count}deg) translateX(${radius}px)`,
                    width: plate,
                    height: plate,
                    marginLeft: -plate / 2,
                    marginTop: -plate / 2,
                  }}
                >
                  <CoursePlate
                    course={item}
                    index={i}
                    count={count}
                    angle={angle}
                    locale={locale}
                    reduced={Boolean(reduced)}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
      <div className="pz-susan-hint">
        <button aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {locale === "zh"
            ? paused
              ? "继续转动"
              : "暂停转动"
            : paused
              ? "Resume rotation"
              : "Pause rotation"}
        </button>
        <span>
          {locale === "zh"
            ? "拖动餐桌 让美味流转"
            : "Drag the table to turn it"}
        </span>
      </div>
    </section>
  );
}

/** 每盘独立订阅餐桌角度，按与正面夹角连续缩放，保留整个盘沿。 */
function CoursePlate({
  course,
  index,
  count,
  angle,
  locale,
  reduced,
}: {
  course: (typeof courses)[number];
  index: number;
  count: number;
  angle: MotionValue<number>;
  locale: TemplateLocale;
  reduced: boolean;
}) {
  const scale = useTransform(angle, (value) => {
    const delta =
      ((((value - (index * 360) / count + 180) % 360) + 360) % 360) - 180;
    return 1 + 0.26 * Math.max(0, 1 - Math.abs(delta) / (360 / count));
  });
  return (
    <motion.div className="pz-plate-mask" style={{ scale }}>
      <motion.img
        initial={reduced ? false : { opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.6 + index * 0.12 }}
        src={asset(course.image)}
        alt={text(course.name, locale)}
        draggable={false}
      />
    </motion.div>
  );
}

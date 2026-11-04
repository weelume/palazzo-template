"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { TemplateLocale } from "../../../types";
import { asset, text } from "../config";
import { allergens, courses } from "../content/courses";
export function CourseRail({ locale = "zh" }: { locale?: TemplateLocale }) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    x: number;
    scroll: number;
    last: number;
    time: number;
    velocity: number;
  } | null>(null);
  const frame = useRef(0);
  const angle = useMotionValue(0),
    rotate = useSpring(angle, { stiffness: 60, damping: 20 });
  function start(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    cancelAnimationFrame(frame.current);
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      x: event.clientX,
      scroll: event.currentTarget.scrollLeft,
      last: event.clientX,
      time: performance.now(),
      velocity: 0,
    };
  }
  function move(event: React.PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state) return;
    event.currentTarget.scrollLeft = state.scroll + state.x - event.clientX;
    const now = performance.now();
    state.velocity =
      (event.clientX - state.last) / Math.max(1, now - state.time);
    state.time = now;
    state.last = event.clientX;
  }
  function end() {
    const state = drag.current;
    drag.current = null;
    if (!state) return;
    let velocity = state.velocity;
    function coast() {
      if (!rail.current || Math.abs(velocity) < 0.02) return;
      rail.current.scrollLeft -= velocity * 16;
      velocity *= 0.95;
      frame.current = requestAnimationFrame(coast);
    }
    frame.current = requestAnimationFrame(coast);
  }
  return (
    <div
      id="courses"
      className="pz-course-rail"
      ref={rail}
      tabIndex={0}
      role="region"
      aria-label={
        locale === "zh"
          ? "八道菜 横向滑动或用左右键查看"
          : "Eight courses. Drag or use arrow keys to browse"
      }
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
      onScroll={(event) => angle.set(event.currentTarget.scrollLeft * 0.12)}
    >
      <div className="pz-course-track">
        {courses.map((course, index) => (
          <motion.article
            className="pz-course-card"
            key={course.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1 }}
          >
            <motion.img
              style={{ rotate }}
              src={asset(course.image)}
              alt={text(course.name, locale)}
              draggable={false}
            />
            <small>{course.id}</small>
            <h2>{text(course.name, locale)}</h2>
            <p>{text(course.description, locale)}</p>
            <div className="pz-allergen-icons">
              {course.allergens.map((id) => (
                <span key={id}>
                  {text(
                    allergens.find((item) => item.id === id)!.label,
                    locale,
                  )}
                </span>
              ))}
            </div>
            <p className="pz-gold">
              {locale === "zh" ? "搭配" : "Paired with"} {course.wine}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

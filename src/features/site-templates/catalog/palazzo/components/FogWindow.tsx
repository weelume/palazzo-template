"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { asset } from "../config";
import type { TemplateLocale } from "../../../types";
interface Droplet {
  x: number;
  y: number;
  speed: number;
  age: number;
  life: number;
  radius: number;
}
export function FogWindow({ locale = "zh" }: { locale?: TemplateLocale }) {
  const region = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const water = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Droplet[]>([]);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const lastWipe = useRef(0);
  const [writing, setWriting] = useState(0);
  const [clear, setClear] = useState(false);
  const reduced = useReducedMotion();
  const visible = useInView(region, { amount: 0.1 });
  useEffect(() => {
    const element = canvas.current,
      waterElement = water.current;
    if (!element || !waterElement || clear || reduced || !visible) return;
    const context = element.getContext("2d"),
      waterContext = waterElement.getContext("2d");
    if (!context || !waterContext) return;
    const image = new Image();
    let frame = 0,
      last = 0;
    function paint(alpha = 1) {
      if (!context || !element) return;
      const scale = Math.max(
        element.width / image.naturalWidth,
        element.height / image.naturalHeight,
      );
      const width = image.naturalWidth * scale + 40,
        height = image.naturalHeight * scale + 40;
      context.globalCompositeOperation = "source-over";
      context.globalAlpha = alpha;
      context.filter = "blur(22px)";
      context.drawImage(
        image,
        (element.width - width) / 2,
        (element.height - height) / 2,
        width,
        height,
      );
      context.filter = "none";
      context.fillStyle = "rgba(209,219,232,.26)";
      context.fillRect(0, 0, element.width, element.height);
      context.globalAlpha = 1;
    }
    function resize() {
      if (!element || !waterElement) return;
      element.width = element.clientWidth;
      element.height = element.clientHeight;
      waterElement.width = element.width;
      waterElement.height = element.height;
      if (image.complete && image.naturalWidth) paint();
    }
    function tick(now: number) {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;
      if (image.naturalWidth) paint(Math.min(1, (dt / 8) * 1.4));
      if (waterContext && waterElement) {
        waterContext.clearRect(0, 0, waterElement.width, waterElement.height);
        particles.current = particles.current.filter(
          (drop) => drop.age < drop.life,
        );
        for (const drop of particles.current) {
          drop.age += dt;
          drop.speed += 40 * dt;
          drop.y += drop.speed * dt;
          waterContext.globalAlpha = (1 - drop.age / drop.life) * 0.5;
          waterContext.fillStyle = "#e4ebef";
          waterContext.beginPath();
          waterContext.ellipse(
            drop.x,
            drop.y,
            drop.radius,
            drop.radius * 1.6,
            0,
            0,
            Math.PI * 2,
          );
          waterContext.fill();
        }
        waterContext.globalAlpha = 1;
      }
      if (lastWipe.current && now - lastWipe.current > 9000) {
        lastWipe.current = 0;
        setWriting((value) => value + 1);
      }
      frame = requestAnimationFrame(tick);
    }
    image.onload = () => {
      resize();
      frame = requestAnimationFrame(tick);
    };
    image.src = asset("window.jpg");
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      image.onload = null;
    };
  }, [clear, reduced, visible]);
  function erase(event: React.PointerEvent<HTMLCanvasElement>) {
    const element = event.currentTarget,
      context = element.getContext("2d");
    if (!context) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left,
      y = event.clientY - rect.top,
      radius = rect.width < 700 ? 64 : 96;
    const previous = lastPoint.current ?? { x, y };
    const steps = Math.max(
      1,
      Math.ceil(Math.hypot(x - previous.x, y - previous.y) / 12),
    );
    context.globalCompositeOperation = "destination-out";
    for (let i = 1; i <= steps; i++) {
      const px = previous.x + ((x - previous.x) * i) / steps,
        py = previous.y + ((y - previous.y) * i) / steps;
      const gradient = context.createRadialGradient(px, py, 0, px, py, radius);
      gradient.addColorStop(0, "#000");
      gradient.addColorStop(0.65, "rgba(0,0,0,.9)");
      gradient.addColorStop(1, "transparent");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(px, py, radius, 0, Math.PI * 2);
      context.fill();
    }
    lastPoint.current = { x, y };
    lastWipe.current = performance.now();
    if (particles.current.length < 60 && Math.random() < 0.3)
      particles.current.push({
        x,
        y,
        speed: 0,
        age: 0,
        life: 2 + Math.random() * 3,
        radius: 1 + Math.random() * 2,
      });
  }
  return (
    <div
      ref={region}
      className="pz-fog"
      style={{ backgroundImage: `url(${asset("window.jpg")})` }}
    >
      {!clear && !reduced && (
        <>
          <motion.canvas
            ref={canvas}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onPointerMove={erase}
            onPointerDown={erase}
            onPointerLeave={() => {
              lastPoint.current = null;
            }}
            aria-hidden="true"
          />
          <canvas className="pz-water" ref={water} aria-hidden="true" />
          <div key={writing} className="pz-fog-writing">
            {locale === "zh" ? "请进" : "Come in"}
          </div>
        </>
      )}
      <button
        type="button"
        className="pz-fog-button"
        aria-pressed={clear}
        onClick={() => setClear(!clear)}
      >
        {locale === "zh"
          ? clear
            ? "让玻璃重新起雾"
            : "擦拭玻璃 看看里面"
          : clear
            ? "Fog the glass again"
            : "Wipe the glass to look inside"}
      </button>
    </div>
  );
}

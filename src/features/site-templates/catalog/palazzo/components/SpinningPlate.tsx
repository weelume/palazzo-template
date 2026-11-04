"use client";
import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { asset } from "../config";
export function SpinningPlate({ alt }: { alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const reduced = useReducedMotion();
  const angle = useMotionValue(-12);
  useEffect(() => {
    if (!visible || reduced) return;
    const rotation = animate(angle, angle.get() + 360, {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
    });
    return () => rotation.stop();
  }, [visible, reduced, angle]);
  return (
    <motion.div
      ref={ref}
      className="pz-story-plate"
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", bounce: 0.2, delay: 0.4, duration: 1.4 }}
    >
      <motion.img
        src={asset("tomato.jpg")}
        alt={alt}
        style={{ rotate: angle }}
      />
    </motion.div>
  );
}

"use client";
import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
export function RollingPrice({ value }: { value: number }) {
  const number = useMotionValue(value);
  const display = useTransform(number, (current) =>
    String(Math.round(current)),
  );
  const reduced = useReducedMotion();
  useEffect(() => {
    const animation = animate(number, value, {
      duration: reduced ? 0 : 0.8,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => animation.stop();
  }, [number, value, reduced]);
  return (
    <strong aria-label={`€${value}`}>
      €<motion.span aria-hidden="true">{display}</motion.span>
    </strong>
  );
}

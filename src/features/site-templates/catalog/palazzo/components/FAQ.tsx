"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { text, type Copy } from "../config";
import type { TemplateLocale } from "../../../types";
export function FAQ({
  items,
  locale = "zh",
}: {
  items: { question: Copy; answer: Copy }[];
  locale?: TemplateLocale;
}) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="pz-faq">
      {items.map((item, index) => (
        <div key={item.question.en}>
          <h3>
            <button
              onClick={() => setActive(active === index ? null : index)}
              aria-expanded={active === index}
              aria-controls={`pz-faq-${index}`}
            >
              {text(item.question, locale)}
              <motion.span animate={{ rotate: active === index ? 45 : 0 }}>
                +
              </motion.span>
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {active === index && (
              <motion.div
                id={`pz-faq-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p>{text(item.answer, locale)}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

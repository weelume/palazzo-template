"use client";
import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { TemplateLocale } from "../../../types";
import { pricing } from "../config";

const times = ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const providers = ["Resy", "Tock", "OpenTable", "SevenRooms", "Email"];
const subscribe = () => () => {};
export function Booking(props: {
  locale?: TemplateLocale;
  compact?: boolean;
  basePath?: string;
}) {
  // 日期只在客户端生成，避免静态产物跨日后仍展示构建当天的预约范围。
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return mounted ? (
    <BookingControls {...props} />
  ) : (
    <div className="pz-booking pz-glass" aria-busy="true">
      {props.locale === "en" ? "Loading available dates…" : "正在加载可选日期…"}
    </div>
  );
}
function BookingControls({
  locale = "zh",
  compact = false,
  basePath = "",
}: {
  locale?: TemplateLocale;
  compact?: boolean;
  basePath?: string;
}) {
  const [today] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [date, setDate] = useState(() => {
    const next = new Date(today);
    do {
      next.setDate(next.getDate() + 1);
    } while ([0, 1].includes(next.getDay()));
    return next;
  });
  const [month, setMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("19:00");
  const [provider, setProvider] = useState("Resy");
  const [status, setStatus] = useState("");
  const lang = locale === "zh" ? "zh-CN" : "en-GB";
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en);
  const dateKey = (value: Date) =>
    `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`;
  const limit = new Date(today);
  limit.setDate(limit.getDate() + 60);
  const days = Array.from(
    {
      length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(),
    },
    (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
  );
  const closed = (value: Date) =>
    [0, 1].includes(value.getDay()) || value < today || value > limit;
  const quickDays = Array.from({ length: 14 }, (_, i) => {
    const day = new Date(today);
    day.setDate(day.getDate() + i);
    return day;
  })
    .filter((day) => !closed(day))
    .slice(0, 6);
  function changeMonth(delta: number) {
    setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));
    setStatus("");
  }
  return (
    <div className={`pz-booking pz-glass ${compact ? "compact" : ""}`}>
      {!compact && (
        <div className="pz-provider">
          <small>{label("预订方式", "Bookings through")}</small>
          {providers.map((item) => (
            <button
              key={item}
              aria-pressed={provider === item}
              onClick={() => {
                setProvider(item);
                setStatus("");
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <div className="pz-booking-grid">
        <div>
          <fieldset>
            <legend>{label("人数", "Guests")}</legend>
            <div className="pz-pills">
              {Array.from({ length: compact ? 6 : 7 }, (_, i) => i + 1).map(
                (n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={guests === n}
                    onClick={() => {
                      setGuests(n);
                      setStatus("");
                    }}
                  >
                    {n === (compact ? 6 : 7) ? `${n}+` : n}
                  </button>
                ),
              )}
            </div>
          </fieldset>
          <fieldset>
            <legend>{label("日期", "Date")}</legend>
            {compact ? (
              <div className="pz-quick-dates">
                {quickDays.map((day) => (
                  <button
                    key={dateKey(day)}
                    aria-pressed={dateKey(day) === dateKey(date)}
                    onClick={() => {
                      setDate(day);
                      setStatus("");
                    }}
                  >
                    <small>
                      {day.toLocaleDateString(lang, { weekday: "short" })}
                    </small>
                    {day.getDate()}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="pz-calendar-heading">
                  <button
                    type="button"
                    aria-label={label("上个月", "Previous month")}
                    disabled={
                      month.getTime() <=
                      new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        1,
                      ).getTime()
                    }
                    onClick={() => changeMonth(-1)}
                  >
                    ‹
                  </button>
                  <span>
                    {month.toLocaleDateString(lang, {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                  <button
                    type="button"
                    aria-label={label("下个月", "Next month")}
                    disabled={
                      new Date(month.getFullYear(), month.getMonth() + 1, 1) >
                      limit
                    }
                    onClick={() => changeMonth(1)}
                  >
                    ›
                  </button>
                </div>
                <div className="pz-calendar">
                  {label("一 二 三 四 五 六 日", "Mon Tue Wed Thu Fri Sat Sun")
                    .split(" ")
                    .map((day) => (
                      <small key={day}>{day}</small>
                    ))}
                  {Array.from({ length: (month.getDay() + 6) % 7 }, (_, i) => (
                    <span key={`empty${i}`} />
                  ))}
                  {days.map((day) => (
                    <button
                      type="button"
                      key={dateKey(day)}
                      disabled={closed(day)}
                      aria-label={day.toLocaleDateString(lang, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                      })}
                      aria-pressed={dateKey(day) === dateKey(date)}
                      className={day.getDate() % 5 === 0 ? "waitlist" : ""}
                      onClick={() => {
                        setDate(day);
                        setStatus("");
                      }}
                    >
                      {day.getDate()}
                      <i />
                    </button>
                  ))}
                </div>
                <div className="pz-calendar-key">
                  <span>{label("有空位", "Tables free")}</span>
                  <span>{label("仅候补", "Waitlist only")}</span>
                  <span>{label("休息", "Closed")}</span>
                </div>
              </>
            )}
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>{label("时间", "Time")}</legend>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={dateKey(date)}
                className="pz-time-slots"
                initial={{ x: 16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {times.map((item) => (
                  <button
                    type="button"
                    key={item}
                    disabled={["20:00", "20:30"].includes(item)}
                    aria-pressed={time === item}
                    aria-label={`${item}${["20:00", "20:30"].includes(item) ? label(" 已满", " full") : ""}`}
                    onClick={() => {
                      setTime(item);
                      setStatus("");
                    }}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </fieldset>
          <p className="pz-booking-summary" aria-live="polite">
            {date.toLocaleDateString(lang, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            · {time}
            <br />
            <small>
              {guests} {label("位宾客 · 品鉴菜单每位", "guests · tasting menu")}{" "}
              €{pricing.tasting}
              {label("", " each")}
            </small>
          </p>
          {guests >= 6 ? (
            <Link
              className="pz-button"
              href={`${basePath}/private-dining#enquiry`}
            >
              {label("咨询私人宴请", "Enquire about private dining")}
            </Link>
          ) : (
            <button
              className="pz-button"
              type="button"
              onClick={() =>
                setStatus(
                  label(
                    `已校验 ${guests} 位宾客的预订选项。这是本地演示，尚未向 ${provider} 发送或保存。`,
                    `Options checked for ${guests} guests. Local demo only. Nothing has been sent to ${provider} or saved.`,
                  ),
                )
              }
            >
              {compact
                ? label("查找席位", "Find a table")
                : label(
                    date.getDate() % 5 === 0 ? "加入候补" : "确认预约",
                    date.getDate() % 5 === 0 ? "Join waitlist" : "Reserve",
                  )}
            </button>
          )}
          <p className="pz-note">
            {label(
              "演示预订，仅本地校验，尚未发送或保存。",
              "Demo booking. Local validation only. Nothing sent or saved.",
            )}
          </p>
          {status && (
            <p role="status" className="pz-status">
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

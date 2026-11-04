"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { Copy } from "./config";
export interface PalazzoHostOptions {
  brandName?: Copy;
  logo?: string;
  lightLogo?: string;
  marketplaceHref?: string;
  marketplaceAriaLabel?: Copy;
  marketplaceLabel?: Copy;
  filing?: ReactNode;
}
const Host = createContext<PalazzoHostOptions>({});
/** 宿主专属品牌和附加入口由消费方注入，独立模板只维护通用体验。 */
export function PalazzoHostProvider({
  children,
  ...options
}: PalazzoHostOptions & { children: ReactNode }) {
  return <Host.Provider value={options}>{children}</Host.Provider>;
}
export const usePalazzoHost = () => useContext(Host);

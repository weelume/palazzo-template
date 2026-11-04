"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
interface PairingState {
  wine: boolean;
  setWine: (value: boolean) => void;
}
const Context = createContext<PairingState | null>(null);
export function PairingProvider({ children }: { children: ReactNode }) {
  const [wine, setWine] = useState(true);
  return (
    <Context.Provider value={{ wine, setWine }}>{children}</Context.Provider>
  );
}
export function usePairing() {
  const context = useContext(Context);
  if (!context) throw new Error("PairingProvider is required");
  return context;
}

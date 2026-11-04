import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Palazzo · Kitchen and wine room",
  description:
    "A seasonal tasting menu, private dining and a wine room in Paris.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

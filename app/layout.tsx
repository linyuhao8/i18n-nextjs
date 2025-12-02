import type { Metadata } from "next";
// import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 智能外撥平台",
  description: "智慧化外撥與客戶聯繫系統，讓通話自動化更高效。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no" className="notranslate">
      <body className="notranslate">
          {children}
          {/* <Toaster /> */}
      </body>
    </html>
  );
}

"use client";
import "./globals.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import TemporaryDrawer from "../components/drawer";

export const metadata = {
  title: "TCC - Bachelor's Thesis",
  description: "MatheusRibeiroS Bachelor's Thesis (TCC project)",
  image: "/favicon.ico",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TemporaryDrawer/>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

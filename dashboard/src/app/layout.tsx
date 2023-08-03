"use client";
import "./globals.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import HorizontalDrawer from "../components/drawer";

export const metadata = {
  title: "TCC - Bachelor's Thesis",
  description: "MatheusRibeiroS Bachelor's Thesis (TCC project)",
  image: "/favicon.ico",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HorizontalDrawer/>
         {/* <iframe src="https://vscode.dev/" width="800" height="600"></iframe> */}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

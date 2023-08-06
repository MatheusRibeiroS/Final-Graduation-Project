"use client";
import "./globals.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import HorizontalDrawer from "../components/Drawer";
import LeftSider from "../components/LeftSider";
import Container from "@mui/material/Container";
import SwipeableEdgeDrawer from "../components/SwipeableEdgeDrawer";

export const metadata = {
  title: "TCC - Bachelor's Thesis",
  description: "MatheusRibeiroS Bachelor's Thesis (TCC project)",
  image: "/favicon.ico",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <SwipeableEdgeDrawer /> */}
        <HorizontalDrawer />
        <LeftSider />
        {/* <Container>
          <iframe src="https://vscode.dev/" width="800" height="600"></iframe>
        </Container> */}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

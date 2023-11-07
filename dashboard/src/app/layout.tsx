"use client";
import "./globals.css";
import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import HomeContext from "./home.context";
import { Toaster } from "react-hot-toast";

// export const metadata = {
//   title: "TCC - Bachelor's Thesis",
//   description: "MatheusRibeiroS Bachelor's Thesis (TCC project)",
//   image: "/favicon.ico",
// };

export default function RootLayout({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  // const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body>
        <Toaster />
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}

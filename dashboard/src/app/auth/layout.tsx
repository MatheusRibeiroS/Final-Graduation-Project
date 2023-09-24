"use client"
import "../globals.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { useCreateReducer } from "@/hooks/useCreateReducer";
import { Toaster } from "react-hot-toast";
import HomeContext from "../home.context";

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
}) {

  return (
    <html lang="en">
      <body>
          <Toaster />
          <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}

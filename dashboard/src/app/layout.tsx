import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
  title: "TCC - Bachelor's Thesis",
  description: "MatheusRibeiroS Bachelor's Thesis (TCC project)",
  image: "/favicon.ico",
};



export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

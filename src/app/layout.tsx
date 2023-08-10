import './globals.css'

import {Inter} from 'next/font/google'
import React from "react";
import ThemeRegistry from "../../theme/ThemeRegistry";

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "Sistema de Gestión Penitenciario SIPI",
  description: "Sistema de Gestión Penitenciario SIPI"
};


export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
      <ThemeRegistry>
          <html lang="en">
          <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
          </html>
      </ThemeRegistry>
  )
}
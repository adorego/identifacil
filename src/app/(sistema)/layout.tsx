import React, { useState } from 'react';


import '@/app/globals.css';
import {Inter} from 'next/font/google';
import ThemeRegistry from "@/../theme/ThemeRegistry";
import {GlobalContextProvider, useGlobalContext} from "@/app/Context/store";
import AlternateLayout from "@/app/(sistema)/layouts/AlternateLayout";
import SnackbarComponent from "@/components/snackback/SnackBarComponent";
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
            <body className={inter.className} suppressHydrationWarning={true}>

                <GlobalContextProvider>
                    <SnackbarComponent />

                    <AlternateLayout>
                        {children}
                    </AlternateLayout>
                </GlobalContextProvider>
            </body>
          </html>
      </ThemeRegistry>
  )
}
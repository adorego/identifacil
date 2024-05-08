// 'use client'

import '@/app/globals.css';

import {GlobalContextProvider, useGlobalContext} from "@/app/Context/store";
import React from 'react';
import AlternateLayout from "@/app/(sistema)/layouts/AlternateLayout";
import {Inter} from 'next/font/google';
import SnackbarComponent from "@/components/snackback/SnackBarComponent";
import ThemeRegistry from "@/../theme/ThemeRegistry";
import SessionProviderWrapper   from "../../../utils/sessionProviderWrapper";

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "Sistema de Gestión Penitenciario SIPI",
  description: "Sistema de Gestión Penitenciario SIPI"
};


export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  

  return (
      <SessionProviderWrapper>
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
      </SessionProviderWrapper>

  )
}
'use client'

import '@/app/globals.css';

import {GlobalContextProvider, useGlobalContext} from "@/app/Context/store";
import { NotificationProvider, notificationContextData, notificationContextInitialValue } from '@/components/notiification/context';
import React, { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AlertColor } from '@mui/material';
import AlternateLayout from "@/app/(sistema)/layouts/AlternateLayout";
import {Inter} from 'next/font/google';
import { LocalizationProvider } from '@mui/x-date-pickers';
import SnackbarComponent from "@/components/snackback/SnackBarComponent";
import ThemeRegistry from "@/../theme/ThemeRegistry";
import UserNotification from '@/components/notiification/UserNotification';

const inter = Inter({subsets: ['latin']});

// export const metadata = {
//   title: "Sistema de Gestión Penitenciario SIPI",
//   description: "Sistema de Gestión Penitenciario SIPI"
// };


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
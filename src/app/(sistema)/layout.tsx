// 'use client'

import '@/app/globals.css';

import {GlobalContextProvider, useGlobalContext} from "@/app/Context/store";
import React from 'react';
import AlternateLayout from "@/app/(sistema)/layouts/AlternateLayout";
import {Inter} from 'next/font/google';
import SnackbarComponent from "@/components/snackback/SnackBarComponent";
import ThemeRegistry from "@/../theme/ThemeRegistry";
import SessionProviderWrapper   from "../../../utils/sessionProviderWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/authOptions";
import { redirect } from 'next/navigation';
import SessionWatcher from "@/components/authComponents/sessionWatcher";
import { Toaster, toast } from 'sonner'
const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "Sistema de Gestión Penitenciario SIPI",
  description: "Sistema de Gestión Penitenciario SIPI"
};


export default async function RootLayout({children,}: {
    children: React.ReactNode
}) {
    // @ts-ignore
    const session = await getServerSession(authOptions);



    console.log('session en layout: ',session)
    // console.log(session);

    if (!session) {
        // Redirect to the login page if the user is not authenticated
        redirect('/login');
    }



    return (
        <SessionProviderWrapper>

            <ThemeRegistry>
                <html lang="en">
                <body className={inter.className} suppressHydrationWarning={true}>
                <Toaster position="top-right" richColors closeButton/>

                <GlobalContextProvider>
                    <SnackbarComponent/>
                    <AlternateLayout>

                        <SessionWatcher
                            // @ts-ignore
                            sessionData={session.roles}/>
                        {children}
                    </AlternateLayout>
                </GlobalContextProvider>


                </body>
                </html>
            </ThemeRegistry>
        </SessionProviderWrapper>

    )
}
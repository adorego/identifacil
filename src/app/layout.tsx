import './globals.css'

import {Inter} from 'next/font/google'
import React from "react";
import ThemeRegistry from "../../theme/ThemeRegistry";
import {GlobalContextProvider} from "./Context/store";
import {Box, Grid, Stack} from "@mui/material";
import SideBar from "../components/SideBar";
import TopNav from "../components/TopNav";
import StatusNav from "../components/StatusNav";

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
                    <Stack direction='row'>
                        <Box>
                            <SideBar/>
                        </Box>
                        <Box width='100%' sx={{bgcolor: '#F6FAFF'}}>
                            <TopNav/>
                            <Grid container>
                                <Grid item>
                                    <Box mx={4} mt={4}>
                                        <StatusNav/>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box mx={4}>
                                {children}
                            </Box>

                        </Box>
                    </Stack>
                </GlobalContextProvider>
            </body>
          </html>
      </ThemeRegistry>
  )
}
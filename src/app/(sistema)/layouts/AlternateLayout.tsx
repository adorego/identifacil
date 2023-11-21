import React from "react";
import { Suspense } from 'react'

import {Inter} from 'next/font/google';
import ThemeRegistry from "@/../theme/ThemeRegistry";
import {Box, Grid, Stack} from "@mui/material";
import SideBar from "@/components/SideBar";
import TopNav from "@/components/TopNav";
import StatusNav from "@/components/StatusNav";
import NextNProgress from 'nextjs-progressbar';
import {Next13ProgressBar} from "next13-progressbar";


const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: "Sistema de Gestión Penitenciario SIPI",
    description: "Sistema de Gestión Penitenciario SIPI"
};


const AlternateLayout = ({ children }) => {


    return (
        <ThemeRegistry>
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
        </ThemeRegistry>
    )
}

export default AlternateLayout;

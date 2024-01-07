'use client'

import {Box, Grid, Stack} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {Inter} from 'next/font/google';
import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import SideBar from "@/components/SideBar";
import StatusNav from "@/components/StatusNav";
import ThemeRegistry from "@/../theme/ThemeRegistry";
import TopNav from "@/components/TopNav";

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: "Sistema de Gestión Penitenciario SIPI",
    description: "Sistema de Gestión Penitenciario SIPI"
};



const AlternateLayout = ({ children }) => {


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>
    )
}

export default AlternateLayout;

import React from "react";
import { Suspense } from 'react'

import {Inter} from 'next/font/google';
import ThemeRegistry from "@/../theme/ThemeRegistry";
import {Box, Grid, Stack} from "@mui/material";
import SideBar from "@/components/SideBar";
import TopNav from "@/components/TopNav";



const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: "Sistema de Gestión Penitenciario SIPI",
    description: "Sistema de Gestión Penitenciario SIPI"
};



// @ts-ignore
const AlternateLayout = ({ children }) => {


    return (
        <ThemeRegistry>
            <Stack direction='row'>
                <Box>
                    <SideBar/>
                </Box>
                <Box width='100%' sx={{bgcolor: '#F6FAFF'}}>
                    <TopNav/>
                    <Box mx={6} mt={4}>

                        {children}
                    </Box>

                </Box>
            </Stack>
        </ThemeRegistry>
    )
}

export default AlternateLayout;

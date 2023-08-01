"use client"

import {createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import {NextAppDirEmotionCacheProvider} from "./EmotionCache"
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { Roboto } from "next/font/google";
import { Public_Sans } from "next/font/google";

const publicSans = Public_Sans({
    weight: ['300', "400", "500", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"]
})

const themeOptions: ThemeOptions = {
    typography: {
        fontFamily: publicSans.style.fontFamily,
        fontSize: 12,
    },
    palette:{
        background:{
            default: "#fff"
        }
    },
    components:{},
}

const theme = createTheme(themeOptions);

export default function ThemeRegistry({children}:{children: React.ReactNode})
{
    return(
        <NextAppDirEmotionCacheProvider options={{key: "mui"}}>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    {children}
                </CssBaseline>
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>

    )
}
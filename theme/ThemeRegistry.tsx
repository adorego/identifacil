"use client"

import {createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import {NextAppDirEmotionCacheProvider} from "./EmotionCache"
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { lime, purple } from '@mui/material/colors';
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
    palette: {
        primary: {
            main: '#00A76F',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        background:{
            default: '#fff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    height: '38px',
                },
                outlined: {
                    // Aquí puedes personalizar el estilo del botón outlined
                    background: '#FFF',
                },
                contained: {
                    backgroundColor: '#00A76F',
                    textTransform: 'capitalize'
                }
            },
        },
        MuiInputBase:{
            styleOverrides: {
                root:{

                }
            }
        }
    },
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
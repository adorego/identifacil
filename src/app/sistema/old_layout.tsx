
import {Container, Grid} from "@mui/material";
import { Inter } from "next/font/google";
import SideBar from "@/components/SideBar"
import StatusNav from "@/components/StatusNav";
import TopNav from "../../components/TopNav";
import styles from "./layout.module.css";
import React from "react";

const inter = Inter({ subsets: ['latin'] })
export default function MainLayout({children,}: { children: React.ReactNode}) {

     // TODO: Hacer Modulo para Medidas de seguridad
     // TODO: Autorizadores de traslados
     // TODO: Motivos de traslados
     // TODO: Custodios
     // TODO: Vehiculos de traslados
     // TODO: Custodios
     // TODO: Establecimientos penitenciarios
    // ----------------------------------------
     // TODO: CAMARAS -> AGREGAR CAMPO PUERTO

    return (
        <>
            <Grid container spacing={0}>
                <Grid item sm={2} className={inter.className}>
                    <SideBar />
                </Grid>
                <Grid item sm={10}>
                    <TopNav />
                    {/*<StatusNav />*/}
                    <div className='container-main'>
                        {children}
                    </div>

                </Grid>
            </Grid>

        </>

    )
}
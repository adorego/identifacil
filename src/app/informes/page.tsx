'use client'

import {Suspense, useEffect, useState} from "react"


import CardBlock from "../../components/blocks/CardBlock";
import {Box, Grid} from "@mui/material";
import ingresosIMG from '../../common/acceso-ppl.png';
import penalesIMG from '../../common/control-ppl.png';
import trasladosIMG from '../../common/traslados.png';



export default function Page() {

    return (
        <Box >
            <Grid container>
                <Grid item xs={12} mx={4}>
                    <h1>Informes</h1>
                    <Grid container spacing={2}>

                        <CardBlock name={'Ingresos'}  image={ingresosIMG.src} link='/informes/ingresos' size={3}/>
                        <CardBlock name={'Traslados'} image={trasladosIMG.src} link='/informes/traslados' size={3}/>
                        <CardBlock name={'Visitas'} image={penalesIMG.src} link='/informes/visitas' size={3}/>
                        <CardBlock name={'Extradiciones'} image={penalesIMG.src} link='/extradiciones' size={3}/>

                    </Grid>
                    <Grid container spacing={2} mt={1}>

                        <CardBlock name={'Ingresos'}  image={ingresosIMG.src} link='/informes/accesos' size={3}/>
                        <CardBlock name={'Movimientos'} image={trasladosIMG.src} link='/informes/traslados' size={3}/>
                        <CardBlock name={'Informes'} image={penalesIMG.src} link='/extradiciones' size={3}/>
                        <CardBlock name={'Informes'} image={penalesIMG.src} link='/extradiciones' size={3}/>

                    </Grid>
                    <Grid container spacing={2} mt={1}>

                        <CardBlock name={'Ingresos'}  image={ingresosIMG.src} link='/informes/accesos' size={3}/>
                        <CardBlock name={'Movimientos'} image={trasladosIMG.src} link='/informes/traslados' size={3}/>
                        <CardBlock name={'Informes'} image={penalesIMG.src} link='/extradiciones' size={3}/>
                        <CardBlock name={'Informes'} image={penalesIMG.src} link='/extradiciones' size={3}/>

                    </Grid>

                </Grid>
            </Grid>
        </Box>
    )
}
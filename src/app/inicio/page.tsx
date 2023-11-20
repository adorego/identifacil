'use client'

import {Suspense, useEffect, useState} from "react"

import Loading from "./loading"
import CardBlock from "../../components/blocks/CardBlock";
import {Grid} from "@mui/material";
import ingresosIMG from '../../common/acceso-ppl.png';
import penalesIMG from '../../common/control-ppl.png';
import trasladosIMG from '../../common/traslados.png';

export default function Main() {

    return (
        <Suspense fallback={<Loading/>}>
            <Grid container>
                <Grid item xs={12}>
                    <h1>Panel</h1>
                    <Grid container spacing={2}>

                        <CardBlock name={'Ingresos'}  image={ingresosIMG.src} link='/inicio/registro/ppl'/>
                        <CardBlock name={'Movimientos'} image={trasladosIMG.src} link='/movimientos'/>
                        <CardBlock name={'Informes'} image={penalesIMG.src} link='/informes'/>

                    </Grid>

                </Grid>
            </Grid>
        </Suspense>
    )
}
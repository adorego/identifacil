'use client'

import { Box, Typography } from "@mui/material"
import { Suspense, useEffect, useState } from "react"

import CardBlock from "../../components/blocks/CardBlock";
import {Grid} from "@mui/material";
import Loading from "./loading"

export default function Main(){
  
  return(
    <Suspense fallback={<Loading />} >
      <h1>Panel</h1>
        <Grid container spacing={2}>

                <CardBlock name={'Ingresos'}/>
                <CardBlock name={'Datos penales'}/>
                <CardBlock name={'Informes'} />

        </Grid>
    </Suspense>
  )
}
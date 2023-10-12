'use client'

import { Suspense, useEffect, useState } from "react"

import Loading from "./loading"
import CardBlock from "../../components/blocks/CardBlock";
import {Grid} from "@mui/material";

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
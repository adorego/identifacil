'use client';

import * as React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper} from "@mui/material";
import FormMotivoTraslado from "@/app/(sistema)/sistema/(movimientos)/motivos-traslados/[id]/FormMotivoTraslado";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default function Page({ params }: { params: { id: number } }){
    const URL_PARAM : string = `${API_URL}/movimientos/medidas_de_seguridad/${params.id}`;

    const listaDeItemBread = [
        {nombre:'Lista de motivos de traslados', url:'/sistema/motivos-traslados', lastItem: false},
        {nombre:'Motivos de traslados', url:'', lastItem: true},
    ];

    return(
        <>
            <TituloComponent titulo='Motivos de traslado'>
                <BreadCrumbComponent listaDeItems={listaDeItemBread}/>
            </TituloComponent>
            {/*<TituloComponent titulo='Motivos de traslado' url={URL_PARAM}/>*/}
            <Box mt={2}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>
                    <FormMotivoTraslado params={params} />
                </Paper>
            </Box>
        </>
    );
}
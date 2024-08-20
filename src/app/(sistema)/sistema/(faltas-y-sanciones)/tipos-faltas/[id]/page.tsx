
import React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper,} from "@mui/material";

import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import FormTiposFaltas from "@/app/(sistema)/sistema/(faltas-y-sanciones)/tipos-faltas/[id]/FormTiposFaltas";




export default function Page({ params }: { params: { id: number } }) {

    // TODO: Actualizar endnpoint para consumir el recurso de tipo de faltas
    const URL_PARAM : string = `${process.env.NEXT_PUBLIC_API_URL}/movimientos/tipo_de_medida_de_fuerza/${params.id}`;

    // TODO: Hay que configurar mejor para que el loding funcione
    return(
        <>

            <TituloComponent titulo='Tipo de sancion' url={URL_PARAM}>
                <BreadCrumbComponent listaDeItems={ [
                    {nombre:'Lista de tipos de faltas', url:'/sistema/tipos-medidas-de-fuerza/', lastItem: false},
                    {nombre:'Tipo de falta', url:'', lastItem: true},
                ]} />
            </TituloComponent>

            <Box mt={2}>
                <Paper elevation={1} sx={{p: "20px"}}>

                    <FormTiposFaltas params={params} />

                </Paper>
            </Box>
        </>
    );
}

import React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper,} from "@mui/material";
import FormMedidasSeguridad from "@/app/(sistema)/sistema/(movimientos)/medidas-seguridad/[id]/FormMedidasSeguridad";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";




export default function Page({ params }: { params: { id: number } }) {
    const URL_PARAM : string = `${process.env.NEXT_PUBLIC_API_URL}/movimientos/medidas_de_seguridad/${params.id}`;
    const listaDeMigajas = [
        {nombre:'Lista de medidas de seguridad', url:'/sistema/medidas-seguridad', lastItem: false},
        {nombre:'Medida de seguridad', url:'', lastItem: true},
    ];

    // TODO: Hay que configurar mejor para que el loding funcione
    return(
        <>

            <TituloComponent titulo='Medidas de seguridad' url={URL_PARAM}>
                <BreadCrumbComponent listaDeItems={listaDeMigajas} />
            </TituloComponent>

            <Box mt={2}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>

                    <FormMedidasSeguridad params={params} />

                </Paper>
            </Box>
        </>
    );
}
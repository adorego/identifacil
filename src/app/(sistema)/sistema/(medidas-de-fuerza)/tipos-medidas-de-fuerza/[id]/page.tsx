
import React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper,} from "@mui/material";

import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import FormTipoMedidasDeFuerza
    from "@/app/(sistema)/sistema/(medidas-de-fuerza)/tipos-medidas-de-fuerza/[id]/FormTipoMedidasDeFuerza";




export default function Page({ params }: { params: { id: number } }) {
    const URL_PARAM : string = `${process.env.NEXT_PUBLIC_API_URL}/movimientos/tipo_de_medida_de_fuerza/${params.id}`;
    const listaDeMigajas = [
        {nombre:'Lista de medidas de seguridad', url:'/sistema/tipos-medidas-de-fuerza/', lastItem: false},
        {nombre:'Tipo de medida de fuerza', url:'', lastItem: true},
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

                    <FormTipoMedidasDeFuerza params={params} />

                </Paper>
            </Box>
        </>
    );
}
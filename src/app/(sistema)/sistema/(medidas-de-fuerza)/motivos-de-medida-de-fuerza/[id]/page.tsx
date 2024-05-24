
import React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper,} from "@mui/material";

import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import FormTipoMedidasDeFuerza
    from "@/app/(sistema)/sistema/(medidas-de-fuerza)/tipos-medidas-de-fuerza/[id]/FormTipoMedidasDeFuerza";
import FormMotivoDeMedidasDeFuerza
    from "@/app/(sistema)/sistema/(medidas-de-fuerza)/motivos-de-medida-de-fuerza/[id]/FormMotivoDeMedidasDeFuerza";




export default function Page({ params }: { params: { id: number } }) {
    const URL_PARAM : string = `${process.env.NEXT_PUBLIC_API_URL}/motivo_de_medida_de_fuerza/${params.id}`;
    const listaDeMigajas = [
        {nombre:'Lista de motivos de medida de fuerza', url:'/sistema/motivos-de-medida-de-fuerza', lastItem: false},
        {nombre:'Motivo de medida de fuerza', url:'', lastItem: true},
    ];

    // TODO: Hay que configurar mejor para que el loding funcione
    return(
        <>

            <TituloComponent titulo='Motivos de medida de fuerza' url={URL_PARAM}>
                <BreadCrumbComponent listaDeItems={listaDeMigajas} />
            </TituloComponent>

            <Box mt={2}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>

                    <FormMotivoDeMedidasDeFuerza params={params} />

                </Paper>
            </Box>
        </>
    );
}
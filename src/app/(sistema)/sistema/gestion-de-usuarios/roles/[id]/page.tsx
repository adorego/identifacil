import TituloComponent from "@/components/titulo/tituloComponent";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import {Box, Paper} from "@mui/material";
import React from "react";
import FormRoles from "@/app/(sistema)/sistema/gestion-de-usuarios/roles/[id]/formRoles";


export default function Page({ params }: { params: { id: number } }) {
    const URL_PARAM : string = `${process.env.NEXT_PUBLIC_API_URL}/motivo_de_medida_de_fuerza/${params.id}`;

    const listaDeMigajas = [
        {nombre:'Gestion de usuarios', url:'/sistema/gestion-de-usuarios', lastItem: false},
        {nombre:'Rol', url:'', lastItem: true},
    ];

    // TODO: Hay que configurar mejor para que el loding funcione
    return(
        <>

            <TituloComponent titulo='Rol'>
                <BreadCrumbComponent listaDeItems={listaDeMigajas} />
            </TituloComponent>

            <Box mt={2}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>

                    <FormRoles params={params} />

                </Paper>
            </Box>
        </>
    );
}
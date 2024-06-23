import TituloComponent from "@/components/titulo/tituloComponent";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import React from "react";
import {Box, Paper} from "@mui/material";
import FormUsuarios from "@/app/(sistema)/sistema/gestion-de-usuarios/usuarios/[id]/formUsuarios";


export default function Page({ params }: { params: { id: number } }){
    // const URL_PARAM : string = `${process.env.NEXT_PUBLIC_API_URL}/motivo_de_medida_de_fuerza/${params.id}`;

    const listaDeMigajas = [
        {nombre:'Gestion de usuarios', url:'/sistema/gestion-de-usuarios', lastItem: false},
        {nombre:'Usuarios', url:'', lastItem: true},
    ];

    return(

        <>
            <TituloComponent titulo='Usuarios'>
                <BreadCrumbComponent listaDeItems={listaDeMigajas} />
            </TituloComponent>
            <Box mt={2}>
                <Paper elevation={1} sx={{p: "20px",}}>

                    <FormUsuarios params={params} />

                </Paper>
            </Box>
        </>
    )
}
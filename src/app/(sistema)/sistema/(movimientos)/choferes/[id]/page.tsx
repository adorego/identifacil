
import * as React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import { Box, Paper,} from "@mui/material";
import FormChoferes from "@/app/(sistema)/sistema/(movimientos)/choferes/[id]/FormChoferes";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";


export default function Page({ params }: { params: { id: number } }){

    const URL_PARAM : string = `${process.env.API_URL}/chofer/${params.id}`;

    const listaDeMigajas = [
        {nombre:'Lista de choferes', url:'/sistema/choferes', lastItem: false},
        {nombre:'Chofer', url:'', lastItem: true},
    ];


    return(
        <>


            <TituloComponent titulo='Chofer' url={URL_PARAM}>
                <BreadCrumbComponent listaDeItems={listaDeMigajas} />
            </TituloComponent>
            <Box mt={2}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>
                    <FormChoferes params={params} />
                </Paper>
            </Box>
        </>
    );
}
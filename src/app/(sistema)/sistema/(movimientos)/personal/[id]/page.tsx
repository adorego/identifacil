
import * as React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import { Box, Paper,} from "@mui/material";
import FormChoferes from "@/app/(sistema)/sistema/(movimientos)/choferes/[id]/FormChoferes";
import FormPersonal from "@/app/(sistema)/sistema/(movimientos)/personal/[id]/FormPersonal";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";


export default function Page({ params }: { params: { id: number } }){

    const URL_PARAM : string = `${process.env.API_URL}/personal/${params.id}`;

    const listaDeMigajas = [
        {nombre:'Lista de custodios', url:'/sistema/personal', lastItem: false},
        {nombre:'Custodios', url:'', lastItem: true},
    ];

    return(
        <>


            <TituloComponent titulo='Custodios' url={URL_PARAM}>
                <BreadCrumbComponent listaDeItems={listaDeMigajas} />
            </TituloComponent>
            <Box mt={2}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>
                    <FormPersonal params={params} />
                </Paper>
            </Box>
        </>
    );
}
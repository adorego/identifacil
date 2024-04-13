
import * as React from 'react'
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper} from "@mui/material";
import FormCausa from "@/app/(sistema)/(datos-penales)/expedientes/[id]/componentes/formCausa";
import {API_REGISTRO} from "../../../../../../config";
import {getDatos} from "@/components/utils/utils";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";



export default async function Page({ params }: { params: { id: number } }) {

    // const ppls_lista = await getDatos('expedientes/1')
    const listaDeItemBread = [
        {nombre:'Expedientes judiciales', url:'/expedientes', lastItem: false},
        {nombre:'Expediente', url:'', lastItem: true},
    ];

    return(
        <>
            <TituloComponent titulo='Expedientes judiciales'>
                <BreadCrumbComponent listaDeItems={listaDeItemBread} />
            </TituloComponent>
            <Box mt={3}>
                <Paper>
                    <Box p={3}>
                        <FormCausa params={params}/>
                    </Box>
                </Paper>
            </Box>
        </>
    )

}
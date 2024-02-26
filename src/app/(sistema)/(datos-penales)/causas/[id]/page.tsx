
import * as React from 'react'
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper} from "@mui/material";
import FormCausa from "@/app/(sistema)/(datos-penales)/causas/[id]/componentes/formCausa";
import {API_REGISTRO} from "../../../../../../config";
import {getDatos} from "@/components/utils/utils";



export default async function Page({ params }: { params: { id: number } }) {

    // const ppls_lista = await getDatos('causas/1')

    return(
        <>
            <TituloComponent titulo='Causa' />
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
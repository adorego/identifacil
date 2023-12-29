
import * as React from 'react'
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper} from "@mui/material";
import FormCausa from "@/app/(sistema)/datos-penales/causas/[id]/componentes/formCausa";

export default function Page({ params }: { params: { id: number } }) {

    return(
        <>
            <TituloComponent titulo='Causa' />
            <Box mt={3}>
                <Paper>
                    <Box p={3}>
                        <FormCausa/>
                    </Box>
                </Paper>
            </Box>
        </>
    )

}
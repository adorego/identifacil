import * as React from 'react'
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper} from "@mui/material";
import FormAudiencias from "@/app/(sistema)/datos-penales/audiencias/[id]/componentes/formAudiencias";

export default function Page({ params }: { params: { id: number } }) {


    return(
        <>
            <Box mb={3}>
                <TituloComponent titulo='Audiencias' />
            </Box>
            <Paper elevation={1}>
                <Box p={3}>
                    <FormAudiencias />
                </Box>
            </Paper>
        </>
    )
}
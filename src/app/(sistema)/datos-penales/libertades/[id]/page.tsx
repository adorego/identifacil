
import * as React from 'react'
import TituloComponent from "@/components/titulo/tituloComponent";

import {Box, Paper} from "@mui/material";
import FormLibertades from "@/app/(sistema)/datos-penales/libertades/[id]/componentes/formLibertades";


export default function Page({ params }: { params: { id: number } }) {


    return(
        <>
            <TituloComponent titulo='Libertad otorgada' />
            <Box mt={3}>
                <Paper elevation={1}>

                    <Box p={3}>
                        <FormLibertades />
                    </Box></Paper>
            </Box>
        </>
    )
}
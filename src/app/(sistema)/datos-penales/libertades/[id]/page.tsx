import * as React from 'react'
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box} from "@mui/material";


export default function Page({ params }: { params: { id: number } }) {


    return(
        <>
            <TituloComponent titulo='Libertad otorgada' />
            <Box>

            </Box>
        </>
    )
}
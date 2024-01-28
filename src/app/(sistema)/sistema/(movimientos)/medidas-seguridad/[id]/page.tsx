
import React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper,} from "@mui/material";
import FormMedidasSeguridad from "@/app/(sistema)/sistema/(movimientos)/medidas-seguridad/[id]/FormMedidasSeguridad";




export default function Page({ params }: { params: { id: number } }) {
    const URL_PARAM : string = `${process.env.NEXT_PUBLIC_API_URL}/medidaSeguridad/${params.id}`;


    // TODO: Hay que configurar mejor para que el loding funcione
    return(
        <>

            <TituloComponent titulo='Medidas de seguridad' url={URL_PARAM}/>

            <Box mt={2}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>

                    <FormMedidasSeguridad params={params} />

                </Paper>
            </Box>
        </>
    );
}